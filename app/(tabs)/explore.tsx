import { ErrorState } from '@/components/ErrorState';
import { RestaurantCardSkeleton } from '@/components/LoadingSkeleton';
import { PostCard } from '@/components/PostCard';
import { RestaurantCard } from '@/components/cards/RestaurantCard';
import { AddRestaurantModal } from '@/components/AddRestaurantModal';
import { compactDesign, designTokens } from '@/constants/designTokens';
import { DS } from '@/components/design-system/tokens';
import { useAuth } from '@/contexts/AuthContext';
import { postService } from '@/services/postService';
import { restaurantService } from '@/services/restaurantService';
import { getErrorType } from '@/types/errors';
import { PostWithUser } from '@/types/post';
import { useFocusEffect, useRouter } from 'expo-router';
import { Search, SlidersHorizontal, Users, Plus } from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type TabType = 'restaurants' | 'posts' | 'communities';

interface TabState<T> {
  data: T[];
  filtered: T[];
  loading: boolean;
  error: Error | null;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Fisher-Yates shuffle algorithm for randomizing arrays
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

const useTabData = <T extends any>(
  loadFn: () => Promise<T[]>,
  filterFn: (items: T[], query: string) => T[],
  shouldRandomize: boolean = false
) => {
  const [state, setState] = useState<TabState<T>>({
    data: [],
    filtered: [],
    loading: true,
    error: null,
  });

  const load = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await loadFn();
      const processedData = shouldRandomize ? shuffleArray(data) : data;
      setState({ data: processedData, filtered: processedData, loading: false, error: null });
    } catch (err: any) {
      setState(prev => ({ ...prev, loading: false, error: err }));
    }
  };

  const filter = (query: string) => {
    const filtered = query ? filterFn(state.data, query) : state.data;
    setState(prev => ({ ...prev, filtered }));
  };

  return { ...state, load, filter };
};

