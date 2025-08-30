/**
 * HOME FEED SCREEN - PURE RESKIN
 * Visual-only changes using Design System v3.0
 * NO FUNCTIONAL CHANGES - EXACT SAME LOGIC AS ORIGINAL
 */

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Bell,
  Bookmark,
  Coffee,
  Globe,
  Lock,
  MessageSquare,
  Plus,
  Search,
  Sparkles,
  UserPlus,
  Users,
  Utensils
} from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// KEEP ALL ORIGINAL IMPORTS - NO NEW FUNCTIONALITY
import { RestaurantCardWithSave } from '@/components/cards/RestaurantCardWithSave';
import { CitySelector } from '@/components/CitySelector';
import { ErrorState } from '@/components/ErrorState';
import QuickSavesBoard from '@/components/home/QuickSavesBoard';
import { InfoModal } from '@/components/InfoModal';
import { RestaurantCardWithSaveSkeleton } from '@/components/LoadingSkeleton';
import { NotificationBadge } from '@/components/NotificationBadge';
import { NotificationCenter } from '@/components/NotificationCenter';
import { strings } from '@/constants/strings';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { personas } from '@/data/personas';
import { useSmoothDataFetch } from '@/hooks/useSmoothDataFetch';
import { boardService } from '@/services/boardService';
import { communityService } from '@/services/communityService';
import { InviteService } from '@/services/inviteService';
import { locationService } from '@/services/locationService';
import { notificationService } from '@/services/notificationService';
import { postService } from '@/services/postService';
import { restaurantService } from '@/services/restaurantService';
import { NetworkSuggestion, TrendingContent } from '@/types/core';
import { getErrorType } from '@/types/errors';
import { Notification } from '@/types/notifications';

// Import Design System tokens only for styling
import { DS } from '@/components/design-system/tokens';

