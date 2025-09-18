/**
 * BOARD DETAIL SCREEN - Enhanced V1.0 Design
 * Modern board view with improved layout, stats, and interactions
 */

import { RestaurantCardWithSave } from '@/components/cards/RestaurantCardWithSave';
import { DS } from '@/components/design-system/tokens';
import { ProfileAvatar } from '@/components/ProfileAvatar';
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
  Users,
  MapPin,
  Star,
  TrendingUp,
  Grid3x3,
  List,
  Heart,
  Calendar
} from 'lucide-react-native';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
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
  View,
  FlatList,
  Modal
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - DS.spacing.lg * 2 - DS.spacing.md) / 2;

type ViewMode = 'grid' | 'list';

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
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Calculate board statistics
  const boardStats = useMemo(() => {
    if (!restaurants.length) return null;

    const ratings = restaurants
      .map(r => r.google_rating)
      .filter(r => r !== null && r !== undefined) as number[];

    const avgRating = ratings.length > 0
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : null;

    const cuisines = restaurants
      .map(r => r.cuisine_type)
      .filter(Boolean);
    const cuisineCount: Record<string, number> = {};
    cuisines.forEach(c => {
      if (c) cuisineCount[c] = (cuisineCount[c] || 0) + 1;
    });
    const topCuisines = Object.entries(cuisineCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([cuisine]) => cuisine);

    const cities = [...new Set(restaurants.map(r => r.city).filter(Boolean))];

    return {
      totalPlaces: restaurants.length,
      avgRating,
      topCuisines,
      cities
    };
  }, [restaurants]);

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
      pathname: '/(tabs)/explore',
      params: { boardId }
    });
  };

  const handleShare = async () => {
    if (!board) return;

    try {
      await ShareService.shareBoard(board);
    } catch (error) {
      console.error('Error sharing board:', error);
    }
  };

  const handleEditBoard = () => {
    router.push('/boards/manage');
  };

  const handleDeleteBoard = () => {
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
              const success = await boardService.deleteBoard(boardId);
              if (success) {
                ToastService.showSuccess('Board deleted');
                router.back();
              }
            } catch (error) {
              ToastService.showError('Failed to delete board');
            }
          }
        }
      ]
    );
  };

  const renderRestaurantGrid = ({ item }: { item: RestaurantInfo }) => (
    <TouchableOpacity
      style={styles.gridCard}
      onPress={() => router.push(`/restaurant/${item.id}`)}
    >
      {item.main_image || item.image ? (
        <Image
          source={{ uri: item.main_image || item.image }}
          style={styles.gridCardImage}
        />
      ) : (
        <View style={[styles.gridCardImage, styles.placeholderImage]}>
          <Text style={styles.placeholderEmoji}>🍽️</Text>
        </View>
      )}
      <View style={styles.gridCardContent}>
        <Text style={styles.gridCardName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.gridCardMeta} numberOfLines={1}>
          {item.cuisine_type} • {item.price_range || '$$'}
        </Text>
        {item.google_rating && (
          <View style={styles.ratingRow}>
            <Star size={12} color={DS.colors.primaryOrange} fill={DS.colors.primaryOrange} />
            <Text style={styles.ratingText}>{item.google_rating}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderRestaurantList = ({ item }: { item: RestaurantInfo }) => (
    <TouchableOpacity
      style={styles.listCard}
      onPress={() => router.push(`/restaurant/${item.id}`)}
    >
      {item.main_image || item.image ? (
        <Image
          source={{ uri: item.main_image || item.image }}
          style={styles.listCardImage}
        />
      ) : (
        <View style={[styles.listCardImage, styles.placeholderImage]}>
          <Text style={styles.placeholderEmoji}>🍽️</Text>
        </View>
      )}
      <View style={styles.listCardContent}>
        <Text style={styles.listCardName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.listCardMeta}>
          {item.cuisine_type} • {item.price_range || '$$'} • {item.city}
        </Text>
        {item.google_rating && (
          <View style={styles.ratingRow}>
            <Star size={12} color={DS.colors.primaryOrange} fill={DS.colors.primaryOrange} />
            <Text style={styles.ratingText}>{item.google_rating}</Text>
            {item.review_count && (
              <Text style={styles.reviewCount}>({item.review_count} reviews)</Text>
            )}
          </View>
        )}
        {item.address && (
          <View style={styles.addressRow}>
            <MapPin size={12} color={DS.colors.textGray} />
            <Text style={styles.addressText} numberOfLines={1}>{item.address}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <ArrowLeft size={24} color={DS.colors.textDark} />
        </TouchableOpacity>

        <View style={styles.headerTitle}>
          <Text style={styles.boardName} numberOfLines={1}>{board.name}</Text>
          <View style={styles.boardMeta}>
            {board.is_public ? (
              <Globe size={14} color={DS.colors.textGray} />
            ) : (
              <Lock size={14} color={DS.colors.textGray} />
            )}
            <Text style={styles.boardMetaText}>
              {board.is_public ? 'Public' : 'Private'} Board
            </Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleShare} style={styles.headerActionButton}>
            <Share2 size={20} color={DS.colors.textDark} />
          </TouchableOpacity>
          {isOwner && (
            <TouchableOpacity
              onPress={() => setShowMoreMenu(true)}
              style={styles.headerActionButton}
            >
              <MoreVertical size={20} color={DS.colors.textDark} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Board Stats */}
      {boardStats && (
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{boardStats.totalPlaces}</Text>
            <Text style={styles.statLabel}>Places</Text>
          </View>
          {boardStats.avgRating && (
            <View style={styles.statItem}>
              <View style={styles.statRow}>
                <Star size={14} color={DS.colors.primaryOrange} fill={DS.colors.primaryOrange} />
                <Text style={styles.statValue}>{boardStats.avgRating}</Text>
              </View>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
          )}
          {boardStats.cities.length > 0 && (
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{boardStats.cities.length}</Text>
              <Text style={styles.statLabel}>
                {boardStats.cities.length === 1 ? 'City' : 'Cities'}
              </Text>
            </View>
          )}
          {boardStats.topCuisines.length > 0 && (
            <View style={styles.statItem}>
              <Text style={styles.statValue} numberOfLines={1}>
                {boardStats.topCuisines[0]}
              </Text>
              <Text style={styles.statLabel}>Top Cuisine</Text>
            </View>
          )}
        </View>
      )}

      {/* View Mode Toggle */}
      <View style={styles.viewModeContainer}>
        <View style={styles.viewModeToggle}>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'grid' && styles.viewModeActive]}
            onPress={() => setViewMode('grid')}
          >
            <Grid3x3 size={18} color={viewMode === 'grid' ? DS.colors.primaryOrange : DS.colors.textGray} />
            <Text style={[styles.viewModeText, viewMode === 'grid' && styles.viewModeTextActive]}>
              Grid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'list' && styles.viewModeActive]}
            onPress={() => setViewMode('list')}
          >
            <List size={18} color={viewMode === 'list' ? DS.colors.primaryOrange : DS.colors.textGray} />
            <Text style={[styles.viewModeText, viewMode === 'list' && styles.viewModeTextActive]}>
              List
            </Text>
          </TouchableOpacity>
        </View>

        {isOwner && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddRestaurants}>
            <Plus size={18} color={DS.colors.primaryOrange} />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      {restaurants.length === 0 ? (
        <ScrollView
          contentContainerStyle={styles.emptyContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Bookmark size={48} color={DS.colors.textGray} />
            </View>
            <Text style={styles.emptyTitle}>No places yet</Text>
            <Text style={styles.emptyDescription}>
              {isOwner
                ? 'Start adding restaurants to this board'
                : 'This board doesn\'t have any restaurants yet'}
            </Text>
            {isOwner && (
              <TouchableOpacity style={styles.emptyButton} onPress={handleAddRestaurants}>
                <Plus size={20} color={DS.colors.textWhite} />
                <Text style={styles.emptyButtonText}>Add Restaurants</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={restaurants}
          renderItem={viewMode === 'grid' ? renderRestaurantGrid : renderRestaurantList}
          keyExtractor={item => item.id}
          numColumns={viewMode === 'grid' ? 2 : 1}
          key={viewMode}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={viewMode === 'grid' ? styles.gridRow : undefined}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}

      {/* More Menu Modal */}
      <Modal
        visible={showMoreMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMoreMenu(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMoreMenu(false)}
        >
          <View style={styles.moreMenu}>
            <TouchableOpacity
              style={styles.moreMenuItem}
              onPress={() => {
                setShowMoreMenu(false);
                handleEditBoard();
              }}
            >
              <Edit2 size={20} color={DS.colors.textDark} />
              <Text style={styles.moreMenuText}>Edit Board</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.moreMenuItem}
              onPress={() => {
                setShowMoreMenu(false);
                handleDeleteBoard();
              }}
            >
              <Trash2 size={20} color={DS.colors.error} />
              <Text style={[styles.moreMenuText, { color: DS.colors.error }]}>
                Delete Board
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
    paddingHorizontal: DS.spacing.lg,
  },
  errorText: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.lg,
  },
  backButton: {
    backgroundColor: DS.colors.primaryOrange,
    paddingHorizontal: DS.spacing.xl,
    paddingVertical: DS.spacing.md,
    borderRadius: DS.borderRadius.full,
  },
  backButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.md,
    backgroundColor: DS.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  headerBack: {
    marginRight: DS.spacing.md,
  },
  headerTitle: {
    flex: 1,
  },
  boardName: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
  },
  boardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  boardMetaText: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    marginLeft: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: DS.spacing.sm,
  },
  headerActionButton: {
    padding: DS.spacing.xs,
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: DS.colors.surface,
    paddingVertical: DS.spacing.md,
    paddingHorizontal: DS.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
  },
  statLabel: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    marginTop: 2,
  },

  // View Mode
  viewModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: DS.colors.surface,
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  viewModeToggle: {
    flexDirection: 'row',
    backgroundColor: DS.colors.backgroundLight,
    borderRadius: DS.borderRadius.md,
    padding: 2,
  },
  viewModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DS.spacing.md,
    paddingVertical: DS.spacing.sm,
    borderRadius: DS.borderRadius.sm,
    gap: DS.spacing.xs,
  },
  viewModeActive: {
    backgroundColor: DS.colors.surface,
  },
  viewModeText: {
    ...DS.typography.button,
    color: DS.colors.textGray,
    fontSize: 13,
  },
  viewModeTextActive: {
    color: DS.colors.primaryOrange,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DS.spacing.md,
    paddingVertical: DS.spacing.sm,
    borderRadius: DS.borderRadius.full,
    backgroundColor: DS.colors.surfaceLight,
    gap: DS.spacing.xs,
  },
  addButtonText: {
    ...DS.typography.button,
    color: DS.colors.primaryOrange,
    fontSize: 13,
  },

  // Grid View
  listContent: {
    padding: DS.spacing.lg,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  gridCard: {
    width: CARD_WIDTH,
    backgroundColor: DS.colors.surface,
    borderRadius: DS.borderRadius.lg,
    marginBottom: DS.spacing.md,
    ...DS.shadows.sm,
  },
  gridCardImage: {
    width: '100%',
    height: CARD_WIDTH * 0.75,
    borderTopLeftRadius: DS.borderRadius.lg,
    borderTopRightRadius: DS.borderRadius.lg,
  },
  gridCardContent: {
    padding: DS.spacing.md,
  },
  gridCardName: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: 2,
  },
  gridCardMeta: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    fontSize: 12,
  },

  // List View
  listCard: {
    flexDirection: 'row',
    backgroundColor: DS.colors.surface,
    borderRadius: DS.borderRadius.lg,
    marginBottom: DS.spacing.md,
    ...DS.shadows.sm,
  },
  listCardImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: DS.borderRadius.lg,
    borderBottomLeftRadius: DS.borderRadius.lg,
  },
  listCardContent: {
    flex: 1,
    padding: DS.spacing.md,
    justifyContent: 'center',
  },
  listCardName: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: 4,
  },
  listCardMeta: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    fontSize: 13,
    marginBottom: 4,
  },

  // Common
  placeholderImage: {
    backgroundColor: DS.colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 32,
    opacity: 0.3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    ...DS.typography.metadata,
    color: DS.colors.textDark,
    marginLeft: 4,
  },
  reviewCount: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    marginLeft: 4,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  addressText: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    marginLeft: 4,
    flex: 1,
    fontSize: 12,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: DS.spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: DS.borderRadius.full,
    backgroundColor: DS.colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DS.spacing.xl,
  },
  emptyTitle: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.sm,
  },
  emptyDescription: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    textAlign: 'center',
    marginBottom: DS.spacing.xl,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DS.colors.primaryOrange,
    paddingHorizontal: DS.spacing.xl,
    paddingVertical: DS.spacing.md,
    borderRadius: DS.borderRadius.full,
    gap: DS.spacing.sm,
  },
  emptyButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },

  // More Menu
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  moreMenu: {
    backgroundColor: DS.colors.surface,
    borderTopLeftRadius: DS.borderRadius.xl,
    borderTopRightRadius: DS.borderRadius.xl,
    paddingVertical: DS.spacing.lg,
    paddingHorizontal: DS.spacing.lg,
    paddingBottom: DS.spacing.xxl,
  },
  moreMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DS.spacing.md,
    gap: DS.spacing.md,
  },
  moreMenuText: {
    ...DS.typography.body,
    color: DS.colors.textDark,
    fontSize: 16,
  },
});