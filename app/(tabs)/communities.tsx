/**
 * COMMUNITIES SCREEN - V1.0 Design
 * Clean, modern community discovery and management interface
 */

import { DS } from '@/components/design-system/tokens';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { Community, communityService } from '@/services/communityService';
import { userService } from '@/services/userService';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import {
  Calendar,
  Globe,
  Lock,
  MapPin,
  Plus,
  Search,
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
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - (DS.spacing.lg * 2);

type FilterTab = 'all' | 'joined' | 'trending';

export default function CommunitiesScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { updateNetworkProgress } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [userCommunities, setUserCommunities] = useState<Community[]>([]);
  const [trendingCommunities, setTrendingCommunities] = useState<Community[]>([]);

  // Fetch communities data
  const fetchCommunities = useCallback(async () => {
    try {
      // Fetch all public communities and user's private communities
      const allCommunities = await communityService.getCommunities(user?.id);
      
      // Filter based on search query
      const filtered = searchQuery 
        ? allCommunities.filter(c => 
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.location?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : allCommunities;
      
      setCommunities(filtered);
      
      // Sort for trending (by member count and activity)
      const trending = [...filtered]
        .sort((a, b) => (b.member_count + b.post_count) - (a.member_count + a.post_count))
        .slice(0, 5);
      setTrendingCommunities(trending);
      
      // Fetch user's joined communities if logged in
      if (user) {
        const { joined, created } = await communityService.getUserCommunities(user.id);
        setUserCommunities([...joined, ...created]);
      } else {
        setUserCommunities([]);
      }
    } catch (err) {
      console.error('Error fetching communities:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.id, searchQuery]);

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  useFocusEffect(
    useCallback(() => {
      fetchCommunities();
    }, [fetchCommunities])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCommunities();
  };

  const isUserMember = (communityId: string) => {
    return userCommunities.some(c => c.id === communityId);
  };

  const handleJoinCommunity = async (community: Community) => {
    if (!user) {
      router.push('/onboarding/login');
      return;
    }

    // Optimistic update
    const previousUserCommunities = [...userCommunities];
    setUserCommunities([...userCommunities, community]);

    try {
      const { success } = await communityService.joinCommunity(user.id, community.id);
      
      if (success) {
        await userService.updateNetworkProgress(user.id, 'community');
        updateNetworkProgress('community');
        fetchCommunities();
      } else {
        setUserCommunities(previousUserCommunities);
      }
    } catch (err) {
      setUserCommunities(previousUserCommunities);
      console.error('Error joining community:', err);
    }
  };

  const handleCommunityPress = (community: Community) => {
    router.push({
      pathname: '/add/community-detail',
      params: { communityId: community.id }
    });
  };

  const getFilteredCommunities = () => {
    switch (activeFilter) {
      case 'joined':
        return userCommunities;
      case 'trending':
        return trendingCommunities;
      default:
        return communities;
    }
  };

  const renderCommunityCard = (community: Community) => {
    const isMember = isUserMember(community.id);
    const coverImage = community.is_event_based 
      ? 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
      : 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800';
    
    return (
      <TouchableOpacity
        key={community.id}
        style={styles.communityCard}
        onPress={() => handleCommunityPress(community)}
        activeOpacity={0.9}
      >
        {/* Card Header Image */}
        <View style={styles.cardImageContainer}>
          <Image source={{ uri: coverImage }} style={styles.cardImage} />
          
          {/* Badges */}
          <View style={styles.badges}>
            {community.type === 'private' && (
              <View style={styles.badge}>
                <Lock size={12} color={DS.colors.textWhite} />
                <Text style={styles.badgeText}>Private</Text>
              </View>
            )}
            {community.is_event_based && (
              <View style={[styles.badge, { backgroundColor: DS.colors.primaryOrange }]}>
                <Calendar size={12} color={DS.colors.textWhite} />
                <Text style={styles.badgeText}>Event</Text>
              </View>
            )}
          </View>

          {/* Member Status */}
          {isMember && (
            <View style={styles.memberStatus}>
              <Text style={styles.memberStatusText}>MEMBER</Text>
            </View>
          )}
        </View>

        {/* Card Content */}
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.communityName} numberOfLines={1}>
              {community.name}
            </Text>
            {!isMember && community.type === 'public' && (
              <TouchableOpacity
                style={styles.joinButton}
                onPress={(e) => {
                  e.stopPropagation();
                  handleJoinCommunity(community);
                }}
              >
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            )}
          </View>

          {community.description && (
            <Text style={styles.communityDescription} numberOfLines={2}>
              {community.description}
            </Text>
          )}

          <View style={styles.cardFooter}>
            <View style={styles.stat}>
              <Users size={14} color={DS.colors.textGray} />
              <Text style={styles.statText}>
                {community.member_count.toLocaleString()} members
              </Text>
            </View>
            
            {community.location && (
              <>
                <Text style={styles.dot}>•</Text>
                <View style={styles.stat}>
                  <MapPin size={14} color={DS.colors.textGray} />
                  <Text style={styles.statText}>{community.location}</Text>
                </View>
              </>
            )}
            
            {community.post_count > 0 && (
              <>
                <Text style={styles.dot}>•</Text>
                <View style={styles.stat}>
                  <TrendingUp size={14} color={DS.colors.textGray} />
                  <Text style={styles.statText}>{community.post_count} posts</Text>
                </View>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
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

  const filteredCommunities = getFilteredCommunities();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ProfileAvatar size={36} style={styles.profileAvatar} />
        <Text style={styles.headerTitle}>Communities</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => {
            if (user) {
              router.push('/add/create-community');
            } else {
              router.push('/onboarding/login');
            }
          }}
        >
          <Plus size={20} color={DS.colors.textWhite} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={18} color={DS.colors.textGray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search communities..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={DS.colors.textGray}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={18} color={DS.colors.textGray} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Pills */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
        <TouchableOpacity
          style={[styles.filterPill, activeFilter === 'all' && styles.filterPillActive]}
          onPress={() => setActiveFilter('all')}
        >
          <Globe size={16} color={activeFilter === 'all' ? DS.colors.textWhite : DS.colors.textGray} />
          <Text style={[styles.filterText, activeFilter === 'all' && styles.filterTextActive]}>
            All Communities
          </Text>
        </TouchableOpacity>

        {user && (
          <TouchableOpacity
            style={[styles.filterPill, activeFilter === 'joined' && styles.filterPillActive]}
            onPress={() => setActiveFilter('joined')}
          >
            <Users size={16} color={activeFilter === 'joined' ? DS.colors.textWhite : DS.colors.textGray} />
            <Text style={[styles.filterText, activeFilter === 'joined' && styles.filterTextActive]}>
              Joined ({userCommunities.length})
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.filterPill, activeFilter === 'trending' && styles.filterPillActive]}
          onPress={() => setActiveFilter('trending')}
        >
          <TrendingUp size={16} color={activeFilter === 'trending' ? DS.colors.textWhite : DS.colors.textGray} />
          <Text style={[styles.filterText, activeFilter === 'trending' && styles.filterTextActive]}>
            Trending
          </Text>
        </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Communities List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={DS.colors.primaryOrange}
          />
        }
        contentContainerStyle={styles.scrollContent}
      >
        {filteredCommunities.length === 0 ? (
          <View style={styles.emptyState}>
            <Users size={48} color={DS.colors.textGray} />
            <Text style={styles.emptyTitle}>No Communities Found</Text>
            <Text style={styles.emptyDescription}>
              {activeFilter === 'joined' 
                ? 'Join communities to connect with food lovers'
                : searchQuery 
                  ? 'Try a different search'
                  : 'Be the first to create a community!'}
            </Text>
            {activeFilter === 'joined' && (
              <TouchableOpacity 
                style={styles.explorButton}
                onPress={() => setActiveFilter('all')}
              >
                <Text style={styles.explorButtonText}>Explore Communities</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.communityList}>
            {filteredCommunities.map(renderCommunityCard)}
          </View>
        )}
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
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  profileAvatar: {
    marginRight: DS.spacing.md,
  },
  headerTitle: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
    flex: 1,
  },
  createButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: DS.colors.primaryOrange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Search
  searchContainer: {
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.md,
    backgroundColor: DS.colors.surface,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DS.colors.surfaceLight,
    borderRadius: DS.borderRadius.md,
    paddingHorizontal: DS.spacing.md,
    height: 44,
    gap: DS.spacing.sm,
  },
  searchInput: {
    ...DS.typography.body,
    flex: 1,
    color: DS.colors.textDark,
  },
  
  // Filters
  filterContainer: {
    backgroundColor: DS.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  filterContent: {
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.sm,
    gap: DS.spacing.sm,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.xs,
    paddingHorizontal: DS.spacing.md,
    paddingVertical: DS.spacing.sm,
    borderRadius: DS.borderRadius.full,
    backgroundColor: DS.colors.surface,
    borderWidth: 1,
    borderColor: DS.colors.border,
  },
  filterPillActive: {
    backgroundColor: DS.colors.primaryOrange,
    borderColor: DS.colors.primaryOrange,
  },
  filterText: {
    ...DS.typography.button,
    color: DS.colors.textGray,
    fontSize: 13,
  },
  filterTextActive: {
    color: DS.colors.textWhite,
  },
  
  // Content
  scrollContent: {
    paddingBottom: DS.spacing.xxl,
  },
  communityList: {
    padding: DS.spacing.lg,
    gap: DS.spacing.md,
  },
  
  // Community Card
  communityCard: {
    backgroundColor: DS.colors.surface,
    borderRadius: DS.borderRadius.lg,
    overflow: 'hidden',
    ...DS.shadows.sm,
  },
  cardImageContainer: {
    position: 'relative',
    height: 140,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  badges: {
    position: 'absolute',
    top: DS.spacing.sm,
    left: DS.spacing.sm,
    flexDirection: 'row',
    gap: DS.spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: DS.spacing.sm,
    paddingVertical: 4,
    borderRadius: DS.borderRadius.sm,
  },
  badgeText: {
    ...DS.typography.caption,
    color: DS.colors.textWhite,
    fontSize: 11,
    fontWeight: '600',
  },
  memberStatus: {
    position: 'absolute',
    top: DS.spacing.sm,
    right: DS.spacing.sm,
    backgroundColor: '#4CAF50',
    paddingHorizontal: DS.spacing.sm,
    paddingVertical: 4,
    borderRadius: DS.borderRadius.sm,
  },
  memberStatusText: {
    ...DS.typography.caption,
    color: DS.colors.textWhite,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardContent: {
    padding: DS.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: DS.spacing.xs,
  },
  communityName: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    flex: 1,
  },
  joinButton: {
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: 6,
    backgroundColor: DS.colors.primaryOrange,
    borderRadius: DS.borderRadius.full,
  },
  joinButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
    fontSize: 13,
  },
  communityDescription: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    marginBottom: DS.spacing.md,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
  },
  dot: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    marginHorizontal: DS.spacing.xs,
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: DS.spacing.huge,
    paddingHorizontal: DS.spacing.xl,
  },
  emptyTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginTop: DS.spacing.lg,
    marginBottom: DS.spacing.sm,
  },
  emptyDescription: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    textAlign: 'center',
    marginBottom: DS.spacing.xl,
  },
  explorButton: {
    paddingHorizontal: DS.spacing.xl,
    paddingVertical: DS.spacing.md,
    backgroundColor: DS.colors.primaryOrange,
    borderRadius: DS.borderRadius.md,
  },
  explorButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
});