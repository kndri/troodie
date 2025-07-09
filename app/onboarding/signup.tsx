import React, { useState, useRef } from 'react';
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
import { useOnboarding } from '@/contexts/OnboardingContext';

export default function SignupScreen() {
  const router = useRouter();
  const { setPhoneNumber, setCurrentStep } = useOnboarding();
  const [phone, setPhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);
  const phoneInputRef = useRef<TextInput>(null);

  const formatPhoneNumber = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/\D/g, '');
    
    // Apply US phone format (XXX) XXX-XXXX
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
    
    // Check if we have a valid 10-digit phone number
    const digitsOnly = formatted.replace(/\D/g, '');
    setIsValidPhone(digitsOnly.length === 10);
  };

  const handleNext = () => {
    if (!isValidPhone) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number');
      return;
    }

    const digitsOnly = phone.replace(/\D/g, '');
    setPhoneNumber(digitsOnly);
    setCurrentStep('verify');
    router.push('/onboarding/verify');
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
          <Text style={styles.title}>What&apos;s your</Text>
          <Text style={styles.title}>phone number?</Text>
          
          <TextInput
            ref={phoneInputRef}
            style={styles.input}
            value={phone}
            onChangeText={handlePhoneChange}
            placeholder="(628) 267-9041"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            maxLength={14}
            autoFocus
          />

          <Text style={styles.disclaimer}>
            By tapping next you&apos;re creating an account and you agree to the Buyer Account terms and Supplier Terms and acknowledge Troodie&apos;s Privacy Policy
          </Text>
        </View>

        <View style={styles.bottomContent}>
          <TouchableOpacity 
            style={[styles.nextButton, !isValidPhone && styles.nextButtonDisabled]} 
            onPress={handleNext}
            disabled={!isValidPhone}
          >
            <Text style={styles.nextButtonText}>Next</Text>
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
    lineHeight: 40,
  },
  input: {
    fontSize: 24,
    fontFamily: 'Inter_500Medium',
    color: '#333',
    paddingVertical: 16,
    marginTop: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E5E5',
  },
  disclaimer: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginTop: 20,
    lineHeight: 18,
  },
  bottomContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  nextButton: {
    backgroundColor: '#5B4CCC',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#D3D3D3',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
});