import * as Sharing from 'expo-sharing';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';
import { supabase } from '@/lib/supabase';

export interface ShareContent {
  type: 'board' | 'post' | 'profile' | 'restaurant';
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  username?: string;
}

export class ShareService {
  static async share(content: ShareContent): Promise<boolean> {
    try {
      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();
      
      if (!isAvailable) {
        // Fallback to clipboard or show error
        console.warn('Sharing is not available on this platform');
        return false;
      }

      // Generate deep link
      const deepLink = this.generateDeepLink(content);
      
      // Build share message
      const message = this.buildShareMessage(content, deepLink);
      
      // Track share initiation
      await this.trackShareEvent(content, 'initiated');
      
      // Share via system share sheet
      await Sharing.shareAsync(deepLink, {
        dialogTitle: `Share ${content.type}`,
        mimeType: 'text/plain',
        UTI: 'public.plain-text',
      });
      
      // Track successful share (this will trigger automatic increment via database trigger)
      await this.trackShareEvent(content, 'completed');
      
      return true;
    } catch (error) {
      console.error('Share error:', error);
      return false;
    }
  }
  
  static generateDeepLink(content: ShareContent): string {
    // For development, use Expo's linking
    // For production, you'd use your actual domain
    const baseUrl = __DEV__ 
      ? Linking.createURL('/') // Creates exp:// or http://localhost URLs
      : 'https://troodie.app';
    
    switch (content.type) {
      case 'board':
        return __DEV__ 
          ? Linking.createURL(`/boards/${content.id}`)
          : `${baseUrl}/boards/${content.id}`;
      case 'post':
        return __DEV__
          ? Linking.createURL(`/posts/${content.id}`)
          : `${baseUrl}/posts/${content.id}`;
      case 'profile':
        const profilePath = content.username 
          ? `/u/${content.username}` 
          : `/profile/${content.id}`;
        return __DEV__
          ? Linking.createURL(profilePath)
          : `${baseUrl}${profilePath}`;
      case 'restaurant':
        return __DEV__
          ? Linking.createURL(`/restaurants/${content.id}`)
          : `${baseUrl}/restaurants/${content.id}`;
      default:
        return baseUrl;
    }
  }
  
  static buildShareMessage(content: ShareContent, url: string): string {
    const messages: Record<string, string> = {
      board: `Check out this restaurant collection on Troodie: "${content.title}"\n\n${url}`,
      post: `${content.title} on Troodie\n\n${url}`,
      profile: `Follow ${content.title} on Troodie for great restaurant recommendations\n\n${url}`,
      restaurant: `Check out ${content.title} on Troodie\n\n${url}`
    };
    
    return messages[content.type];
  }
  
  static async shareText(text: string, dialogTitle?: string): Promise<boolean> {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      
      if (!isAvailable) {
        console.warn('Sharing is not available on this platform');
        return false;
      }
      
      // Create a temporary file with the text content for sharing
      // Note: expo-sharing requires a file URL, not plain text
      // For text sharing, we'd need to create a temporary file or use a different approach
      
      // For now, we'll use the Linking API to open the share dialog on web
      if (Platform.OS === 'web') {
        const shareUrl = `mailto:?subject=${encodeURIComponent(dialogTitle || 'Share from Troodie')}&body=${encodeURIComponent(text)}`;
        await Linking.openURL(shareUrl);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Share text error:', error);
      return false;
    }
  }
  
  private static async trackShareEvent(
    content: ShareContent, 
    action: 'initiated' | 'completed'
  ): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;
      
      await supabase.from('share_analytics').insert({
        user_id: user.id,
        content_type: content.type,
        content_id: content.id,
        action,
        platform: Platform.OS,
        created_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error tracking share event:', error);
    }
  }
  
  // Utility method to check if URL can be shared
  static async canShare(): Promise<boolean> {
    return await Sharing.isAvailableAsync();
  }
  
  // Method to open app store for sharing app link
  static async shareApp(): Promise<boolean> {
    const appStoreUrl = Platform.select({
      ios: 'https://apps.apple.com/app/troodie/id1234567890', // Replace with actual App Store ID
      android: 'https://play.google.com/store/apps/details?id=com.troodie.app', // Replace with actual package name
      default: 'https://troodie.app'
    });
    
    return this.shareText(
      `Discover amazing restaurants with Troodie!\n\n${appStoreUrl}`,
      'Share Troodie App'
    );
  }
}