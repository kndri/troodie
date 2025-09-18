/**
 * SAVES SCREEN - V1.0 Design Implementation
 * Progressive states based on user's save count
 * Unified tab bar with adaptive content
 */

import { AuthGate } from '@/components/AuthGate';
import { BoardCollageCard } from '@/components/BoardCollageCard';
import { RestaurantCard } from '@/components/cards/RestaurantCard';
import { DS } from '@/components/design-system/tokens';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { useAuth } from '@/contexts/AuthContext';
import { boardService } from '@/services/boardService';
import { saveService } from '@/services/saveService';
import { Board } from '@/types/board';
import { RestaurantInfo } from '@/types/core';
import { useFocusEffect, useRouter } from 'expo-router';
import { Plus, Sparkles, TrendingUp, Users, MapPin, BarChart3 } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BOARD_CARD_SIZE = (SCREEN_WIDTH - DS.spacing.lg * 3) / 2;

type ViewMode = 'boards' | 'list' | 'map' | 'stats';

export default function SavesScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [boards, setBoards] = useState<Board[]>([]);
  const [saves, setSaves] = useState<RestaurantInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('boards');
  const [totalSaves, setTotalSaves] = useState(0);
  const [cities, setCities] = useState<string[]>([]);

  // Fetch user's boards and saves
  const fetchData = useCallback(async () => {
    if (!user?.id) return;

    try {
      const [userBoards, userSaves] = await Promise.all([
        boardService.getUserBoards(user.id),
        saveService.getUserSaves(user.id)
      ]);

      setBoards(userBoards);
      setSaves(userSaves);
      setTotalSaves(userSaves.length);

      // Extract unique cities
      const uniqueCities = [...new Set(userSaves.map(r => r.city).filter(Boolean))];
      setCities(uniqueCities);
    } catch (error) {
      console.error('Error fetching saves data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.id]);

  // Refresh on focus
  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated) {
        fetchData();
      }
    }, [isAuthenticated, fetchData])
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  const handleCreateBoard = () => {
    router.push('/add/create-board');
  };

  const handleBoardPress = (boardId: string) => {
    router.push(`/boards/${boardId}`);
  };

  // Determine user state based on save count
  const getUserState = () => {
    if (totalSaves === 0) return 'empty';
    if (totalSaves <= 5) return 'first';
    if (totalSaves <= 20) return 'growing';
    return 'power';
  };

  const userState = getUserState();

  if (!isAuthenticated) {
    return (
      <AuthGate 
        screenName="your saved restaurants"
        message="Save your favorite spots and organize them into boards"
      />
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={DS.colors.primaryOrange} />
        </View>
      </SafeAreaView>
    );
  }

  // Empty state - no saves yet
  if (userState === 'empty') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.emptyStateContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Sparkles size={48} color={DS.colors.primaryOrange} />
            </View>
            <Text style={styles.emptyTitle}>Start Your Collection</Text>
            <Text style={styles.emptyDescription}>
              Save restaurants you love and organize them into boards
            </Text>
            
            <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(tabs)/explore')}>
              <Text style={styles.primaryButtonText}>Explore Restaurants</Text>
            </TouchableOpacity>

            <View style={styles.suggestedBoards}>
              <Text style={styles.suggestedTitle}>Popular Board Ideas</Text>
              {['Date Nights', 'Quick Lunch', 'Weekend Brunch'].map((name) => (
                <TouchableOpacity key={name} style={styles.suggestedItem}>
                  <Text style={styles.suggestedText}>• {name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // First saves state (1-5 saves)
  if (userState === 'first') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <ProfileAvatar size={36} style={styles.profileAvatar} />
          <Text style={styles.title}>Your Saves</Text>
          <TouchableOpacity onPress={() => router.push('/add/create-board')}>
            <Plus size={24} color={DS.colors.primaryOrange} />
          </TouchableOpacity>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >

          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Building Your Collection</Text>
              <Text style={styles.progressSubtitle}>
                {totalSaves} of 5 saves to unlock boards
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(totalSaves / 5) * 100}%` }]} />
            </View>
            <View style={styles.progressMilestones}>
              <View style={styles.milestone}>
                <View style={[styles.milestoneCircle, totalSaves >= 1 && styles.milestoneActive]} />
                <Text style={styles.milestoneText}>First Save</Text>
              </View>
              <View style={styles.milestone}>
                <View style={[styles.milestoneCircle, totalSaves >= 3 && styles.milestoneActive]} />
                <Text style={styles.milestoneText}>Getting Started</Text>
              </View>
              <View style={styles.milestone}>
                <View style={[styles.milestoneCircle, totalSaves >= 5 && styles.milestoneActive]} />
                <Text style={styles.milestoneText}>Boards Unlocked!</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Saved Places</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
                <Text style={styles.addMoreText}>+ Add More</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.savedGrid}>
              {saves.map((restaurant) => (
                <TouchableOpacity
                  key={restaurant.id}
                  style={styles.savedCard}
                  onPress={() => router.push(`/restaurant/${restaurant.id}`)}
                >
                  {(restaurant.main_image || restaurant.image) ? (
                    <Image source={{ uri: restaurant.main_image || restaurant.image }} style={styles.savedCardImage} />
                  ) : (
                    <View style={[styles.savedCardImage, styles.savedCardImagePlaceholder]}>
                      <Text style={styles.savedCardEmoji}>🍽️</Text>
                    </View>
                  )}
                  <View style={styles.savedCardInfo}>
                    <Text style={styles.savedCardName} numberOfLines={1}>
                      {restaurant.name}
                    </Text>
                    <Text style={styles.savedCardMeta} numberOfLines={1}>
                      {restaurant.cuisine_type} • {restaurant.city}
                    </Text>
                    {restaurant.google_rating && (
                      <View style={styles.savedCardRating}>
                        <Text style={styles.savedCardStar}>⭐</Text>
                        <Text style={styles.savedCardRatingText}>{restaurant.google_rating}</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}

              {/* Add placeholder cards to fill grid */}
              {Array.from({ length: Math.max(0, 4 - saves.length) }).map((_, index) => (
                <TouchableOpacity
                  key={`empty-${index}`}
                  style={styles.emptyCard}
                  onPress={() => router.push('/(tabs)/explore')}
                >
                  <View style={styles.emptyCardContent}>
                    <Plus size={24} color={DS.colors.textGray} />
                    <Text style={styles.emptyCardText}>Add Place</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.unlockSection}>
            <View style={styles.unlockCard}>
              <View style={styles.unlockIcon}>
                <Sparkles size={24} color={DS.colors.primaryOrange} />
              </View>
              <View style={styles.unlockContent}>
                <Text style={styles.unlockTitle}>Unlock Boards at 5 Saves!</Text>
                <Text style={styles.unlockDescription}>
                  {5 - totalSaves} more save{5 - totalSaves !== 1 ? 's' : ''} to organize your collection
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.discoverSection}>
            <Text style={styles.discoverTitle}>Keep Exploring</Text>
            <TouchableOpacity style={styles.exploreButton} onPress={() => router.push('/(tabs)/explore')}>
              <Text style={styles.exploreButtonText}>Discover More Restaurants</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Growing collection state (5-20 saves)
  if (userState === 'growing') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <ProfileAvatar size={36} style={styles.profileAvatar} />
          <Text style={styles.title}>My Boards</Text>
          <TouchableOpacity onPress={() => router.push('/boards/manage')}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View style={styles.boardGrid}>
            {boards.map((board) => (
              <BoardCollageCard
                key={board.id}
                board={board}
                onPress={() => handleBoardPress(board.id)}
              />
            ))}

            <TouchableOpacity style={styles.newBoardCard} onPress={handleCreateBoard}>
              <Plus size={32} color={DS.colors.textGray} />
              <Text style={styles.newBoardText}>New Board</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>Recent Saves</Text>
            {saves.slice(0, 5).map((restaurant) => (
              <TouchableOpacity 
                key={restaurant.id}
                style={styles.recentItem}
                onPress={() => router.push(`/restaurant/${restaurant.id}`)}
              >
                {(restaurant.main_image || restaurant.image) ? (
                  <Image 
                    source={{ uri: restaurant.main_image || restaurant.image }}
                    style={styles.recentImage}
                  />
                ) : (
                  <View style={[styles.recentImage, styles.recentImagePlaceholder]}>
                    <Text style={styles.placeholderEmoji}>🍽️</Text>
                  </View>
                )}
                <View style={styles.recentInfo}>
                  <Text style={styles.recentName}>{restaurant.name}</Text>
                  <Text style={styles.recentMeta}>
                    {restaurant.cuisine_type} • {restaurant.city}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Power user state (20+ saves)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ProfileAvatar size={36} style={styles.profileAvatar} />
        <Text style={styles.title}>My Collection</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsBar}>
        <Text style={styles.statsText}>
          {totalSaves} saves • {boards.length} boards • {cities.length} cities
        </Text>
      </View>

      <View style={styles.viewTabs}>
        {(['boards', 'list', 'map', 'stats'] as ViewMode[]).map((mode) => (
          <TouchableOpacity 
            key={mode}
            style={[styles.viewTab, viewMode === mode && styles.viewTabActive]}
            onPress={() => setViewMode(mode)}
          >
            <Text style={[styles.viewTabText, viewMode === mode && styles.viewTabTextActive]}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {boards.length > 0 && (
          <View style={styles.featuredBoard}>
            <Text style={styles.featuredLabel}>Featured Board</Text>
            <TouchableOpacity 
              style={styles.featuredCard}
              onPress={() => handleBoardPress(boards[0].id)}
            >
              {boards[0].restaurants && boards[0].restaurants.length > 0 && (
                <Image 
                  source={{ uri: boards[0].restaurants[0].restaurant?.main_image }}
                  style={styles.featuredImage}
                />
              )}
              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle}>{boards[0].name}</Text>
                <Text style={styles.featuredDescription}>
                  {boards[0].restaurant_count} restaurants for any occasion
                </Text>
                <View style={styles.featuredActions}>
                  <TouchableOpacity style={styles.featuredButton}>
                    <Text style={styles.featuredButtonText}>View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.featuredButton}>
                    <Text style={styles.featuredButtonText}>Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.featuredButton}>
                    <Text style={styles.featuredButtonText}>Collaborate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.boardGrid}>
          {boards.slice(1).map((board) => (
            <BoardCollageCard
              key={board.id}
              board={board}
              onPress={() => handleBoardPress(board.id)}
            />
          ))}

          <TouchableOpacity style={styles.newBoardCard} onPress={handleCreateBoard}>
            <Plus size={32} color={DS.colors.textGray} />
            <Text style={styles.newBoardText}>New Board</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.creatorUpsell}>
          <View style={styles.creatorIcon}>
            <TrendingUp size={24} color={DS.colors.primaryOrange} />
          </View>
          <View style={styles.creatorContent}>
            <Text style={styles.creatorTitle}>💰 Monetize Your Collection</Text>
            <Text style={styles.creatorText}>
              You're in the top 10% of savers!
            </Text>
          </View>
          <TouchableOpacity style={styles.creatorButton}>
            <Text style={styles.creatorButtonText}>Become a Creator</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.md,
    backgroundColor: DS.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  profileAvatar: {
    marginRight: DS.spacing.md,
  },
  title: {
    ...DS.typography.h1,
    color: DS.colors.textDark,
    flex: 1,
  },
  editButton: {
    ...DS.typography.button,
    color: DS.colors.primaryOrange,
  },
  headerActions: {
    flexDirection: 'row',
    gap: DS.spacing.sm,
  },
  searchButton: {
    paddingHorizontal: DS.spacing.md,
    paddingVertical: DS.spacing.xs,
  },
  searchText: {
    ...DS.typography.button,
    color: DS.colors.textGray,
  },
  filterButton: {
    paddingHorizontal: DS.spacing.md,
    paddingVertical: DS.spacing.xs,
  },
  filterText: {
    ...DS.typography.button,
    color: DS.colors.textGray,
  },

  // Empty state
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: DS.spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: DS.borderRadius.full,
    backgroundColor: DS.colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DS.spacing.xl,
  },
  emptyTitle: {
    ...DS.typography.h1,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.sm,
  },
  emptyDescription: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    textAlign: 'center',
    marginBottom: DS.spacing.xxl,
  },
  primaryButton: {
    backgroundColor: DS.colors.primaryOrange,
    paddingHorizontal: DS.spacing.xxl,
    paddingVertical: DS.spacing.md,
    borderRadius: DS.borderRadius.md,
    marginBottom: DS.spacing.xxl,
  },
  primaryButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
  suggestedBoards: {
    alignItems: 'center',
  },
  suggestedTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.md,
  },
  suggestedItem: {
    paddingVertical: DS.spacing.xs,
  },
  suggestedText: {
    ...DS.typography.body,
    color: DS.colors.textGray,
  },

  // First saves state - Improved
  progressSection: {
    backgroundColor: DS.colors.surface,
    margin: DS.spacing.lg,
    padding: DS.spacing.lg,
    borderRadius: DS.borderRadius.lg,
    ...DS.shadows.sm,
  },
  progressHeader: {
    marginBottom: DS.spacing.lg,
  },
  progressTitle: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.xs,
  },
  progressSubtitle: {
    ...DS.typography.body,
    color: DS.colors.textGray,
  },
  progressBar: {
    height: 8,
    backgroundColor: DS.colors.backgroundLight,
    borderRadius: DS.borderRadius.full,
    overflow: 'hidden',
    marginBottom: DS.spacing.lg,
  },
  progressFill: {
    height: '100%',
    backgroundColor: DS.colors.primaryOrange,
    borderRadius: DS.borderRadius.full,
  },
  progressMilestones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  milestone: {
    alignItems: 'center',
    flex: 1,
  },
  milestoneCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: DS.colors.backgroundLight,
    borderWidth: 2,
    borderColor: DS.colors.border,
    marginBottom: DS.spacing.xs,
  },
  milestoneActive: {
    backgroundColor: DS.colors.primaryOrange,
    borderColor: DS.colors.primaryOrange,
  },
  milestoneText: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    fontSize: 11,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: DS.spacing.lg,
    marginBottom: DS.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DS.spacing.md,
  },
  sectionTitle: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
  },
  addMoreText: {
    ...DS.typography.button,
    color: DS.colors.primaryOrange,
    fontSize: 14,
  },
  savedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DS.spacing.md,
  },
  savedCard: {
    width: (SCREEN_WIDTH - DS.spacing.lg * 2 - DS.spacing.md) / 2,
    backgroundColor: DS.colors.surface,
    borderRadius: DS.borderRadius.lg,
    overflow: 'hidden',
    ...DS.shadows.sm,
  },
  savedCardImage: {
    width: '100%',
    height: 120,
  },
  savedCardImagePlaceholder: {
    backgroundColor: DS.colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  savedCardEmoji: {
    fontSize: 32,
    opacity: 0.3,
  },
  savedCardInfo: {
    padding: DS.spacing.md,
  },
  savedCardName: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.xs,
  },
  savedCardMeta: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    fontSize: 12,
  },
  savedCardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DS.spacing.xs,
  },
  savedCardStar: {
    fontSize: 12,
    marginRight: 4,
  },
  savedCardRatingText: {
    ...DS.typography.metadata,
    color: DS.colors.textDark,
    fontSize: 12,
  },
  emptyCard: {
    width: (SCREEN_WIDTH - DS.spacing.lg * 2 - DS.spacing.md) / 2,
    height: 180,
    backgroundColor: DS.colors.surfaceLight,
    borderRadius: DS.borderRadius.lg,
    borderWidth: 2,
    borderColor: DS.colors.border,
    borderStyle: 'dashed',
  },
  emptyCardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCardText: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    marginTop: DS.spacing.sm,
  },
  unlockSection: {
    paddingHorizontal: DS.spacing.lg,
    marginBottom: DS.spacing.lg,
  },
  unlockCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DS.colors.surfaceLight,
    padding: DS.spacing.lg,
    borderRadius: DS.borderRadius.lg,
  },
  unlockIcon: {
    width: 48,
    height: 48,
    borderRadius: DS.borderRadius.full,
    backgroundColor: DS.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DS.spacing.md,
  },
  unlockContent: {
    flex: 1,
  },
  unlockTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.xs,
  },
  unlockDescription: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    fontSize: 13,
  },
  discoverSection: {
    paddingHorizontal: DS.spacing.lg,
    paddingBottom: DS.spacing.xl,
    alignItems: 'center',
  },
  discoverTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.md,
  },
  exploreButton: {
    backgroundColor: DS.colors.primaryOrange,
    paddingHorizontal: DS.spacing.xxl,
    paddingVertical: DS.spacing.md,
    borderRadius: DS.borderRadius.full,
  },
  exploreButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },

  // Growing collection
  boardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: DS.spacing.lg,
    paddingTop: DS.spacing.lg,
    justifyContent: 'space-between',
  },
  boardCard: {
    width: BOARD_CARD_SIZE,
    backgroundColor: DS.colors.surface,
    borderRadius: DS.borderRadius.lg,
    overflow: 'hidden',
    ...DS.shadows.sm,
  },
  boardImageGrid: {
    width: BOARD_CARD_SIZE,
    height: BOARD_CARD_SIZE,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  boardGridImage: {
    width: BOARD_CARD_SIZE / 2,
    height: BOARD_CARD_SIZE / 2,
  },
  boardGridEmpty: {
    width: BOARD_CARD_SIZE / 2,
    height: BOARD_CARD_SIZE / 2,
    backgroundColor: DS.colors.surfaceLight,
  },
  boardName: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    padding: DS.spacing.md,
    paddingBottom: DS.spacing.xs,
  },
  boardCount: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    paddingHorizontal: DS.spacing.md,
    paddingBottom: DS.spacing.md,
  },
  newBoardCard: {
    width: BOARD_CARD_SIZE,
    height: BOARD_CARD_SIZE,
    backgroundColor: DS.colors.surfaceLight,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: DS.colors.border,
    borderStyle: 'dashed',
  },
  newBoardText: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    marginTop: DS.spacing.sm,
  },
  recentSection: {
    padding: DS.spacing.lg,
  },
  sectionTitle: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.md,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DS.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  recentImage: {
    width: 60,
    height: 60,
    borderRadius: DS.borderRadius.md,
    marginRight: DS.spacing.md,
  },
  recentInfo: {
    flex: 1,
  },
  recentName: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
  },
  recentMeta: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    marginTop: DS.spacing.xs,
  },
  recentImagePlaceholder: {
    backgroundColor: DS.colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 24,
    opacity: 0.5,
  },

  // Power user
  statsBar: {
    backgroundColor: DS.colors.surfaceLight,
    paddingVertical: DS.spacing.sm,
    paddingHorizontal: DS.spacing.lg,
  },
  statsText: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    textAlign: 'center',
  },
  viewTabs: {
    flexDirection: 'row',
    backgroundColor: DS.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  viewTab: {
    flex: 1,
    paddingVertical: DS.spacing.md,
    alignItems: 'center',
  },
  viewTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: DS.colors.primaryOrange,
  },
  viewTabText: {
    ...DS.typography.button,
    color: DS.colors.textGray,
  },
  viewTabTextActive: {
    color: DS.colors.primaryOrange,
  },
  featuredBoard: {
    padding: DS.spacing.lg,
  },
  featuredLabel: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: DS.spacing.md,
  },
  featuredCard: {
    backgroundColor: DS.colors.surface,
    borderRadius: DS.borderRadius.lg,
    overflow: 'hidden',
    ...DS.shadows.md,
  },
  featuredImage: {
    width: '100%',
    height: 200,
  },
  featuredContent: {
    padding: DS.spacing.lg,
  },
  featuredTitle: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.xs,
  },
  featuredDescription: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    marginBottom: DS.spacing.md,
  },
  featuredActions: {
    flexDirection: 'row',
    gap: DS.spacing.sm,
  },
  featuredButton: {
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.sm,
    borderRadius: DS.borderRadius.md,
    borderWidth: 1,
    borderColor: DS.colors.border,
  },
  featuredButtonText: {
    ...DS.typography.button,
    color: DS.colors.textDark,
  },
  creatorUpsell: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DS.colors.surfaceLight,
    margin: DS.spacing.lg,
    padding: DS.spacing.lg,
    borderRadius: DS.borderRadius.lg,
  },
  creatorIcon: {
    width: 48,
    height: 48,
    borderRadius: DS.borderRadius.full,
    backgroundColor: DS.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DS.spacing.md,
  },
  creatorContent: {
    flex: 1,
  },
  creatorTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
  },
  creatorText: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    marginTop: DS.spacing.xs,
  },
  creatorButton: {
    backgroundColor: DS.colors.primaryOrange,
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.sm,
    borderRadius: DS.borderRadius.md,
  },
  creatorButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
});