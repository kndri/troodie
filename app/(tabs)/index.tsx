import { RestaurantCard } from '@/components/cards/RestaurantCard';
import { theme } from '@/constants/theme';
import { useApp } from '@/contexts/AppContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { personas } from '@/data/personas';
import { NetworkSuggestion, TrendingContent } from '@/types/core';
import { useRouter } from 'expo-router';
import {
  Bell,
  Bookmark,
  Coffee,
  MapPin,
  Plus,
  Search,
  Share2,
  Users,
  Utensils
} from 'lucide-react-native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { userState } = useApp();
  const { state: onboardingState } = useOnboarding();
  
  const persona = onboardingState.persona && personas[onboardingState.persona];

  // Mock data for trending restaurants
  const trendingRestaurants: TrendingContent[] = [
    {
      restaurant: {
        id: 1,
        name: 'Mediterranean Bliss',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
        cuisine: 'Mediterranean',
        rating: 4.8,
        location: 'SoHo',
        priceRange: '$$',
      },
      stats: {
        saves: 247,
        visits: 892,
        photos: 156
      },
      highlights: ['Great for dates', 'Amazing views'],
      type: 'trending_spot'
    },
    {
      restaurant: {
        id: 2,
        name: 'Corner Coffee Co',
        image: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800',
        cuisine: 'Coffee & Brunch',
        rating: 4.6,
        location: 'East Village',
        priceRange: '$',
      },
      stats: {
        saves: 189,
        visits: 567,
        photos: 89
      },
      highlights: ['Perfect for work', 'Great wifi'],
      type: 'local_favorite'
    },
  ];

  const networkSuggestions: NetworkSuggestion[] = [
    {
      action: 'Invite Friends',
      description: 'Connect with friends to see their favorite spots',
      icon: Users,
      cta: 'Send Invites',
      benefit: 'Get personalized recommendations',
      onClick: () => {}
    },
    {
      action: 'Follow Local Troodies',
      description: 'Discover through local food enthusiasts',
      icon: MapPin,
      cta: 'Find Troodies',
      benefit: 'Get insider tips',
      onClick: () => router.push('/explore')
    },
    {
      action: 'Share Your First Save',
      description: 'Save a restaurant and share your experience',
      icon: Share2,
      cta: 'Add Restaurant',
      benefit: 'Build your food map',
      onClick: () => {}
    },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.brandName}>troodie</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/explore')}>
            <Search size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Bell size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.tagline}>Social Commerce Platform</Text>
    </View>
  );

  const renderWelcomeBanner = () => (
    <View style={styles.welcomeBanner}>
      <Text style={styles.welcomeTitle}>Welcome to troodie!</Text>
      <Text style={styles.welcomeDescription}>
        Discover amazing restaurants and build your food network
      </Text>
      <TouchableOpacity 
        style={styles.welcomeCTA} 
        onPress={() => router.push('/explore')}
      >
        <Text style={styles.welcomeCTAText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );

  const renderNetworkBuilding = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Build Your Network</Text>
      <View style={styles.networkCards}>
        {networkSuggestions.map((suggestion, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.networkCard}
            onPress={suggestion.onClick}
          >
            <View style={styles.networkCardIcon}>
              <suggestion.icon size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.networkCardContent}>
              <Text style={styles.networkCardTitle}>{suggestion.action}</Text>
              <Text style={styles.networkCardDescription}>{suggestion.description}</Text>
              <Text style={styles.networkCardBenefit}>{suggestion.benefit}</Text>
            </View>
            <TouchableOpacity style={styles.networkCardCTA} onPress={suggestion.onClick}>
              <Text style={styles.networkCardCTAText}>{suggestion.cta}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

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

  const renderYourSaves = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Saves</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      
      {userState.isNewUser ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyStateIcon}>
            <Bookmark size={32} color="#DDD" />
          </View>
          <Text style={styles.emptyStateTitle}>Start Building Your Collection</Text>
          <Text style={styles.emptyStateDescription}>
            Save restaurants you love or want to try
          </Text>
          <TouchableOpacity style={styles.emptyStateCTA} onPress={() => router.push('/explore')}>
            <Text style={styles.emptyStateCTAText}>Discover Restaurants</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.placeholderText}>Saved restaurants will appear here</Text>
      )}
    </View>
  );

  const renderTrending = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>What&apos;s Hot Right Now</Text>
        <TouchableOpacity style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live</Text>
        </TouchableOpacity>
      </View>
      
      {trendingRestaurants.map((item, index) => (
        <View key={index} style={styles.trendingCard}>
          <RestaurantCard 
            restaurant={item.restaurant}
            stats={item.stats}
            onPress={() => {}}
          />
          <View style={styles.trendingHighlights}>
            {item.highlights.map((highlight, idx) => (
              <View key={idx} style={styles.highlightBadge}>
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <TouchableOpacity style={styles.quickActionButton}>
        <Plus size={20} color="#FFFFFF" />
        <Text style={styles.quickActionText}>Add Place</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHeader()}
        
        {userState.isNewUser && renderWelcomeBanner()}
        
        {userState.friendsCount < 5 && renderNetworkBuilding()}
        
        {renderPersonalizedSection()}
        
        {renderYourSaves()}
        
        {renderTrending()}
        
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      {renderQuickActions()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagline: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginTop: 4,
  },
  welcomeBanner: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 24,
    backgroundColor: 'rgba(255, 173, 39, 0.1)',
    borderRadius: 16,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#333',
    marginBottom: 8,
  },
  welcomeDescription: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeCTA: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  welcomeCTAText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: theme.colors.primary,
  },
  networkCards: {
    paddingHorizontal: 20,
    gap: 12,
  },
  networkCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  networkCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  networkCardContent: {
    flex: 1,
  },
  networkCardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 2,
  },
  networkCardDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginBottom: 4,
  },
  networkCardBenefit: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: theme.colors.primary,
  },
  networkCardCTA: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  networkCardCTAText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  personaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  personaEmoji: {
    fontSize: 16,
  },
  personaName: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#666',
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  categoryCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginBottom: 8,
  },
  categoryCount: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: theme.colors.primary,
    marginBottom: 12,
  },
  categoryButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  categoryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 40,
  },
  emptyStateIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyStateCTA: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  emptyStateCTAText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  placeholderText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#999',
    textAlign: 'center',
    paddingVertical: 32,
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
  trendingCard: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  trendingHighlights: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  highlightBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  highlightText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#666',
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
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  bottomPadding: {
    height: 100,
  },
});
