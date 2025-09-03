import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'
import config from './config'

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    // Add explicit storage key to ensure consistency
    storageKey: 'supabase.auth.token',
  },
})

// Type definitions for database tables
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          phone: string | null
          username: string | null
          name: string | null
          bio: string | null
          avatar_url: string | null
          persona: string | null
          is_verified: boolean
          is_restaurant: boolean
          is_creator: boolean
          profile_completion: number
          default_board_id: string | null
          default_avatar_url: string | null
          email: string | null
          location: string | null
          saves_count: number
          reviews_count: number
          followers_count: number
          following_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          phone?: string | null
          username?: string | null
          name?: string | null
          bio?: string | null
          avatar_url?: string | null
          persona?: string | null
          is_verified?: boolean
          is_restaurant?: boolean
          is_creator?: boolean
          profile_completion?: number
          default_board_id?: string | null
          default_avatar_url?: string | null
          email?: string | null
          location?: string | null
          saves_count?: number
          reviews_count?: number
          followers_count?: number
          following_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          phone?: string | null
          username?: string | null
          name?: string | null
          bio?: string | null
          avatar_url?: string | null
          persona?: string | null
          is_verified?: boolean
          is_restaurant?: boolean
          is_creator?: boolean
          profile_completion?: number
          default_board_id?: string | null
          default_avatar_url?: string | null
          email?: string | null
          location?: string | null
          saves_count?: number
          reviews_count?: number
          followers_count?: number
          following_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      restaurants: {
        Row: {
          id: string
          google_place_id: string | null
          name: string
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          location: unknown | null
          cuisine_types: string[] | null
          price_range: string | null
          phone: string | null
          website: string | null
          hours: unknown | null
          photos: string[] | null
          cover_photo_url: string | null
          google_rating: number | null
          google_reviews_count: number | null
          troodie_rating: number | null
          troodie_reviews_count: number
          features: string[] | null
          dietary_options: string[] | null
          is_verified: boolean
          is_claimed: boolean
          owner_id: string | null
          data_source: 'seed' | 'google' | 'user' | null
          submitted_by: string | null
          is_approved: boolean
          approved_at: string | null
          approved_by: string | null
          created_at: string
          updated_at: string
          last_google_sync: string | null
        }
        Insert: {
          id?: string
          google_place_id?: string | null
          name: string
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          location?: unknown | null
          cuisine_types?: string[] | null
          price_range?: string | null
          phone?: string | null
          website?: string | null
          hours?: unknown | null
          photos?: string[] | null
          cover_photo_url?: string | null
          google_rating?: number | null
          google_reviews_count?: number | null
          troodie_rating?: number | null
          troodie_reviews_count?: number
          features?: string[] | null
          dietary_options?: string[] | null
          is_verified?: boolean
          is_claimed?: boolean
          owner_id?: string | null
          data_source?: 'seed' | 'google' | 'user' | null
          submitted_by?: string | null
          is_approved?: boolean
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          updated_at?: string
          last_google_sync?: string | null
        }
        Update: {
          id?: string
          google_place_id?: string | null
          name?: string
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          location?: unknown | null
          cuisine_types?: string[] | null
          price_range?: string | null
          phone?: string | null
          website?: string | null
          hours?: unknown | null
          photos?: string[] | null
          cover_photo_url?: string | null
          google_rating?: number | null
          google_reviews_count?: number | null
          troodie_rating?: number | null
          troodie_reviews_count?: number
          features?: string[] | null
          dietary_options?: string[] | null
          is_verified?: boolean
          is_claimed?: boolean
          owner_id?: string | null
          data_source?: 'seed' | 'google' | 'user' | null
          submitted_by?: string | null
          is_approved?: boolean
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          updated_at?: string
          last_google_sync?: string | null
        }
      }
      restaurant_saves: {
        Row: {
          id: string
          user_id: string
          restaurant_id: string
          personal_rating: number | null
          visit_date: string | null
          photos: string[] | null
          notes: string | null
          tags: string[] | null
          would_recommend: boolean | null
          price_range: string | null
          visit_type: 'dine_in' | 'takeout' | 'delivery' | null
          privacy: 'public' | 'friends' | 'private'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          restaurant_id: string
          personal_rating?: number | null
          visit_date?: string | null
          photos?: string[] | null
          notes?: string | null
          tags?: string[] | null
          would_recommend?: boolean | null
          price_range?: string | null
          visit_type?: 'dine_in' | 'takeout' | 'delivery' | null
          privacy?: 'public' | 'friends' | 'private'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          restaurant_id?: string
          personal_rating?: number | null
          visit_date?: string | null
          photos?: string[] | null
          notes?: string | null
          tags?: string[] | null
          would_recommend?: boolean | null
          price_range?: string | null
          visit_type?: 'dine_in' | 'takeout' | 'delivery' | null
          privacy?: 'public' | 'friends' | 'private'
          created_at?: string
          updated_at?: string
        }
      }
      boards: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          cover_image_url: string | null
          type: 'free' | 'private' | 'paid'
          category: string | null
          location: string | null
          tags: string[] | null
          price: number | null
          currency: string
          billing_type: string | null
          allow_comments: boolean
          allow_saves: boolean
          member_count: number
          share_count: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          cover_image_url?: string | null
          type?: 'free' | 'private' | 'paid'
          category?: string | null
          location?: string | null
          tags?: string[] | null
          price?: number | null
          currency?: string
          billing_type?: string | null
          allow_comments?: boolean
          allow_saves?: boolean
          member_count?: number
          share_count?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          cover_image_url?: string | null
          type?: 'free' | 'private' | 'paid'
          category?: string | null
          location?: string | null
          tags?: string[] | null
          price?: number | null
          currency?: string
          billing_type?: string | null
          allow_comments?: boolean
          allow_saves?: boolean
          member_count?: number
          share_count?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string | null
          restaurant_id: string | null
          caption: string | null
          photos: string[] | null
          rating: number | null
          visit_date: string | null
          price_range: string | null
          visit_type: 'dine_in' | 'takeout' | 'delivery' | null
          tags: string[] | null
          privacy: 'public' | 'friends' | 'private'
          location_lat: number | null
          location_lng: number | null
          likes_count: number
          comments_count: number
          saves_count: number
          share_count: number
          is_trending: boolean
          content_type: 'original' | 'external'
          external_source: string | null
          external_url: string | null
          external_title: string | null
          external_description: string | null
          external_thumbnail: string | null
          external_author: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          restaurant_id?: string | null
          caption?: string | null
          photos?: string[] | null
          rating?: number | null
          visit_date?: string | null
          price_range?: string | null
          visit_type?: 'dine_in' | 'takeout' | 'delivery' | null
          tags?: string[] | null
          privacy?: 'public' | 'friends' | 'private'
          location_lat?: number | null
          location_lng?: number | null
          likes_count?: number
          comments_count?: number
          saves_count?: number
          share_count?: number
          is_trending?: boolean
          content_type?: 'original' | 'external'
          external_source?: string | null
          external_url?: string | null
          external_title?: string | null
          external_description?: string | null
          external_thumbnail?: string | null
          external_author?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          restaurant_id?: string | null
          caption?: string | null
          photos?: string[] | null
          rating?: number | null
          visit_date?: string | null
          price_range?: string | null
          visit_type?: 'dine_in' | 'takeout' | 'delivery' | null
          tags?: string[] | null
          privacy?: 'public' | 'friends' | 'private'
          location_lat?: number | null
          location_lng?: number | null
          likes_count?: number
          comments_count?: number
          saves_count?: number
          share_count?: number
          is_trending?: boolean
          content_type?: 'original' | 'external'
          external_source?: string | null
          external_url?: string | null
          external_title?: string | null
          external_description?: string | null
          external_thumbnail?: string | null
          external_author?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      external_content_sources: {
        Row: {
          id: string
          name: string
          domain: string | null
          icon_url: string | null
          is_supported: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          domain?: string | null
          icon_url?: string | null
          is_supported?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          domain?: string | null
          icon_url?: string | null
          is_supported?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      post_likes: {
        Row: {
          id: string
          post_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          created_at?: string
        }
      }
      post_comments: {
        Row: {
          id: string
          post_id: string
          user_id: string
          parent_comment_id: string | null
          content: string
          likes_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          parent_comment_id?: string | null
          content: string
          likes_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          parent_comment_id?: string | null
          content?: string
          likes_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      post_saves: {
        Row: {
          id: string
          post_id: string
          user_id: string
          board_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          board_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          board_id?: string | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'like' | 'comment' | 'follow' | 'achievement' | 'restaurant_recommendation' | 'board_invite' | 'post_mention' | 'milestone' | 'system'
          title: string
          message: string
          data: unknown | null
          related_id: string | null
          related_type: string | null
          is_read: boolean
          is_actioned: boolean
          created_at: string
          expires_at: string | null
          priority: number
        }
        Insert: {
          id?: string
          user_id: string
          type: 'like' | 'comment' | 'follow' | 'achievement' | 'restaurant_recommendation' | 'board_invite' | 'post_mention' | 'milestone' | 'system'
          title: string
          message: string
          data?: unknown | null
          related_id?: string | null
          related_type?: string | null
          is_read?: boolean
          is_actioned?: boolean
          created_at?: string
          expires_at?: string | null
          priority?: number
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'like' | 'comment' | 'follow' | 'achievement' | 'restaurant_recommendation' | 'board_invite' | 'post_mention' | 'milestone' | 'system'
          title?: string
          message?: string
          data?: unknown | null
          related_id?: string | null
          related_type?: string | null
          is_read?: boolean
          is_actioned?: boolean
          created_at?: string
          expires_at?: string | null
          priority?: number
        }
      }
      notification_preferences: {
        Row: {
          id: string
          user_id: string
          category: string
          push_enabled: boolean
          in_app_enabled: boolean
          email_enabled: boolean
          frequency: 'immediate' | 'daily' | 'weekly'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category: string
          push_enabled?: boolean
          in_app_enabled?: boolean
          email_enabled?: boolean
          frequency?: 'immediate' | 'daily' | 'weekly'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category?: string
          push_enabled?: boolean
          in_app_enabled?: boolean
          email_enabled?: boolean
          frequency?: 'immediate' | 'daily' | 'weekly'
          created_at?: string
          updated_at?: string
        }
      }
      push_tokens: {
        Row: {
          id: string
          user_id: string
          token: string
          platform: 'ios' | 'android' | 'web'
          device_id: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          token: string
          platform: 'ios' | 'android' | 'web'
          device_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          token?: string
          platform?: 'ios' | 'android' | 'web'
          device_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_relationships: {
        Row: {
          id: string
          follower_id: string | null
          following_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          follower_id?: string | null
          following_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          follower_id?: string | null
          following_id?: string | null
          created_at?: string
        }
      }
      share_analytics: {
        Row: {
          id: string
          user_id: string | null
          content_type: 'board' | 'post' | 'profile'
          content_id: string
          platform: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          content_type: 'board' | 'post' | 'profile'
          content_id: string
          platform?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          content_type?: 'board' | 'post' | 'profile'
          content_id?: string
          platform?: string | null
          created_at?: string
        }
      }
      communities: {
        Row: {
          id: string
          name: string
          description: string | null
          cover_image_url: string | null
          category: string | null
          location: string | null
          admin_id: string | null
          type: 'public' | 'private' | 'paid'
          price: number | null
          currency: string
          billing_cycle: string | null
          member_count: number
          activity_level: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          cover_image_url?: string | null
          category?: string | null
          location?: string | null
          admin_id?: string | null
          type?: 'public' | 'private' | 'paid'
          price?: number | null
          currency?: string
          billing_cycle?: string | null
          member_count?: number
          activity_level?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          cover_image_url?: string | null
          category?: string | null
          location?: string | null
          admin_id?: string | null
          type?: 'public' | 'private' | 'paid'
          price?: number | null
          currency?: string
          billing_cycle?: string | null
          member_count?: number
          activity_level?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      community_members: {
        Row: {
          id: string
          community_id: string
          user_id: string
          role: 'owner' | 'admin' | 'moderator' | 'member'
          status: 'pending' | 'active' | 'declined'
          joined_at: string
        }
        Insert: {
          id?: string
          community_id: string
          user_id: string
          role?: 'owner' | 'admin' | 'moderator' | 'member'
          status?: 'pending' | 'active' | 'declined'
          joined_at?: string
        }
        Update: {
          id?: string
          community_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'moderator' | 'member'
          status?: 'pending' | 'active' | 'declined'
          joined_at?: string
        }
      }
      community_posts: {
        Row: {
          id: string
          community_id: string
          user_id: string
          content: string
          images: string[] | null
          deleted_at: string | null
          deleted_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          community_id: string
          user_id: string
          content: string
          images?: string[] | null
          deleted_at?: string | null
          deleted_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          community_id?: string
          user_id?: string
          content?: string
          images?: string[] | null
          deleted_at?: string | null
          deleted_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      community_admin_logs: {
        Row: {
          id: string
          community_id: string
          admin_id: string
          action_type: 'remove_member' | 'delete_post' | 'delete_message' | 'update_role'
          target_id: string
          target_type: 'user' | 'post' | 'message'
          reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          community_id: string
          admin_id: string
          action_type: 'remove_member' | 'delete_post' | 'delete_message' | 'update_role'
          target_id: string
          target_type: 'user' | 'post' | 'message'
          reason?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          community_id?: string
          admin_id?: string
          action_type?: 'remove_member' | 'delete_post' | 'delete_message' | 'update_role'
          target_id?: string
          target_type?: 'user' | 'post' | 'message'
          reason?: string | null
          created_at?: string
        }
      }
      post_communities: {
        Row: {
          id: string
          post_id: string
          community_id: string
          added_by: string
          added_at: string
        }
        Insert: {
          id?: string
          post_id: string
          community_id: string
          added_by: string
          added_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          community_id?: string
          added_by?: string
          added_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          reporter_id: string
          target_type: 'post' | 'comment' | 'user' | 'board' | 'community'
          target_id: string
          reason: 'spam' | 'harassment' | 'hate_speech' | 'violence' | 'sexual_content' | 'false_information' | 'intellectual_property' | 'self_harm' | 'illegal_activity' | 'other'
          description: string | null
          status: 'pending' | 'reviewing' | 'resolved' | 'dismissed'
          reviewed_by: string | null
          reviewed_at: string | null
          resolution_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reporter_id: string
          target_type: 'post' | 'comment' | 'user' | 'board' | 'community'
          target_id: string
          reason: 'spam' | 'harassment' | 'hate_speech' | 'violence' | 'sexual_content' | 'false_information' | 'intellectual_property' | 'self_harm' | 'illegal_activity' | 'other'
          description?: string | null
          status?: 'pending' | 'reviewing' | 'resolved' | 'dismissed'
          reviewed_by?: string | null
          reviewed_at?: string | null
          resolution_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reporter_id?: string
          target_type?: 'post' | 'comment' | 'user' | 'board' | 'community'
          target_id?: string
          reason?: 'spam' | 'harassment' | 'hate_speech' | 'violence' | 'sexual_content' | 'false_information' | 'intellectual_property' | 'self_harm' | 'illegal_activity' | 'other'
          description?: string | null
          status?: 'pending' | 'reviewing' | 'resolved' | 'dismissed'
          reviewed_by?: string | null
          reviewed_at?: string | null
          resolution_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blocked_users: {
        Row: {
          blocker_id: string
          blocked_id: string
          reason: string | null
          created_at: string
        }
        Insert: {
          blocker_id: string
          blocked_id: string
          reason?: string | null
          created_at?: string
        }
        Update: {
          blocker_id?: string
          blocked_id?: string
          reason?: string | null
          created_at?: string
        }
      }
      restaurant_images: {
        Row: {
          id: string
          restaurant_id: string
          user_id: string | null
          post_id: string | null
          image_url: string
          caption: string | null
          uploaded_at: string
          is_cover_photo: boolean
          is_approved: boolean
          approved_by: string | null
          approved_at: string | null
          source: 'user_post' | 'user_upload' | 'restaurant_upload' | 'external'
          attribution_name: string | null
          attribution_url: string | null
          privacy: 'public' | 'friends' | 'private'
          view_count: number
          like_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          user_id?: string | null
          post_id?: string | null
          image_url: string
          caption?: string | null
          uploaded_at?: string
          is_cover_photo?: boolean
          is_approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
          source?: 'user_post' | 'user_upload' | 'restaurant_upload' | 'external'
          attribution_name?: string | null
          attribution_url?: string | null
          privacy?: 'public' | 'friends' | 'private'
          view_count?: number
          like_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          user_id?: string | null
          post_id?: string | null
          image_url?: string
          caption?: string | null
          uploaded_at?: string
          is_cover_photo?: boolean
          is_approved?: boolean
          approved_by?: string | null
          approved_at?: string | null
          source?: 'user_post' | 'user_upload' | 'restaurant_upload' | 'external'
          attribution_name?: string | null
          attribution_url?: string | null
          privacy?: 'public' | 'friends' | 'private'
          view_count?: number
          like_count?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      search_users: {
        Args: {
          search_query: string
          limit_count?: number
          offset_count?: number
        }
        Returns: {
          id: string
          username: string | null
          name: string | null
          bio: string | null
          avatar_url: string | null
          is_verified: boolean
          followers_count: number
          saves_count: number
          location: string | null
        }[]
      }
      get_featured_communities: {
        Args: {
          p_limit?: number
        }
        Returns: {
          id: string
          name: string
          description: string | null
          location: string | null
          category: string | null
          cover_image_url: string | null
          member_count: number
          post_count: number
          tags: string[]
          cuisines: string[]
          is_featured: boolean
        }[]
      }
      get_trending_communities: {
        Args: {
          p_location?: string | null
          p_limit?: number
        }
        Returns: {
          id: string
          name: string
          description: string | null
          location: string | null
          category: string | null
          cover_image_url: string | null
          member_count: number
          post_count: number
          trending_score: number
          tags: string[]
          cuisines: string[]
        }[]
      }
      get_recommended_communities: {
        Args: {
          p_user_id: string
          p_limit?: number
        }
        Returns: {
          id: string
          name: string
          description: string | null
          location: string | null
          category: string | null
          cover_image_url: string | null
          member_count: number
          post_count: number
          relevance_score: number
          tags: string[]
          cuisines: string[]
          recommendation_reason: string
        }[]
      }
      get_community_feed: {
        Args: {
          p_community_id: string
          p_limit?: number
          p_offset?: number
        }
        Returns: {
          post_id: string
          user_id: string
          restaurant_id: string
          caption: string | null
          photos: string[] | null
          rating: number | null
          visit_date: string | null
          likes_count: number
          comments_count: number
          saves_count: number
          created_at: string
          is_cross_posted: boolean
          cross_posted_at: string | null
          username: string | null
          user_avatar: string | null
          restaurant_name: string
        }[]
      }
      cross_post_to_communities: {
        Args: {
          p_post_id: string
          p_community_ids: string[]
          p_user_id: string
        }
        Returns: {
          community_id: string
          success: boolean
          error_message: string | null
        }[]
      }
    }
  }
}

// Type helpers for search results
export type SearchUserResult = Database['public']['Functions']['search_users']['Returns'][0] & {
  isFollowing?: boolean
  isCurrentUser?: boolean
  canFollow?: boolean
}

// Community discovery types
export type FeaturedCommunity = Database['public']['Functions']['get_featured_communities']['Returns'][0]
export type TrendingCommunity = Database['public']['Functions']['get_trending_communities']['Returns'][0]
export type RecommendedCommunity = Database['public']['Functions']['get_recommended_communities']['Returns'][0]