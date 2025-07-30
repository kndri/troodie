import React, { useState } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  View,
  Text,
} from 'react-native';
import { Share2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { ShareService, ShareContent } from '@/services/shareService';
import { theme } from '@/constants/theme';

interface ShareButtonProps {
  content: ShareContent;
  style?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
  showLabel?: boolean;
  variant?: 'icon' | 'button';
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  content,
  style,
  iconSize = 24,
  iconColor = theme.colors.text,
  showLabel = false,
  variant = 'icon',
}) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (isSharing) return;
    
    setIsSharing(true);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const success = await ShareService.share(content);
      
      if (success) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.error('Share error:', error);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsSharing(false);
    }
  };

  if (variant === 'button') {
    return (
      <TouchableOpacity
        onPress={handleShare}
        disabled={isSharing}
        style={[styles.button, style]}
        activeOpacity={0.8}
        accessibilityLabel={`Share ${content.type}`}
        accessibilityRole="button"
        accessibilityState={{ disabled: isSharing }}
      >
        {isSharing ? (
          <ActivityIndicator size="small" color={theme.colors.text} />
        ) : (
          <>
            <Share2 size={10} color={theme.colors.text} />
            <Text style={styles.buttonText}>Share</Text>
          </>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={handleShare}
      disabled={isSharing}
      style={[styles.iconButton, style]}
      activeOpacity={0.7}
      accessibilityLabel={`Share ${content.type}`}
      accessibilityRole="button"
      accessibilityState={{ disabled: isSharing }}
    >
      {isSharing ? (
        <ActivityIndicator size="small" color={iconColor} />
      ) : (
        <View style={styles.iconContainer}>
          <Share2 size={iconSize} color={iconColor} />
          {showLabel && (
            <Text style={[styles.label, { color: iconColor }]}>Share</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
    backgroundColor: '#f0f0f0',
  },
  buttonText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: theme.colors.text,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
});