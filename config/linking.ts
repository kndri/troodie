import * as Linking from 'expo-linking';

export const linking = {
  prefixes: [
    Linking.createURL('/'),
    'troodie://',
    'https://troodie.app',
    'https://www.troodie.app',
  ],
  config: {
    screens: {
      // Board routes
      'boards/[id]': {
        path: 'boards/:id',
        parse: {
          id: (id: string) => id,
        },
      },
      // Post routes
      'posts/[id]': {
        path: 'posts/:id',
        parse: {
          id: (id: string) => id,
        },
      },
      // Profile routes - using username instead of ID for cleaner URLs
      'profile/[username]': {
        path: 'u/:username',
        parse: {
          username: (username: string) => username,
        },
      },
      // Restaurant routes
      'restaurant/[id]': {
        path: 'restaurants/:id',
        parse: {
          id: (id: string) => id,
        },
      },
      // Community routes
      'community/[id]': {
        path: 'communities/:id',
        parse: {
          id: (id: string) => id,
        },
      },
      // Home/Feed
      '(tabs)': {
        path: '',
      },
      // Auth routes
      'auth/login': 'login',
      'auth/signup': 'signup',
      // Onboarding
      'onboarding': 'onboarding',
    },
  },
  async getInitialURL() {
    // First, check if app was opened from a deep link
    const url = await Linking.getInitialURL();
    
    if (url != null) {
      return url;
    }
    
    // Check if there's a deferred deep link (for app installs)
    // This would integrate with a service like Branch.io in production
    return null;
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);
    
    // Listen to incoming links from deep linking
    const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);
    
    return () => {
      // Clean up the event listener
      eventListenerSubscription.remove();
    };
  },
};

// Helper function to create share URLs
export function createShareURL(type: 'board' | 'post' | 'profile' | 'restaurant', id: string, username?: string): string {
  const baseUrl = 'https://troodie.app';
  
  switch (type) {
    case 'board':
      return `${baseUrl}/boards/${id}`;
    case 'post':
      return `${baseUrl}/posts/${id}`;
    case 'profile':
      return username ? `${baseUrl}/u/${username}` : `${baseUrl}/profile/${id}`;
    case 'restaurant':
      return `${baseUrl}/restaurants/${id}`;
    default:
      return baseUrl;
  }
}

// Helper to handle incoming deep links
export async function handleDeepLink(url: string) {
  // Parse the URL and navigate accordingly
  console.log('Handling deep link:', url);
  
  // This would integrate with your navigation system
  // For expo-router, navigation is handled automatically
}