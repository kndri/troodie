import { supabase } from '@/lib/supabase';

interface SearchHistory {
  id: string;
  user_id: string;
  query: string;
  created_at: string;
}

interface TrendingSearch {
  id: string;
  title: string;
  type: 'restaurant' | 'cuisine' | 'vibe' | 'location';
  save_count: number;
  search_count: number;
}

class SearchService {
  /**
   * Get recent searches for a user
   */
  async getRecentSearches(userId?: string): Promise<string[]> {
    if (!userId) return [];
    
    try {
      const { data, error } = await supabase
        .from('search_history')
        .select('query')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching recent searches:', error);
        return [];
      }

      // Return unique searches
      const uniqueSearches = [...new Set(data?.map(s => s.query) || [])];
      return uniqueSearches.slice(0, 5);
    } catch (error) {
      console.error('Error in getRecentSearches:', error);
      return [];
    }
  }

  /**
   * Add a search to user's history
   */
  async addRecentSearch(userId: string, query: string): Promise<void> {
    if (!userId || !query.trim()) return;

    try {
      await supabase
        .from('search_history')
        .insert({
          user_id: userId,
          query: query.trim(),
        });
    } catch (error) {
      console.error('Error adding recent search:', error);
    }
  }

  /**
   * Clear all recent searches for a user
   */
  async clearRecentSearches(userId: string): Promise<void> {
    if (!userId) return;

    try {
      await supabase
        .from('search_history')
        .delete()
        .eq('user_id', userId);
    } catch (error) {
      console.error('Error clearing recent searches:', error);
    }
  }

  /**
   * Get trending searches in the area
   */
  async getTrendingSearches(city?: string): Promise<TrendingSearch[]> {
    try {
      // For now, we'll get the most saved restaurants as trending
      const { data: trendingRestaurants, error } = await supabase
        .from('restaurants')
        .select('id, name, save_count')
        .order('save_count', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching trending:', error);
        return this.getFallbackTrending();
      }

      return (trendingRestaurants || []).map(r => ({
        id: r.id,
        title: r.name,
        type: 'restaurant' as const,
        save_count: r.save_count || 0,
        search_count: 0,
      }));
    } catch (error) {
      console.error('Error in getTrendingSearches:', error);
      return this.getFallbackTrending();
    }
  }

  /**
   * Get AI-powered search suggestions based on context
   */
  async getSearchSuggestions(context: {
    time?: string;
    location?: string;
    weather?: string;
    previousSearches?: string[];
  }): Promise<string[]> {
    // This would integrate with AI service for smart suggestions
    const hour = new Date().getHours();
    const suggestions: string[] = [];

    // Time-based suggestions
    if (hour < 11) {
      suggestions.push('breakfast', 'coffee', 'brunch');
    } else if (hour < 15) {
      suggestions.push('lunch', 'quick bites', 'sandwich');
    } else if (hour < 18) {
      suggestions.push('happy hour', 'afternoon tea', 'snacks');
    } else {
      suggestions.push('dinner', 'date night', 'cocktails');
    }

    // Add trending cuisines
    suggestions.push('italian', 'sushi', 'mexican', 'thai');

    return suggestions;
  }

  /**
   * Fallback trending data when API fails
   */
  private getFallbackTrending(): TrendingSearch[] {
    return [
      {
        id: '1',
        title: 'Rooftop dining',
        type: 'vibe',
        save_count: 124,
        search_count: 523,
      },
      {
        id: '2',
        title: 'Italian',
        type: 'cuisine',
        save_count: 98,
        search_count: 412,
      },
      {
        id: '3',
        title: 'Date night spots',
        type: 'vibe',
        save_count: 86,
        search_count: 367,
      },
    ];
  }

  /**
   * Track search analytics
   */
  async trackSearch(query: string, resultsCount: number, userId?: string): Promise<void> {
    try {
      await supabase
        .from('search_analytics')
        .insert({
          query,
          results_count: resultsCount,
          user_id: userId,
          timestamp: new Date().toISOString(),
        });
    } catch (error) {
      console.error('Error tracking search:', error);
    }
  }
}

export const searchService = new SearchService();