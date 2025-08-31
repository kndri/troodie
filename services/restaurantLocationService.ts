/**
 * Restaurant Location Service
 * Handles geocoding and coordinate management for restaurants
 */

import { supabase } from '@/lib/supabase';
import { geocodeAddress, Coordinates, isValidCoordinate } from '@/utils/geocoding';

export const restaurantLocationService = {
  /**
   * Update restaurant coordinates in the database
   * @param restaurantId Restaurant ID
   * @param coordinates Coordinates to update
   */
  async updateRestaurantCoordinates(restaurantId: string, coordinates: Coordinates): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('restaurants')
        .update({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          updated_at: new Date().toISOString()
        })
        .eq('id', restaurantId);

      if (error) {
        console.error('Error updating restaurant coordinates:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating restaurant coordinates:', error);
      return false;
    }
  },

  /**
   * Geocode and update restaurant location
   * @param restaurantId Restaurant ID
   * @param address Address to geocode
   */
  async geocodeAndUpdateRestaurant(restaurantId: string, address: string): Promise<Coordinates | null> {
    try {
      const coordinates = await geocodeAddress(address);
      
      if (coordinates && isValidCoordinate(coordinates)) {
        // Update in database
        await this.updateRestaurantCoordinates(restaurantId, coordinates);
        return coordinates;
      }
      
      return null;
    } catch (error) {
      console.error('Error geocoding restaurant:', error);
      return null;
    }
  },

  /**
   * Batch geocode restaurants without coordinates
   * @param limit Maximum number of restaurants to process
   */
  async batchGeocodeRestaurants(limit: number = 50): Promise<number> {
    try {
      // Fetch restaurants without coordinates
      const { data: restaurants, error } = await supabase
        .from('restaurants')
        .select('id, address')
        .or('latitude.is.null,longitude.is.null')
        .not('address', 'is', null)
        .limit(limit);

      if (error || !restaurants) {
        console.error('Error fetching restaurants for geocoding:', error);
        return 0;
      }

      let successCount = 0;

      // Process each restaurant
      for (const restaurant of restaurants) {
        if (restaurant.address) {
          const result = await this.geocodeAndUpdateRestaurant(
            restaurant.id, 
            restaurant.address
          );
          
          if (result) {
            successCount++;
            // Add delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        }
      }

      console.log(`Geocoded ${successCount} out of ${restaurants.length} restaurants`);
      return successCount;
    } catch (error) {
      console.error('Error batch geocoding restaurants:', error);
      return 0;
    }
  },

  /**
   * Get restaurants within radius of a coordinate
   * @param center Center coordinate
   * @param radiusMiles Radius in miles
   */
  async getRestaurantsNearby(center: Coordinates, radiusMiles: number = 5): Promise<any[]> {
    try {
      // Calculate bounding box
      const latDelta = radiusMiles / 69; // Approximate miles per degree latitude
      const lonDelta = radiusMiles / (69 * Math.cos(center.latitude * Math.PI / 180));

      const { data: restaurants, error } = await supabase
        .from('restaurants')
        .select('*')
        .gte('latitude', center.latitude - latDelta)
        .lte('latitude', center.latitude + latDelta)
        .gte('longitude', center.longitude - lonDelta)
        .lte('longitude', center.longitude + lonDelta);

      if (error) {
        console.error('Error fetching nearby restaurants:', error);
        return [];
      }

      return restaurants || [];
    } catch (error) {
      console.error('Error fetching nearby restaurants:', error);
      return [];
    }
  },

  /**
   * Cache coordinates locally to reduce API calls
   */
  coordinatesCache: new Map<string, Coordinates>(),

  /**
   * Get cached coordinates or fetch and cache
   * @param address Address to geocode
   */
  async getCachedCoordinates(address: string): Promise<Coordinates | null> {
    // Check cache first
    if (this.coordinatesCache.has(address)) {
      return this.coordinatesCache.get(address)!;
    }

    // Geocode and cache
    const coordinates = await geocodeAddress(address);
    if (coordinates) {
      this.coordinatesCache.set(address, coordinates);
    }

    return coordinates;
  },

  /**
   * Clear coordinates cache
   */
  clearCache() {
    this.coordinatesCache.clear();
  }
};