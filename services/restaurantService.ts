import { Database, supabase } from '@/lib/supabase'
import { RestaurantInfo } from '@/types/core'
import { NetworkError, NotFoundError, ServerError, TimeoutError, isNetworkError } from '@/types/errors'

type Restaurant = Database['public']['Tables']['restaurants']['Row']
type RestaurantInsert = Database['public']['Tables']['restaurants']['Insert']
type RestaurantSave = Database['public']['Tables']['restaurant_saves']['Row']
type RestaurantSaveInsert = Database['public']['Tables']['restaurant_saves']['Insert']

// Cache for frequently accessed restaurants
const restaurantCache = new Map<string, { data: Restaurant, timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Retry configuration
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second
const TIMEOUT_DURATION = 10000 // 10 seconds

// Helper function to handle retries
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = MAX_RETRIES,
  delay = RETRY_DELAY
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Add timeout to the operation
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new TimeoutError()), TIMEOUT_DURATION);
      });
      
      const result = await Promise.race([operation(), timeoutPromise]);
      return result;
    } catch (error: any) {
      lastError = error;
      
      // Don't retry for certain errors
      if (error?.code === 'PGRST116' || error?.statusCode === 404) {
        throw new NotFoundError('Restaurant not found');
      }
      
      // Check if it's a network error
      if (isNetworkError(error)) {
        lastError = new NetworkError();
      }
      
      // Don't retry if it's the last attempt or error is not retryable
      if (attempt === maxRetries || (error?.retry === false)) {
        break;
      }
      
      // Wait before retrying with exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
    }
  }
  
  throw lastError;
}

// Helper function to transform Supabase errors
function transformError(error: any): Error {
  if (isNetworkError(error)) {
    return new NetworkError();
  }
  
  if (error?.code === 'PGRST116' || error?.statusCode === 404) {
    return new NotFoundError();
  }
  
  if (error?.statusCode >= 500) {
    return new ServerError('Server error occurred', error.statusCode);
  }
  
  return error;
}

