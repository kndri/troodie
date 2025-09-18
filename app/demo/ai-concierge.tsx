/**
 * DEMO SCREEN - AI Food Concierge
 * Personalized recommendations that learn your preferences
 */

import { DS } from '@/components/design-system/tokens';
import { useRouter } from 'expo-router';
import {
  Brain,
  ChevronRight,
  Heart,
  MapPin,
  Sparkles,
  Star,
  ThumbsUp,
  TrendingUp
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface Recommendation {
  id: string;
  name: string;
  emoji: string;
  cuisine: string;
  matchScore: number;
  reason: string;
  priceLevel: string;
  distance: string;
  rating: number;
  aiInsight: string;
}

interface TasteProfile {
  preference: string;
  level: number;
  color: string;
}

interface RecentQuery {
  id: string;
  query: string;
  result: string;
  timestamp: string;
}

export default function AIConciergeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeMode, setActiveMode] = useState<'discover' | 'plan' | 'learn'>('discover');

  // Mock AI recommendations
  const recommendations: Recommendation[] = [
    {
      id: '1',
      name: 'Osteria Morini',
      emoji: '🍝',
      cuisine: 'Italian',
      matchScore: 98,
      reason: 'Based on your love for homemade pasta and cozy atmospheres',
      priceLevel: '$$$',
      distance: '0.8 mi',
      rating: 4.8,
      aiInsight: 'Their cappelletti with truffle matches your preference for earthy, rich flavors',
    },
    {
      id: '2',
      name: 'Sushi Nakazawa',
      emoji: '🍣',
      cuisine: 'Japanese',
      matchScore: 94,
      reason: 'You enjoyed similar omakase experiences 3 times this month',
      priceLevel: '$$$$',
      distance: '1.2 mi',
      rating: 4.9,
      aiInsight: 'Chef\'s selection aligns with your adventurous palate',
    },
    {
      id: '3',
      name: 'Cosme',
      emoji: '🌮',
      cuisine: 'Mexican',
      matchScore: 91,
      reason: 'Perfect for your upcoming date night preference',
      priceLevel: '$$$',
      distance: '2.1 mi',
      rating: 4.7,
      aiInsight: 'Modern Mexican with the bold flavors you seek',
    },
  ];

  // Mock taste profile
  const tasteProfile: TasteProfile[] = [
    { preference: 'Spicy Food', level: 85, color: '#FF6B6B' },
    { preference: 'Seafood', level: 92, color: '#3B82F6' },
    { preference: 'Vegetarian Options', level: 65, color: '#10B981' },
    { preference: 'Fine Dining', level: 78, color: '#8B5CF6' },
    { preference: 'Comfort Food', level: 88, color: '#F59E0B' },
  ];

  // Mock recent queries
  const recentQueries: RecentQuery[] = [
    { id: '1', query: 'Romantic dinner for anniversary', result: 'Found 12 perfect spots', timestamp: '2 hours ago' },
    { id: '2', query: 'Best ramen near me', result: 'Suggested 8 options', timestamp: 'Yesterday' },
    { id: '3', query: 'Brunch with outdoor seating', result: 'Matched 15 places', timestamp: '3 days ago' },
  ];

  // Occasion suggestions
  const occasions = [
    { id: '1', title: 'Date Night', emoji: '💑', color: '#FF6B6B' },
    { id: '2', title: 'Business Lunch', emoji: '💼', color: '#3B82F6' },
    { id: '3', title: 'Family Dinner', emoji: '👨‍👩‍👧‍👦', color: '#10B981' },
    { id: '4', title: 'Quick Bite', emoji: '⚡', color: '#F59E0B' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronRight size={24} color="#262626" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>AI Food Concierge</Text>
          <Text style={styles.headerSubtitle}>Your personal dining assistant</Text>
        </View>
      </View>

      {/* AI Status Card */}
      <View style={styles.aiStatusCard}>
        <View style={styles.aiStatusHeader}>
          <View style={styles.aiAvatar}>
            <Brain size={24} color="#3B82F6" />
          </View>
          <View style={styles.aiStatusInfo}>
            <Text style={styles.aiStatusTitle}>AI Learning Active</Text>
            <Text style={styles.aiStatusSubtitle}>Analyzed 234 of your dining experiences</Text>
          </View>
          <View style={styles.aiAccuracy}>
            <Text style={styles.aiAccuracyValue}>96%</Text>
            <Text style={styles.aiAccuracyLabel}>accuracy</Text>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Sparkles size={18} color="#8C8C8C" />
          <TextInput
            style={styles.searchInput}
            placeholder="Ask me anything about dining..."
            placeholderTextColor="#8C8C8C"
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Ask AI</Text>
        </TouchableOpacity>
      </View>

      {/* Mode Tabs */}
      <View style={styles.modeTabs}>
        {['discover', 'plan', 'learn'].map((mode) => (
          <TouchableOpacity
            key={mode}
            onPress={() => setActiveMode(mode as any)}
            style={[styles.modeTab, activeMode === mode && styles.modeTabActive]}
          >
            <Text style={[styles.modeTabText, activeMode === mode && styles.modeTabTextActive]}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Discover Mode */}
        {activeMode === 'discover' && (
          <View style={styles.modeContent}>
            {/* Occasions */}
            <View style={styles.occasionsSection}>
              <Text style={styles.sectionTitle}>What\'s the occasion?</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.occasionsScroll}>
                {occasions.map((occasion) => (
                  <TouchableOpacity key={occasion.id} style={[styles.occasionCard, { borderColor: occasion.color }]}>
                    <Text style={styles.occasionEmoji}>{occasion.emoji}</Text>
                    <Text style={styles.occasionTitle}>{occasion.title}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* AI Recommendations */}
            <View style={styles.recommendationsSection}>
              <Text style={styles.sectionTitle}>Personalized for You</Text>
              {recommendations.map((rec) => (
                <TouchableOpacity key={rec.id} style={styles.recommendationCard}>
                  <View style={styles.recHeader}>
                    <View style={styles.recInfo}>
                      <View style={styles.recEmoji}>
                        <Text style={styles.emojiText}>{rec.emoji}</Text>
                      </View>
                      <View>
                        <Text style={styles.recName}>{rec.name}</Text>
                        <View style={styles.recMeta}>
                          <Text style={styles.recCuisine}>{rec.cuisine}</Text>
                          <Text style={styles.recDot}>•</Text>
                          <Text style={styles.recPrice}>{rec.priceLevel}</Text>
                          <Text style={styles.recDot}>•</Text>
                          <MapPin size={10} color="#8C8C8C" />
                          <Text style={styles.recDistance}>{rec.distance}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.matchBadge}>
                      <Text style={styles.matchScore}>{rec.matchScore}%</Text>
                      <Text style={styles.matchLabel}>match</Text>
                    </View>
                  </View>

                  <View style={styles.recReason}>
                    <Sparkles size={14} color="#3B82F6" />
                    <Text style={styles.recReasonText}>{rec.reason}</Text>
                  </View>

                  <View style={styles.aiInsightBox}>
                    <Text style={styles.aiInsightText}>💡 {rec.aiInsight}</Text>
                  </View>

                  <View style={styles.recFooter}>
                    <View style={styles.recRating}>
                      <Star size={14} color="#FFAD27" fill="#FFAD27" />
                      <Text style={styles.recRatingText}>{rec.rating}</Text>
                    </View>
                    <TouchableOpacity style={styles.saveButton}>
                      <Heart size={14} color="#FF6B6B" />
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Plan Mode */}
        {activeMode === 'plan' && (
          <View style={styles.modeContent}>
            {/* Recent Queries */}
            <View style={styles.queriesSection}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              {recentQueries.map((query) => (
                <TouchableOpacity key={query.id} style={styles.queryCard}>
                  <View style={styles.queryInfo}>
                    <Text style={styles.queryText}>{query.query}</Text>
                    <Text style={styles.queryResult}>{query.result}</Text>
                  </View>
                  <Text style={styles.queryTime}>{query.timestamp}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Smart Suggestions */}
            <View style={styles.suggestionsSection}>
              <Text style={styles.sectionTitle}>AI Suggestions</Text>
              <View style={styles.suggestionCard}>
                <View style={styles.suggestionIcon}>
                  <TrendingUp size={20} color="#10B981" />
                </View>
                <View style={styles.suggestionContent}>
                  <Text style={styles.suggestionTitle}>Trending in Your Network</Text>
                  <Text style={styles.suggestionText}>
                    5 friends visited Carbone this week. Want to check it out?
                  </Text>
                  <TouchableOpacity style={styles.suggestionAction}>
                    <Text style={styles.suggestionActionText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Learn Mode */}
        {activeMode === 'learn' && (
          <View style={styles.modeContent}>
            {/* Taste Profile */}
            <View style={styles.profileSection}>
              <Text style={styles.sectionTitle}>Your Taste Profile</Text>
              <View style={styles.profileCard}>
                {tasteProfile.map((pref) => (
                  <View key={pref.preference} style={styles.preferenceItem}>
                    <View style={styles.preferenceInfo}>
                      <Text style={styles.preferenceName}>{pref.preference}</Text>
                      <Text style={styles.preferenceLevel}>{pref.level}%</Text>
                    </View>
                    <View style={styles.preferenceBar}>
                      <View
                        style={[
                          styles.preferenceProgress,
                          {
                            width: `${pref.level}%`,
                            backgroundColor: pref.color,
                          },
                        ]}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Learning Stats */}
            <View style={styles.statsSection}>
              <Text style={styles.sectionTitle}>AI Learning Progress</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>234</Text>
                  <Text style={styles.statLabel}>Places Analyzed</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>18</Text>
                  <Text style={styles.statLabel}>Cuisines Mapped</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>96%</Text>
                  <Text style={styles.statLabel}>Accuracy Rate</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>42</Text>
                  <Text style={styles.statLabel}>Perfect Matches</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.improveButton}>
              <ThumbsUp size={16} color="#FFFFFF" />
              <Text style={styles.improveButtonText}>Help Improve Recommendations</Text>
            </TouchableOpacity>
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

  // AI Status
  aiStatusCard: {
    margin: 20,
    padding: 16,
    backgroundColor: '#3B82F610',
    borderRadius: 16,
  },
  aiStatusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  aiStatusInfo: {
    flex: 1,
  },
  aiStatusTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 2,
  },
  aiStatusSubtitle: {
    fontSize: 12,
    color: '#595959',
  },
  aiAccuracy: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  aiAccuracyValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B82F6',
  },
  aiAccuracyLabel: {
    fontSize: 10,
    color: '#3B82F6',
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#262626',
  },
  searchButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: 'center',
  },
  searchButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Mode Tabs
  modeTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  modeTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modeTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  modeTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8C8C8C',
  },
  modeTabTextActive: {
    color: '#262626',
    fontWeight: '600',
  },

  // Content
  modeContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 12,
  },

  // Occasions
  occasionsSection: {
    marginBottom: 24,
  },
  occasionsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  occasionCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  occasionEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  occasionTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#262626',
  },

  // Recommendations
  recommendationsSection: {
    marginBottom: 24,
  },
  recommendationCard: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  recHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  recInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  recEmoji: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  emojiText: {
    fontSize: 20,
  },
  recName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 4,
  },
  recMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recCuisine: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  recDot: {
    fontSize: 12,
    color: '#D4D4D4',
  },
  recPrice: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  recDistance: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  matchBadge: {
    alignItems: 'center',
    backgroundColor: '#3B82F615',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  matchScore: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B82F6',
  },
  matchLabel: {
    fontSize: 10,
    color: '#3B82F6',
  },
  recReason: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  recReasonText: {
    fontSize: 13,
    color: '#595959',
    flex: 1,
  },
  aiInsightBox: {
    backgroundColor: '#FFF8E7',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  aiInsightText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#6F4F1F',
  },
  recFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recRatingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#262626',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  saveButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FF6B6B',
  },

  // Queries
  queriesSection: {
    marginBottom: 24,
  },
  queryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F7F7F7',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
  },
  queryInfo: {
    flex: 1,
  },
  queryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#262626',
    marginBottom: 4,
  },
  queryResult: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  queryTime: {
    fontSize: 11,
    color: '#8C8C8C',
  },

  // Suggestions
  suggestionsSection: {
    marginBottom: 24,
  },
  suggestionCard: {
    flexDirection: 'row',
    backgroundColor: '#10B98110',
    borderRadius: 12,
    padding: 16,
  },
  suggestionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 4,
  },
  suggestionText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#595959',
    marginBottom: 8,
  },
  suggestionAction: {
    alignSelf: 'flex-start',
  },
  suggestionActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },

  // Profile
  profileSection: {
    marginBottom: 24,
  },
  profileCard: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 16,
  },
  preferenceItem: {
    marginBottom: 16,
  },
  preferenceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  preferenceName: {
    fontSize: 13,
    color: '#595959',
  },
  preferenceLevel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#262626',
  },
  preferenceBar: {
    height: 6,
    backgroundColor: '#E8E8E8',
    borderRadius: 3,
    overflow: 'hidden',
  },
  preferenceProgress: {
    height: '100%',
    borderRadius: 3,
  },

  // Stats
  statsSection: {
    marginBottom: 24,
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
    borderWidth: 1,
    borderColor: '#E8E8E8',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#8C8C8C',
  },

  improveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#262626',
    paddingVertical: 14,
    borderRadius: 24,
  },
  improveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});