/**
 * DEMO SCREEN - Future Features Gallery
 * Main index for showcasing upcoming capabilities
 */

import { DS } from '@/components/design-system/tokens';
import { useRouter } from 'expo-router';
import {
  ChevronRight,
  Sparkles
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface DemoFeature {
  id: string;
  title: string;
  category: 'EARN' | 'SEARCH' | 'PLAY';
  description: string;
  status: 'Coming Soon' | 'In Development' | 'Beta';
  route: string;
  accent: string;
}

export default function DemoIndexScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'EARN' | 'SEARCH' | 'PLAY'>('ALL');

  // Demo Features
  const demoFeatures: DemoFeature[] = [
    // EARN Features
    {
      id: 'creator-marketplace',
      title: 'Creator Marketplace',
      category: 'EARN',
      description: 'Connect with brands for paid partnerships and sponsored content',
      status: 'Coming Soon',
      route: '/demo/creator-marketplace',
      accent: '#10B981',
    },
    {
      id: 'paid-boards',
      title: 'Premium Food Guides',
      category: 'EARN',
      description: 'Monetize your taste with subscription-based curated lists',
      status: 'In Development',
      route: '/demo/paid-boards',
      accent: '#F59E0B',
    },
    {
      id: 'affiliate-reservations',
      title: 'Affiliate Reservations',
      category: 'EARN',
      description: 'Earn commission from every booking you influence',
      status: 'Coming Soon',
      route: '/demo/affiliate-reservations',
      accent: '#8B5CF6',
    },

    // SEARCH Features
    {
      id: 'taste-twins',
      title: 'Taste Twin Matching',
      category: 'SEARCH',
      description: 'AI-powered matching to find your food soulmates',
      status: 'Beta',
      route: '/demo/taste-twins',
      accent: '#EF4444',
    },
    {
      id: 'ai-concierge',
      title: 'AI Food Concierge',
      category: 'SEARCH',
      description: 'Personalized recommendations that learn your preferences',
      status: 'In Development',
      route: '/demo/ai-concierge',
      accent: '#3B82F6',
    },
    {
      id: 'live-vibe',
      title: 'Live Vibe Check',
      category: 'SEARCH',
      description: 'Real-time restaurant atmosphere and crowd updates',
      status: 'Beta',
      route: '/demo/live-vibe',
      accent: '#14B8A6',
    },

    // PLAY Features
    {
      id: 'food-quests',
      title: 'Food Quest Challenges',
      category: 'PLAY',
      description: 'Weekly exploration challenges with rewards',
      status: 'Beta',
      route: '/demo/food-quests',
      accent: '#EC4899',
    },
    {
      id: 'restaurant-bingo',
      title: 'Restaurant Bingo',
      category: 'PLAY',
      description: 'Turn group dining decisions into a fun game',
      status: 'Coming Soon',
      route: '/demo/restaurant-bingo',
      accent: '#6366F1',
    },
    {
      id: 'leaderboards',
      title: 'City Leaderboards',
      category: 'PLAY',
      description: 'Compete for top foodie status in your city',
      status: 'In Development',
      route: '/demo/leaderboards',
      accent: '#F97316',
    },
  ];

  // Filter features by category
  const filteredFeatures = activeCategory === 'ALL'
    ? demoFeatures
    : demoFeatures.filter(f => f.category === activeCategory);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronRight size={24} color="#262626" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerBadge}>
            <Sparkles size={16} color="#FFAD27" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Future of Troodie</Text>
            <Text style={styles.headerSubtitle}>Tomorrow\'s capabilities • Today\'s preview</Text>
          </View>
        </View>
      </View>

      {/* Category Pills */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {['ALL', 'EARN', 'SEARCH', 'PLAY'].map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat as any)}
              style={[
                styles.categoryPill,
                activeCategory === cat && styles.categoryPillActive
              ]}
            >
              <Text style={[
                styles.categoryPillText,
                activeCategory === cat && styles.categoryPillTextActive
              ]}>
                {cat === 'ALL' ? 'All Features' : cat.charAt(0) + cat.slice(1).toLowerCase()}
              </Text>
              {cat !== 'ALL' && (
                <View style={[styles.categoryDot, {
                  backgroundColor: cat === 'EARN' ? '#10B981' :
                    cat === 'SEARCH' ? '#3B82F6' : '#EC4899'
                }]} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Vision Card */}
        <View style={styles.visionCard}>
          <View style={styles.visionHeader}>
            <Text style={styles.visionEmoji}>🚀</Text>
            <View style={styles.visionBadge}>
              <Text style={styles.visionBadgeText}>THE VISION</Text>
            </View>
          </View>
          <Text style={styles.visionTitle}>Three Pillars of Tomorrow</Text>
          <Text style={styles.visionText}>
            <Text style={styles.visionHighlight}>Earn</Text> from your influence.{' '}
            <Text style={styles.visionHighlight}>Search</Text> with intelligence.{' '}
            <Text style={styles.visionHighlight}>Play</Text> to discover more.
          </Text>
        </View>

        {/* Features List */}
        <View style={styles.featuresSection}>
          {filteredFeatures.map((feature, index) => (
            <TouchableOpacity
              key={feature.id}
              style={styles.featureCard}
              onPress={() => router.push(feature.route)}
              activeOpacity={0.95}
            >
              <View style={styles.featureContent}>
                <View style={styles.featureHeader}>
                  <View style={styles.featureNumber}>
                    <Text style={styles.featureNumberText}>{(index + 1).toString().padStart(2, '0')}</Text>
                  </View>
                  <View style={styles.featureMeta}>
                    <View style={[styles.categoryTag, { backgroundColor: `${feature.accent}15` }]}>
                      <Text style={[styles.categoryTagText, { color: feature.accent }]}>
                        {feature.category}
                      </Text>
                    </View>
                    <View style={[styles.statusTag, {
                      backgroundColor: feature.status === 'Beta' ? '#10B98115' :
                        feature.status === 'In Development' ? '#F59E0B15' : '#8B5CF615'
                    }]}>
                      <Text style={[styles.statusTagText, {
                        color: feature.status === 'Beta' ? '#10B981' :
                          feature.status === 'In Development' ? '#F59E0B' : '#8B5CF6'
                      }]}>
                        {feature.status}
                      </Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>

                <View style={styles.featureFooter}>
                  <Text style={styles.exploreText}>Explore feature</Text>
                  <ChevronRight size={16} color="#8C8C8C" />
                </View>
              </View>

              {/* Accent Line */}
              <View style={[styles.featureAccent, { backgroundColor: feature.accent }]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Preview */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Where We're Headed</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>100K+</Text>
              <Text style={styles.statLabel}>Active Users</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Creators</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>$1M+</Text>
              <Text style={styles.statLabel}>Creator Earnings</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Cities</Text>
            </View>
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Be Part of the Journey</Text>
          <Text style={styles.ctaSubtitle}>Help shape the future of social dining</Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Join Early Access</Text>
          </TouchableOpacity>
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
    marginRight: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFAD27' + '10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#262626',
    letterSpacing: -0.4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#8C8C8C',
    marginTop: 2,
  },

  // Categories
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  categoryScroll: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginRight: 8,
    gap: 6,
  },
  categoryPillActive: {
    backgroundColor: '#262626',
    borderColor: '#262626',
  },
  categoryPillText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#262626',
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  // Vision Card
  visionCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFF8E7',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFE2B2',
  },
  visionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  visionEmoji: {
    fontSize: 24,
  },
  visionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FFAD27' + '20',
    borderRadius: 6,
  },
  visionBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6F4F1F',
    letterSpacing: 0.5,
  },
  visionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 8,
  },
  visionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6F4F1F',
  },
  visionHighlight: {
    fontWeight: '600',
    color: '#262626',
  },

  // Features
  featuresSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
  },
  featureContent: {
    padding: 16,
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureNumberText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8C8C8C',
  },
  featureMeta: {
    flexDirection: 'row',
    gap: 6,
  },
  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryTagText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  statusTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusTagText: {
    fontSize: 10,
    fontWeight: '600',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#8C8C8C',
    marginBottom: 12,
  },
  featureFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  exploreText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8C8C8C',
  },
  featureAccent: {
    height: 3,
    width: '100%',
  },

  // Stats
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: '#F7F7F7',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFAD27',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#8C8C8C',
    textAlign: 'center',
  },

  // CTA
  ctaSection: {
    padding: 32,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#8C8C8C',
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#262626',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
  },
  ctaButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});