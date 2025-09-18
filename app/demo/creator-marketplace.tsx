/**
 * DEMO SCREEN - Creator Marketplace
 * Connect with brands for paid partnerships and sponsored content
 */

import { useRouter } from 'expo-router';
import {
  ChevronRight,
  DollarSign,
  Eye,
  Heart,
  Star,
  TrendingUp,
  Users,
  Verified
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

interface Brand {
  id: string;
  name: string;
  logo: string;
  category: string;
  budget: string;
  requirements: {
    followers: string;
    engagement: string;
    location: string;
  };
  description: string;
  campaignType: string;
  duration: string;
  isVerified: boolean;
  matchScore: number;
}

interface CreatorMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export default function CreatorMarketplaceScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'opportunities' | 'earnings' | 'portfolio'>('opportunities');

  // Mock creator metrics
  const creatorMetrics: CreatorMetric[] = [
    { label: 'Followers', value: '12.5K', change: '+12%', isPositive: true },
    { label: 'Avg. Engagement', value: '8.2%', change: '+2.3%', isPositive: true },
    { label: 'Content Value', value: '$850', change: '+$150', isPositive: true },
    { label: 'Partnerships', value: '24', change: '+6', isPositive: true },
  ];

  // Mock brand opportunities
  const brandOpportunities: Brand[] = [
    {
      id: '1',
      name: 'Blue Bottle Coffee',
      logo: '☕',
      category: 'Coffee & Cafes',
      budget: '$500-1,000',
      requirements: {
        followers: '5K+',
        engagement: '5%+',
        location: 'NYC',
      },
      description: 'Create authentic content showcasing our seasonal menu',
      campaignType: 'Instagram Posts + Stories',
      duration: '2 weeks',
      isVerified: true,
      matchScore: 95,
    },
    {
      id: '2',
      name: 'Sweetgreen',
      logo: '🥗',
      category: 'Healthy Dining',
      budget: '$750-1,500',
      requirements: {
        followers: '10K+',
        engagement: '7%+',
        location: 'NYC/LA',
      },
      description: 'Partner for our summer wellness campaign',
      campaignType: 'Reels + TikTok',
      duration: '1 month',
      isVerified: true,
      matchScore: 88,
    },
    {
      id: '3',
      name: 'Shake Shack',
      logo: '🍔',
      category: 'Fast Casual',
      budget: '$300-600',
      requirements: {
        followers: '3K+',
        engagement: '4%+',
        location: 'Any',
      },
      description: 'Feature our new limited-time menu items',
      campaignType: 'Feed Posts',
      duration: '1 week',
      isVerified: false,
      matchScore: 92,
    },
  ];

  // Mock earnings data
  const earningsData = {
    thisMonth: '$2,450',
    lastMonth: '$1,890',
    total: '$18,750',
    pending: '$650',
    topBrand: 'Blue Bottle Coffee',
    avgDealSize: '$725',
  };

  // Mock portfolio items
  const portfolioItems = [
    { id: '1', brand: 'Nobu', views: '45K', likes: '8.2K', value: '$1,200', date: '2 days ago' },
    { id: '2', brand: 'Eleven Madison Park', views: '38K', likes: '6.9K', value: '$950', date: '1 week ago' },
    { id: '3', brand: 'Sweetgreen', views: '29K', likes: '5.1K', value: '$750', date: '2 weeks ago' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronRight size={24} color="#262626" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Creator Marketplace</Text>
          <Text style={styles.headerSubtitle}>Monetize your influence • Build partnerships</Text>
        </View>
      </View>

      {/* Creator Stats Card */}
      <View style={styles.statsCard}>
        <View style={styles.statsHeader}>
          <Text style={styles.statsTitle}>Your Creator Score</Text>
          <View style={styles.scoreBadge}>
            <Star size={16} color="#FFAD27" fill="#FFAD27" />
            <Text style={styles.scoreText}>8.5</Text>
          </View>
        </View>
        <View style={styles.metricsGrid}>
          {creatorMetrics.map((metric) => (
            <View key={metric.label} style={styles.metricCard}>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
              <Text style={[styles.metricChange, metric.isPositive && styles.metricChangePositive]}>
                {metric.change}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['opportunities', 'earnings', 'portfolio'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as any)}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Perfect Matches for You</Text>
            {brandOpportunities.map((brand) => (
              <TouchableOpacity key={brand.id} style={styles.opportunityCard}>
                <View style={styles.opportunityHeader}>
                  <View style={styles.brandInfo}>
                    <View style={styles.brandLogo}>
                      <Text style={styles.brandEmoji}>{brand.logo}</Text>
                    </View>
                    <View style={styles.brandDetails}>
                      <View style={styles.brandNameRow}>
                        <Text style={styles.brandName}>{brand.name}</Text>
                        {brand.isVerified && <Verified size={14} color="#3B82F6" />}
                      </View>
                      <Text style={styles.brandCategory}>{brand.category}</Text>
                    </View>
                  </View>
                  <View style={styles.matchBadge}>
                    <Text style={styles.matchScore}>{brand.matchScore}%</Text>
                    <Text style={styles.matchLabel}>match</Text>
                  </View>
                </View>

                <Text style={styles.opportunityDescription}>{brand.description}</Text>

                <View style={styles.opportunityDetails}>
                  <View style={styles.detailItem}>
                    <DollarSign size={14} color="#10B981" />
                    <Text style={styles.detailText}>{brand.budget}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Users size={14} color="#8C8C8C" />
                    <Text style={styles.detailText}>{brand.requirements.followers}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <TrendingUp size={14} color="#8C8C8C" />
                    <Text style={styles.detailText}>{brand.requirements.engagement}</Text>
                  </View>
                </View>

                <View style={styles.opportunityFooter}>
                  <Text style={styles.campaignType}>{brand.campaignType}</Text>
                  <TouchableOpacity style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Apply Now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <View style={styles.tabContent}>
            <View style={styles.earningsOverview}>
              <View style={styles.earningsMainCard}>
                <Text style={styles.earningsLabel}>This Month</Text>
                <Text style={styles.earningsAmount}>{earningsData.thisMonth}</Text>
                <Text style={styles.earningsChange}>
                  +29% from last month ({earningsData.lastMonth})
                </Text>
              </View>

              <View style={styles.earningsGrid}>
                <View style={styles.earningsStat}>
                  <Text style={styles.earningsStatValue}>{earningsData.total}</Text>
                  <Text style={styles.earningsStatLabel}>Total Earned</Text>
                </View>
                <View style={styles.earningsStat}>
                  <Text style={styles.earningsStatValue}>{earningsData.pending}</Text>
                  <Text style={styles.earningsStatLabel}>Pending</Text>
                </View>
                <View style={styles.earningsStat}>
                  <Text style={styles.earningsStatValue}>{earningsData.avgDealSize}</Text>
                  <Text style={styles.earningsStatLabel}>Avg Deal</Text>
                </View>
                <View style={styles.earningsStat}>
                  <Text style={styles.earningsStatValue}>24</Text>
                  <Text style={styles.earningsStatLabel}>Partnerships</Text>
                </View>
              </View>

              <View style={styles.topPerformer}>
                <Text style={styles.topPerformerLabel}>Top Partnership</Text>
                <Text style={styles.topPerformerBrand}>{earningsData.topBrand}</Text>
                <Text style={styles.topPerformerStats}>12 campaigns • $6,200 total</Text>
              </View>
            </View>
          </View>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Your Recent Work</Text>
            {portfolioItems.map((item) => (
              <View key={item.id} style={styles.portfolioCard}>
                <View style={styles.portfolioHeader}>
                  <Text style={styles.portfolioBrand}>{item.brand}</Text>
                  <Text style={styles.portfolioDate}>{item.date}</Text>
                </View>
                <View style={styles.portfolioStats}>
                  <View style={styles.portfolioStat}>
                    <Eye size={16} color="#8C8C8C" />
                    <Text style={styles.portfolioStatText}>{item.views}</Text>
                  </View>
                  <View style={styles.portfolioStat}>
                    <Heart size={16} color="#FF6B6B" />
                    <Text style={styles.portfolioStatText}>{item.likes}</Text>
                  </View>
                  <View style={styles.portfolioStat}>
                    <DollarSign size={16} color="#10B981" />
                    <Text style={styles.portfolioStatText}>{item.value}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* CTA Footer */}
      <View style={styles.ctaFooter}>
        <Text style={styles.ctaText}>Ready to grow your creator business?</Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Upgrade to Pro</Text>
        </TouchableOpacity>
      </View>
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

  // Stats Card
  statsCard: {
    margin: 20,
    padding: 16,
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#262626',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  metricCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#262626',
  },
  metricLabel: {
    fontSize: 11,
    color: '#8C8C8C',
    marginTop: 2,
  },
  metricChange: {
    fontSize: 11,
    color: '#8C8C8C',
    marginTop: 2,
  },
  metricChangePositive: {
    color: '#10B981',
  },

  // Tabs
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#10B981',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8C8C8C',
  },
  tabTextActive: {
    color: '#262626',
    fontWeight: '600',
  },

  // Content
  tabContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 16,
  },

  // Opportunity Cards
  opportunityCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  opportunityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  brandInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  brandLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  brandEmoji: {
    fontSize: 20,
  },
  brandDetails: {
    flex: 1,
  },
  brandNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#262626',
  },
  brandCategory: {
    fontSize: 12,
    color: '#8C8C8C',
    marginTop: 2,
  },
  matchBadge: {
    alignItems: 'center',
    backgroundColor: '#10B98110',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  matchScore: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
  },
  matchLabel: {
    fontSize: 10,
    color: '#10B981',
  },
  opportunityDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#595959',
    marginBottom: 12,
  },
  opportunityDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#595959',
  },
  opportunityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  campaignType: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  applyButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  applyButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Earnings
  earningsOverview: {
    gap: 16,
  },
  earningsMainCard: {
    backgroundColor: '#10B98110',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  earningsLabel: {
    fontSize: 12,
    color: '#595959',
    marginBottom: 8,
  },
  earningsAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 4,
  },
  earningsChange: {
    fontSize: 12,
    color: '#595959',
  },
  earningsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  earningsStat: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F7F7F7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  earningsStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#262626',
    marginBottom: 4,
  },
  earningsStatLabel: {
    fontSize: 11,
    color: '#8C8C8C',
  },
  topPerformer: {
    backgroundColor: '#FFF8E7',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE2B2',
  },
  topPerformerLabel: {
    fontSize: 11,
    color: '#8C8C8C',
    marginBottom: 4,
  },
  topPerformerBrand: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 4,
  },
  topPerformerStats: {
    fontSize: 12,
    color: '#595959',
  },

  // Portfolio
  portfolioCard: {
    backgroundColor: '#F7F7F7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  portfolioBrand: {
    fontSize: 15,
    fontWeight: '600',
    color: '#262626',
  },
  portfolioDate: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  portfolioStats: {
    flexDirection: 'row',
    gap: 20,
  },
  portfolioStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  portfolioStatText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#595959',
  },

  // CTA
  ctaFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    backgroundColor: '#FFFFFF',
  },
  ctaText: {
    fontSize: 14,
    color: '#595959',
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaButton: {
    backgroundColor: '#262626',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  ctaButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});