export default function ExploreScreen() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('restaurants');
  const [refreshing, setRefreshing] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);
  const [isReRandomizing, setIsReRandomizing] = useState(false);
  const [showAddRestaurantModal, setShowAddRestaurantModal] = useState(false);
  
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Restaurant data management with randomization - now showing ALL restaurants
  const restaurants = useTabData(
    () => restaurantService.getAllRestaurants(100), // Increased limit to show more restaurants
    (items, query) => {
      const q = query.toLowerCase();
      return items.filter(r => 
        r.name?.toLowerCase().includes(q) ||
        r.cuisine_types?.some((c: string) => c.toLowerCase().includes(q)) ||
        r.city?.toLowerCase().includes(q) ||
        r.state?.toLowerCase().includes(q) ||
        r.address?.toLowerCase().includes(q)
      );
    },
    true // Enable randomization for restaurants
  );

  // Posts data management
  const posts = useTabData(
    () => postService.getExplorePosts({ limit: 50 }),
    (items, query) => {
      const q = query.toLowerCase();
      return items.filter(p => 
        p.caption?.toLowerCase().includes(q) ||
        p.restaurant?.name?.toLowerCase().includes(q) ||
        p.tags?.some((t: string) => t.toLowerCase().includes(q))
      );
    }
  );

  // Handle user blocking - refresh posts to remove blocked user's content
  const handleUserBlocked = useCallback((blockedUserId: string) => {
    // Simply reload the posts, the backend will filter out blocked users
    posts.load();
  }, []);

  // Handle post deletion - refresh posts to remove deleted post
  const handlePostDeleted = useCallback((postId: string) => {
    // Simply reload the posts to get the updated list
    posts.load();
  }, []);

  const currentTab = activeTab === 'restaurants' ? restaurants : posts;

  // Load data on tab change
  useEffect(() => {
    if (activeTab === 'restaurants' && restaurants.data.length === 0) {
      restaurants.load().then(() => setHasInitiallyLoaded(true));
    } else if (activeTab === 'posts' && posts.data.length === 0) {
      posts.load();
    }
    // Clear re-randomizing state when switching tabs
    setIsReRandomizing(false);
  }, [activeTab]);

  // Reload and re-randomize restaurants when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // Only reload restaurants if we're on the restaurants tab and have already loaded once
      if (activeTab === 'restaurants' && hasInitiallyLoaded) {
        const performReRandomization = async () => {
          setIsReRandomizing(true);
          await restaurants.load();
          // Small delay to ensure smooth transition
          setTimeout(() => {
            setIsReRandomizing(false);
          }, 300);
        };
        performReRandomization();
      }
    }, [activeTab, hasInitiallyLoaded])
  );

  // Filter on search change
  useEffect(() => {
    currentTab.filter(debouncedSearch);
  }, [debouncedSearch, activeTab]);

  const onRefresh = async () => {
    setRefreshing(true);
    await currentTab.load();
    
    // Ensure we mark as initially loaded after refresh
    if (activeTab === 'restaurants' && !hasInitiallyLoaded) {
      setHasInitiallyLoaded(true);
    }
    setRefreshing(false);
  };

  const Header = useMemo(() => (
    <View style={styles.header}>
      {/* Compact Title Bar */}
      <View style={styles.titleBar}>
        <Text style={styles.title}>Explore</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push('/find-friends')}
          >
            <Users size={20} color={DS.colors.textGray} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <SlidersHorizontal size={20} color={DS.colors.textGray} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Compact Search Bar */}
      <View style={[styles.searchBar, searchFocused && styles.searchBarFocused]}>
        <Search size={16} color={DS.colors.textGray} />
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          testID="search-input"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Minimal Tab Switcher */}
      <View style={styles.tabBar}>
        {(['restaurants', 'posts', 'communities'] as const).map(tab => (
          <Pressable
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => {
              if (tab === 'communities') {
                router.push('/add/communities');
              } else {
                setActiveTab(tab);
              }
            }}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  ), [searchQuery, activeTab, router, searchFocused]);



  const renderItem = useCallback(({ item, index }: { item: any; index: number }) => {
    // Handle regular items
    if (activeTab === 'restaurants') {
      return (
        <View style={styles.restaurantCardWrapper}>
          <RestaurantCard
            testID={`restaurant-card-${index}`}
            restaurant={{
              id: item.id,
              name: item.name,
              image: restaurantService.getRestaurantImage(item),
              cuisine: item.cuisine_types?.[0] || 'Restaurant',
              rating: item.google_rating || item.troodie_rating || 0,
              location: item.neighborhood || item.city || 'Charlotte',
              priceRange: item.price_range || '$$',
            }}
            onPress={() => router.push({
              pathname: '/restaurant/[id]',
              params: { id: item.id }
            })}
          />
        </View>
      );
    }
    
    return (
      <PostCard
        post={item as PostWithUser}
        onPress={() => router.push({
          pathname: '/posts/[id]',
          params: { id: item.id }
        })}
        onLike={() => {}}
        onComment={() => {}}
        onSave={() => {}}
        onBlock={handleUserBlocked}
        onDelete={handlePostDeleted}
      />
    );
  }, [activeTab, router]);

  const EmptyComponent = useCallback(() => {
    if (currentTab.error) {
      return (
        <ErrorState
          error={currentTab.error}
          errorType={getErrorType(currentTab.error)}
          onRetry={currentTab.load}
          retrying={false}
        />
      );
    }

    // Show Add Restaurant CTA for restaurant search with no results
    const showAddRestaurantCTA = activeTab === 'restaurants' && debouncedSearch && debouncedSearch.length > 0;

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>{activeTab === 'restaurants' ? '🍴' : '📝'}</Text>
        <Text style={styles.emptyTitle}>
          No {activeTab} found
        </Text>
        <Text style={styles.emptyText}>
          {debouncedSearch 
            ? showAddRestaurantCTA
              ? `Can't find "${debouncedSearch}"?`
              : 'Try adjusting your search'
            : activeTab === 'restaurants' 
              ? 'Check back soon for new restaurants'
              : 'Be the first to share your experience'
          }
        </Text>
        
        {showAddRestaurantCTA && (
          <TouchableOpacity
            style={styles.addRestaurantButton}
            onPress={() => setShowAddRestaurantModal(true)}
            activeOpacity={0.8}
          >
            <Plus size={16} color={DS.colors.textWhite} />
            <Text style={styles.addRestaurantButtonText}>Add Restaurant</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }, [currentTab, activeTab, debouncedSearch]);

  // Loading state for initial load or re-randomization (but not when searching)
  if ((currentTab.loading && currentTab.data.length === 0) || (isReRandomizing && !searchQuery)) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ListHeaderComponent={Header}
          data={[1, 2, 3, 4, 5]}
          renderItem={() => <RestaurantCardSkeleton />}
          keyExtractor={item => item.toString()}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={Header}
        data={currentTab.filtered}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={DS.colors.primaryOrange}
          />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={EmptyComponent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews
      />
      
      {/* Add Restaurant Modal */}
      <AddRestaurantModal
        visible={showAddRestaurantModal}
        onClose={() => setShowAddRestaurantModal(false)}
        initialSearchQuery={searchQuery}
        onRestaurantAdded={(restaurant) => {
          // Reload the restaurants list after adding a new one
          if (activeTab === 'restaurants') {
            restaurants.load();
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DS.colors.background,
  },
  header: {
    backgroundColor: DS.colors.surface,
    paddingBottom: DS.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.md,
  },
  title: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
  },
  headerActions: {
    flexDirection: 'row',
    gap: DS.spacing.sm,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: DS.colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DS.colors.surfaceLight,
    marginHorizontal: DS.spacing.lg,
    marginBottom: DS.spacing.sm,
    paddingHorizontal: DS.spacing.md,
    height: 40,
    borderRadius: DS.borderRadius.md,
    gap: DS.spacing.sm,
    borderWidth: 1,
    borderColor: DS.colors.transparent,
  },
  searchBarFocused: {
    borderColor: DS.colors.primaryOrange,
    backgroundColor: DS.colors.surface,
  },
  searchInput: {
    flex: 1,
    ...DS.typography.body,
    color: DS.colors.textDark,
    padding: 0,
  },
  clearText: {
    ...DS.typography.caption,
    color: DS.colors.primaryOrange,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: DS.spacing.lg,
    gap: DS.spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: DS.spacing.sm,
    alignItems: 'center',
    borderRadius: DS.borderRadius.sm,
    backgroundColor: DS.colors.surfaceLight,
  },
  tabActive: {
    backgroundColor: DS.colors.primaryOrange,
  },
  tabText: {
    ...DS.typography.button,
    color: DS.colors.textGray,
  },
  tabTextActive: {
    color: DS.colors.textWhite,
  },
  listContent: {
    paddingTop: DS.spacing.sm,
    paddingBottom: DS.spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: DS.spacing.xxxl,
  },
  emptyIcon: {
    fontSize: 48,
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
  },
  restaurantCardWrapper: {
    paddingHorizontal: DS.spacing.lg,
  },
  addRestaurantButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DS.colors.primaryOrange,
    paddingHorizontal: DS.spacing.xl,
    paddingVertical: DS.spacing.md,
    borderRadius: DS.borderRadius.full,
    marginTop: DS.spacing.xl,
    gap: DS.spacing.sm,
    ...DS.shadows.sm,
  },
  addRestaurantButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
});