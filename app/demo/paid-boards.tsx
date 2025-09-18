/**
 * DEMO SCREEN - Premium Food Guides (Paid Boards)
 * Monetize your taste with subscription-based curated lists
 */

import { DS } from '@/components/design-system/tokens';
import { useRouter } from 'expo-router';
import {
  Award,
  ChevronRight,
  Lock,
  Star,
  TrendingUp,
  Users,
  Verified
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface PremiumGuide {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  isVerified: boolean;
  price: string;
  subscribers: number;
  revenue: string;
  rating: number;
  category: string;
  description: string;
  restaurants: number;
  lastUpdated: string;
  preview: string[];
}

interface GuideMetric {
  label: string;
  value: string;
  icon: any;
  color: string;
}

export default function PaidBoardsScreen() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<'your-guides' | 'marketplace' | 'analytics'>('your-guides');

  // Mock your guides
  const yourGuides: PremiumGuide[] = [
    {
      id: '1',
      title: 'Hidden Gems of Brooklyn',
      author: 'You',
      authorAvatar: '👤',
      isVerified: true,
      price: '$4.99/month',
      subscribers: 234,
      revenue: '$1,168',
      rating: 4.8,
      category: 'Neighborhood',
      description: 'Discover the best-kept secrets in Brooklyn\'s food scene',
      restaurants: 25,
      lastUpdated: 'Updated 2 days ago',
      preview: ['Lucali', 'Roberta\'s', 'Peter Luger'],
    },
    {
      id: '2',
      title: 'Date Night Perfection NYC',
      author: 'You',
      authorAvatar: '👤',
      isVerified: true,
      price: '$7.99/month',
      subscribers: 156,
      revenue: '$1,246',
      rating: 4.9,
      category: 'Romantic',
      description: 'Curated romantic restaurants for unforgettable dates',
      restaurants: 18,
      lastUpdated: 'Updated 1 week ago',
      preview: ['The River Café', 'One if by Land', 'Gramercy Tavern'],
    },
  ];

  // Mock marketplace guides
  const marketplaceGuides: PremiumGuide[] = [
    {
      id: '3',
      title: 'Michelin on a Budget',
      author: 'Sarah Chen',
      authorAvatar: '👩',
      isVerified: true,
      price: '$9.99/month',
      subscribers: 892,
      revenue: '$8,908',
      rating: 4.9,
      category: 'Fine Dining',
      description: 'Michelin-quality dining without breaking the bank',
      restaurants: 32,
      lastUpdated: 'Updated daily',
      preview: ['Le Bernardin Lunch', 'Jean-Georges', 'Atomix'],
    },
    {
      id: '4',
      title: 'Vegan Paradise NYC',
      author: 'Alex Green',
      authorAvatar: '🧑',
      isVerified: false,
      price: '$5.99/month',
      subscribers: 445,
      revenue: '$2,665',
      rating: 4.7,
      category: 'Dietary',
      description: 'The ultimate guide to plant-based dining in NYC',
      restaurants: 48,
      lastUpdated: 'Updated 3 days ago',
      preview: ['ABC Kitchen', 'Sacred Chow', 'Candle Cafe'],
    },
  ];

  // Mock analytics
  const analyticsMetrics: GuideMetric[] = [
    { label: 'Total Revenue', value: '$2,414', icon: TrendingUp, color: '#10B981' },
    { label: 'Subscribers', value: '390', icon: Users, color: '#3B82F6' },
    { label: 'Avg. Rating', value: '4.85', icon: Star, color: '#FFAD27' },
    { label: 'Engagement', value: '72%', icon: Award, color: '#8B5CF6' },
  ];

  const topPerformers = [
    { title: 'Hidden Gems of Brooklyn', growth: '+23%', newSubs: '+34' },
    { title: 'Date Night Perfection', growth: '+18%', newSubs: '+22' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronRight size={24} color="#262626" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Premium Food Guides</Text>
          <Text style={styles.headerSubtitle}>Monetize your culinary expertise</Text>
        </View>
      </View>

      {/* Earnings Banner */}
      <View style={styles.earningsBanner}>
        <View style={styles.earningsContent}>
          <Text style={styles.earningsLabel}>This Month\'s Earnings</Text>
          <Text style={styles.earningsAmount}>$2,414</Text>
          <Text style={styles.earningsGrowth}>↑ 21% from last month</Text>
        </View>
        <TouchableOpacity style={styles.withdrawButton}>
          <Text style={styles.withdrawButtonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      {/* Section Tabs */}
      <View style={styles.sectionTabs}>
        {['your-guides', 'marketplace', 'analytics'].map((section) => (
          <TouchableOpacity
            key={section}
            onPress={() => setActiveSection(section as any)}
            style={[styles.sectionTab, activeSection === section && styles.sectionTabActive]}
          >
            <Text style={[styles.sectionTabText, activeSection === section && styles.sectionTabTextActive]}>
              {section === 'your-guides' ? 'Your Guides' :
               section === 'marketplace' ? 'Marketplace' : 'Analytics'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Your Guides Section */}
        {activeSection === 'your-guides' && (
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.createGuideButton}>
              <Text style={styles.createGuideIcon}>✨</Text>
              <View style={styles.createGuideText}>
                <Text style={styles.createGuideTitle}>Create New Guide</Text>
                <Text style={styles.createGuideSubtitle}>Start earning from your recommendations</Text>
              </View>
              <ChevronRight size={20} color="#8C8C8C" />
            </TouchableOpacity>

            {yourGuides.map((guide) => (
              <View key={guide.id} style={styles.guideCard}>
                <View style={styles.guideHeader}>
                  <View style={styles.guideInfo}>
                    <Text style={styles.guideTitle}>{guide.title}</Text>
                    <Text style={styles.guideCategory}>{guide.category} • {guide.restaurants} places</Text>
                  </View>
                  <View style={styles.guidePricing}>
                    <Text style={styles.guidePrice}>{guide.price}</Text>
                  </View>
                </View>

                <Text style={styles.guideDescription}>{guide.description}</Text>

                <View style={styles.guideStats}>
                  <View style={styles.guideStat}>
                    <Users size={14} color="#3B82F6" />
                    <Text style={styles.guideStatText}>{guide.subscribers} subscribers</Text>
                  </View>
                  <View style={styles.guideStat}>
                    <TrendingUp size={14} color="#10B981" />
                    <Text style={styles.guideStatText}>{guide.revenue} earned</Text>
                  </View>
                  <View style={styles.guideStat}>
                    <Star size={14} color="#FFAD27" />
                    <Text style={styles.guideStatText}>{guide.rating} rating</Text>
                  </View>
                </View>

                <View style={styles.guideFooter}>
                  <Text style={styles.guideUpdate}>{guide.lastUpdated}</Text>
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit Guide</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Marketplace Section */}
        {activeSection === 'marketplace' && (
          <View style={styles.sectionContent}>
            <Text style={styles.marketplaceTitle}>Top Performing Guides</Text>
            <Text style={styles.marketplaceSubtitle}>Learn from successful creators</Text>

            {marketplaceGuides.map((guide) => (
              <TouchableOpacity key={guide.id} style={styles.marketplaceCard}>
                <View style={styles.marketplaceHeader}>
                  <View style={styles.authorInfo}>
                    <View style={styles.authorAvatar}>
                      <Text style={styles.authorEmoji}>{guide.authorAvatar}</Text>
                    </View>
                    <View>
                      <View style={styles.authorNameRow}>
                        <Text style={styles.authorName}>{guide.author}</Text>
                        {guide.isVerified && <Verified size={12} color="#3B82F6" />}
                      </View>
                      <Text style={styles.guideMetadata}>
                        {guide.subscribers} subscribers • {guide.rating} ⭐
                      </Text>
                    </View>
                  </View>
                  <View style={styles.successBadge}>
                    <Text style={styles.successAmount}>{guide.revenue}</Text>
                    <Text style={styles.successLabel}>monthly</Text>
                  </View>
                </View>

                <Text style={styles.marketplaceGuideTitle}>{guide.title}</Text>
                <Text style={styles.marketplaceDescription}>{guide.description}</Text>

                <View style={styles.previewSection}>
                  <Text style={styles.previewLabel}>Preview restaurants:</Text>
                  <View style={styles.previewList}>
                    {guide.preview.map((restaurant, index) => (
                      <Text key={index} style={styles.previewItem}>• {restaurant}</Text>
                    ))}
                  </View>
                </View>

                <View style={styles.marketplaceFooter}>
                  <View style={styles.priceTag}>
                    <Text style={styles.priceText}>{guide.price}</Text>
                  </View>
                  <TouchableOpacity style={styles.subscribeButton}>
                    <Lock size={12} color="#FFFFFF" />
                    <Text style={styles.subscribeButtonText}>Subscribe</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Analytics Section */}
        {activeSection === 'analytics' && (
          <View style={styles.sectionContent}>
            <View style={styles.analyticsGrid}>
              {analyticsMetrics.map((metric) => (
                <View key={metric.label} style={styles.analyticsCard}>
                  <View style={[styles.analyticsIcon, { backgroundColor: `${metric.color}15` }]}>
                    <metric.icon size={20} color={metric.color} />
                  </View>
                  <Text style={styles.analyticsValue}>{metric.value}</Text>
                  <Text style={styles.analyticsLabel}>{metric.label}</Text>
                </View>
              ))}
            </View>

            <View style={styles.performanceCard}>
              <Text style={styles.performanceTitle}>Top Performers This Month</Text>
              {topPerformers.map((item, index) => (
                <View key={index} style={styles.performanceItem}>
                  <Text style={styles.performanceItemTitle}>{item.title}</Text>
                  <View style={styles.performanceStats}>
                    <Text style={styles.performanceGrowth}>{item.growth}</Text>
                    <Text style={styles.performanceNewSubs}>{item.newSubs} new</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.insightCard}>
              <Text style={styles.insightEmoji}>💡</Text>
              <Text style={styles.insightTitle}>Pro Tip</Text>
              <Text style={styles.insightText}>
                Guides updated weekly see 3x more engagement. Keep your content fresh to maximize earnings!
              </Text>
            </View>
          </View>
        )}
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

  // Earnings Banner
  earningsBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    padding: 16,
    backgroundColor: '#10B98110',
    borderRadius: 16,
  },
  earningsContent: {
    flex: 1,
  },
  earningsLabel: {
    fontSize: 11,
    color: '#595959',
    marginBottom: 4,
  },
  earningsAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 2,
  },
  earningsGrowth: {
    fontSize: 12,
    color: '#10B981',
  },
  withdrawButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  withdrawButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Section Tabs
  sectionTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  sectionTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  sectionTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#F59E0B',
  },
  sectionTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8C8C8C',
  },
  sectionTabTextActive: {
    color: '#262626',
    fontWeight: '600',
  },

  // Content
  sectionContent: {
    padding: 20,
  },

  // Create Guide Button
  createGuideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF8E7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE2B2',
    marginBottom: 16,
  },
  createGuideIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  createGuideText: {
    flex: 1,
  },
  createGuideTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 2,
  },
  createGuideSubtitle: {
    fontSize: 12,
    color: '#8C8C8C',
  },

  // Guide Cards
  guideCard: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  guideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  guideInfo: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 4,
  },
  guideCategory: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  guidePricing: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  guidePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
  },
  guideDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: '#595959',
    marginBottom: 12,
  },
  guideStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  guideStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  guideStatText: {
    fontSize: 12,
    color: '#595959',
  },
  guideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guideUpdate: {
    fontSize: 11,
    color: '#8C8C8C',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#262626',
  },

  // Marketplace
  marketplaceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 4,
  },
  marketplaceSubtitle: {
    fontSize: 13,
    color: '#8C8C8C',
    marginBottom: 20,
  },
  marketplaceCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  marketplaceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  authorEmoji: {
    fontSize: 18,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
  guideMetadata: {
    fontSize: 11,
    color: '#8C8C8C',
    marginTop: 2,
  },
  successBadge: {
    alignItems: 'center',
    backgroundColor: '#10B98110',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  successAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
  },
  successLabel: {
    fontSize: 10,
    color: '#10B981',
  },
  marketplaceGuideTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 6,
  },
  marketplaceDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: '#595959',
    marginBottom: 12,
  },
  previewSection: {
    backgroundColor: '#F7F7F7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  previewLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8C8C8C',
    marginBottom: 6,
  },
  previewList: {
    gap: 4,
  },
  previewItem: {
    fontSize: 12,
    color: '#595959',
  },
  marketplaceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceTag: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#595959',
  },
  subscribeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#262626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  subscribeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Analytics
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  analyticsCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F7F7F7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  analyticsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  analyticsValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#262626',
    marginBottom: 4,
  },
  analyticsLabel: {
    fontSize: 11,
    color: '#8C8C8C',
  },
  performanceCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  performanceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 12,
  },
  performanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  performanceItemTitle: {
    fontSize: 13,
    color: '#595959',
    flex: 1,
  },
  performanceStats: {
    flexDirection: 'row',
    gap: 12,
  },
  performanceGrowth: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10B981',
  },
  performanceNewSubs: {
    fontSize: 13,
    color: '#8C8C8C',
  },
  insightCard: {
    backgroundColor: '#FFF8E7',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  insightEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 6,
  },
  insightText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#595959',
    textAlign: 'center',
  },
});