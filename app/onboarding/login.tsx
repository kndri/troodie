import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length >= 6) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    } else if (cleaned.length >= 3) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    }
    return formatted;
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhone(formatted);
    const digitsOnly = formatted.replace(/\D/g, '');
    setIsValidPhone(digitsOnly.length === 10);
  };

  const handleLogin = async () => {
    if (!isValidPhone) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number');
      return;
    }

    // In a real app, you would verify credentials with your backend
    // For demo purposes, we'll just mark as logged in
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    router.replace('/(tabs)');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>Enter your phone number to continue</Text>
          
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={handlePhoneChange}
            placeholder="(628) 267-9041"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            maxLength={14}
            autoFocus
          />
        </View>

        <View style={styles.bottomContent}>
          <TouchableOpacity 
            style={[styles.loginButton, !isValidPhone && styles.loginButtonDisabled]} 
            onPress={handleLogin}
            disabled={!isValidPhone}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF7',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginBottom: 40,
  },
  input: {
    fontSize: 24,
    fontFamily: 'Inter_500Medium',
    color: '#333',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E5E5',
  },
  bottomContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  loginButton: {
    backgroundColor: '#5B4CCC',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#D3D3D3',
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
});