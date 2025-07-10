import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  Users,
  TrendingUp,
  MapPin,
  Crown,
  Calendar,
  Heart,
  MessageCircle,
  Bookmark,
  ChevronRight,
  CheckCircle
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Community, CommunityPost } from '@/types/add-flow';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CommunityDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const community: Community = JSON.parse(params.community as string);
  const [activeTab, setActiveTab] = useState<'feed' | 'members' | 'events'>('feed');

  // Mock community posts
  const mockPosts: CommunityPost[] = [
    {
      id: '1',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      content: 'Just had an amazing dinner at State Bird Provisions! Perfect for conference dinners 🍽️',
      images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'],
      likes: 15,
      comments: 4,
      createdAt: new Date('2025-01-09T10:00:00')
    },
    {
      id: '2',
      author: {
        name: 'Mike Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      content: 'Book ahead - it fills up fast during conferences!',
      likes: 8,
      comments: 2,
      createdAt: new Date('2025-01-09T08:00:00')
    }
  ];

  const topContributors = [
    {
      name: 'Sarah Chen',
      role: 'Startup Founder • AI Startup',
      contributions: 15,
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Mike Rodriguez',
      role: 'VC Partner • Andreessen Horowitz',
      contributions: 12,
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      name: 'Alex Chen',
      role: 'Tech Journalist • TechCrunch',
      contributions: 8,
      avatar: 'https://i.pravatar.cc/150?img=4'
    }
  ];

  const handleJoin = () => {
    router.push({
      pathname: '/add/join-community',
      params: { community: params.community }
    });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeft size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}>Community</Text>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreText}>•••</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCommunityInfo = () => (
    <View>
      <Image source={{ uri: community.coverImage }} style={styles.coverImage} />
      
      <View style={styles.communityInfo}>
        <View style={styles.communityHeader}>
          <Text style={styles.communityName}>{community.name}</Text>
          {community.isPremium && (
            <View style={styles.premiumBadge}>
              <Crown size={16} color="#FFD700" />
              <Text style={styles.premiumText}>Premium</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.communityDescription}>{community.description}</Text>
        
        <View style={styles.adminInfo}>
          <Image source={{ uri: community.admin.avatar }} style={styles.adminAvatar} />
          <View>
            <Text style={styles.adminLabel}>Admin: {community.admin.name}</Text>
            {community.admin.verified && (
              <CheckCircle size={14} color="#4CAF50" style={styles.verifiedIcon} />
            )}
          </View>
        </View>
        
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Users size={20} color="#666" />
            <Text style={styles.statValue}>{community.memberCount.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Members</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <TrendingUp size={20} color="#666" />
            <Text style={styles.statValue}>{community.stats.activeMembers}</Text>
            <Text style={styles.statLabel}>Active Today</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <MapPin size={20} color="#666" />
            <Text style={styles.statValue}>{community.location.split(',')[0]}</Text>
            <Text style={styles.statLabel}>Location</Text>
          </View>
        </View>
        
        {!community.isJoined && (
          <TouchableOpacity 
            style={[
              styles.joinButton,
              community.isPremium && styles.joinButtonPremium
            ]}
            onPress={handleJoin}
          >
            <Text style={styles.joinButtonText}>
              {community.price ? `Join for $${community.price}` : 'Join Community'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabs}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'feed' && styles.tabActive]}
        onPress={() => setActiveTab('feed')}
      >
        <Text style={[styles.tabText, activeTab === 'feed' && styles.tabTextActive]}>
          Feed
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tab, activeTab === 'members' && styles.tabActive]}
        onPress={() => setActiveTab('members')}
      >
        <Text style={[styles.tabText, activeTab === 'members' && styles.tabTextActive]}>
          Members
        </Text>
      </TouchableOpacity>
      
      {community.category === 'Event' && (
        <TouchableOpacity
          style={[styles.tab, activeTab === 'events' && styles.tabActive]}
          onPress={() => setActiveTab('events')}
        >
          <Text style={[styles.tabText, activeTab === 'events' && styles.tabTextActive]}>
            Events
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderPost = (post: CommunityPost) => (
    <View key={post.id} style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.author.avatar }} style={styles.postAvatar} />
        <View style={styles.postAuthorInfo}>
          <Text style={styles.postAuthorName}>{post.author.name}</Text>
          <Text style={styles.postTime}>
            {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
      
      <Text style={styles.postContent}>{post.content}</Text>
      
      {post.images && post.images.length > 0 && (
        <Image source={{ uri: post.images[0] }} style={styles.postImage} />
      )}
      
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.postAction}>
          <Heart size={18} color="#666" />
          <Text style={styles.postActionText}>{post.likes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.postAction}>
          <MessageCircle size={18} color="#666" />
          <Text style={styles.postActionText}>{post.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.postAction}>
          <Bookmark size={18} color="#666" />
          <Text style={styles.postActionText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFeed = () => (
    <View style={styles.feedContainer}>
      <Text style={styles.feedRecommendation}>
        Sarah Chen recommended for conference dinners: State Bird Provisions
      </Text>
      <Text style={styles.feedTime}>2 hours ago</Text>
      
      {mockPosts.map(renderPost)}
    </View>
  );

  const renderMembers = () => (
    <View style={styles.membersContainer}>
      <Text style={styles.sectionTitle}>Top Contributors</Text>
      
      {topContributors.map((contributor, index) => (
        <TouchableOpacity key={index} style={styles.memberItem}>
          <Image source={{ uri: contributor.avatar }} style={styles.memberAvatar} />
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{contributor.name}</Text>
            <Text style={styles.memberRole}>{contributor.role}</Text>
            <Text style={styles.memberContributions}>
              {contributor.contributions} contributions
            </Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderEvents = () => (
    <View style={styles.eventsContainer}>
      <View style={styles.eventCard}>
        <Calendar size={24} color={theme.colors.primary} />
        <Text style={styles.eventTitle}>Main Conference</Text>
        <Text style={styles.eventDate}>March 15-17, 2025</Text>
        <ChevronRight size={20} color="#999" />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderCommunityInfo()}
        {renderTabs()}
        
        {activeTab === 'feed' && renderFeed()}
        {activeTab === 'members' && renderMembers()}
        {activeTab === 'events' && renderEvents()}
        
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
  },
  moreButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    fontSize: 20,
    color: '#666',
  },
  coverImage: {
    width: SCREEN_WIDTH,
    height: 180,
  },
  communityInfo: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  communityName: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#333',
    flex: 1,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700' + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  premiumText: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: '#FFD700',
  },
  communityDescription: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginBottom: 16,
    lineHeight: 24,
  },
  adminInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  adminAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  adminLabel: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#666',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
  },
  joinButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinButtonPremium: {
    backgroundColor: '#FFD700',
  },
  joinButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#999',
  },
  tabTextActive: {
    color: theme.colors.primary,
    fontFamily: 'Inter_600SemiBold',
  },
  feedContainer: {
    padding: 20,
  },
  feedRecommendation: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#333',
    marginBottom: 4,
  },
  feedTime: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#999',
    marginBottom: 20,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postAuthorInfo: {
    flex: 1,
  },
  postAuthorName: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
  },
  postTime: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#999',
  },
  postContent: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#333',
    marginBottom: 12,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    gap: 24,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  postActionText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#666',
  },
  membersContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 16,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
  },
  memberRole: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  memberContributions: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: theme.colors.primary,
  },
  followButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  followButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: theme.colors.primary,
  },
  eventsContainer: {
    padding: 20,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  eventTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
  },
  eventDate: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  bottomPadding: {
    height: 50,
  },
});