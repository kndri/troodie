/**
 * LIVE VIBE CHECK - Full Screen Demo
 * Real-time restaurant atmosphere updates
 */

import { useRouter } from 'expo-router';
import {
  Activity,
  ChevronRight,
  Clock,
  MapPin,
  Music,
  Users,
  Zap
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
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

// Mock data
const MOCK_RESTAURANTS = [
  {
    id: '1',
    name: 'Balthazar',
    type: 'French Bistro',
    address: 'Spring St, SoHo',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500',
    liveStatus: {
      crowd: 'Packed',
      wait: '45 min',
      music: 'Live Jazz',
      vibe: 'Buzzing',
      lastUpdate: '2 min ago',
      reporter: 'Alex M.'
    },
    updates: [
      { time: '2 min', text: 'Bar seats just opened up!', user: 'Alex M.', verified: true },
      { time: '8 min', text: 'Amazing energy tonight', user: 'Sarah K.', verified: true },
      { time: '15 min', text: 'Live band just started', user: 'Mike R.', verified: false },
      { time: '22 min', text: 'Getting busy, come early', user: 'Jamie L.', verified: true },
    ]
  },
  {
    id: '2',
    name: 'Joe\'s Pizza',
    type: 'Pizza',
    address: 'Carmine St, West Village',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
    liveStatus: {
      crowd: 'Moderate',
      wait: '5-10 min',
      music: 'Background',
      vibe: 'Casual',
      lastUpdate: '5 min ago',
      reporter: 'Chris T.'
    },
    updates: [
      { time: '5 min', text: 'Short line, worth it!', user: 'Chris T.', verified: true },
      { time: '18 min', text: 'Fresh pie just out', user: 'Dana W.', verified: false },
    ]
  },
  {
    id: '3',
    name: 'Death & Co',
    type: 'Cocktail Bar',
    address: 'E 6th St, East Village',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500',
    liveStatus: {
      crowd: 'Filling up',
      wait: '20 min',
      music: 'Ambient',
      vibe: 'Intimate',
      lastUpdate: '1 min ago',
      reporter: 'Taylor S.'
    },
    updates: [
      { time: '1 min', text: 'Tables available downstairs', user: 'Taylor S.', verified: true },
      { time: '12 min', text: 'New cocktail menu!', user: 'Pat K.', verified: true },
    ]
  }
];

export default function LiveVibeScreen() {
  const router = useRouter();
  const [selectedRestaurant, setSelectedRestaurant] = useState(MOCK_RESTAURANTS[0]);
  const [activeTab, setActiveTab] = useState<'updates' | 'contributors'>('updates');

  const getVibeColor = (vibe: string) => {
    switch (vibe) {
      case 'Buzzing': return '#10B981';
      case 'Intimate': return '#8B5CF6';
      case 'Casual': return '#3B82F6';
      default: return '#F59E0B';
    }
  };

  const getCrowdColor = (crowd: string) => {
    switch (crowd) {
      case 'Packed': return '#EF4444';
      case 'Filling up': return '#F59E0B';
      case 'Moderate': return '#3B82F6';
      default: return '#10B981';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronRight size={20} color="#262626" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <Text style={styles.headerTitle}>Vibe Check</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Now</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Restaurant */}
        <View style={styles.featuredCard}>
          <Image
            source={{ uri: selectedRestaurant.image }}
            style={styles.featuredImage}
          />
          <View style={styles.featuredOverlay}>
            <View style={styles.featuredHeader}>
              <View>
                <Text style={styles.featuredName}>{selectedRestaurant.name}</Text>
                <View style={styles.featuredMeta}>
                  <MapPin size={12} color="#FFFFFF" />
                  <Text style={styles.featuredAddress}>{selectedRestaurant.address}</Text>
                  <Text style={styles.featuredDot}>•</Text>
                  <Text style={styles.featuredType}>{selectedRestaurant.type}</Text>
                </View>
              </View>
              <View style={styles.updateTime}>
                <Zap size={12} color="#FFAD27" />
                <Text style={styles.updateTimeText}>{selectedRestaurant.liveStatus.lastUpdate}</Text>
              </View>
            </View>

            {/* Live Metrics */}
            <View style={styles.metricsGrid}>
              <View style={styles.metricCard}>
                <Users size={16} color="#FFFFFF" />
                <Text style={styles.metricLabel}>Crowd</Text>
                <Text style={[styles.metricValue, { color: getCrowdColor(selectedRestaurant.liveStatus.crowd) }]}>
                  {selectedRestaurant.liveStatus.crowd}
                </Text>
              </View>
              <View style={styles.metricCard}>
                <Clock size={16} color="#FFFFFF" />
                <Text style={styles.metricLabel}>Wait</Text>
                <Text style={styles.metricValue}>{selectedRestaurant.liveStatus.wait}</Text>
              </View>
              <View style={styles.metricCard}>
                <Music size={16} color="#FFFFFF" />
                <Text style={styles.metricLabel}>Music</Text>
                <Text style={styles.metricValue}>{selectedRestaurant.liveStatus.music}</Text>
              </View>
              <View style={styles.metricCard}>
                <Activity size={16} color="#FFFFFF" />
                <Text style={styles.metricLabel}>Vibe</Text>
                <Text style={[styles.metricValue, { color: getVibeColor(selectedRestaurant.liveStatus.vibe) }]}>
                  {selectedRestaurant.liveStatus.vibe}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Updates Feed */}
        <View style={styles.updatesSection}>
          <View style={styles.tabBar}>
            <TouchableOpacity
              onPress={() => setActiveTab('updates')}
              style={[styles.tab, activeTab === 'updates' && styles.tabActive]}
            >
              <Text style={[styles.tabText, activeTab === 'updates' && styles.tabTextActive]}>
                Live Updates
              </Text>
              {activeTab === 'updates' && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('contributors')}
              style={[styles.tab, activeTab === 'contributors' && styles.tabActive]}
            >
              <Text style={[styles.tabText, activeTab === 'contributors' && styles.tabTextActive]}>
                Top Contributors
              </Text>
              {activeTab === 'contributors' && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          </View>

          {activeTab === 'updates' ? (
            <View style={styles.updatesList}>
              {selectedRestaurant.updates.map((update, index) => (
                <View key={index} style={styles.updateCard}>
                  <Image
                    source={{ uri: `https://i.pravatar.cc/100?img=${index + 1}` }}
                    style={styles.updateAvatar}
                  />
                  <View style={styles.updateContent}>
                    <View style={styles.updateHeader}>
                      <Text style={styles.updateUser}>{update.user}</Text>
                      {update.verified && (
                        <View style={styles.verifiedBadge}>
                          <Text style={styles.verifiedText}>✓</Text>
                        </View>
                      )}
                      <Text style={styles.updateTime}>{update.time} ago</Text>
                    </View>
                    <Text style={styles.updateText}>{update.text}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.contributorsList}>
              <View style={styles.contributorCard}>
                <Text style={styles.contributorRank}>1</Text>
                <Image
                  source={{ uri: 'https://i.pravatar.cc/100?img=8' }}
                  style={styles.contributorAvatar}
                />
                <View style={styles.contributorInfo}>
                  <Text style={styles.contributorName}>Alex M.</Text>
                  <Text style={styles.contributorStats}>247 updates • 98% helpful</Text>
                </View>
                <View style={styles.contributorPoints}>
                  <Text style={styles.pointsNumber}>2,847</Text>
                  <Text style={styles.pointsLabel}>pts</Text>
                </View>
              </View>
              <View style={styles.contributorCard}>
                <Text style={styles.contributorRank}>2</Text>
                <Image
                  source={{ uri: 'https://i.pravatar.cc/100?img=9' }}
                  style={styles.contributorAvatar}
                />
                <View style={styles.contributorInfo}>
                  <Text style={styles.contributorName}>Sarah K.</Text>
                  <Text style={styles.contributorStats}>189 updates • 95% helpful</Text>
                </View>
                <View style={styles.contributorPoints}>
                  <Text style={styles.pointsNumber}>1,923</Text>
                  <Text style={styles.pointsLabel}>pts</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Other Live Spots */}
        <View style={styles.otherSpots}>
          <Text style={styles.sectionTitle}>Other Live Spots</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {MOCK_RESTAURANTS.filter(r => r.id !== selectedRestaurant.id).map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                style={styles.spotCard}
                onPress={() => setSelectedRestaurant(restaurant)}
              >
                <Image
                  source={{ uri: restaurant.image }}
                  style={styles.spotImage}
                />
                <View style={styles.spotOverlay}>
                  <View style={styles.spotLiveBadge}>
                    <View style={styles.spotLiveDot} />
                    <Text style={styles.spotLiveText}>LIVE</Text>
                  </View>
                  <View style={styles.spotInfo}>
                    <Text style={styles.spotName}>{restaurant.name}</Text>
                    <Text style={styles.spotStatus}>
                      {restaurant.liveStatus.crowd} • {restaurant.liveStatus.wait}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <TouchableOpacity style={styles.ctaButton}>
            <Zap size={20} color="#FFFFFF" />
            <Text style={styles.ctaText}>Update Vibe</Text>
          </TouchableOpacity>
          <Text style={styles.ctaSubtext}>Earn 10 points for each helpful update</Text>
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
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#EF4444' + '15',
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#EF4444',
    letterSpacing: 0.5,
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

  // Featured Card
  featuredCard: {
    height: 320,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  featuredName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featuredAddress: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  featuredDot: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.5,
  },
  featuredType: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  updateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
  },
  updateTimeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Metrics Grid
  metricsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  metricCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    gap: 4,
  },
  metricLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Updates Section
  updatesSection: {
    padding: 20,
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  tab: {
    flex: 1,
    paddingBottom: 12,
    position: 'relative',
  },
  tabActive: {},
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8C8C8C',
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#262626',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '25%',
    right: '25%',
    height: 2,
    backgroundColor: '#262626',
  },

  // Updates List
  updatesList: {
    gap: 12,
  },
  updateCard: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F7F7',
  },
  updateAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  updateContent: {
    flex: 1,
  },
  updateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  updateUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  updateText: {
    fontSize: 14,
    color: '#262626',
    lineHeight: 20,
  },

  // Contributors
  contributorsList: {
    gap: 12,
  },
  contributorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
  },
  contributorRank: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8C8C8C',
    width: 20,
  },
  contributorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  contributorInfo: {
    flex: 1,
  },
  contributorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
  contributorStats: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  contributorPoints: {
    alignItems: 'center',
  },
  pointsNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFAD27',
  },
  pointsLabel: {
    fontSize: 10,
    color: '#8C8C8C',
  },

  // Other Spots
  otherSpots: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  spotCard: {
    width: 200,
    height: 140,
    marginLeft: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  spotImage: {
    width: '100%',
    height: '100%',
  },
  spotOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    justifyContent: 'space-between',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  spotLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 3,
    backgroundColor: 'rgba(239,68,68,0.9)',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  spotLiveDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  spotLiveText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  spotInfo: {
    gap: 2,
  },
  spotName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  spotStatus: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.9,
  },

  // CTA
  ctaSection: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#262626',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 24,
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ctaSubtext: {
    fontSize: 12,
    color: '#8C8C8C',
  },
});