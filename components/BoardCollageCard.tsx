import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Heart, Lock, Globe, MapPin } from 'lucide-react-native';
import { designTokens } from '@/constants/designTokens';
import { Board } from '@/types/board';
import { restaurantService } from '@/services/restaurantService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2; // 2 columns with padding
const CARD_HEIGHT = CARD_WIDTH;

interface BoardCollageCardProps {
  board: Board;
  onPress?: () => void;
  style?: any;
}

export const BoardCollageCard: React.FC<BoardCollageCardProps> = ({ 
  board, 
  onPress,
  style 
}) => {
  // Get restaurant images for the collage
  const getRestaurantImages = () => {
    const images: string[] = [];
    
    if (board.restaurants && board.restaurants.length > 0) {
      board.restaurants.slice(0, 4).forEach(item => {
        if (item.restaurant) {
          // Try main_image first, then use restaurantService fallback
          const image = item.restaurant.main_image || 
                       item.restaurant.cover_photo_url ||
                       restaurantService.getRestaurantImage(item.restaurant);
          images.push(image);
        }
      });
    }
    
    // Fill with placeholders if needed
    while (images.length < 4) {
      images.push('');
    }
    
    return images;
  };

  const images = getRestaurantImages();
  const isPrivate = board.is_private || board.type === 'private';
  const placesCount = board.restaurant_count || board.restaurants?.length || 0;

  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={onPress} 
      activeOpacity={0.9}
    >
      {/* 2x2 Image Grid */}
      <View style={styles.imageGrid}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            {image ? (
              <Image 
                source={{ uri: image }} 
                style={styles.gridImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderEmoji}>
                  {index === 0 ? '🍽️' : index === 1 ? '🍕' : index === 2 ? '🍜' : '🥗'}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Board Info Overlay */}
      <View style={styles.overlay}>
        <View style={styles.topInfo}>
          {isPrivate && (
            <View style={styles.badge}>
              <Lock size={10} color={designTokens.colors.textDark} />
            </View>
          )}
        </View>

        <View style={styles.bottomInfo}>
          <Text style={styles.boardName} numberOfLines={2}>
            {board.name || board.title}
          </Text>
          <Text style={styles.placesCount}>
            {placesCount} {placesCount === 1 ? 'place' : 'places'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: designTokens.colors.white,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    width: '50%',
    height: '50%',
    padding: 0.5,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    backgroundColor: designTokens.colors.backgroundGray,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: designTokens.colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 24,
    opacity: 0.5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 12,
    pointerEvents: 'none',
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 6,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    padding: 8,
    backdropFilter: 'blur(10px)',
  },
  boardName: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: designTokens.colors.textDark,
    marginBottom: 2,
  },
  placesCount: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: designTokens.colors.textMedium,
  },
});