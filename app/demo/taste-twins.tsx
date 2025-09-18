/**
 * TASTE TWIN MATCHING - Full Screen Demo
 * AI-powered food preference matching
 */

import { useRouter } from 'expo-router';
import {
  ChevronRight,
  Heart,
  MapPin,
  Sparkles,
  Star,
  TrendingUp
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock data for taste twins
const MOCK_TWINS = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/200?img=9',
    matchPercent: 97,
    bio: 'Food blogger exploring NYC\'s hidden gems',
    stats: {
      savedSpots: 342,
      reviews: 89,
      followers: 1234
    },
    sharedTastes: ['Spicy Lover', 'Late Night Eats', 'Hidden Gems', 'Asian Fusion', 'Natural Wine'],
    differences: ['Vegetarian Options', 'Brunch Spots'],
    recentFinds: [
      { name: 'Xi\'an Famous Foods', rating: 4.8, type: 'Chinese', saved: true },
      { name: 'Prince Street Pizza', rating: 4.9, type: 'Pizza', saved: false },
      { name: 'Mamoun\'s Falafel', rating: 4.7, type: 'Middle Eastern', saved: true },
    ]
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    avatar: 'https://i.pravatar.cc/200?img=11',
    matchPercent: 92,
    bio: 'Cocktail enthusiast & taco tuesday regular',
    stats: {
      savedSpots: 256,
      reviews: 134,
      followers: 892
    },
    sharedTastes: ['Craft Cocktails', 'Tacos', 'Rooftop Bars', 'Happy Hours'],
    differences: ['Fine Dining', 'Desserts'],
    recentFinds: [
      { name: 'Death & Co', rating: 4.9, type: 'Cocktail Bar', saved: true },
      { name: 'Los Tacos No. 1', rating: 4.8, type: 'Mexican', saved: true },
    ]
  }
];