export const restaurantService = {
  // Dedicated method for getting restaurant image with comprehensive fallback logic
  getRestaurantImage(restaurant: any): string {
    try {
      // Primary: Use cover_photo_url if available
      if (restaurant.cover_photo_url) {
        return restaurant.cover_photo_url;
      }
      
      // Secondary: Use first photo from photos array
      if (restaurant.photos && restaurant.photos.length > 0) {
        // Handle both string array and object array formats
        const firstPhoto = Array.isArray(restaurant.photos) 
          ? restaurant.photos[0] 
          : restaurant.photos[0]?.url;
        
        if (firstPhoto && typeof firstPhoto === 'string' && firstPhoto !== '') {
          return firstPhoto;
        }
      }
      
      // Tertiary: Use stock image as last resort
      return 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800';
    } catch (error) {
      console.error('Error getting restaurant image:', error);
      return 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800';
    }
  },

  // Helper function to transform database restaurant to RestaurantInfo
  transformRestaurantData(restaurant: any): RestaurantInfo {
    return {
      id: restaurant.id,
      name: restaurant.name,
      image: this.getRestaurantImage(restaurant),
      cuisine: restaurant.cuisine_types?.[0] || 'Restaurant',
      rating: restaurant.troodie_rating || restaurant.google_rating || 0,
      location: restaurant.address || `${restaurant.city}, ${restaurant.state}` || 'Location',
      priceRange: restaurant.price_range || '$$',
    };
  },

  async searchRestaurants(query: string, filters?: {
    city?: string
    cuisineTypes?: string[]
    priceRange?: string
  }): Promise<RestaurantInfo[]> {
    try {
      return await withRetry(async () => {
        let request = supabase
          .from('restaurants')
          .select('*')
          .or(`name.ilike.%${query}%,address.ilike.%${query}%`)
          .limit(20)

        if (filters?.city) {
          request = request.eq('city', filters.city)
        }

        if (filters?.cuisineTypes && filters.cuisineTypes.length > 0) {
          request = request.contains('cuisine_types', filters.cuisineTypes)
        }

        if (filters?.priceRange) {
          request = request.eq('price_range', filters.priceRange)
        }

        const { data, error } = await request

        if (error) {
          throw transformError(error)
        }
        
        // Transform the data to RestaurantInfo format
        return (data || []).map(restaurant => this.transformRestaurantData(restaurant))
      })
    } catch (error) {
      console.error('Error searching restaurants:', error)
      throw error
    }
  },

  async getRestaurantById(id: string): Promise<RestaurantInfo | null> {
    // Check cache first
    const cached = restaurantCache.get(id)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return this.transformRestaurantData(cached.data)
    }

    try {
      return await withRetry(async () => {
        const { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .eq('id', id)
          .single()

        if (error) {
          throw transformError(error)
        }

        // Cache the result
        if (data) {
          restaurantCache.set(id, { data, timestamp: Date.now() })
        }

        return data ? this.transformRestaurantData(data) : null
      })
    } catch (error) {
      console.error('Error fetching restaurant:', error)
      if (error instanceof NotFoundError) {
        return null
      }
      throw error
    }
  },

  async getRestaurantDetails(id: string): Promise<Restaurant | null> {
    // Check cache first
    const cached = restaurantCache.get(id)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data
    }

    try {
      return await withRetry(async () => {
        const { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .eq('id', id)
          .single()

        if (error) {
          throw transformError(error)
        }

        // Cache the result
        if (data) {
          restaurantCache.set(id, { data, timestamp: Date.now() })
        }

        return data
      })
    } catch (error) {
      console.error('Error fetching restaurant details:', error)
      if (error instanceof NotFoundError) {
        return null
      }
      throw error
    }
  },

  async getNearbyRestaurants(lat: number, lng: number, radiusInMeters: number = 5000) {
    try {
      return await withRetry(async () => {
        const { data, error } = await supabase
          .rpc('nearby_restaurants', {
            lat,
            lng,
            radius_meters: radiusInMeters
          })

        if (error) {
          throw transformError(error)
        }
        return data || []
      })
    } catch (error) {
      console.error('Error fetching nearby restaurants:', error)
      throw error
    }
  },

  async saveRestaurant(saveData: RestaurantSaveInsert): Promise<RestaurantSave | null> {
    const { data, error } = await supabase
      .from('restaurant_saves')
      .insert(saveData)
      .select()
      .single()
    
    if (error) {
      console.error('Error saving restaurant:', error)
      return null
    }
    return data
  },

  async updateSave(saveId: string, updates: Partial<RestaurantSaveInsert>): Promise<RestaurantSave | null> {
    const { data, error } = await supabase
      .from('restaurant_saves')
      .update(updates)
      .eq('id', saveId)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating save:', error)
      return null
    }
    return data
  },

  async deleteSave(saveId: string) {
    const { error } = await supabase
      .from('restaurant_saves')
      .delete()
      .eq('id', saveId)
    
    if (error) {
      console.error('Error deleting save:', error)
      throw error
    }
  },

  async getUserSaves(userId: string, privacy?: 'public' | 'friends' | 'private') {
    let request = supabase
      .from('restaurant_saves')
      .select(`
        *,
        restaurant:restaurants(*),
        boards:save_boards(board:boards(*))
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (privacy) {
      request = request.eq('privacy', privacy)
    }

    const { data, error } = await request

    if (error) {
      console.error('Error fetching user saves:', error)
      return []
    }
    return data
  },

  async getRestaurantSaves(restaurantId: string) {
    const { data, error } = await supabase
      .from('restaurant_saves')
      .select(`
        *,
        user:users(*)
      `)
      .eq('restaurant_id', restaurantId)
      .eq('privacy', 'public')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching restaurant saves:', error)
      return []
    }
    return data
  },

  async addSaveToBoard(saveId: string, boardId: string) {
    const { error } = await supabase
      .from('save_boards')
      .insert({
        save_id: saveId,
        board_id: boardId
      })
    
    if (error && error.code !== '23505') { // Ignore duplicate key errors
      console.error('Error adding save to board:', error)
      throw error
    }
  },

  async removeSaveFromBoard(saveId: string, boardId: string) {
    const { error } = await supabase
      .from('save_boards')
      .delete()
      .eq('save_id', saveId)
      .eq('board_id', boardId)
    
    if (error) {
      console.error('Error removing save from board:', error)
      throw error
    }
  },

  async likeRestaurantSave(saveId: string, userId: string) {
    const { error } = await supabase
      .from('save_interactions')
      .insert({
        save_id: saveId,
        user_id: userId,
        interaction_type: 'like'
      })
    
    if (error && error.code !== '23505') { // Ignore duplicate key errors
      console.error('Error liking save:', error)
      throw error
    }
  },

  async unlikeRestaurantSave(saveId: string, userId: string) {
    const { error } = await supabase
      .from('save_interactions')
      .delete()
      .eq('save_id', saveId)
      .eq('user_id', userId)
      .eq('interaction_type', 'like')
    
    if (error) {
      console.error('Error unliking save:', error)
      throw error
    }
  },

  async getTrendingRestaurants(city?: string) {
    try {
      return await withRetry(async () => {
        const { data, error } = await supabase
          .rpc('get_trending_restaurants', {
            p_city: city,
            p_limit: 10
          })
        
        if (error) {
          throw transformError(error)
        }
        return data || []
      })
    } catch (error) {
      console.error('Error fetching trending restaurants:', error)
      throw error
    }
  },

  async getPersonaRecommendations(userId: string) {
    const { data, error } = await supabase
      .rpc('get_persona_recommendations', {
        p_user_id: userId,
        p_limit: 20
      })
    
    if (error) {
      console.error('Error fetching recommendations:', error)
      return []
    }
    return data
  },

  async createRestaurant(restaurant: RestaurantInsert): Promise<Restaurant | null> {
    const { data, error } = await supabase
      .from('restaurants')
      .insert(restaurant)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating restaurant:', error)
      return null
    }
    return data
  },

  async getRestaurantsByLocation(lat: number, lng: number, limit: number = 20): Promise<Restaurant[]> {
    return this.getNearbyRestaurants(lat, lng, 5000)
  },

  async getFeaturedRestaurants(limit: number = 10): Promise<Restaurant[]> {
    try {
      return await withRetry(async () => {
        const { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .order('google_rating', { ascending: false, nullsFirst: false })
          .limit(limit)

        if (error) {
          throw transformError(error)
        }
        return data || []
      })
    } catch (error) {
      console.error('Error fetching featured restaurants:', error)
      throw error
    }
  },

  async getRestaurantsByCity(city: string, limit: number = 20): Promise<Restaurant[]> {
    try {
      return await withRetry(async () => {
        const { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .eq('city', city)
          .order('google_rating', { ascending: false, nullsFirst: false })
          .limit(limit)

        if (error) {
          throw transformError(error)
        }
        return data || []
      })
    } catch (error) {
      console.error('Error fetching restaurants by city:', error)
      throw error
    }
  },

  async getLocalGems(city: string = 'Charlotte', limit: number = 20): Promise<Restaurant[]> {
    try {
      return await withRetry(async () => {
        const { data, error } = await supabase
          .from('restaurants')
          .select('*')
          .eq('city', city)
          .or('troodie_reviews_count.is.null,troodie_reviews_count.lt.5')
          .order('google_rating', { ascending: false, nullsFirst: false })
          .limit(limit)

        if (error) {
          throw transformError(error)
        }
        return data || []
      })
    } catch (error) {
      console.error('Error fetching local gems:', error)
      throw error
    }
  },

  // Cache management
  clearCache() {
    restaurantCache.clear()
  },

  clearRestaurantFromCache(id: string) {
    restaurantCache.delete(id)
  }
}