import React, { useState, useRef, useEffect } from 'react';
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

export default function VerifyScreen() {
  const router = useRouter();
  const { state, setCurrentStep } = useOnboarding();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isValid, setIsValid] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Check if code is complete
    const fullCode = newCode.join('');
    setIsValid(fullCode.length === 6);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    
    // In a real app, you would verify this code with your backend
    // For demo purposes, let's accept any 6-digit code
    if (fullCode.length === 6) {
      setCurrentStep('quiz');
      router.push('/onboarding/quiz');
    } else {
      Alert.alert('Invalid Code', 'Please enter the 6-digit code sent to your phone');
    }
  };

  const handleResend = () => {
    Alert.alert('Code Resent', 'A new verification code has been sent to your phone');
    // In a real app, you would call your API to resend the code
  };

  const handleBack = () => {
    router.back();
  };

  const formatPhone = (phone: string) => {
    if (!phone) return '';
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
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
          <Text style={styles.title}>Enter the code sent</Text>
          <Text style={styles.title}>to {formatPhone(state.phoneNumber || '')}</Text>
          
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => inputRefs.current[index] = ref}
                style={styles.codeInput}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
            <Text style={styles.resendText}>Resend</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContent}>
          <TouchableOpacity 
            style={[styles.nextButton, !isValid && styles.nextButtonDisabled]} 
            onPress={handleVerify}
            disabled={!isValid}
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
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: '#333',
    lineHeight: 36,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 20,
  },
  codeInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
  },
  resendButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
  resendText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#5B4CCC',
    textDecorationLine: 'underline',
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