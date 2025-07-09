import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Animate logo appearance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to welcome after delay
    const timer = setTimeout(() => {
      router.replace('/onboarding/welcome');
    }, 2500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.logoText}>Troodie</Text>
        <View style={styles.logoEmoji}>
          <Text style={styles.emojiText}>🍕</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    fontFamily: 'Poppins_700Bold',
    color: '#333',
  },
  logoEmoji: {
    backgroundColor: '#FFAD27',
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  emojiText: {
    fontSize: 36,
  },
});