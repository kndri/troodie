/**
 * BOARD DETAIL SCREEN - V1.0 Design
 * Shows restaurants saved to a specific board with improved visual design
 */

import { RestaurantCardWithSave } from '@/components/cards/RestaurantCardWithSave';
import { DS } from '@/components/design-system/tokens';
import { useAuth } from '@/contexts/AuthContext';
import { boardService } from '@/services/boardService';
import { restaurantService } from '@/services/restaurantService';
import ShareService from '@/services/shareService';
import { ToastService } from '@/services/toastService';
import { BoardRestaurant, BoardWithRestaurants } from '@/types/board';
import { RestaurantInfo } from '@/types/core';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Bookmark,
  Edit2,
  Globe,
  Lock,
  MoreVertical,
  Plus,
  Share2,
  Trash2,
  Users
} from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function BoardDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const boardId = params.id as string;

  const [board, setBoard] = useState<BoardWithRestaurants | null>(null);
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const loadBoardDetails = useCallback(async () => {
    try {
      setLoading(true);
      
      const boardData = await boardService.getBoardWithRestaurants(boardId);
      if (!boardData) {
        ToastService.showError('Board not found');
        router.back();
        return;
      }
      
      setBoard(boardData);
      setIsOwner(boardData.user_id === user?.id);

      if (boardData.restaurants && boardData.restaurants.length > 0) {
        const restaurantPromises = boardData.restaurants.map(async (br: BoardRestaurant) => {
          const restaurant = await restaurantService.getRestaurantById(br.restaurant_id);
          return restaurant;
        });
        
        const restaurantData = await Promise.all(restaurantPromises);
        setRestaurants(restaurantData.filter(r => r !== null) as RestaurantInfo[]);
      } else {
        setRestaurants([]);
      }
    } catch (error) {
      console.error('Error loading board details:', error);
      ToastService.showError('Failed to load board details');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [boardId, user?.id, router]);

  useEffect(() => {
    loadBoardDetails();
  }, [loadBoardDetails]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadBoardDetails();
  };

  const handleAddRestaurants = () => {
    router.push({
      pathname: '/add/board-assignment',
      params: {
        boardId: board?.id,
        boardTitle: board?.name
      }
    });
  };

  const handleShareBoard = async () => {
    if (!board) return;

    try {
      const result = await ShareService.share({
        type: 'board',
        id: board.id,
        title: board.name,
        description: board.description || `Check out my curated collection of ${restaurants.length} restaurants`,
        count: restaurants.length
      });

      if (result.success) {
        ToastService.showSuccess('Board shared successfully');
      }
    } catch (error) {
      console.error('Error sharing board:', error);
      ToastService.showError('Failed to share board');
    }
  };

  const handleEditBoard = () => {
    if (!isOwner || !board) return;
    
    router.push({
      pathname: '/boards/edit',
      params: { id: board.id }
    });
  };

  const handleDeleteBoard = () => {
    if (!isOwner) return;

    Alert.alert(
      'Delete Board',
      'Are you sure you want to delete this board? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await boardService.deleteBoard(boardId);
              ToastService.showSuccess('Board deleted');
              router.replace('/(tabs)/saves');
            } catch (error) {
              ToastService.showError('Failed to delete board');
            }
          }
        }
      ]
    );
  };

  const handleRemoveRestaurant = async (restaurantId: string) => {
    if (!isOwner) return;

    try {
      await boardService.removeRestaurantFromBoard(boardId, restaurantId);
      setRestaurants(prev => prev.filter(r => r.id !== restaurantId));
      ToastService.showSuccess('Restaurant removed');
    } catch (error) {
      ToastService.showError('Failed to remove restaurant');
    }
  };

  const handleRestaurantPress = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={DS.colors.primaryOrange} />
        </View>
      </SafeAreaView>
    );
  }

  if (!board) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Board not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Get images for collage (up to 4) - following BoardCollageCard pattern
  const collageImages: string[] = [];
  restaurants.slice(0, 4).forEach(restaurant => {
    // Use same logic as other screens: main_image first, then restaurantService fallback
    const image = restaurant.main_image || 
                  restaurant.cover_photo_url ||
                  restaurant.image ||
                  restaurantService.getRestaurantImage(restaurant);
    collageImages.push(image);
  });

  // Fill with placeholders if less than 4
  while (collageImages.length < 4) {
    collageImages.push('');
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backIcon}>
          <ArrowLeft size={24} color={DS.colors.textDark} />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          {isOwner && (
            <TouchableOpacity onPress={handleEditBoard}>
              <Edit2 size={20} color={DS.colors.textDark} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleShareBoard}>
            <Share2 size={20} color={DS.colors.textDark} />
          </TouchableOpacity>
          {isOwner && (
            <TouchableOpacity onPress={() => setShowMoreMenu(!showMoreMenu)}>
              <MoreVertical size={20} color={DS.colors.textDark} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* More Menu Dropdown */}
      {showMoreMenu && (
        <View style={styles.moreMenu}>
          <TouchableOpacity style={styles.moreMenuItem} onPress={handleDeleteBoard}>
            <Trash2 size={18} color={DS.colors.error} />
            <Text style={styles.moreMenuTextDanger}>Delete Board</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Board Collage Header with Name Overlay */}
        <View style={styles.collageContainer}>
          <View style={styles.imageGrid}>
            {collageImages.map((image, index) => (
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
          
          {/* Board Name Overlay */}
          <View style={styles.boardNameOverlay}>
            <Text style={styles.boardNameOverlayText} numberOfLines={2}>
              {board.name}
            </Text>
            <Text style={styles.boardCountOverlay}>
              {restaurants.length} {restaurants.length === 1 ? 'Place' : 'Places'}
            </Text>
          </View>
        </View>

        {/* Board Info */}
        <View style={styles.boardInfo}>
          {board.description && (
            <Text style={styles.boardDescription}>{board.description}</Text>
          )}
          
          <View style={styles.boardMeta}>
            <View style={styles.metaItem}>
              {board.is_public ? (
                <Globe size={14} color={DS.colors.textGray} />
              ) : (
                <Lock size={14} color={DS.colors.textGray} />
              )}
              <Text style={styles.metaText}>
                {board.is_public ? 'Public' : 'Private'}
              </Text>
            </View>
            
            <View style={styles.metaDot} />
            
            <View style={styles.metaItem}>
              <Text style={styles.metaText}>
                {restaurants.length} {restaurants.length === 1 ? 'Place' : 'Places'}
              </Text>
            </View>
            
            {board.created_by && (
              <>
                <View style={styles.metaDot} />
                <View style={styles.metaItem}>
                  <Users size={14} color={DS.colors.textGray} />
                  <Text style={styles.metaText}>
                    {board.created_by.username || 'Unknown'}
                  </Text>
                </View>
              </>
            )}
          </View>

          {/* Primary Action Button */}
          {isOwner && (
            <TouchableOpacity style={styles.primaryButton} onPress={handleAddRestaurants}>
              <Plus size={18} color={DS.colors.textWhite} />
              <Text style={styles.primaryButtonText}>Add Places</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Restaurant List */}
        <View style={styles.restaurantSection}>
          {restaurants.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Bookmark size={48} color={DS.colors.textGray} />
              </View>
              <Text style={styles.emptyTitle}>No places yet</Text>
              <Text style={styles.emptyText}>
                {isOwner 
                  ? "Start adding your favorite spots to this board"
                  : "This board doesn't have any places yet"}
              </Text>
              {isOwner && (
                <TouchableOpacity 
                  style={styles.emptyButton}
                  onPress={() => router.push('/(tabs)/explore')}
                >
                  <Text style={styles.emptyButtonText}>Explore Restaurants</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Places in this board</Text>
                <Text style={styles.sectionCount}>{restaurants.length}</Text>
              </View>
              
              {restaurants.map((restaurant) => (
                <TouchableOpacity
                  key={restaurant.id}
                  style={styles.restaurantCard}
                  onPress={() => handleRestaurantPress(restaurant.id)}
                  activeOpacity={0.95}
                >
                  <Image 
                    source={{ uri: restaurant.main_image || restaurant.image || restaurantService.getRestaurantImage(restaurant) }}
                    style={styles.restaurantImage}
                  />
                  
                  <View style={styles.restaurantContent}>
                    <View style={styles.restaurantInfo}>
                      <Text style={styles.restaurantName}>{restaurant.name}</Text>
                      <View style={styles.restaurantMeta}>
                        <Text style={styles.restaurantCategory}>
                          {restaurant.cuisine_type || 'Restaurant'}
                        </Text>
                        <Text style={styles.metaDot}>•</Text>
                        <Text style={styles.restaurantPrice}>
                          {restaurant.price_level || '$$'}
                        </Text>
                      </View>
                      {restaurant.rating && (
                        <View style={styles.restaurantRating}>
                          <Text style={styles.ratingEmoji}>⭐</Text>
                          <Text style={styles.ratingText}>{restaurant.rating}</Text>
                        </View>
                      )}
                      {restaurant.address && (
                        <Text style={styles.restaurantAddress} numberOfLines={1}>
                          📍 {restaurant.address}
                        </Text>
                      )}
                    </View>
                    
                    {isOwner && (
                      <TouchableOpacity 
                        style={styles.removeButton}
                        onPress={(e) => {
                          e.stopPropagation();
                          handleRemoveRestaurant(restaurant.id);
                        }}
                      >
                        <Trash2 size={16} color={DS.colors.error} />
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DS.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: DS.spacing.lg,
  },
  errorText: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.lg,
  },
  backButton: {
    paddingHorizontal: DS.spacing.xl,
    paddingVertical: DS.spacing.md,
    backgroundColor: DS.colors.primaryOrange,
    borderRadius: DS.borderRadius.md,
  },
  backButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.md,
    backgroundColor: DS.colors.surface,
  },
  backIcon: {
    padding: DS.spacing.xs,
  },
  headerActions: {
    flexDirection: 'row',
    gap: DS.spacing.lg,
  },
  
  // More Menu
  moreMenu: {
    position: 'absolute',
    top: 60,
    right: DS.spacing.lg,
    backgroundColor: DS.colors.surface,
    borderRadius: DS.borderRadius.md,
    ...DS.shadows.md,
    zIndex: 1000,
  },
  moreMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.sm,
    padding: DS.spacing.md,
  },
  moreMenuTextDanger: {
    ...DS.typography.body,
    color: DS.colors.error,
  },
  
  // Collage Header
  collageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    backgroundColor: DS.colors.surface,
    position: 'relative',
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    width: '50%',
    height: '50%',
    padding: 1,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: DS.colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 40,
  },
  boardNameOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: DS.spacing.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  boardNameOverlayText: {
    ...DS.typography.h1,
    color: DS.colors.textWhite,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: DS.spacing.xs,
  },
  boardCountOverlay: {
    ...DS.typography.body,
    color: DS.colors.textWhite,
    opacity: 0.9,
  },
  
  // Board Info
  boardInfo: {
    padding: DS.spacing.lg,
    backgroundColor: DS.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  boardDescription: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    marginBottom: DS.spacing.md,
    lineHeight: 22,
  },
  boardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DS.spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.xs,
  },
  metaText: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: DS.colors.textGray,
    marginHorizontal: DS.spacing.sm,
  },
  
  // Primary Button
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: DS.spacing.sm,
    paddingVertical: DS.spacing.md,
    borderRadius: DS.borderRadius.md,
    backgroundColor: DS.colors.primaryOrange,
  },
  primaryButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
  
  // Restaurant Section
  restaurantSection: {
    padding: DS.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DS.spacing.lg,
  },
  sectionTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
  },
  sectionCount: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
  },
  
  // Restaurant Card
  restaurantCard: {
    backgroundColor: DS.colors.surface,
    borderRadius: DS.borderRadius.lg,
    marginBottom: DS.spacing.md,
    overflow: 'hidden',
    ...DS.shadows.sm,
  },
  restaurantImage: {
    width: '100%',
    height: 180,
  },
  restaurantContent: {
    padding: DS.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.xs,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DS.spacing.xs,
  },
  restaurantCategory: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
  },
  restaurantPrice: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
  },
  restaurantRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.xs,
    marginBottom: DS.spacing.xs,
  },
  ratingEmoji: {
    fontSize: 14,
  },
  ratingText: {
    ...DS.typography.metadata,
    color: DS.colors.textDark,
    fontWeight: '600',
  },
  restaurantAddress: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: DS.colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: DS.spacing.huge,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: DS.colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DS.spacing.lg,
  },
  emptyTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.sm,
  },
  emptyText: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    textAlign: 'center',
    marginBottom: DS.spacing.xl,
    paddingHorizontal: DS.spacing.xl,
  },
  emptyButton: {
    paddingHorizontal: DS.spacing.xl,
    paddingVertical: DS.spacing.md,
    backgroundColor: DS.colors.primaryOrange,
    borderRadius: DS.borderRadius.md,
  },
  emptyButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
});