import { theme } from '@/constants/theme';
import { useApp } from '@/contexts/AppContext';
import { ActivityItem, SuggestedActivity, TrendingActivity } from '@/types/core';
import { useRouter } from 'expo-router';
import {
    Bookmark,
    ChevronLeft,
    MessageCircle,
    TrendingUp,
    Users
} from 'lucide-react-native';
import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function ActivityScreen() {
  const router = useRouter();
  const { userState } = useApp();

  // Mock data for suggested activities
  const suggestedActivities: SuggestedActivity[] = [
    {
      title: 'Save Your First Restaurant',
      description: 'Start building your collection and get recommendations',
      icon: Bookmark,
      action: 'Explore Restaurants',
      benefit: 'Get personalized suggestions',
      color: 'bg-blue-50 border-blue-200',
      onClick: () => router.push('/explore')
    },
    {
      title: 'Follow Local Troodies',
      description: 'Connect with local food enthusiasts',
      icon: Users,
      action: 'Find Troodies',
      benefit: 'Discover hidden gems',
      color: 'bg-green-50 border-green-200',
      onClick: () => router.push('/explore')
    },
    {
      title: 'Share Your Experience',
      description: 'Post about your recent restaurant visit',
      icon: MessageCircle,
      action: 'Add Post',
      benefit: 'Build your reputation',
      color: 'bg-purple-50 border-purple-200',
      onClick: () => {}
    },
  ];

  // Mock data for trending activity
  const trendingActivities: TrendingActivity[] = [
    {
      type: 'trending_save',
      restaurant: 'RoofTop Garden',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
      stats: '247 saves today',
      description: 'Mediterranean restaurant trending in SoHo'
    },
    {
      type: 'new_opening',
      restaurant: 'Corner Coffee Co',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
      stats: '189 early visits',
      description: 'New coffee shop getting great reviews'
    },
    {
      type: 'local_favorite',
      restaurant: 'Sakura Omakase',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
      stats: '195 saves this week',
      description: 'Local favorite for authentic Japanese cuisine'
    },
  ];

  // Mock data for activity items (when user has activity)
  const activityItems: ActivityItem[] = [
    {
      id: 1,
      type: 'like',
      user: {
        id: 1,
        name: 'Sarah Chen',
        username: 'sarahchen',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      action: 'liked your save',
      target: 'The Italian Place',
      time: '2 hours ago',
      restaurant: {
        id: 1,
        name: 'The Italian Place',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
        cuisine: 'Italian',
        rating: 4.8,
        location: 'West Village',
        priceRange: '$$$'
      }
    },
    {
      id: 2,
      type: 'follow',
      user: {
        id: 2,
        name: 'Mike Rodriguez',
        username: 'mikerodriguez',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      action: 'started following you',
      time: '5 hours ago'
    },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeft size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}>Activity</Text>
      <View style={styles.placeholder} />
    </View>
  );

  const renderEmptyState = () => (
    <>
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyTitle}>Your Activity Will Appear Here</Text>
        <Text style={styles.emptyDescription}>
          When you start saving restaurants and connecting with troodies,{'\n'}
          you&apos;ll see likes, comments, and new followers here.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Get Started</Text>
        {suggestedActivities.map((activity, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.activityCard, { borderColor: '#E5E5E5' }]}
            onPress={activity.onClick}
          >
            <View style={[styles.activityIcon, { backgroundColor: theme.colors.primary + '20' }]}>
              <activity.icon size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityDescription}>{activity.description}</Text>
              <Text style={styles.activityBenefit}>{activity.benefit}</Text>
            </View>
            <TouchableOpacity style={styles.activityCTA} onPress={activity.onClick}>
              <Text style={styles.activityCTAText}>{activity.action}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>What&apos;s Happening</Text>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        </View>
        
        {trendingActivities.map((trending, index) => (
          <TouchableOpacity key={index} style={styles.trendingCard}>
            <Image source={{ uri: trending.image }} style={styles.trendingImage} />
            <View style={styles.trendingContent}>
              <Text style={styles.trendingRestaurant}>{trending.restaurant}</Text>
              <Text style={styles.trendingDescription}>{trending.description}</Text>
              <View style={styles.trendingStats}>
                <TrendingUp size={14} color={theme.colors.primary} />
                <Text style={styles.trendingStatsText}>{trending.stats}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.trendingButton}>
              <Text style={styles.trendingButtonText}>Save</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderActiveState = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      {activityItems.map((item) => (
        <TouchableOpacity key={item.id} style={styles.activityItem}>
          <Image source={{ uri: item.user.avatar }} style={styles.activityAvatar} />
          <View style={styles.activityItemContent}>
            <Text style={styles.activityText}>
              <Text style={styles.activityUserName}>{item.user.name}</Text>
              {' '}{item.action}
              {item.target && (
                <>
                  {' '}
                  <Text style={styles.activityTarget}>{item.target}</Text>
                </>
              )}
            </Text>
            <Text style={styles.activityTime}>{item.time}</Text>
          </View>
          {item.type === 'follow' && (
            <TouchableOpacity style={styles.followBackButton}>
              <Text style={styles.followBackText}>Follow</Text>
            </TouchableOpacity>
          )}
          {item.restaurant && (
            <Image 
              source={{ uri: item.restaurant.image }} 
              style={styles.activityRestaurantImage} 
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {userState.hasLimitedActivity ? renderEmptyState() : renderActiveState()}
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
  placeholder: {
    width: 40,
  },
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4444',
  },
  liveText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#FF4444',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginBottom: 4,
  },
  activityBenefit: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: theme.colors.primary,
  },
  activityCTA: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  activityCTAText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  trendingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
  trendingImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  trendingContent: {
    flex: 1,
  },
  trendingRestaurant: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 2,
  },
  trendingDescription: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginBottom: 4,
  },
  trendingStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendingStatsText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: theme.colors.primary,
  },
  trendingButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  trendingButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  activityItemContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#333',
    marginBottom: 2,
  },
  activityUserName: {
    fontFamily: 'Inter_600SemiBold',
  },
  activityTarget: {
    fontFamily: 'Inter_600SemiBold',
  },
  activityTime: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#999',
  },
  followBackButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  followBackText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  activityRestaurantImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginLeft: 12,
  },
  bottomPadding: {
    height: 100,
  },
});