export default function TasteTwinsScreen() {
  const router = useRouter();
  const [currentTwin, setCurrentTwin] = useState(MOCK_TWINS[0]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const pulseAnim = new Animated.Value(1);

  React.useEffect(() => {
    // Pulse animation for match percentage
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronRight size={20} color="#262626" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Sparkles size={16} color="#EF4444" />
          <Text style={styles.headerTitle}>Taste Twins</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Match Card */}
        <View style={styles.matchCard}>
          <View style={styles.matchVisual}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/200?img=1' }}
              style={styles.yourAvatar}
            />

            <Animated.View style={[styles.matchCircle, { transform: [{ scale: pulseAnim }] }]}>
              <Text style={styles.matchPercent}>{currentTwin.matchPercent}%</Text>
              <Text style={styles.matchLabel}>MATCH</Text>
            </Animated.View>

            <Image
              source={{ uri: currentTwin.avatar }}
              style={styles.twinAvatar}
            />
          </View>

          <Text style={styles.twinName}>{currentTwin.name}</Text>
          <Text style={styles.twinBio}>{currentTwin.bio}</Text>

          <View style={styles.twinStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{currentTwin.stats.savedSpots}</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{currentTwin.stats.reviews}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{currentTwin.stats.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow Twin</Text>
          </TouchableOpacity>
        </View>

        {/* Taste Analysis */}
        <TouchableOpacity
          style={styles.analysisToggle}
          onPress={() => setShowAnalysis(!showAnalysis)}
        >
          <Text style={styles.analysisToggleText}>
            {showAnalysis ? 'Hide' : 'Show'} Taste Analysis
          </Text>
          <ChevronRight
            size={16}
            color="#8C8C8C"
            style={{ transform: [{ rotate: showAnalysis ? '90deg' : '0deg' }] }}
          />
        </TouchableOpacity>

        {showAnalysis && (
          <View style={styles.analysisSection}>
            <View style={styles.tastesContainer}>
              <Text style={styles.sectionTitle}>Shared Tastes</Text>
              <View style={styles.tasteChips}>
                {currentTwin.sharedTastes.map((taste) => (
                  <View key={taste} style={styles.tasteChip}>
                    <Text style={styles.tasteChipText}>{taste}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.tastesContainer}>
              <Text style={styles.sectionTitle}>Your Differences</Text>
              <View style={styles.tasteChips}>
                {currentTwin.differences.map((diff) => (
                  <View key={diff} style={[styles.tasteChip, styles.differenceChip]}>
                    <Text style={styles.differenceChipText}>{diff}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Recent Discoveries */}
        <View style={styles.discoveriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{currentTwin.name.split(' ')[0]}\'s Recent Finds</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>

          {currentTwin.recentFinds.map((place, index) => (
            <View key={index} style={styles.placeCard}>
              <View style={styles.placeImage}>
                <Image
                  source={{ uri: `https://source.unsplash.com/200x200/?restaurant,food&sig=${index}` }}
                  style={styles.placeImageContent}
                />
              </View>
              <View style={styles.placeInfo}>
                <View style={styles.placeHeader}>
                  <Text style={styles.placeName}>{place.name}</Text>
                  {place.saved && (
                    <View style={styles.savedBadge}>
                      <Text style={styles.savedText}>SAVED</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.placeType}>{place.type}</Text>
                <View style={styles.placeFooter}>
                  <View style={styles.rating}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.ratingText}>{place.rating}</Text>
                  </View>
                  <Text style={styles.placeMatch}>Twin loves this</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.saveButton}>
                <Heart size={18} color={place.saved ? '#EF4444' : '#8C8C8C'} fill={place.saved ? '#EF4444' : 'none'} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Other Matches */}
        <View style={styles.otherMatches}>
          <Text style={styles.sectionTitle}>Other Taste Twins</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {MOCK_TWINS.filter(t => t.id !== currentTwin.id).map((twin) => (
              <TouchableOpacity
                key={twin.id}
                style={styles.miniTwinCard}
                onPress={() => setCurrentTwin(twin)}
              >
                <Image source={{ uri: twin.avatar }} style={styles.miniTwinAvatar} />
                <View style={styles.miniTwinMatch}>
                  <Text style={styles.miniTwinPercent}>{twin.matchPercent}%</Text>
                </View>
                <Text style={styles.miniTwinName}>{twin.name.split(' ')[0]}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.findMoreCard}>
              <View style={styles.findMoreIcon}>
                <Sparkles size={24} color="#8C8C8C" />
              </View>
              <Text style={styles.findMoreText}>Find More</Text>
            </View>
          </ScrollView>
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaCard}>
            <TrendingUp size={20} color="#10B981" />
            <Text style={styles.ctaTitle}>Improve Your Matches</Text>
            <Text style={styles.ctaDescription}>
              Rate 5 more restaurants to find even better taste twins
            </Text>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Rate Restaurants</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#262626',
    letterSpacing: -0.4,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#262626',
  },

  // Match Card
  matchCard: {
    margin: 20,
    padding: 24,
    backgroundColor: '#FFF0F0',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD4D4',
    alignItems: 'center',
  },
  matchVisual: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  yourAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  twinAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  matchCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: -10,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  matchPercent: {
    fontSize: 28,
    fontWeight: '800',
    color: '#EF4444',
  },
  matchLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#EF4444',
    letterSpacing: 1,
  },
  twinName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#262626',
    marginBottom: 4,
  },
  twinBio: {
    fontSize: 14,
    color: '#8C8C8C',
    textAlign: 'center',
    marginBottom: 20,
  },
  twinStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#262626',
  },
  statLabel: {
    fontSize: 11,
    color: '#8C8C8C',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E8E8E8',
  },
  followButton: {
    backgroundColor: '#262626',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Analysis Section
  analysisToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  analysisToggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8C8C8C',
  },
  analysisSection: {
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  tastesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 12,
  },
  tasteChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tasteChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  tasteChipText: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '500',
  },
  differenceChip: {
    borderColor: '#F59E0B',
  },
  differenceChipText: {
    fontSize: 13,
    color: '#F59E0B',
    fontWeight: '500',
  },

  // Discoveries Section
  discoveriesSection: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionLink: {
    fontSize: 13,
    color: '#8C8C8C',
    fontWeight: '500',
  },
  placeCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  placeImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  placeImageContent: {
    width: '100%',
    height: '100%',
  },
  placeInfo: {
    flex: 1,
  },
  placeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  placeName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#262626',
  },
  savedBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#10B981' + '15',
    borderRadius: 4,
  },
  savedText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#10B981',
    letterSpacing: 0.5,
  },
  placeType: {
    fontSize: 13,
    color: '#8C8C8C',
    marginBottom: 6,
  },
  placeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#262626',
  },
  placeMatch: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: '500',
  },
  saveButton: {
    padding: 8,
  },

  // Other Matches
  otherMatches: {
    paddingVertical: 20,
  },
  miniTwinCard: {
    alignItems: 'center',
    marginLeft: 20,
  },
  miniTwinAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 4,
  },
  miniTwinMatch: {
    position: 'absolute',
    top: 48,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  miniTwinPercent: {
    fontSize: 10,
    fontWeight: '700',
    color: '#EF4444',
  },
  miniTwinName: {
    fontSize: 12,
    color: '#262626',
    fontWeight: '500',
    marginTop: 4,
  },
  findMoreCard: {
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  findMoreIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderStyle: 'dashed',
  },
  findMoreText: {
    fontSize: 12,
    color: '#8C8C8C',
    fontWeight: '500',
    marginTop: 8,
  },

  // CTA
  ctaSection: {
    padding: 20,
    paddingBottom: 40,
  },
  ctaCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
    marginTop: 12,
    marginBottom: 4,
  },
  ctaDescription: {
    fontSize: 13,
    color: '#8C8C8C',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 16,
  },
  ctaButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});