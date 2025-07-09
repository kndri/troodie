import { useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();

  const checkOnboardingStatus = useCallback(async () => {
    try {
      const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
      
      if (hasCompletedOnboarding === 'true') {
        // User has completed onboarding, go to main app
        router.replace('/(tabs)');
      } else {
        // User needs to complete onboarding
        router.replace('/onboarding/splash');
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // Default to onboarding if there's an error
      router.replace('/onboarding/splash');
    }
  }, [router]);

  useEffect(() => {
    checkOnboardingStatus();
  }, [checkOnboardingStatus]);

  // Return null as this is just a routing component
  return null;
}