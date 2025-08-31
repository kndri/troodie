/**
 * PROFILE SCREEN - V1.0 Redesigned
 * Clean, data-driven profile with better use of space
 * Focus on real user data and actionable insights
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import {
  Settings,
  Edit3,
  MapPin,
  Calendar,
  TrendingUp,
  Award,
  Users,
  Bookmark,
  Heart,
  MessageSquare,
  Share2,
  Instagram,
  ChevronRight,
  Plus,
  Grid3X3,
  List,
  Map,
  BarChart3,
  Star,
} from 'lucide-react-native';
import { DS } from '@/components/design-system/tokens';
import { AuthGate } from '@/components/AuthGate';
import { BoardCollageCard } from '@/components/BoardCollageCard';
import { EditProfileModal } from '@/components/modals/EditProfileModal';
import SettingsModal from '@/components/modals/SettingsModal';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { boardService } from '@/services/boardService';
import { postService } from '@/services/postService';
import { profileService } from '@/services/profileService';
import ShareService from '@/services/shareService';
import { getAvatarUrlWithFallback } from '@/utils/avatarUtils';
import { useRouter } from 'expo-router';
import { Board } from '@/types/board';
import { PostWithUser } from '@/types/post';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - DS.spacing.lg * 2 - DS.spacing.md) / 2;

type ViewMode = 'grid' | 'list' | 'map' | 'stats';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isAuthenticated, profile } = useAuth();
  const { userState } = useApp();
  
  // State
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  // Data
  const [boards, setBoards] = useState<Board[]>([]);
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [stats, setStats] = useState({
    saves: 0,
    boards: 0,
    reviews: 0,
    followers: 0,
    following: 0,
    cities: 0,
    cuisines: [],
    topNeighborhoods: [],
    avgRating: 0,
  });

  // Fetch profile data
  const fetchProfileData = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      const [userBoards, userPosts, userProfile] = await Promise.all([
        boardService.getUserBoards(user.id),
        postService.getUserPosts(user.id),
        profileService.getProfile(user.id)
      ]);

      setBoards(userBoards);
      setPosts(userPosts);

      // Calculate real stats from data
      const totalSaves = userBoards.reduce((sum, board) => sum + (board.restaurant_count || 0), 0);
      const reviews = userPosts.filter(p => p.type === 'review');
      
      // Extract unique cuisines from saved restaurants
      const cuisineSet = new Set<string>();
      userBoards.forEach(board => {
        board.restaurants?.forEach(item => {
          item.restaurant?.cuisine_types?.forEach(cuisine => cuisineSet.add(cuisine));
        });
      });

      // Extract neighborhoods
      const neighborhoodCount: Record<string, number> = {};
      userBoards.forEach(board => {
        board.restaurants?.forEach(item => {
          const neighborhood = item.restaurant?.neighborhood;
          if (neighborhood) {
            neighborhoodCount[neighborhood] = (neighborhoodCount[neighborhood] || 0) + 1;
          }
        });
      });

      const topNeighborhoods = Object.entries(neighborhoodCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([name]) => name);

      // Calculate average rating from reviews
      const avgRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
        : 0;

      setStats({
        saves: totalSaves,
        boards: userBoards.length,
        reviews: reviews.length,
        followers: userProfile?.followers_count || 0,
        following: userProfile?.following_count || 0,
        cities: userState.citiesVisited || 1,
        cuisines: Array.from(cuisineSet).slice(0, 5),
        topNeighborhoods,
        avgRating,
      });

    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.id, userState.citiesVisited]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchProfileData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user?.id, fetchProfileData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProfileData();
  };

  const handleShare = () => {
    ShareService.shareProfile(user?.id || '', profile?.username || '');
  };

  // Render stat card
  const StatCard = ({ icon: Icon, value, label, color = DS.colors.textDark }: any) => (
    <View style={styles.statCard}>
      <Icon size={20} color={color} />
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  // Render board card
  const renderBoardCard = (board: Board) => (
    <BoardCollageCard
      key={board.id}
      board={board}
      onPress={() => router.push(`/boards/${board.id}`)}
    />
  );

  // Render list view item
  const renderListItem = (board: Board) => (
    <TouchableOpacity
      key={board.id}
      style={styles.listItem}
      onPress={() => router.push(`/boards/${board.id}`)}
      activeOpacity={0.8}
    >
      <View style={styles.listItemLeft}>
        {board.restaurants && board.restaurants[0]?.restaurant?.main_image ? (
          <Image
            source={{ uri: board.restaurants[0].restaurant.main_image }}
            style={styles.listItemImage}
          />
        ) : (
          <View style={styles.listItemImagePlaceholder}>
            <Bookmark size={20} color={DS.colors.textLight} />
          </View>
        )}
      </View>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemName}>{board.name}</Text>
        <Text style={styles.listItemDetails}>
          {board.restaurant_count || 0} restaurants • Updated {new Date(board.updated_at).toLocaleDateString()}
        </Text>
      </View>
      <ChevronRight size={20} color={DS.colors.textGray} />
    </TouchableOpacity>
  );

  if (!isAuthenticated) {
    return (
      <AuthGate 
        screenName="your profile"
        message="Sign in to view your profile and saved restaurants"
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
          <TouchableOpacity onPress={() => setShowEditModal(true)}>
            <Edit3 size={24} color={DS.colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={() => setShowSettingsModal(true)}>
            <Settings size={24} color={DS.colors.textDark} />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={() => setShowEditModal(true)}>
            <Image
              source={{ uri: getAvatarUrlWithFallback(profile?.avatar_url) }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          
          <Text style={styles.displayName}>
            {profile?.display_name || profile?.username || 'Foodie'}
          </Text>
          <Text style={styles.username}>@{profile?.username || 'username'}</Text>
          
          {profile?.bio && (
            <Text style={styles.bio} numberOfLines={2}>
              {profile.bio}
            </Text>
          )}

          <View style={styles.profileMeta}>
            {profile?.city && (
              <View style={styles.metaItem}>
                <MapPin size={14} color={DS.colors.textGray} />
                <Text style={styles.metaText}>{profile.city}</Text>
              </View>
            )}
            <View style={styles.metaItem}>
              <Calendar size={14} color={DS.colors.textGray} />
              <Text style={styles.metaText}>
                Joined {new Date(profile?.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleShare}>
              <Share2 size={18} color={DS.colors.textWhite} />
              <Text style={styles.primaryButtonText}>Share Profile</Text>
            </TouchableOpacity>
            {profile?.instagram_username && (
              <TouchableOpacity style={styles.secondaryButton}>
                <Instagram size={18} color={DS.colors.textDark} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Quick Stats */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.statsContainer}
          contentContainerStyle={styles.statsContent}
        >
          <StatCard
            icon={Bookmark}
            value={stats.saves}
            label="Saves"
            color={DS.colors.primaryOrange}
          />
          <StatCard
            icon={Grid3X3}
            value={stats.boards}
            label="Boards"
          />
          <StatCard
            icon={Star}
            value={stats.reviews}
            label="Reviews"
          />
          <StatCard
            icon={Users}
            value={stats.followers}
            label="Followers"
          />
          <StatCard
            icon={MapPin}
            value={stats.cities}
            label="Cities"
          />
        </ScrollView>

        {/* Taste Profile */}
        {(stats.cuisines.length > 0 || stats.topNeighborhoods.length > 0) && (
          <View style={styles.tasteProfile}>
            <Text style={styles.sectionTitle}>Taste Profile</Text>
            
            {stats.cuisines.length > 0 && (
              <View style={styles.tasteSection}>
                <Text style={styles.tasteSectionTitle}>Favorite Cuisines</Text>
                <View style={styles.tagContainer}>
                  {stats.cuisines.map((cuisine, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{cuisine}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {stats.topNeighborhoods.length > 0 && (
              <View style={styles.tasteSection}>
                <Text style={styles.tasteSectionTitle}>Top Neighborhoods</Text>
                <View style={styles.tagContainer}>
                  {stats.topNeighborhoods.map((neighborhood, index) => (
                    <View key={index} style={[styles.tag, styles.tagNeighborhood]}>
                      <MapPin size={12} color={DS.colors.primaryOrange} />
                      <Text style={[styles.tagText, { color: DS.colors.primaryOrange }]}>
                        {neighborhood}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Boards Section */}
        <View style={styles.boardsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Boards</Text>
            <View style={styles.viewToggle}>
              <TouchableOpacity
                style={[styles.viewToggleButton, viewMode === 'grid' && styles.viewToggleActive]}
                onPress={() => setViewMode('grid')}
              >
                <Grid3X3 size={16} color={viewMode === 'grid' ? DS.colors.primaryOrange : DS.colors.textGray} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.viewToggleButton, viewMode === 'list' && styles.viewToggleActive]}
                onPress={() => setViewMode('list')}
              >
                <List size={16} color={viewMode === 'list' ? DS.colors.primaryOrange : DS.colors.textGray} />
              </TouchableOpacity>
            </View>
          </View>

          {boards.length === 0 ? (
            <View style={styles.emptyState}>
              <Bookmark size={48} color={DS.colors.textLight} />
              <Text style={styles.emptyTitle}>No boards yet</Text>
              <Text style={styles.emptyText}>
                Start saving restaurants to organize them into boards
              </Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => router.push('/add/create-board')}
              >
                <Plus size={18} color={DS.colors.textWhite} />
                <Text style={styles.emptyButtonText}>Create First Board</Text>
              </TouchableOpacity>
            </View>
          ) : viewMode === 'grid' ? (
            <View style={styles.boardsGrid}>
              {boards.map(renderBoardCard)}
              <TouchableOpacity
                style={[styles.boardCard, styles.addBoardCard]}
                onPress={() => router.push('/add/create-board')}
              >
                <View style={styles.addBoardContent}>
                  <Plus size={24} color={DS.colors.textGray} />
                  <Text style={styles.addBoardText}>New Board</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.listContainer}>
              {boards.map(renderListItem)}
            </View>
          )}
        </View>

        {/* Recent Activity */}
        {posts.length > 0 && (
          <View style={styles.activitySection}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityList}>
              {posts.slice(0, 5).map((post) => (
                <TouchableOpacity
                  key={post.id}
                  style={styles.activityItem}
                  onPress={() => router.push(`/posts/${post.id}`)}
                >
                  <View style={styles.activityIcon}>
                    {post.type === 'review' ? (
                      <Star size={16} color={DS.colors.primaryOrange} />
                    ) : (
                      <MessageSquare size={16} color={DS.colors.textGray} />
                    )}
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityText} numberOfLines={1}>
                      {post.type === 'review' ? 'Reviewed' : 'Posted about'} {post.restaurant_name}
                    </Text>
                    <Text style={styles.activityDate}>
                      {new Date(post.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                  <ChevronRight size={16} color={DS.colors.textGray} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Modals */}
      {showSettingsModal && (
        <SettingsModal visible={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
      )}
      {showEditModal && (
        <EditProfileModal visible={showEditModal} onClose={() => setShowEditModal(false)} />
      )}
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
  headerTitle: {
    ...DS.typography.h1,
    color: DS.colors.textDark,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: DS.spacing.xl,
    paddingHorizontal: DS.spacing.lg,
    backgroundColor: DS.colors.surface,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: DS.spacing.md,
    borderWidth: 3,
    borderColor: DS.colors.primaryOrange,
  },
  displayName: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.xs,
  },
  username: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    marginBottom: DS.spacing.sm,
  },
  bio: {
    ...DS.typography.body,
    color: DS.colors.textDark,
    textAlign: 'center',
    marginBottom: DS.spacing.md,
    paddingHorizontal: DS.spacing.xl,
  },
  profileMeta: {
    flexDirection: 'row',
    gap: DS.spacing.lg,
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
  actionButtons: {
    flexDirection: 'row',
    gap: DS.spacing.sm,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.sm,
    backgroundColor: DS.colors.primaryOrange,
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.sm,
    borderRadius: DS.borderRadius.full,
  },
  primaryButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
  secondaryButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DS.colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    backgroundColor: DS.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  statsContent: {
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.md,
    gap: DS.spacing.md,
  },
  statCard: {
    alignItems: 'center',
    paddingHorizontal: DS.spacing.md,
    minWidth: 70,
  },
  statValue: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginTop: DS.spacing.xs,
  },
  statLabel: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
    marginTop: 2,
  },
  tasteProfile: {
    padding: DS.spacing.lg,
    backgroundColor: DS.colors.surface,
    marginTop: DS.spacing.sm,
  },
  tasteSection: {
    marginTop: DS.spacing.md,
  },
  tasteSectionTitle: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    marginBottom: DS.spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DS.spacing.sm,
  },
  tag: {
    paddingHorizontal: DS.spacing.md,
    paddingVertical: DS.spacing.xs,
    backgroundColor: DS.colors.surfaceLight,
    borderRadius: DS.borderRadius.full,
  },
  tagNeighborhood: {
    backgroundColor: '#FFF4ED',
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.xs,
  },
  tagText: {
    ...DS.typography.caption,
    color: DS.colors.textDark,
    fontWeight: '500',
  },
  boardsSection: {
    padding: DS.spacing.lg,
    backgroundColor: DS.colors.surface,
    marginTop: DS.spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DS.spacing.md,
  },
  sectionTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: DS.colors.surfaceLight,
    borderRadius: DS.borderRadius.md,
    padding: 2,
  },
  viewToggleButton: {
    padding: DS.spacing.sm,
    borderRadius: DS.borderRadius.sm,
  },
  viewToggleActive: {
    backgroundColor: DS.colors.surface,
  },
  boardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DS.spacing.md,
  },
  boardCard: {
    width: CARD_WIDTH,
  },
  boardImages: {
    width: '100%',
    height: CARD_WIDTH,
    borderRadius: DS.borderRadius.md,
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  boardImage: {
    width: '50%',
    height: '50%',
  },
  boardImageSingle: {
    width: '100%',
    height: '100%',
  },
  boardImageDouble: {
    width: '50%',
    height: '100%',
  },
  boardImageTripleFirst: {
    width: '100%',
    height: '50%',
  },
  boardEmptyImage: {
    width: '100%',
    height: CARD_WIDTH,
    borderRadius: DS.borderRadius.md,
    backgroundColor: DS.colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boardInfo: {
    paddingTop: DS.spacing.sm,
  },
  boardName: {
    ...DS.typography.button,
    color: DS.colors.textDark,
  },
  boardCount: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
  },
  addBoardCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBoardContent: {
    width: '100%',
    height: CARD_WIDTH,
    borderRadius: DS.borderRadius.md,
    borderWidth: 2,
    borderColor: DS.colors.borderLight,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBoardText: {
    ...DS.typography.button,
    color: DS.colors.textGray,
    marginTop: DS.spacing.sm,
  },
  listContainer: {
    gap: DS.spacing.xs,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DS.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  listItemLeft: {
    marginRight: DS.spacing.md,
  },
  listItemImage: {
    width: 56,
    height: 56,
    borderRadius: DS.borderRadius.md,
  },
  listItemImagePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: DS.borderRadius.md,
    backgroundColor: DS.colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemContent: {
    flex: 1,
  },
  listItemName: {
    ...DS.typography.button,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.xs,
  },
  listItemDetails: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: DS.spacing.xxxl,
  },
  emptyTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginTop: DS.spacing.md,
  },
  emptyText: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    textAlign: 'center',
    marginTop: DS.spacing.sm,
    marginBottom: DS.spacing.xl,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.sm,
    backgroundColor: DS.colors.primaryOrange,
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.md,
    borderRadius: DS.borderRadius.full,
  },
  emptyButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
  activitySection: {
    padding: DS.spacing.lg,
    backgroundColor: DS.colors.surface,
    marginTop: DS.spacing.sm,
    marginBottom: DS.spacing.xl,
  },
  activityList: {
    marginTop: DS.spacing.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DS.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: DS.colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DS.spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    ...DS.typography.body,
    color: DS.colors.textDark,
    marginBottom: 2,
  },
  activityDate: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
  },
});