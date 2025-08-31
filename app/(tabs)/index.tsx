/**
 * DISCOVER SCREEN - V1.0 Design Implementation
 * Matches the provided design with stories, personalization, and popular restaurants
 */

import { useRouter } from 'expo-router';
import {
  Bell,
  Bookmark,
  ChevronRight,
  Heart,
  MessageSquare,
  Search,
  Star,
  TrendingUp,
  Users,
  X
} from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
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

// Components
import { DS } from '@/components/design-system/tokens';
import { ProfileAvatar } from '@/components/ProfileAvatar';

// Contexts & Services
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { ActivityFeedItem, activityFeedService } from '@/services/activityFeedService';
import { restaurantService } from '@/services/restaurantService';
import { saveService } from '@/services/saveService';
import { ToastService } from '@/services/toastService';
import { RestaurantInfo } from '@/types/core';
import { formatDistanceToNow } from '@/utils/dateHelpers';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Story item type
interface Story {
  id: string;
  type: 'user' | 'place' | 'invite' | 'expert';
  name: string;
  avatar?: string;
  label?: string;
}

export default function DiscoverScreen() {
  const router = useRouter();
  const { user, isAuthenticated, isAnonymous, profile } = useAuth();
  const { userState } = useApp();
  
  // State - use user's city or default
  const [selectedCity, setSelectedCity] = useState(
    profile?.city || userState.location?.city || 'Charlotte'
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showPersonalization, setShowPersonalization] = useState(true);
  
  // Helper function to get time-based greeting
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };
  
  // Data states
  const [popularRestaurants, setPopularRestaurants] = useState<RestaurantInfo[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [savedStates, setSavedStates] = useState<Record<string, boolean>>({});
  const [recentActivities, setRecentActivities] = useState<ActivityFeedItem[]>([]);
  const [globalActivities, setGlobalActivities] = useState<ActivityFeedItem[]>([]);

  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch popular restaurants (limit to 3)
      const restaurants = await restaurantService.getTopRatedRestaurants(selectedCity);
      setPopularRestaurants(restaurants.slice(0, 3));

      // Fetch recent activities if authenticated
      if (isAuthenticated && user?.id) {
        // Check saved states
        const states: Record<string, boolean> = {};
        for (const restaurant of restaurants) {
          const state = await saveService.getSaveState(restaurant.id, user.id);
          states[restaurant.id] = state.isSaved;
        }
        setSavedStates(states);

        // Fetch activity feed - get all activities to have data
        const { data: activities } = await activityFeedService.getActivityFeed(
          user.id,
          { 
            filter: 'all', // Get all activities, not just friends
            limit: 20 
          }
        );
        
        // Set the activities directly - the service should return properly formatted data
        setRecentActivities(activities.slice(0, 10));
      } else {
        // For non-authenticated users, show global activity
        const { data: globalFeed } = await activityFeedService.getActivityFeed(
          null,
          { 
            filter: 'all',
            limit: 20 
          }
        );
        
        // Use real global activities
        setGlobalActivities(globalFeed.slice(0, 10));
      }

      // Mock stories data
      setStories([
        { id: 'you', type: 'user', name: 'You' },
        { id: 'find', type: 'invite', name: 'Find Friends', label: 'Find Friends' },
        { id: 'invite', type: 'invite', name: 'Invite', label: 'Invite' },
        { id: 'experts', type: 'expert', name: 'Experts', label: 'Experts' },
      ]);

    } catch (error) {
      console.error('Error fetching discover data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedCity, isAuthenticated, user?.id, userState.friendsCount]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleSaveToggle = async (restaurant: RestaurantInfo) => {
    if (!isAuthenticated) {
      router.push('/onboarding/splash');
      return;
    }

    if (!user?.id) return;

    const isSaved = savedStates[restaurant.id];
    
    // Optimistic update
    setSavedStates(prev => ({
      ...prev,
      [restaurant.id]: !isSaved
    }));

    try {
      await saveService.toggleSave({
        userId: user.id,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        onBoardSelection: () => router.push(`/restaurant/${restaurant.id}/add-to-board`),
      });
    } catch (error) {
      // Revert on error
      setSavedStates(prev => ({
        ...prev,
        [restaurant.id]: isSaved
      }));
      ToastService.showError('Failed to save restaurant');
    }
  };

  const handleStoryPress = (story: Story) => {
    switch (story.type) {
      case 'invite':
        if (story.id === 'find') {
          router.push('/friends/find');
        } else {
          router.push('/friends/invite');
        }
        break;
      case 'expert':
        router.push('/experts');
        break;
      case 'user':
        router.push('/add');
        break;
    }
  };

  const formatTimeAgo = (minutes: number) => {
    if (minutes < 60) return `${minutes} min walk`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <ProfileAvatar size={36} style={styles.profileAvatar} />
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Discover</Text>
            <TouchableOpacity style={styles.locationRow} onPress={() => {}}>
              <Text style={styles.locationText}>{getTimeGreeting()} • {selectedCity}</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.searchButton} onPress={() => router.push('/search')}>
            <Search size={24} color={DS.colors.textDark} />
          </TouchableOpacity>
        </View>

        {/* Personalization Banner */}
        {showPersonalization && !isAuthenticated && (
          <View style={styles.personalizationBanner}>
            <View style={styles.personalizationContent}>
              <View style={styles.personalizationIcon}>
                <TrendingUp size={20} color={DS.colors.primaryOrange} />
              </View>
              <View style={styles.personalizationText}>
                <Text style={styles.personalizationTitle}>New here? Let's personalize</Text>
                <Text style={styles.personalizationSubtitle}>
                  We'll tailor your feed while you find friends and set your tastes.
                </Text>
              </View>
              <TouchableOpacity onPress={() => setShowPersonalization(false)}>
                <X size={20} color={DS.colors.textGray} />
              </TouchableOpacity>
            </View>
            <View style={styles.personalizationActions}>
              <TouchableOpacity style={styles.preferenceButton}>
                <Text style={styles.preferenceButtonText}>Set preferences</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.findFriendsButton}>
                <Text style={styles.findFriendsButtonText}>Find friends</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Activity Section */}
        <View style={styles.activitySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Activity</Text>
            <TouchableOpacity 
              style={styles.seeAllContainer}
              onPress={() => router.push('/(tabs)/activity')}
            >
              <Text style={styles.seeAllButton}>See all</Text>
              <ChevronRight size={16} color={DS.colors.primaryOrange} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.activityList}>
            {(isAuthenticated ? recentActivities : globalActivities).slice(0, 5).map((activity, index) => {
              // Determine activity icon, text and colors
              let iconBg = '#FFF3E0';
              let iconColor = '#FFB800';
              let icon = <Star size={18} color={iconColor} />;
              let primaryText = '';
              let secondaryText = '';
              let avatarUri = null;
              
              switch (activity.activity_type) {
                case 'post':
                case 'review':
                  iconBg = '#FFF3E0';
                  iconColor = '#FFB800';
                  icon = <Star size={18} color={iconColor} fill={iconColor} />;
                  const rating = activity.rating ? ` ${activity.rating}⭐` : '';
                  // Show actual user name and restaurant name
                  const actorName = activity.actor_name || activity.actor_username || 'User';
                  const targetName = activity.target_name || activity.restaurant_name || '';
                  primaryText = targetName 
                    ? `${actorName} rated ${targetName}${rating}`
                    : `${actorName} posted a review${rating}`;
                  secondaryText = activity.created_at ? formatDistanceToNow(activity.created_at) : 'recently';
                  break;
                  
                case 'save':
                  iconBg = '#E8F5E9';
                  iconColor = '#4CAF50';
                  icon = <Bookmark size={18} color={iconColor} fill={iconColor} />;
                  const saveActorName = activity.actor_name || activity.actor_username || 'User';
                  const saveTargetName = activity.target_name || activity.restaurant_name || '';
                  primaryText = saveTargetName 
                    ? `${saveActorName} saved ${saveTargetName}`
                    : `${saveActorName} saved a restaurant`;
                  secondaryText = activity.created_at ? formatDistanceToNow(activity.created_at) : 'recently';
                  break;
                  
                case 'follow':
                  iconBg = '#E3F2FD';
                  iconColor = '#2196F3';
                  icon = <Users size={18} color={iconColor} />;
                  const followActorName = activity.actor_name || activity.actor_username || 'User';
                  const followTargetName = activity.target_name || activity.related_user_name || activity.related_user_username || '';
                  if (followTargetName) {
                    primaryText = `${followActorName} started following ${followTargetName}`;
                  } else {
                    primaryText = `${followActorName} started following you`;
                  }
                  secondaryText = activity.created_at ? formatDistanceToNow(activity.created_at) : 'recently';
                  avatarUri = activity.actor_avatar;
                  break;
                  
                case 'trending':
                  iconBg = '#FCE4EC';
                  iconColor = '#E91E63';
                  icon = <TrendingUp size={18} color={iconColor} />;
                  primaryText = `12 new places are trending near you.`;
                  secondaryText = 'Today';
                  break;
                  
                case 'comment':
                  iconBg = '#F3E5F5';
                  iconColor = '#9C27B0';
                  icon = <MessageSquare size={18} color={iconColor} />;
                  const commentActorName = activity.actor_name || activity.actor_username || 'User';
                  const commentTargetName = activity.target_name || activity.restaurant_name || '';
                  const commentText = activity.content || activity.comment_text || '';
                  if (commentTargetName && commentText) {
                    primaryText = `${commentActorName} reviewed ${commentTargetName}: "${commentText.substring(0, 50)}${commentText.length > 50 ? '...' : ''}"`;
                  } else if (commentTargetName) {
                    primaryText = `${commentActorName} commented on ${commentTargetName}`;
                  } else {
                    primaryText = `${commentActorName} left a comment`;
                  }
                  secondaryText = activity.created_at ? formatDistanceToNow(activity.created_at) : 'recently';
                  break;
                  
                case 'like':
                  iconBg = '#FFE0E0';
                  iconColor = '#F44336';
                  icon = <Heart size={18} color={iconColor} fill={iconColor} />;
                  const likeActorName = activity.actor_name || activity.actor_username || 'User';
                  const likeTargetName = activity.target_name || activity.restaurant_name || '';
                  primaryText = likeTargetName 
                    ? `${likeActorName} liked ${likeTargetName}`
                    : `${likeActorName} liked a post`;
                  secondaryText = activity.created_at ? formatDistanceToNow(activity.created_at) : 'recently';
                  break;
                  
                case 'community_join':
                  iconBg = '#FFF3E0';
                  iconColor = '#FF9800';
                  icon = <Users size={18} color={iconColor} />;
                  const joinActorName = activity.actor_name || activity.actor_username || 'User';
                  const communityName = activity.target_name || activity.community_name || '';
                  primaryText = communityName 
                    ? `${joinActorName} joined ${communityName}`
                    : `${joinActorName} joined a community`;
                  secondaryText = activity.created_at ? formatDistanceToNow(activity.created_at) : 'recently';
                  break;
                  
                default:
                  iconBg = '#F5F5F5';
                  iconColor = '#757575';
                  icon = <Bell size={18} color={iconColor} />;
                  const defaultActorName = activity.actor_name || activity.actor_username || 'User';
                  const defaultTargetName = activity.target_name || activity.restaurant_name || '';
                  const action = activity.action || activity.activity_type || 'updated';
                  primaryText = defaultTargetName 
                    ? `${defaultActorName} ${action} ${defaultTargetName}`
                    : `${defaultActorName} ${action}`;
                  secondaryText = activity.created_at ? formatDistanceToNow(activity.created_at) : 'recently';
              }
              
              return (
                <TouchableOpacity
                  key={activity.activity_id || `activity-${index}`}
                  style={styles.activityItem}
                  onPress={() => {
                    if (activity.restaurant_id) {
                      router.push(`/restaurant/${activity.restaurant_id}`);
                    } else if (activity.related_user_id) {
                      router.push(`/user/${activity.related_user_id}`);
                    } else {
                      router.push('/(tabs)/activity');
                    }
                  }}
                >
                  <View style={[styles.activityIcon, { backgroundColor: iconBg }]}>
                    {icon}
                  </View>
                  <View style={styles.activityTextContent}>
                    <Text style={styles.activityPrimaryText} numberOfLines={1}>
                      {primaryText}
                    </Text>
                    <Text style={styles.activitySecondaryText}>
                      {secondaryText}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
            
            {/* Open Activity Button */}
            <TouchableOpacity 
              style={styles.openActivityButton}
              onPress={() => router.push('/activity')}
            >
              <Bell size={20} color={DS.colors.textWhite} />
              <Text style={styles.openActivityButtonText}>Open Activity</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Popular Near You */}
        <View style={styles.popularSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular near you</Text>
          </View>
          
          {popularRestaurants.map((restaurant, index) => (
            <TouchableOpacity
              key={restaurant.id}
              style={styles.restaurantCard}
              onPress={() => router.push(`/restaurant/${restaurant.id}`)}
            >
              <View style={styles.restaurantImageContainer}>
                <Image 
                  source={{ uri: restaurant.main_image || restaurantService.getRestaurantImage(restaurant) }}
                  style={styles.restaurantImage}
                />
                {index === 0 && (
                  <View style={styles.trendingBadge}>
                    <TrendingUp size={12} color={DS.colors.textWhite} />
                    <Text style={styles.trendingText}>Trendin'</Text>
                  </View>
                )}
                {restaurant.distance && (
                  <View style={styles.distanceBadge}>
                    <Text style={styles.distanceBadgeText}>
                      {`${Math.round(restaurant.distance * 20)}-${Math.round(restaurant.distance * 20) + 10} min walk`}
                    </Text>
                  </View>
                )}
                <TouchableOpacity 
                  style={styles.saveIconButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleSaveToggle(restaurant);
                  }}
                >
                  {savedStates[restaurant.id] ? (
                    <Heart size={20} color={DS.colors.textWhite} fill={DS.colors.textWhite} />
                  ) : (
                    <Heart size={20} color={DS.colors.textWhite} />
                  )}
                </TouchableOpacity>
              </View>
              
              <View style={styles.restaurantContent}>
                <View style={styles.restaurantHeader}>
                  <View style={styles.restaurantInfo}>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <View style={styles.restaurantMeta}>
                      <View style={styles.ratingContainer}>
                        <Star size={12} color={DS.colors.primaryOrange} fill={DS.colors.primaryOrange} />
                        <Text style={styles.rating}>{restaurant.rating || 4.8}</Text>
                      </View>
                      <Text style={styles.metaDot}>•</Text>
                      <Text style={styles.cuisineType}>
                        {restaurant.cuisine_type || 'Restaurant'}
                      </Text>
                      <Text style={styles.metaDot}>•</Text>
                      <Text style={styles.priceLevel}>
                        {restaurant.price_level || '$$'}
                      </Text>
                    </View>
                    <Text style={styles.restaurantDescription} numberOfLines={2}>
                      {restaurant.description || `Rich kimkatsu broth, house-made noodles, late-night friendly.`}
                    </Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleSaveToggle(restaurant);
                    }}
                  >
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Explore Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Explore categories</Text>
          <View style={styles.categoriesGrid}>
            {['Healthy', 'Brunch', 'Date night', 'New & hot', 'Outdoors', 'Groups'].map((category) => (
              <TouchableOpacity key={category} style={styles.categoryChip}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.md,
    backgroundColor: DS.colors.surface,
  },
  profileAvatar: {
    marginRight: DS.spacing.md,
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    ...DS.typography.h1,
    color: DS.colors.textDark,
  },
  locationRow: {
    marginTop: DS.spacing.xs,
  },
  locationText: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DS.colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Personalization Banner
  personalizationBanner: {
    backgroundColor: '#FFF8E1',
    margin: DS.spacing.lg,
    padding: DS.spacing.lg,
    borderRadius: DS.borderRadius.lg,
  },
  personalizationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: DS.spacing.md,
  },
  personalizationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 173, 39, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  personalizationText: {
    flex: 1,
  },
  personalizationTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
  },
  personalizationSubtitle: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    marginTop: DS.spacing.xs,
  },
  personalizationActions: {
    flexDirection: 'row',
    gap: DS.spacing.sm,
    marginTop: DS.spacing.md,
  },
  preferenceButton: {
    flex: 1,
    paddingVertical: DS.spacing.sm,
    backgroundColor: DS.colors.textDark,
    borderRadius: DS.borderRadius.md,
    alignItems: 'center',
  },
  preferenceButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
  findFriendsButton: {
    flex: 1,
    paddingVertical: DS.spacing.sm,
    borderWidth: 1,
    borderColor: DS.colors.textDark,
    borderRadius: DS.borderRadius.md,
    alignItems: 'center',
  },
  findFriendsButtonText: {
    ...DS.typography.button,
    color: DS.colors.textDark,
  },
  
  // Activity Section
  activitySection: {
    paddingTop: DS.spacing.lg,
    marginBottom: DS.spacing.lg,
  },
  sectionTitle: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
    paddingHorizontal: DS.spacing.lg,
    marginBottom: DS.spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DS.spacing.lg,
    marginBottom: DS.spacing.md,
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllButton: {
    ...DS.typography.button,
    color: DS.colors.primaryOrange,
    fontSize: 14,
  },
  activityList: {
    backgroundColor: DS.colors.surface,
    marginHorizontal: DS.spacing.lg,
    borderRadius: DS.borderRadius.lg,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DS.spacing.sm,
    paddingHorizontal: DS.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: DS.colors.borderLight,
    minHeight: 50,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DS.spacing.sm,
  },
  activityIconAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  activityTextContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityPrimaryText: {
    ...DS.typography.body,
    color: DS.colors.textDark,
    fontSize: 14,
    flex: 1,
    marginRight: DS.spacing.sm,
  },
  activitySecondaryText: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
    fontSize: 12,
  },
  activityTrailingAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  openActivityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: DS.spacing.sm,
    paddingVertical: DS.spacing.md,
    backgroundColor: DS.colors.textDark,
    borderBottomLeftRadius: DS.borderRadius.lg,
    borderBottomRightRadius: DS.borderRadius.lg,
  },
  openActivityButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
  
  // No Activity Card
  noActivityCard: {
    backgroundColor: DS.colors.surfaceLight,
    margin: DS.spacing.lg,
    padding: DS.spacing.lg,
    borderRadius: DS.borderRadius.lg,
  },
  noActivityText: {
    marginTop: DS.spacing.md,
  },
  noActivityTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
  },
  noActivitySubtitle: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    marginTop: DS.spacing.xs,
  },
  noActivityActions: {
    flexDirection: 'row',
    gap: DS.spacing.md,
    marginTop: DS.spacing.lg,
  },
  postStoryButton: {
    paddingVertical: DS.spacing.sm,
    paddingHorizontal: DS.spacing.lg,
    backgroundColor: DS.colors.textDark,
    borderRadius: DS.borderRadius.md,
  },
  postStoryButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
  findFriendsLinkButton: {
    paddingVertical: DS.spacing.sm,
    paddingHorizontal: DS.spacing.lg,
  },
  findFriendsLinkText: {
    ...DS.typography.button,
    color: DS.colors.textDark,
  },
  noActivityPreview: {
    alignItems: 'center',
    paddingVertical: DS.spacing.xl,
  },
  noActivityText: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    marginBottom: DS.spacing.sm,
  },
  findFriendsLink: {
    ...DS.typography.button,
    color: DS.colors.primaryOrange,
  },
  
  // Popular Section
  popularSection: {
    paddingTop: DS.spacing.lg,
  },
  restaurantCard: {
    marginHorizontal: DS.spacing.lg,
    marginBottom: DS.spacing.lg,
  },
  restaurantImageContainer: {
    position: 'relative',
    marginBottom: DS.spacing.md,
  },
  restaurantImage: {
    width: '100%',
    height: 200,
    borderRadius: DS.borderRadius.lg,
  },
  trendingBadge: {
    position: 'absolute',
    top: DS.spacing.md,
    left: DS.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: DS.spacing.sm,
    paddingVertical: 4,
    borderRadius: DS.borderRadius.full,
  },
  trendingText: {
    ...DS.typography.caption,
    color: DS.colors.textWhite,
    fontWeight: '600',
  },
  distanceBadge: {
    position: 'absolute',
    bottom: DS.spacing.md,
    left: DS.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: DS.spacing.sm,
    paddingVertical: 4,
    borderRadius: DS.borderRadius.md,
  },
  distanceBadgeText: {
    ...DS.typography.caption,
    color: DS.colors.textWhite,
  },
  saveIconButton: {
    position: 'absolute',
    top: DS.spacing.md,
    right: DS.spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  restaurantContent: {
    paddingHorizontal: DS.spacing.xs,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  restaurantInfo: {
    flex: 1,
    marginRight: DS.spacing.md,
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    ...DS.typography.metadata,
    color: DS.colors.textDark,
    fontWeight: '600',
  },
  metaDot: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    marginHorizontal: DS.spacing.xs,
  },
  cuisineType: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
  },
  priceLevel: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
  },
  restaurantDescription: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    lineHeight: 20,
  },
  saveButton: {
    paddingHorizontal: DS.spacing.md,
    paddingVertical: 6,
    backgroundColor: DS.colors.textDark,
    borderRadius: DS.borderRadius.full,
  },
  saveButtonText: {
    ...DS.typography.caption,
    color: DS.colors.textWhite,
    fontWeight: '600',
  },
  
  // Categories
  categoriesSection: {
    paddingBottom: DS.spacing.xxl,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: DS.spacing.lg,
    gap: DS.spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.sm,
    backgroundColor: DS.colors.surface,
    borderRadius: DS.borderRadius.full,
    borderWidth: 1,
    borderColor: DS.colors.border,
  },
  categoryText: {
    ...DS.typography.button,
    color: DS.colors.textDark,
  },
});