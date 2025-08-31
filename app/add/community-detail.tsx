/**
 * COMMUNITY DETAIL SCREEN - V1.0 Design
 * Clean community feed with posts, members, and admin features
 */

import { CreatePostButton } from '@/components/community/CreatePostButton';
import { DS } from '@/components/design-system/tokens';
import { PostCard } from '@/components/PostCard';
import { useAuth } from '@/contexts/AuthContext';
import { Community, communityService } from '@/services/communityService';
import { getRoleBadgeColor, getRoleDisplayName, useCommunityPermissions } from '@/utils/communityPermissions';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Edit2,
  Globe,
  Lock,
  MapPin,
  MessageSquare,
  MoreVertical,
  Settings,
  Shield,
  TrendingUp,
  UserMinus,
  UserPlus,
  Users
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
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

type Tab = 'feed' | 'members' | 'about';

export default function CommunityDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const communityId = params.communityId as string;
  
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('feed');
  const [members, setMembers] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  // Use permissions hook
  const { role, hasPermission } = useCommunityPermissions(communityId, user?.id);

  const loadCommunityData = async () => {
    if (!communityId) {
      Alert.alert('Error', 'Community ID is missing');
      router.back();
      return;
    }

    try {
      setRefreshing(true);
      
      // Get community with membership info
      let communityData;
      if (user) {
        communityData = await communityService.getCommunityWithMembership(communityId, user.id);
        if (communityData) {
          setIsMember(!!communityData.user_role);
        }
      } else {
        communityData = await communityService.getCommunity(communityId);
      }
      
      if (!communityData) {
        Alert.alert('Error', 'Community not found');
        router.back();
        return;
      }
      
      setCommunity(communityData);
      
      // Load posts
      const postsData = await communityService.getCommunityPosts(communityId);
      setPosts(postsData || []);
      
      // Load members
      const membersData = await communityService.getCommunityMembers(communityId);
      setMembers(membersData || []);
      
    } catch (error) {
      console.error('Error loading community:', error);
      Alert.alert('Error', 'Failed to load community');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCommunityData();
  }, [communityId, user]);

  const handleJoinCommunity = async () => {
    if (!user) {
      router.push('/onboarding/login');
      return;
    }

    try {
      const { success } = await communityService.joinCommunity(user.id, communityId);
      if (success) {
        setIsMember(true);
        loadCommunityData();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to join community');
    }
  };

  const handleLeaveCommunity = async () => {
    Alert.alert(
      'Leave Community',
      'Are you sure you want to leave this community?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: async () => {
            try {
              const { success } = await communityService.leaveCommunity(user!.id, communityId);
              if (success) {
                setIsMember(false);
                loadCommunityData();
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to leave community');
            }
          }
        }
      ]
    );
  };

  const renderHeader = () => {
    if (!community) return null;
    
    const coverImage = community.is_event_based 
      ? 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
      : 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800';

    return (
      <View>
        {/* Cover Image with Back Button */}
        <View style={styles.coverContainer}>
          <Image source={{ uri: coverImage }} style={styles.coverImage} />
          <View style={styles.coverOverlay} />
          
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={DS.colors.textWhite} />
          </TouchableOpacity>

          {isMember && (
            <TouchableOpacity 
              style={styles.moreButton}
              onPress={() => setShowMoreMenu(!showMoreMenu)}
            >
              <MoreVertical size={24} color={DS.colors.textWhite} />
            </TouchableOpacity>
          )}

          {/* Community Info Overlay */}
          <View style={styles.coverContent}>
            <View style={styles.communityHeader}>
              <Text style={styles.communityName}>{community.name}</Text>
              <View style={styles.badges}>
                {community.type === 'private' && (
                  <View style={styles.badge}>
                    <Lock size={12} color={DS.colors.textWhite} />
                    <Text style={styles.badgeText}>Private</Text>
                  </View>
                )}
                {community.is_event_based && (
                  <View style={styles.badge}>
                    <Calendar size={12} color={DS.colors.textWhite} />
                    <Text style={styles.badgeText}>Event</Text>
                  </View>
                )}
              </View>
            </View>

            {community.description && (
              <Text style={styles.communityDescription} numberOfLines={2}>
                {community.description}
              </Text>
            )}

            <View style={styles.communityStats}>
              <View style={styles.statItem}>
                <Users size={16} color={DS.colors.textWhite} />
                <Text style={styles.statText}>
                  {community.member_count.toLocaleString()} members
                </Text>
              </View>
              {community.location && (
                <View style={styles.statItem}>
                  <MapPin size={16} color={DS.colors.textWhite} />
                  <Text style={styles.statText}>{community.location}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* More Menu Dropdown */}
        {showMoreMenu && (
          <View style={styles.moreMenu}>
            {hasPermission('manage_settings') && (
              <TouchableOpacity 
                style={styles.moreMenuItem}
                onPress={() => {
                  setShowMoreMenu(false);
                  router.push({
                    pathname: '/add/community-edit',
                    params: { communityId }
                  });
                }}
              >
                <Settings size={18} color={DS.colors.textDark} />
                <Text style={styles.moreMenuText}>Manage Community</Text>
              </TouchableOpacity>
            )}
            
            {hasPermission('view_audit_log') && (
              <TouchableOpacity 
                style={styles.moreMenuItem}
                onPress={() => {
                  setShowMoreMenu(false);
                  router.push({
                    pathname: '/add/community-audit-logs',
                    params: { communityId }
                  });
                }}
              >
                <Shield size={18} color={DS.colors.textDark} />
                <Text style={styles.moreMenuText}>Audit Logs</Text>
              </TouchableOpacity>
            )}
            
            {isMember && (
              <TouchableOpacity 
                style={styles.moreMenuItem}
                onPress={() => {
                  setShowMoreMenu(false);
                  handleLeaveCommunity();
                }}
              >
                <UserMinus size={18} color={DS.colors.error} />
                <Text style={[styles.moreMenuText, { color: DS.colors.error }]}>
                  Leave Community
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Action Button */}
        {!isMember && community.type === 'public' && (
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.joinButton} onPress={handleJoinCommunity}>
              <UserPlus size={18} color={DS.colors.textWhite} />
              <Text style={styles.joinButtonText}>Join Community</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'feed' && styles.tabActive]}
            onPress={() => setActiveTab('feed')}
          >
            <MessageSquare size={18} color={activeTab === 'feed' ? DS.colors.primaryOrange : DS.colors.textGray} />
            <Text style={[styles.tabText, activeTab === 'feed' && styles.tabTextActive]}>
              Feed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'members' && styles.tabActive]}
            onPress={() => setActiveTab('members')}
          >
            <Users size={18} color={activeTab === 'members' ? DS.colors.primaryOrange : DS.colors.textGray} />
            <Text style={[styles.tabText, activeTab === 'members' && styles.tabTextActive]}>
              Members
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'about' && styles.tabActive]}
            onPress={() => setActiveTab('about')}
          >
            <Globe size={18} color={activeTab === 'about' ? DS.colors.primaryOrange : DS.colors.textGray} />
            <Text style={[styles.tabText, activeTab === 'about' && styles.tabTextActive]}>
              About
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderFeed = () => {
    if (posts.length === 0) {
      return (
        <View style={styles.emptyState}>
          <MessageSquare size={48} color={DS.colors.textGray} />
          <Text style={styles.emptyTitle}>No posts yet</Text>
          <Text style={styles.emptyDescription}>
            {isMember ? 'Be the first to share something!' : 'Join to see community posts'}
          </Text>
          {isMember && (
            <TouchableOpacity 
              style={styles.createPostButton}
              onPress={() => router.push({
                pathname: '/add/create-post',
                params: { communityId }
              })}
            >
              <Edit2 size={18} color={DS.colors.textWhite} />
              <Text style={styles.createPostButtonText}>Create Post</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    return (
      <View style={styles.feedContainer}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onPress={() => router.push(`/posts/${post.id}`)}
            onLike={() => {}}
            onComment={() => router.push(`/posts/${post.id}`)}
            onShare={() => {}}
          />
        ))}
      </View>
    );
  };

  const renderMembers = () => {
    if (members.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Users size={48} color={DS.colors.textGray} />
          <Text style={styles.emptyTitle}>No members yet</Text>
          <Text style={styles.emptyDescription}>
            Be the first to join this community!
          </Text>
        </View>
      );
    }

    // Transform members data to include user details
    const transformedMembers = members.map(m => ({
      ...m,
      name: m.user?.name || m.user?.username || 'Unknown',
      avatar_url: m.user?.avatar_url,
      email: m.user?.email
    }));

    return (
      <ScrollView style={styles.membersContainer}>
        <Text style={styles.membersSectionTitle}>Community Members ({transformedMembers.length})</Text>
        
        {/* Admins and Moderators First */}
        {transformedMembers
          .filter(m => m.role === 'owner' || m.role === 'admin' || m.role === 'moderator')
          .map((member) => (
            <TouchableOpacity 
              key={member.id} 
              style={styles.memberCard}
              onPress={() => member.user?.id && router.push(`/user/${member.user.id}`)}
            >
              <View style={styles.memberInfo}>
                {member.avatar_url ? (
                  <Image source={{ uri: member.avatar_url }} style={styles.memberAvatar} />
                ) : (
                  <View style={styles.memberAvatarPlaceholder}>
                    <Text style={styles.memberAvatarText}>
                      {member.name?.charAt(0) || 'U'}
                    </Text>
                  </View>
                )}
                <View style={styles.memberDetails}>
                  <View style={styles.memberNameRow}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    {member.role && member.role !== 'member' && (
                      <View style={[styles.roleBadge, { backgroundColor: getRoleBadgeColor(member.role) }]}>
                        <Text style={styles.roleText}>
                          {getRoleDisplayName(member.role)}
                        </Text>
                      </View>
                    )}
                  </View>
                  {member.joined_at && (
                    <Text style={styles.memberBio} numberOfLines={1}>
                      Joined {new Date(member.joined_at).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </Text>
                  )}
                </View>
              </View>
              <ChevronRight size={20} color={DS.colors.textGray} />
            </TouchableOpacity>
          ))}
        
        {/* Regular Members */}
        {transformedMembers
          .filter(m => m.role === 'member')
          .map((member) => (
            <TouchableOpacity 
              key={member.id} 
              style={styles.memberCard}
              onPress={() => member.user?.id && router.push(`/user/${member.user.id}`)}
            >
              <View style={styles.memberInfo}>
                {member.avatar_url ? (
                  <Image source={{ uri: member.avatar_url }} style={styles.memberAvatar} />
                ) : (
                  <View style={styles.memberAvatarPlaceholder}>
                    <Text style={styles.memberAvatarText}>
                      {member.name?.charAt(0) || 'U'}
                    </Text>
                  </View>
                )}
                <View style={styles.memberDetails}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  {member.joined_at && (
                    <Text style={styles.memberBio} numberOfLines={1}>
                      Joined {new Date(member.joined_at).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </Text>
                  )}
                </View>
              </View>
              <ChevronRight size={20} color={DS.colors.textGray} />
            </TouchableOpacity>
          ))}
      </ScrollView>
    );
  };

  const renderAbout = () => {
    if (!community) return null;

    return (
      <ScrollView style={styles.aboutContainer}>
        {/* Description Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About This Community</Text>
          <Text style={styles.aboutText}>
            {community.description || 'No description available'}
          </Text>
        </View>

        {/* Location & Event Info */}
        {community.location && (
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>Location</Text>
            <View style={styles.aboutRow}>
              <MapPin size={16} color={DS.colors.textGray} />
              <Text style={styles.aboutText}>{community.location}</Text>
            </View>
          </View>
        )}

        {community.is_event_based && community.event_date && (
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>Event Date</Text>
            <View style={styles.aboutRow}>
              <Calendar size={16} color={DS.colors.textGray} />
              <Text style={styles.aboutText}>
                {new Date(community.event_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </View>
          </View>
        )}

        {/* Community Type */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>Community Type</Text>
          <View style={styles.aboutRow}>
            {community.type === 'private' ? (
              <Lock size={16} color={DS.colors.textGray} />
            ) : community.type === 'paid' ? (
              <Shield size={16} color={DS.colors.textGray} />
            ) : (
              <Globe size={16} color={DS.colors.textGray} />
            )}
            <Text style={styles.aboutText}>
              {community.type === 'private' ? 'Private Community' : 
               community.type === 'paid' ? 'Premium Community' : 
               'Public Community'}
            </Text>
          </View>
        </View>

        {/* Category */}
        {community.category && (
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>Category</Text>
            <Text style={styles.aboutText}>{community.category}</Text>
          </View>
        )}

        {/* Community Stats */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>Community Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Users size={24} color={DS.colors.primaryOrange} />
              <Text style={styles.statNumber}>
                {community.member_count.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>Members</Text>
            </View>
            <View style={styles.statCard}>
              <MessageSquare size={24} color={DS.colors.primaryOrange} />
              <Text style={styles.statNumber}>
                {posts.length.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            {community.activity_level > 0 && (
              <View style={styles.statCard}>
                <TrendingUp size={24} color={DS.colors.primaryOrange} />
                <Text style={styles.statNumber}>
                  Level {community.activity_level}
                </Text>
                <Text style={styles.statLabel}>Activity</Text>
              </View>
            )}
          </View>
        </View>

        {/* Created Info */}
        <View style={styles.aboutSection}>
          <Text style={styles.createdText}>
            Created {new Date(community.created_at).toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </Text>
        </View>
      </ScrollView>
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

  if (!community) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Community not found</Text>
          <TouchableOpacity style={styles.backButtonAlt} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
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
            onRefresh={loadCommunityData}
            tintColor={DS.colors.primaryOrange}
          />
        }
      >
        {renderHeader()}
        
        <View style={styles.content}>
          {activeTab === 'feed' && renderFeed()}
          {activeTab === 'members' && renderMembers()}
          {activeTab === 'about' && renderAbout()}
        </View>
      </ScrollView>

      {/* Floating Create Post Button */}
      {isMember && activeTab === 'feed' && (
        <CreatePostButton communityId={communityId} />
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
  backButtonAlt: {
    paddingHorizontal: DS.spacing.xl,
    paddingVertical: DS.spacing.md,
    backgroundColor: DS.colors.primaryOrange,
    borderRadius: DS.borderRadius.md,
  },
  backButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
  
  // Cover Section
  coverContainer: {
    height: 240,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backButton: {
    position: 'absolute',
    top: DS.spacing.xl,
    left: DS.spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    position: 'absolute',
    top: DS.spacing.xl,
    right: DS.spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: DS.spacing.lg,
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: DS.spacing.sm,
  },
  communityName: {
    ...DS.typography.h1,
    color: DS.colors.textWhite,
    flex: 1,
  },
  badges: {
    flexDirection: 'row',
    gap: DS.spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: DS.spacing.sm,
    paddingVertical: 4,
    borderRadius: DS.borderRadius.sm,
  },
  badgeText: {
    ...DS.typography.caption,
    color: DS.colors.textWhite,
    fontSize: 11,
  },
  communityDescription: {
    ...DS.typography.body,
    color: DS.colors.textWhite,
    opacity: 0.9,
    marginBottom: DS.spacing.md,
  },
  communityStats: {
    flexDirection: 'row',
    gap: DS.spacing.lg,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.xs,
  },
  statText: {
    ...DS.typography.metadata,
    color: DS.colors.textWhite,
    opacity: 0.9,
  },
  
  // More Menu
  moreMenu: {
    position: 'absolute',
    top: 80,
    right: DS.spacing.lg,
    backgroundColor: DS.colors.surface,
    borderRadius: DS.borderRadius.md,
    ...DS.shadows.md,
    zIndex: 1000,
    minWidth: 200,
  },
  moreMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.sm,
    padding: DS.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  moreMenuText: {
    ...DS.typography.body,
    color: DS.colors.textDark,
  },
  
  // Action Button
  actionContainer: {
    padding: DS.spacing.lg,
    backgroundColor: DS.colors.surface,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: DS.spacing.sm,
    paddingVertical: DS.spacing.md,
    backgroundColor: DS.colors.primaryOrange,
    borderRadius: DS.borderRadius.md,
  },
  joinButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
  
  // Tabs
  tabs: {
    flexDirection: 'row',
    backgroundColor: DS.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: DS.spacing.xs,
    paddingVertical: DS.spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: DS.colors.primaryOrange,
  },
  tabText: {
    ...DS.typography.button,
    color: DS.colors.textGray,
  },
  tabTextActive: {
    color: DS.colors.primaryOrange,
  },
  
  // Content
  content: {
    minHeight: 400,
  },
  feedContainer: {
    padding: DS.spacing.lg,
  },
  createPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.sm,
    paddingHorizontal: DS.spacing.xl,
    paddingVertical: DS.spacing.md,
    backgroundColor: DS.colors.primaryOrange,
    borderRadius: DS.borderRadius.md,
    marginTop: DS.spacing.lg,
  },
  createPostButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
  
  // Members
  membersContainer: {
    padding: DS.spacing.lg,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: DS.colors.surface,
    padding: DS.spacing.md,
    borderRadius: DS.borderRadius.md,
    marginBottom: DS.spacing.sm,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  memberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: DS.spacing.md,
  },
  memberAvatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: DS.colors.primaryOrange,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DS.spacing.md,
  },
  memberAvatarText: {
    ...DS.typography.h3,
    color: DS.colors.textWhite,
  },
  memberDetails: {
    flex: 1,
  },
  memberNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.sm,
    marginBottom: 2,
  },
  memberName: {
    ...DS.typography.body,
    color: DS.colors.textDark,
  },
  memberBio: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
    marginTop: 2,
  },
  membersSectionTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.md,
  },
  roleBadge: {
    paddingHorizontal: DS.spacing.sm,
    paddingVertical: 2,
    borderRadius: DS.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  roleText: {
    ...DS.typography.caption,
    color: DS.colors.textWhite,
    fontSize: 11,
    fontWeight: '600',
  },
  
  // About
  aboutContainer: {
    padding: DS.spacing.lg,
  },
  aboutSection: {
    marginBottom: DS.spacing.xl,
  },
  aboutTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.sm,
  },
  aboutText: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    lineHeight: 22,
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: DS.spacing.md,
    marginTop: DS.spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: DS.colors.surfaceLight,
    padding: DS.spacing.lg,
    borderRadius: DS.borderRadius.md,
    alignItems: 'center',
  },
  statNumber: {
    ...DS.typography.h2,
    color: DS.colors.primaryOrange,
    marginVertical: DS.spacing.sm,
  },
  statLabel: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
  },
  rulesList: {
    gap: DS.spacing.sm,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: DS.spacing.sm,
  },
  ruleBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: DS.colors.primaryOrange,
    marginTop: 6,
  },
  ruleText: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    flex: 1,
    lineHeight: 22,
  },
  topicTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DS.spacing.sm,
    marginTop: DS.spacing.sm,
  },
  topicTag: {
    backgroundColor: `${DS.colors.primaryOrange}15`,
    paddingHorizontal: DS.spacing.md,
    paddingVertical: DS.spacing.sm,
    borderRadius: DS.borderRadius.full,
  },
  topicTagText: {
    ...DS.typography.caption,
    color: DS.colors.primaryOrange,
    fontWeight: '500',
  },
  createdText: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
    textAlign: 'center',
    fontStyle: 'italic',
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
  },
});