export default function HomeScreen() {
  // ============================================
  // EXACT SAME STATE AND LOGIC AS ORIGINAL
  // ============================================
  const router = useRouter();
  const { userState, hasCreatedBoard, hasCreatedPost, hasJoinedCommunity, networkProgress, updateNetworkProgress } = useApp();
  const { user } = useAuth();
  const { state: onboardingState } = useOnboarding();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [showRecommendationsInfo, setShowRecommendationsInfo] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedCity, setSelectedCity] = useState('Charlotte');
  const [cityLoading, setCityLoading] = useState(false);
  
  const persona = useMemo(
    () => onboardingState.persona && personas[onboardingState.persona],
    [onboardingState.persona]
  );
  const inviteService = useMemo(() => new InviteService(), []);

  // EXACT SAME DATA FETCHING AS ORIGINAL
  const fetchHomeData = useCallback(async () => {
    const [topRated, featured] = await Promise.all([
      restaurantService.getTopRatedRestaurants(selectedCity),
      restaurantService.getFeaturedRestaurants(10)
    ]);
    
    return { topRated, featured };
  }, [selectedCity]);

  const fetchUserBoards = useCallback(async () => {
    if (!user?.id) return [];
    try {
      return await boardService.getUserBoards(user.id);
    } catch (error) {
      if (__DEV__) {
        console.error('Error loading boards:', error);
      }
      return [];
    }
  }, [user?.id]);

  // EXACT SAME HOOKS AS ORIGINAL
  const { 
    data: restaurantsData, 
    loading, 
    refreshing, 
    error,
    refresh: refreshRestaurants 
  } = useSmoothDataFetch(fetchHomeData, [selectedCity], {
    minLoadingTime: 500,
    showLoadingOnRefetch: false,
    fetchOnFocus: false,
    cacheDuration: 5000
  });

  const { 
    data: userBoards = [], 
    refresh: refreshBoards,
    silentRefresh: silentRefreshBoards
  } = useSmoothDataFetch(fetchUserBoards, [user?.id], {
    minLoadingTime: 300,
    showLoadingOnRefetch: false,
    fetchOnFocus: true,
    cacheDuration: 60000
  });

  const topRatedRestaurants = restaurantsData?.topRated || [];
  const featuredRestaurants = restaurantsData?.featured || [];

  // EXACT SAME FUNCTIONS AS ORIGINAL
  const checkUserProgress = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const [boards, posts, communitiesData] = await Promise.all([
        boardService.getUserBoards(user.id),
        postService.getUserPosts(user.id),
        communityService.getUserCommunities(user.id)
      ]);
      
      const hasJoined = (communitiesData.joined?.length > 0) || (communitiesData.created?.length > 0);
      
      if (boards.length > 0 && !hasCreatedBoard) {
        updateNetworkProgress('board');
      }
      if (posts.length > 0 && !hasCreatedPost) {
        updateNetworkProgress('post');
      }
      if (hasJoined && !hasJoinedCommunity) {
        updateNetworkProgress('community');
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Error checking user progress:', error);
      }
    }
  }, [user?.id, hasCreatedBoard, hasCreatedPost, hasJoinedCommunity, updateNetworkProgress]);

  const loadUnreadCount = useCallback(async () => {
    if (!user?.id) return;
    try {
      const count = await notificationService.getUnreadCount(user.id);
      setUnreadCount(count);
    } catch (error) {
      if (__DEV__) {
        console.error('Error loading notification count:', error);
      }
    }
  }, [user?.id]);

  // EXACT SAME EFFECTS AS ORIGINAL
  useEffect(() => {
    let isMounted = true;
    
    const initializeLocation = async () => {
      await locationService.initialize();
      const city = await locationService.detectCurrentCity();
      
      if (isMounted && locationService.isCityAvailable(city)) {
        setSelectedCity(city);
      }
    };
    
    initializeLocation();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCityChange = useCallback((newCity: string) => {
    if (newCity !== selectedCity) {
      setCityLoading(true);
      setSelectedCity(newCity);
      setTimeout(() => setCityLoading(false), 1000);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (user?.id) {
      loadUnreadCount();
      checkUserProgress();
    }
  }, [user?.id, loadUnreadCount, checkUserProgress]);

  const onRefresh = async () => {
    await Promise.all([
      refreshRestaurants(),
      refreshBoards(),
      user?.id && loadUnreadCount(),
      user?.id && checkUserProgress()
    ]);
  };

  const handleBoardUpdate = async () => {
    await silentRefreshBoards();
    setRefreshTrigger(prev => prev + 1);
  };

  const handleNotificationPress = (notification: Notification) => {
    setShowNotificationCenter(false);
  };

  const transformToTopRatedContent = useCallback((restaurants: any[]): TrendingContent[] => {
    return restaurants.map(restaurant => ({
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        image: restaurant.cover_photo_url || restaurant.photos?.[0] || '',
        cuisine: restaurant.cuisine_types?.[0] || 'Restaurant',
        rating: restaurant.troodie_rating || restaurant.google_rating || 0,
        location: restaurant.city || 'Charlotte',
        priceRange: restaurant.price_range || '$$'
      },
      stats: {
        saves: restaurant.troodie_reviews_count || 0,
        visits: restaurant.saves_count || 0,
        photos: restaurant.photos?.length || 0
      },
      highlights: [
        `${restaurant.google_rating?.toFixed(1) || 'N/A'} ★ rating`,
        restaurant.cuisine_types?.[0] || 'Restaurant',
        restaurant.price_range || '$$'
      ],
      type: 'trending_spot' as const
    }));
  }, []);
  
  const topRatedContent = useMemo(
    () => transformToTopRatedContent(topRatedRestaurants),
    [topRatedRestaurants, transformToTopRatedContent]
  );

  const handleInviteFriends = async () => {
    try {
      const inviteLink = await inviteService.generateInviteLink(user!.id);
    } catch (error) {
      console.error('Error creating invite link:', error);
    }
  };

  const networkSuggestions: NetworkSuggestion[] = [
    {
      action: 'Create Board',
      description: 'Organize your favorite restaurants into collections',
      icon: Bookmark,
      cta: 'Create Board',
      benefit: 'Keep your saves organized',
      onClick: () => router.push('/add/create-board'),
      condition: () => !hasCreatedBoard,
      completed: hasCreatedBoard
    },
    {
      action: 'Create Post',
      description: 'Share your restaurant experiences with the community',
      icon: MessageSquare,
      cta: 'Share Experience',
      benefit: 'Connect with other food lovers',
      onClick: () => router.push('/add/create-post'),
      condition: () => !hasCreatedPost,
      completed: hasCreatedPost
    },
    {
      action: 'Join Community',
      description: 'Connect with people who share your dining interests',
      icon: Users,
      cta: 'Find Communities',
      benefit: 'Discover new restaurants together',
      onClick: () => router.push('/add/communities'),
      condition: () => !hasJoinedCommunity,
      completed: hasJoinedCommunity
    }
  ];

  const filteredNetworkSuggestions = networkSuggestions.filter(suggestion => 
    suggestion.condition ? suggestion.condition() : true
  );

  // ============================================
  // RENDER SECTIONS - RESKINNED WITH DESIGN SYSTEM
  // ============================================
  
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.brandName}>{strings.app.name}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/explore')}>
            <Search size={24} color={DS.colors.textDark} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={() => setShowNotificationCenter(true)}
          >
            <View style={styles.notificationContainer}>
              <Bell size={24} color={DS.colors.textDark} />
              <NotificationBadge count={unreadCount} size="small" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderWelcomeBanner = () => (
    <View style={styles.welcomeBannerContainer}>
      <LinearGradient
        colors={['#FFF5E6', '#FFE5CC']}
        style={styles.welcomeBanner}
      >
        <View style={styles.welcomeContent}>
          <View style={styles.welcomeIconContainer}>
            <Sparkles size={20} color={DS.colors.textWhite} />
          </View>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>Welcome to {strings.app.name}!</Text>
            <Text style={styles.welcomeDescription}>
              {strings.app.tagline}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.welcomeCTA} 
            onPress={() => router.push('/explore')}
          >
            <Text style={styles.welcomeCTAText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  const renderNetworkBuilding = () => {
    if (hasCreatedBoard && hasCreatedPost && hasJoinedCommunity) {
      return null;
    }

    return (
      <View style={styles.section}>
        <View style={styles.networkHeader}>
          <View style={styles.networkTitleContainer}>
            <UserPlus size={16} color={DS.colors.primaryOrange} />
            <Text style={styles.sectionTitle}>Build Your Network</Text>
          </View>
          <View style={styles.networkProgress}>
            <Text style={styles.progressText}>
              {networkProgress} of 3 completed
            </Text>
          </View>
        </View>
        <View style={styles.networkCards}>
          {filteredNetworkSuggestions.map((suggestion, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.networkCard,
                suggestion.completed && styles.networkCardCompleted
              ]}
              onPress={suggestion.onClick}
            >
              <View style={styles.networkCardIcon}>
                <suggestion.icon size={20} color={DS.colors.primaryOrange} />
                {suggestion.completed && (
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedText}>✓</Text>
                  </View>
                )}
              </View>
              <View style={styles.networkCardContent}>
                <Text style={styles.networkCardTitle}>{suggestion.action}</Text>
                <Text style={styles.networkCardDescription}>{suggestion.description}</Text>
                <Text style={styles.networkCardBenefit}>{suggestion.benefit}</Text>
              </View>
              <TouchableOpacity 
                style={[
                  styles.networkCardCTA,
                  suggestion.completed && styles.networkCardCTACompleted
                ]} 
                onPress={suggestion.onClick}
              >
                <Text style={styles.networkCardCTAText}>
                  {suggestion.completed ? 'Completed' : suggestion.cta}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderPersonalizedSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Perfect For You</Text>
        {persona && (
          <View style={styles.personaBadge}>
            <Text style={styles.personaEmoji}>{persona.emoji}</Text>
            <Text style={styles.personaName}>{persona.name}</Text>
          </View>
        )}
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        <TouchableOpacity style={styles.categoryCard}>
          <View style={[styles.categoryIcon, { backgroundColor: '#FFE5B4' }]}>
            <Coffee size={24} color="#8B4513" />
          </View>
          <Text style={styles.categoryName}>Quick Lunch Spots</Text>
          <Text style={styles.categoryDescription}>Perfect for your busy schedule</Text>
          <Text style={styles.categoryCount}>12 restaurants</Text>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>Explore</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryCard}>
          <View style={[styles.categoryIcon, { backgroundColor: '#E5D4FF' }]}>
            <Utensils size={24} color="#6B46C1" />
          </View>
          <Text style={styles.categoryName}>Date Night Ready</Text>
          <Text style={styles.categoryDescription}>Romantic spots for special occasions</Text>
          <Text style={styles.categoryCount}>8 restaurants</Text>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>Explore</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const renderYourBoards = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Boards</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      
      {(userBoards || []).length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyStateIcon}>
            <Bookmark size={32} color={DS.colors.borderLight} />
          </View>
          <Text style={styles.emptyStateTitle}>Create Your First Board</Text>
          <Text style={styles.emptyStateDescription}>
            Organize your favorite restaurants into collections
          </Text>
          <TouchableOpacity style={styles.emptyStateCTA} onPress={() => router.push('/add/create-board')}>
            <Text style={styles.emptyStateCTAText}>Create Board</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {(userBoards || []).slice(0, 5).map((board) => (
            <TouchableOpacity 
              key={board.id} 
              style={styles.boardCard}
              onPress={() => router.push(`/boards/${board.id}`)}
            >
              <View style={styles.boardCardHeader}>
                <View style={styles.boardCardIcon}>
                  <Bookmark size={20} color={DS.colors.primaryOrange} />
                </View>
                <Text style={styles.boardCardTitle} numberOfLines={1}>
                  {board.title}
                </Text>
              </View>
              <Text style={styles.boardCardDescription} numberOfLines={2}>
                {board.description || 'No description'}
              </Text>
              <View style={styles.boardCardFooter}>
                <Text style={styles.boardCardCount}>
                  {board.restaurant_count || 0} restaurants
                </Text>
                <View style={styles.boardCardPrivacy}>
                  {board.is_private ? (
                    <Lock size={12} color={DS.colors.textLight} />
                  ) : (
                    <Globe size={12} color={DS.colors.textLight} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );

  const renderTopRatedSection = () => {
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>
              Top Rated in {selectedCity}
            </Text>
            <CitySelector
              currentCity={selectedCity}
              onCityChange={handleCityChange}
              compact
            />
          </View>
        </View>
        
        {cityLoading ? (
          <>
            <RestaurantCardWithSaveSkeleton />
            <RestaurantCardWithSaveSkeleton />
            <RestaurantCardWithSaveSkeleton />
          </>
        ) : topRatedRestaurants.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyStateIcon}>
              <Sparkles size={32} color={DS.colors.borderLight} />
            </View>
            <Text style={styles.emptyStateTitle}>
              No restaurants found in {selectedCity}
            </Text>
            <Text style={styles.emptyStateDescription}>
              Be the first to discover and share amazing restaurants in this area!
            </Text>
            <TouchableOpacity 
              style={styles.emptyStateCTA} 
              onPress={() => router.push('/add/save-restaurant')}
            >
              <Plus size={16} color={DS.colors.textWhite} />
              <Text style={styles.emptyStateCTAText}>Add Restaurant</Text>
            </TouchableOpacity>
          </View>
        ) : (
          topRatedContent.map((item, index) => (
            <View key={index} style={styles.trendingCard}>
              <RestaurantCardWithSave
                restaurant={item.restaurant}
                stats={item.stats}
                onPress={() => {
                  router.push({
                    pathname: '/restaurant/[id]',
                    params: { id: item.restaurant.id },
                  });
                }}
                onRefresh={handleBoardUpdate}
                highlights={item.highlights}
              />
            </View>
          ))
        )}
      </View>
    );
  };

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <TouchableOpacity style={styles.quickActionButton}>
        <Plus size={20} color={DS.colors.textWhite} />
        <Text style={styles.quickActionText}>Add Place</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading && !error) {
    return (
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={DS.colors.primaryOrange} />
          <Text style={styles.loadingText}>Loading {selectedCity}&apos;s best spots...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !topRatedRestaurants.length && !featuredRestaurants.length) {
    return (
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        <ErrorState
          error={error}
          errorType={getErrorType(error)}
          onRetry={refreshRestaurants}
          retrying={refreshing}
          fullScreen
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={DS.colors.primaryOrange}
          />
        }
      >
        {renderHeader()}
        
        {userState.isNewUser && renderWelcomeBanner()}
        
        {renderNetworkBuilding()}
        
        {user && <QuickSavesBoard refreshTrigger={refreshTrigger} />}
        
        {renderYourBoards()}
        
        {renderTopRatedSection()}
        
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      {renderQuickActions()}

      {showNotificationCenter && (
        <NotificationCenter
          onClose={() => setShowNotificationCenter(false)}
          onNotificationPress={handleNotificationPress}
        />
      )}

      <InfoModal
        visible={showRecommendationsInfo}
        onClose={() => setShowRecommendationsInfo(false)}
        title={strings.recommendations.modalTitle}
        content={strings.recommendations.modalDescription}
      />
    </SafeAreaView>
  );
}

// ============================================
// STYLES - USING DESIGN SYSTEM TOKENS
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DS.colors.background,
  },
  header: {
    paddingHorizontal: DS.spacing.lg,
    paddingTop: DS.spacing.md,
    paddingBottom: DS.spacing.xl,
    marginBottom: DS.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandName: {
    ...DS.typography.h1,
    color: DS.colors.textDark,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    gap: DS.spacing.lg,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeBannerContainer: {
    marginHorizontal: DS.spacing.lg,
    marginBottom: DS.spacing.xxl,
  },
  welcomeBanner: {
    padding: DS.spacing.lg,
    borderRadius: DS.borderRadius.lg,
    borderWidth: 1,
    borderColor: DS.colors.primaryOrange + '33',
    ...DS.shadows.sm,
  },
  welcomeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.md,
  },
  welcomeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DS.colors.primaryOrange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: 2,
  },
  welcomeDescription: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
  },
  welcomeCTA: {
    backgroundColor: DS.colors.primaryOrange,
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.sm,
    borderRadius: DS.borderRadius.full,
  },
  welcomeCTAText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
  section: {
    marginBottom: DS.spacing.xxxl,
  },
  sectionHeader: {
    paddingHorizontal: DS.spacing.lg,
    marginBottom: DS.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
  },
  seeAll: {
    ...DS.typography.link,
    color: DS.colors.primaryOrange,
  },
  networkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DS.spacing.lg,
    marginBottom: DS.spacing.lg,
  },
  networkTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.xs,
  },
  networkProgress: {
    backgroundColor: DS.colors.surfaceLight,
    paddingHorizontal: DS.spacing.md,
    paddingVertical: DS.spacing.sm,
    borderRadius: DS.borderRadius.md,
  },
  progressText: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    fontWeight: '500',
  },
  networkCards: {
    paddingHorizontal: DS.spacing.lg,
    gap: DS.spacing.sm,
  },
  networkCard: {
    backgroundColor: DS.colors.surface,
    borderRadius: DS.borderRadius.md,
    padding: DS.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DS.colors.borderLight,
    marginBottom: DS.spacing.sm,
    ...DS.shadows.sm,
  },
  networkCardCompleted: {
    backgroundColor: DS.colors.surfaceLight,
    borderColor: DS.colors.success,
  },
  networkCardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: DS.colors.primaryOrange + '1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DS.spacing.md,
    position: 'relative',
  },
  completedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: DS.colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: {
    fontSize: 10,
    fontWeight: '600',
    color: DS.colors.textWhite,
  },
  networkCardContent: {
    flex: 1,
  },
  networkCardTitle: {
    ...DS.typography.body,
    fontWeight: '500',
    color: DS.colors.textDark,
    marginBottom: 2,
  },
  networkCardDescription: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
    marginBottom: 4,
  },
  networkCardBenefit: {
    ...DS.typography.caption,
    fontWeight: '500',
    color: DS.colors.primaryOrange,
  },
  networkCardCTA: {
    backgroundColor: DS.colors.surface,
    borderWidth: 1,
    borderColor: DS.colors.borderLight,
    paddingHorizontal: DS.spacing.md,
    paddingVertical: DS.spacing.sm,
    borderRadius: DS.borderRadius.sm,
  },
  networkCardCTACompleted: {
    backgroundColor: DS.colors.surfaceLight,
    borderColor: DS.colors.borderLight,
  },
  networkCardCTAText: {
    ...DS.typography.caption,
    fontWeight: '500',
    color: DS.colors.textDark,
  },
  personaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DS.colors.surfaceLight,
    paddingHorizontal: DS.spacing.md,
    paddingVertical: DS.spacing.sm,
    borderRadius: DS.borderRadius.full,
    gap: DS.spacing.sm,
  },
  personaEmoji: {
    fontSize: 16,
  },
  personaName: {
    ...DS.typography.caption,
    fontWeight: '500',
    color: DS.colors.textGray,
  },
  horizontalScroll: {
    paddingLeft: DS.spacing.lg,
  },
  categoryCard: {
    width: 200,
    backgroundColor: DS.colors.surface,
    borderRadius: DS.borderRadius.md,
    padding: DS.spacing.lg,
    marginRight: DS.spacing.md,
    ...DS.shadows.sm,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: DS.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DS.spacing.md,
  },
  categoryName: {
    ...DS.typography.body,
    fontWeight: '600',
    color: DS.colors.textDark,
    marginBottom: DS.spacing.xs,
  },
  categoryDescription: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
    marginBottom: DS.spacing.sm,
  },
  categoryCount: {
    ...DS.typography.caption,
    fontWeight: '500',
    color: DS.colors.primaryOrange,
    marginBottom: DS.spacing.md,
  },
  categoryButton: {
    backgroundColor: DS.colors.surfaceLight,
    paddingVertical: DS.spacing.sm,
    borderRadius: DS.borderRadius.md,
    alignItems: 'center',
  },
  categoryButtonText: {
    ...DS.typography.button,
    color: DS.colors.textDark,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: DS.spacing.xxxl,
    paddingHorizontal: DS.spacing.xxl,
    marginHorizontal: DS.spacing.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: DS.colors.borderLight,
    borderRadius: DS.borderRadius.lg,
  },
  emptyStateIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: DS.colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DS.spacing.lg,
  },
  emptyStateTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.sm,
    textAlign: 'center',
  },
  emptyStateDescription: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    textAlign: 'center',
    marginBottom: DS.spacing.lg,
  },
  emptyStateCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.xs,
    backgroundColor: DS.colors.primaryOrange,
    paddingHorizontal: DS.spacing.xxl,
    paddingVertical: DS.spacing.md,
    borderRadius: DS.borderRadius.full,
  },
  emptyStateCTAText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
  boardCard: {
    width: 200,
    backgroundColor: DS.colors.surface,
    borderRadius: DS.borderRadius.md,
    padding: DS.spacing.md,
    marginRight: DS.spacing.md,
    ...DS.shadows.sm,
  },
  boardCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DS.spacing.sm,
  },
  boardCardIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: DS.colors.primaryOrange + '1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DS.spacing.sm,
  },
  boardCardTitle: {
    ...DS.typography.body,
    fontWeight: '600',
    color: DS.colors.textDark,
    flex: 1,
  },
  boardCardDescription: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
    marginBottom: DS.spacing.sm,
  },
  boardCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boardCardCount: {
    ...DS.typography.caption,
    fontWeight: '500',
    color: DS.colors.primaryOrange,
  },
  boardCardPrivacy: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.xs,
    flex: 1,
  },
  trendingCard: {
    paddingHorizontal: DS.spacing.lg,
    marginBottom: DS.spacing.lg,
  },
  quickActions: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    gap: 12,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DS.colors.primaryOrange,
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.md,
    borderRadius: DS.borderRadius.full,
    gap: DS.spacing.sm,
    ...DS.shadows.md,
  },
  quickActionText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
  bottomPadding: {
    height: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  loadingText: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    marginTop: DS.spacing.md,
  },
  notificationContainer: {
    position: 'relative'
  },
});