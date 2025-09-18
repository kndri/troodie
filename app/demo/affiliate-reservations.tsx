/**
 * DEMO SCREEN - Affiliate Reservations
 * Earn commission from every booking you influence
 */

import { DS } from '@/components/design-system/tokens';
import { useRouter } from 'expo-router';
import {
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  MapPin,
  TrendingUp,
  Users,
  Zap
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

interface Reservation {
  id: string;
  restaurant: string;
  emoji: string;
  date: string;
  time: string;
  party: number;
  status: 'confirmed' | 'pending' | 'completed';
  commission: string;
  influencedBy: string;
  bookingValue: string;
}

interface Restaurant {
  id: string;
  name: string;
  emoji: string;
  cuisine: string;
  commissionRate: string;
  avgBookingValue: string;
  totalEarned: string;
  bookings: number;
  trending: boolean;
}

export default function AffiliateReservationsScreen() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<'overview' | 'restaurants' | 'bookings'>('overview');

  // Mock earnings data
  const earningsData = {
    today: '$126',
    thisWeek: '$892',
    thisMonth: '$3,456',
    totalEarned: '$15,234',
    pendingPayout: '$456',
    nextPayout: 'Dec 15',
    totalBookings: 234,
    conversionRate: '18%',
  };

  // Mock recent bookings
  const recentBookings: Reservation[] = [
    {
      id: '1',
      restaurant: 'Carbone',
      emoji: '🍝',
      date: 'Tonight',
      time: '8:00 PM',
      party: 4,
      status: 'confirmed',
      commission: '$45',
      influencedBy: 'Your review',
      bookingValue: '$450',
    },
    {
      id: '2',
      restaurant: 'Nobu Downtown',
      emoji: '🍣',
      date: 'Tomorrow',
      time: '7:30 PM',
      party: 2,
      status: 'pending',
      commission: '$38',
      influencedBy: 'Board share',
      bookingValue: '$380',
    },
    {
      id: '3',
      restaurant: 'Gramercy Tavern',
      emoji: '🥘',
      date: 'Dec 12',
      time: '6:00 PM',
      party: 6,
      status: 'completed',
      commission: '$52',
      influencedBy: 'Story mention',
      bookingValue: '$520',
    },
  ];

  // Mock partner restaurants
  const partnerRestaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Carbone',
      emoji: '🍝',
      cuisine: 'Italian',
      commissionRate: '10%',
      avgBookingValue: '$450',
      totalEarned: '$2,340',
      bookings: 52,
      trending: true,
    },
    {
      id: '2',
      name: 'Nobu Downtown',
      emoji: '🍣',
      cuisine: 'Japanese',
      commissionRate: '8%',
      avgBookingValue: '$380',
      totalEarned: '$1,824',
      bookings: 48,
      trending: false,
    },
    {
      id: '3',
      name: 'The River Café',
      emoji: '🌉',
      cuisine: 'American',
      commissionRate: '12%',
      avgBookingValue: '$520',
      totalEarned: '$3,120',
      bookings: 60,
      trending: true,
    },
  ];

  // Performance metrics
  const performanceMetrics = [
    { label: 'Conversion Rate', value: '18%', change: '+3%', isPositive: true },
    { label: 'Avg. Booking', value: '$425', change: '+$45', isPositive: true },
    { label: 'Click-through', value: '24%', change: '+5%', isPositive: true },
    { label: 'Repeat Bookings', value: '32%', change: '+8%', isPositive: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronRight size={24} color="#262626" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Affiliate Reservations</Text>
          <Text style={styles.headerSubtitle}>Earn from every booking you inspire</Text>
        </View>
      </View>

      {/* Earnings Dashboard */}
      <View style={styles.earningsDashboard}>
        <View style={styles.mainEarning}>
          <Text style={styles.earningPeriod}>This Month</Text>
          <Text style={styles.earningAmount}>{earningsData.thisMonth}</Text>
          <View style={styles.earningTrend}>
            <TrendingUp size={16} color="#10B981" />
            <Text style={styles.earningTrendText}>+23% from last month</Text>
          </View>
        </View>
        <View style={styles.earningsGrid}>
          <View style={styles.earningCard}>
            <Text style={styles.earningCardValue}>{earningsData.totalBookings}</Text>
            <Text style={styles.earningCardLabel}>Bookings</Text>
          </View>
          <View style={styles.earningCard}>
            <Text style={styles.earningCardValue}>{earningsData.conversionRate}</Text>
            <Text style={styles.earningCardLabel}>Conversion</Text>
          </View>
          <View style={styles.earningCard}>
            <Text style={styles.earningCardValue}>{earningsData.pendingPayout}</Text>
            <Text style={styles.earningCardLabel}>Pending</Text>
          </View>
        </View>
      </View>

      {/* View Tabs */}
      <View style={styles.viewTabs}>
        {['overview', 'restaurants', 'bookings'].map((view) => (
          <TouchableOpacity
            key={view}
            onPress={() => setActiveView(view as any)}
            style={[styles.viewTab, activeView === view && styles.viewTabActive]}
          >
            <Text style={[styles.viewTabText, activeView === view && styles.viewTabTextActive]}>
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Overview */}
        {activeView === 'overview' && (
          <View style={styles.viewContent}>
            {/* Performance Metrics */}
            <View style={styles.metricsSection}>
              <Text style={styles.sectionTitle}>Your Performance</Text>
              <View style={styles.metricsGrid}>
                {performanceMetrics.map((metric) => (
                  <View key={metric.label} style={styles.metricCard}>
                    <Text style={styles.metricLabel}>{metric.label}</Text>
                    <Text style={styles.metricValue}>{metric.value}</Text>
                    <Text style={[styles.metricChange, metric.isPositive && styles.metricChangePositive]}>
                      {metric.change}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Recent Activity */}
            <View style={styles.activitySection}>
              <Text style={styles.sectionTitle}>Recent Bookings</Text>
              {recentBookings.slice(0, 3).map((booking) => (
                <View key={booking.id} style={styles.bookingCard}>
                  <View style={styles.bookingHeader}>
                    <View style={styles.restaurantInfo}>
                      <View style={styles.restaurantEmoji}>
                        <Text style={styles.emojiText}>{booking.emoji}</Text>
                      </View>
                      <View>
                        <Text style={styles.restaurantName}>{booking.restaurant}</Text>
                        <Text style={styles.bookingDetails}>
                          {booking.date} • {booking.time} • {booking.party} guests
                        </Text>
                      </View>
                    </View>
                    <View style={styles.commissionBadge}>
                      <Text style={styles.commissionAmount}>{booking.commission}</Text>
                      <Text style={styles.commissionLabel}>earned</Text>
                    </View>
                  </View>
                  <View style={styles.bookingFooter}>
                    <Text style={styles.influenceSource}>via {booking.influencedBy}</Text>
                    <View style={[styles.statusBadge, styles[`status${booking.status}`]]}>
                      <Text style={styles.statusText}>{booking.status}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Zap size={20} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Share Booking Link</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.secondaryAction]}>
                <DollarSign size={20} color="#262626" />
                <Text style={[styles.actionButtonText, styles.secondaryActionText]}>View Payouts</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Restaurants */}
        {activeView === 'restaurants' && (
          <View style={styles.viewContent}>
            <Text style={styles.sectionTitle}>Partner Restaurants</Text>
            <Text style={styles.sectionSubtitle}>Higher rates for premium establishments</Text>

            {partnerRestaurants.map((restaurant) => (
              <View key={restaurant.id} style={styles.restaurantCard}>
                <View style={styles.restaurantHeader}>
                  <View style={styles.restaurantBasicInfo}>
                    <View style={styles.restaurantIcon}>
                      <Text style={styles.restaurantIconText}>{restaurant.emoji}</Text>
                    </View>
                    <View>
                      <View style={styles.restaurantTitleRow}>
                        <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
                        {restaurant.trending && (
                          <View style={styles.trendingBadge}>
                            <Text style={styles.trendingText}>🔥 Hot</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
                    </View>
                  </View>
                  <View style={styles.commissionRate}>
                    <Text style={styles.rateValue}>{restaurant.commissionRate}</Text>
                    <Text style={styles.rateLabel}>commission</Text>
                  </View>
                </View>

                <View style={styles.restaurantStats}>
                  <View style={styles.restaurantStat}>
                    <Text style={styles.statValue}>{restaurant.totalEarned}</Text>
                    <Text style={styles.statLabel}>Total Earned</Text>
                  </View>
                  <View style={styles.restaurantStat}>
                    <Text style={styles.statValue}>{restaurant.bookings}</Text>
                    <Text style={styles.statLabel}>Bookings</Text>
                  </View>
                  <View style={styles.restaurantStat}>
                    <Text style={styles.statValue}>{restaurant.avgBookingValue}</Text>
                    <Text style={styles.statLabel}>Avg. Value</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.shareButton}>
                  <Text style={styles.shareButtonText}>Share Restaurant</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Bookings */}
        {activeView === 'bookings' && (
          <View style={styles.viewContent}>
            <View style={styles.bookingFilters}>
              <TouchableOpacity style={styles.filterChip}>
                <Calendar size={14} color="#595959" />
                <Text style={styles.filterText}>This Week</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterChip}>
                <MapPin size={14} color="#595959" />
                <Text style={styles.filterText}>All Areas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterChip}>
                <Users size={14} color="#595959" />
                <Text style={styles.filterText}>All Sizes</Text>
              </TouchableOpacity>
            </View>

            {recentBookings.map((booking) => (
              <View key={booking.id} style={styles.detailedBookingCard}>
                <View style={styles.bookingMainInfo}>
                  <View style={styles.bookingRestaurantInfo}>
                    <Text style={styles.bookingRestaurantName}>{booking.restaurant}</Text>
                    <View style={styles.bookingDateTime}>
                      <Calendar size={12} color="#8C8C8C" />
                      <Text style={styles.bookingDateTimeText}>{booking.date}</Text>
                      <Clock size={12} color="#8C8C8C" />
                      <Text style={styles.bookingDateTimeText}>{booking.time}</Text>
                      <Users size={12} color="#8C8C8C" />
                      <Text style={styles.bookingDateTimeText}>{booking.party}</Text>
                    </View>
                  </View>
                  <View style={styles.bookingEarnings}>
                    <Text style={styles.bookingValue}>{booking.bookingValue}</Text>
                    <Text style={styles.bookingCommission}>{booking.commission} earned</Text>
                  </View>
                </View>
                <View style={styles.bookingMeta}>
                  <Text style={styles.bookingInfluence}>Influenced by: {booking.influencedBy}</Text>
                  <View style={[styles.statusIndicator, styles[`status${booking.status}`]]}>
                    <Text style={styles.statusIndicatorText}>{booking.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <Text style={styles.ctaText}>Maximize your earning potential</Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Join Premium Network</Text>
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

  // Earnings Dashboard
  earningsDashboard: {
    margin: 20,
    padding: 16,
    backgroundColor: '#8B5CF610',
    borderRadius: 16,
  },
  mainEarning: {
    alignItems: 'center',
    marginBottom: 16,
  },
  earningPeriod: {
    fontSize: 12,
    color: '#595959',
    marginBottom: 4,
  },
  earningAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  earningTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  earningTrendText: {
    fontSize: 12,
    color: '#10B981',
  },
  earningsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  earningCard: {
    alignItems: 'center',
  },
  earningCardValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
  },
  earningCardLabel: {
    fontSize: 11,
    color: '#8C8C8C',
    marginTop: 2,
  },

  // View Tabs
  viewTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  viewTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  viewTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#8B5CF6',
  },
  viewTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8C8C8C',
  },
  viewTabTextActive: {
    color: '#262626',
    fontWeight: '600',
  },

  // Content
  viewContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#8C8C8C',
    marginBottom: 16,
  },

  // Metrics
  metricsSection: {
    marginBottom: 24,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F7F7F7',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    color: '#8C8C8C',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#262626',
    marginBottom: 2,
  },
  metricChange: {
    fontSize: 11,
    color: '#8C8C8C',
  },
  metricChangePositive: {
    color: '#10B981',
  },

  // Activity
  activitySection: {
    marginBottom: 24,
  },
  bookingCard: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  restaurantInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  restaurantEmoji: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  emojiText: {
    fontSize: 18,
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 2,
  },
  bookingDetails: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  commissionBadge: {
    alignItems: 'center',
    backgroundColor: '#10B98110',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  commissionAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
  },
  commissionLabel: {
    fontSize: 10,
    color: '#10B981',
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  influenceSource: {
    fontSize: 11,
    color: '#8C8C8C',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusconfirmed: {
    backgroundColor: '#10B98115',
  },
  statuspending: {
    backgroundColor: '#F59E0B15',
  },
  statuscompleted: {
    backgroundColor: '#3B82F615',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    borderRadius: 20,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryAction: {
    backgroundColor: '#F7F7F7',
  },
  secondaryActionText: {
    color: '#262626',
  },

  // Restaurant Cards
  restaurantCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  restaurantBasicInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  restaurantIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  restaurantIconText: {
    fontSize: 20,
  },
  restaurantTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  restaurantTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#262626',
  },
  trendingBadge: {
    backgroundColor: '#FF6B6B15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  trendingText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  restaurantCuisine: {
    fontSize: 12,
    color: '#8C8C8C',
    marginTop: 2,
  },
  commissionRate: {
    alignItems: 'center',
    backgroundColor: '#8B5CF610',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  rateValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B5CF6',
  },
  rateLabel: {
    fontSize: 10,
    color: '#8B5CF6',
  },
  restaurantStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  restaurantStat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#8C8C8C',
  },
  shareButton: {
    backgroundColor: '#262626',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Bookings View
  bookingFilters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
  },
  filterText: {
    fontSize: 12,
    color: '#595959',
  },
  detailedBookingCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  bookingMainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bookingRestaurantInfo: {
    flex: 1,
  },
  bookingRestaurantName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 6,
  },
  bookingDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookingDateTimeText: {
    fontSize: 11,
    color: '#8C8C8C',
  },
  bookingEarnings: {
    alignItems: 'flex-end',
  },
  bookingValue: {
    fontSize: 14,
    color: '#595959',
    marginBottom: 2,
  },
  bookingCommission: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  bookingMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingInfluence: {
    fontSize: 11,
    color: '#8C8C8C',
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusIndicatorText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#595959',
  },

  // Bottom CTA
  bottomCTA: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    backgroundColor: '#FFFFFF',
  },
  ctaText: {
    fontSize: 13,
    color: '#8C8C8C',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaButton: {
    backgroundColor: '#8B5CF6',
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