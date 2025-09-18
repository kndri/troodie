import { DS } from '@/components/design-system/tokens';
import { useRouter } from 'expo-router';
import {
  Award,
  ChevronRight,
  Clock,
  Fire,
  MapPin,
  Star,
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

interface TrendingItem {
  id: string;
  title: string;
  category: string;
  rating: number;
  visits: number;
  trend: 'up' | 'stable';
  trendPercentage: number;
  image?: string;
  location: string;
  priceRange: string;
}

export default function TrendingScreen() {
  const router = useRouter();

  const trendingRestaurants: TrendingItem[] = [
    {
      id: '1',
      title: 'The Golden Fork',
      category: 'Italian',
      rating: 4.8,
      visits: 342,
      trend: 'up',
      trendPercentage: 25,
      location: 'Downtown',
      priceRange: '$$$',
    },
    {
      id: '2',
      title: 'Sushi Paradise',
      category: 'Japanese',
      rating: 4.9,
      visits: 289,
      trend: 'up',
      trendPercentage: 18,
      location: 'Midtown',
      priceRange: '$$$$',
    },
    {
      id: '3',
      title: 'Burger Haven',
      category: 'American',
      rating: 4.6,
      visits: 456,
      trend: 'up',
      trendPercentage: 32,
      location: 'West Side',
      priceRange: '$$',
    },
    {
      id: '4',
      title: 'Spice Garden',
      category: 'Indian',
      rating: 4.7,
      visits: 198,
      trend: 'up',
      trendPercentage: 15,
      location: 'East Village',
      priceRange: '$$',
    },
    {
      id: '5',
      title: 'Le Petit Bistro',
      category: 'French',
      rating: 4.8,
      visits: 167,
      trend: 'stable',
      trendPercentage: 8,
      location: 'Upper East',
      priceRange: '$$$$',
    },
  ];

  const trendingDishes = [
    { id: '1', name: 'Truffle Pasta', restaurant: 'The Golden Fork', orders: 89 },
    { id: '2', name: 'Dragon Roll', restaurant: 'Sushi Paradise', orders: 76 },
    { id: '3', name: 'Wagyu Burger', restaurant: 'Burger Haven', orders: 124 },
    { id: '4', name: 'Butter Chicken', restaurant: 'Spice Garden', orders: 65 },
  ];

  const categories = [
    { id: '1', name: 'This Week', icon: Clock, active: true },
    { id: '2', name: 'This Month', icon: TrendingUp, active: false },
    { id: '3', name: 'All Time', icon: Award, active: false },
  ];

  const renderRestaurant = (item: TrendingItem, index: number) => (
    <TouchableOpacity
      key={item.id}
      style={styles.restaurantCard}
      onPress={() => router.push(`/restaurant/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.rankBadge}>
        <Text style={styles.rankText}>#{index + 1}</Text>
      </View>

      <View style={styles.restaurantContent}>
        <View style={styles.restaurantHeader}>
          <View>
            <Text style={styles.restaurantName}>{item.title}</Text>
            <View style={styles.restaurantMeta}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.priceRange}>{item.priceRange}</Text>
              <Text style={styles.dot}>•</Text>
              <MapPin size={12} color={DS.colors.textGray} />
              <Text style={styles.location}>{item.location}</Text>
            </View>
          </View>
          <View style={styles.trendBadge}>
            <Fire size={16} color="#FF6B6B" />
            <Text style={styles.trendText}>+{item.trendPercentage}%</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Star size={14} color={DS.colors.primaryOrange} />
            <Text style={styles.statText}>{item.rating}</Text>
          </View>
          <View style={styles.stat}>
            <Users size={14} color={DS.colors.textGray} />
            <Text style={styles.statText}>{item.visits} visits this week</Text>
          </View>
        </View>
      </View>

      <ChevronRight size={20} color={DS.colors.textGray} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trending</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <TrendingUp size={32} color={DS.colors.primaryOrange} />
          </View>
          <Text style={styles.heroTitle}>What's Hot Right Now</Text>
          <Text style={styles.heroSubtitle}>
            Discover the most popular spots in your area
          </Text>
        </View>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          <View style={styles.categories}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryTab, cat.active && styles.categoryTabActive]}
              >
                <cat.icon size={16} color={cat.active ? DS.colors.primaryOrange : DS.colors.textGray} />
                <Text style={[styles.categoryText, cat.active && styles.categoryTextActive]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Top Restaurants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Restaurants</Text>
          <View style={styles.restaurantsList}>
            {trendingRestaurants.map((restaurant, index) => renderRestaurant(restaurant, index))}
          </View>
        </View>

        {/* Trending Dishes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Dishes</Text>
          <View style={styles.dishesGrid}>
            {trendingDishes.map((dish) => (
              <TouchableOpacity key={dish.id} style={styles.dishCard}>
                <View style={styles.dishIcon}>
                  <Text style={styles.dishEmoji}>🍽️</Text>
                </View>
                <Text style={styles.dishName} numberOfLines={1}>{dish.name}</Text>
                <Text style={styles.dishRestaurant} numberOfLines={1}>{dish.restaurant}</Text>
                <View style={styles.dishStats}>
                  <Fire size={12} color="#FF6B6B" />
                  <Text style={styles.dishOrders}>{dish.orders} orders</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Coming Soon Notice */}
        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>More Features Coming</Text>
          <Text style={styles.noticeText}>
            Soon you'll be able to see trending cuisines, neighborhoods, and personalized recommendations!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DS.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.md,
    backgroundColor: DS.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  backButton: {
    width: 50,
  },
  backText: {
    ...DS.typography.button,
    color: DS.colors.primaryOrange,
  },
  headerTitle: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
  },
  hero: {
    alignItems: 'center',
    padding: DS.spacing.xl,
    paddingBottom: DS.spacing.lg,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${DS.colors.primaryOrange}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DS.spacing.md,
  },
  heroTitle: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.xs,
  },
  heroSubtitle: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    textAlign: 'center',
  },
  categoriesContainer: {
    marginBottom: DS.spacing.lg,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: DS.spacing.lg,
    gap: DS.spacing.sm,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DS.spacing.sm,
    paddingHorizontal: DS.spacing.md,
    borderRadius: DS.borderRadius.full,
    backgroundColor: DS.colors.surface,
    gap: DS.spacing.xs,
  },
  categoryTabActive: {
    backgroundColor: `${DS.colors.primaryOrange}15`,
  },
  categoryText: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
  },
  categoryTextActive: {
    color: DS.colors.primaryOrange,
    fontWeight: '600',
  },
  section: {
    marginBottom: DS.spacing.xl,
  },
  sectionTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.md,
    paddingHorizontal: DS.spacing.lg,
  },
  restaurantsList: {
    paddingHorizontal: DS.spacing.lg,
  },
  restaurantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DS.colors.surface,
    padding: DS.spacing.md,
    borderRadius: DS.borderRadius.lg,
    marginBottom: DS.spacing.sm,
    ...DS.shadows.sm,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: DS.colors.primaryOrange,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DS.spacing.md,
  },
  rankText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
    fontSize: 12,
  },
  restaurantContent: {
    flex: 1,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: DS.spacing.sm,
  },
  restaurantName: {
    ...DS.typography.body,
    color: DS.colors.textDark,
    fontWeight: '600',
    marginBottom: DS.spacing.xxs,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.xs,
  },
  category: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
  },
  priceRange: {
    ...DS.typography.caption,
    color: DS.colors.primaryOrange,
    fontWeight: '600',
  },
  location: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
  },
  dot: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.xxs,
    backgroundColor: '#FFF5F5',
    paddingHorizontal: DS.spacing.sm,
    paddingVertical: DS.spacing.xxs,
    borderRadius: DS.borderRadius.sm,
  },
  trendText: {
    ...DS.typography.caption,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: DS.spacing.md,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.xxs,
  },
  statText: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
  },
  dishesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: DS.spacing.lg,
    gap: DS.spacing.sm,
  },
  dishCard: {
    width: '47%',
    backgroundColor: DS.colors.surface,
    padding: DS.spacing.md,
    borderRadius: DS.borderRadius.lg,
    alignItems: 'center',
    ...DS.shadows.xs,
  },
  dishIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${DS.colors.primaryOrange}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DS.spacing.sm,
  },
  dishEmoji: {
    fontSize: 20,
  },
  dishName: {
    ...DS.typography.body,
    color: DS.colors.textDark,
    fontWeight: '600',
    marginBottom: DS.spacing.xxs,
    textAlign: 'center',
  },
  dishRestaurant: {
    ...DS.typography.caption,
    color: DS.colors.textGray,
    marginBottom: DS.spacing.sm,
    textAlign: 'center',
  },
  dishStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.xxs,
  },
  dishOrders: {
    ...DS.typography.caption,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  notice: {
    backgroundColor: `${DS.colors.primaryOrange}10`,
    marginHorizontal: DS.spacing.lg,
    marginBottom: DS.spacing.xxl,
    padding: DS.spacing.lg,
    borderRadius: DS.borderRadius.lg,
    alignItems: 'center',
  },
  noticeTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
    marginBottom: DS.spacing.sm,
  },
  noticeText: {
    ...DS.typography.body,
    color: DS.colors.textDark,
    textAlign: 'center',
    opacity: 0.8,
  },
});