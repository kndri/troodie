/**
 * DEMO SCREEN - City Leaderboards
 * Compete for top foodie status in your city
 */

import { DS } from '@/components/design-system/tokens';
import { useRouter } from 'expo-router';
import {
  Award,
  ChevronRight,
  Crown,
  Flame,
  MapPin,
  Medal,
  Star,
  TrendingUp,
  Trophy
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

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  score: number;
  reviews: number;
  photos: number;
  badges: string[];
  streak: number;
  change: 'up' | 'down' | 'same';
  changeAmount: number;
  isYou?: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  reward: string;
  unlocked: boolean;
}

interface CityStats {
  totalFoodies: number;
  activeThisWeek: number;
  totalReviews: number;
  topCuisine: string;
}

export default function LeaderboardsScreen() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<'city' | 'friends' | 'global'>('city');
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('month');

  // Mock leaderboard data
  const cityLeaderboard: LeaderboardEntry[] = [
    {
      id: '1',
      rank: 1,
      name: 'Sarah Chen',
      avatar: '👩',
      score: 12450,
      reviews: 234,
      photos: 567,
      badges: ['🔥', '⭐', '👑'],
      streak: 45,
      change: 'same',
      changeAmount: 0,
    },
    {
      id: '2',
      rank: 2,
      name: 'Mike Johnson',
      avatar: '👨',
      score: 11890,
      reviews: 198,
      photos: 445,
      badges: ['🔥', '🏆'],
      streak: 32,
      change: 'up',
      changeAmount: 2,
    },
    {
      id: '3',
      rank: 3,
      name: 'Emma Wilson',
      avatar: '👱‍♀️',
      score: 10234,
      reviews: 176,
      photos: 389,
      badges: ['⭐', '🎯'],
      streak: 28,
      change: 'down',
      changeAmount: 1,
    },
    {
      id: '24',
      rank: 24,
      name: 'You',
      avatar: '👤',
      score: 4567,
      reviews: 67,
      photos: 123,
      badges: ['🌟'],
      streak: 7,
      change: 'up',
      changeAmount: 5,
      isYou: true,
    },
  ];

  // Mock achievements
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Explorer',
      description: 'Visit 50 new restaurants',
      icon: '🗺️',
      progress: 42,
      total: 50,
      reward: '500 points',
      unlocked: false,
    },
    {
      id: '2',
      title: 'Photographer',
      description: 'Share 100 food photos',
      icon: '📸',
      progress: 100,
      total: 100,
      reward: '300 points',
      unlocked: true,
    },
    {
      id: '3',
      title: 'Critic',
      description: 'Write 25 detailed reviews',
      icon: '✍️',
      progress: 18,
      total: 25,
      reward: '750 points',
      unlocked: false,
    },
    {
      id: '4',
      title: 'Trendsetter',
      description: 'Be first to review 10 places',
      icon: '🚀',
      progress: 6,
      total: 10,
      reward: '1000 points',
      unlocked: false,
    },
  ];

  // Mock city stats
  const cityStats: CityStats = {
    totalFoodies: 12456,
    activeThisWeek: 3892,
    totalReviews: 145678,
    topCuisine: 'Italian',
  };

  // Your stats
  const yourStats = {
    currentRank: 24,
    bestRank: 18,
    pointsToNext: 433,
    weeklyGrowth: '+12%',
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronRight size={24} color="#262626" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>City Leaderboards</Text>
          <Text style={styles.headerSubtitle}>NYC Foodie Rankings</Text>
        </View>
      </View>

      {/* Your Status Card */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <View style={styles.statusInfo}>
            <Text style={styles.statusLabel}>Your Rank</Text>
            <View style={styles.statusRank}>
              <Text style={styles.statusRankNumber}>#24</Text>
              <View style={styles.statusChange}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={styles.statusChangeText}>+5</Text>
              </View>
            </View>
          </View>
          <View style={styles.statusStats}>
            <View style={styles.statusStat}>
              <Text style={styles.statusStatValue}>4,567</Text>
              <Text style={styles.statusStatLabel}>Points</Text>
            </View>
            <View style={styles.statusStat}>
              <Text style={styles.statusStatValue}>7</Text>
              <Text style={styles.statusStatLabel}>Day Streak</Text>
            </View>
            <View style={styles.statusStat}>
              <Text style={styles.statusStatValue}>433</Text>
              <Text style={styles.statusStatLabel}>To Next</Text>
            </View>
          </View>
        </View>
        <View style={styles.statusProgress}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '72%' }]} />
          </View>
          <Text style={styles.progressText}>72% to rank #23</Text>
        </View>
      </View>

      {/* View Tabs */}
      <View style={styles.viewTabs}>
        {['city', 'friends', 'global'].map((view) => (
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

      {/* Timeframe Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeframeContainer}>
        {['week', 'month', 'all'].map((time) => (
          <TouchableOpacity
            key={time}
            onPress={() => setTimeframe(time as any)}
            style={[styles.timeframeChip, timeframe === time && styles.timeframeChipActive]}
          >
            <Text style={[styles.timeframeText, timeframe === time && styles.timeframeTextActive]}>
              {time === 'week' ? 'This Week' : time === 'month' ? 'This Month' : 'All Time'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* City View */}
        {activeView === 'city' && (
          <View style={styles.viewContent}>
            {/* Top 3 */}
            <View style={styles.topThree}>
              {cityLeaderboard.slice(0, 3).map((entry) => (
                <View key={entry.id} style={[styles.topCard, entry.rank === 1 && styles.topCardFirst]}>
                  <View style={styles.topRankBadge}>
                    {entry.rank === 1 ? (
                      <Crown size={20} color="#FFAD27" />
                    ) : entry.rank === 2 ? (
                      <Medal size={20} color="#C0C0C0" />
                    ) : (
                      <Medal size={20} color="#CD7F32" />
                    )}
                  </View>
                  <Text style={styles.topAvatar}>{entry.avatar}</Text>
                  <Text style={styles.topName}>{entry.name}</Text>
                  <Text style={styles.topScore}>{entry.score.toLocaleString()}</Text>
                  <View style={styles.topBadges}>
                    {entry.badges.map((badge, index) => (
                      <Text key={index} style={styles.badgeIcon}>{badge}</Text>
                    ))}
                  </View>
                  <View style={styles.topStats}>
                    <Text style={styles.topStat}>{entry.reviews} reviews</Text>
                    <Text style={styles.topStat}>{entry.streak}🔥</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Rest of Leaderboard */}
            <View style={styles.leaderboardList}>
              <Text style={styles.sectionTitle}>Full Rankings</Text>
              {cityLeaderboard.map((entry) => (
                <TouchableOpacity
                  key={entry.id}
                  style={[styles.leaderboardItem, entry.isYou && styles.leaderboardItemYou]}
                >
                  <View style={styles.leaderboardRank}>
                    <Text style={[styles.rankNumber, entry.isYou && styles.rankNumberYou]}>
                      #{entry.rank}
                    </Text>
                    {entry.change !== 'same' && (
                      <View style={styles.rankChange}>
                        <TrendingUp
                          size={12}
                          color={entry.change === 'up' ? '#10B981' : '#EF4444'}
                          style={entry.change === 'down' && { transform: [{ rotate: '180deg' }] }}
                        />
                        <Text style={[
                          styles.rankChangeText,
                          { color: entry.change === 'up' ? '#10B981' : '#EF4444' }
                        ]}>
                          {entry.changeAmount}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.leaderboardUser}>
                    <Text style={styles.userAvatar}>{entry.avatar}</Text>
                    <View>
                      <Text style={[styles.userName, entry.isYou && styles.userNameYou]}>
                        {entry.name}
                      </Text>
                      <View style={styles.userBadges}>
                        {entry.badges.slice(0, 3).map((badge, index) => (
                          <Text key={index} style={styles.smallBadge}>{badge}</Text>
                        ))}
                      </View>
                    </View>
                  </View>
                  <View style={styles.leaderboardScore}>
                    <Text style={styles.scoreValue}>{entry.score.toLocaleString()}</Text>
                    <Text style={styles.scoreLabel}>points</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Friends View */}
        {activeView === 'friends' && (
          <View style={styles.viewContent}>
            <View style={styles.friendsEmpty}>
              <Text style={styles.emptyEmoji}>👥</Text>
              <Text style={styles.emptyTitle}>Connect with Friends</Text>
              <Text style={styles.emptySubtitle}>
                See how you rank against your network
              </Text>
              <TouchableOpacity style={styles.inviteButton}>
                <Text style={styles.inviteButtonText}>Invite Friends</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Global View */}
        {activeView === 'global' && (
          <View style={styles.viewContent}>
            {/* City Stats */}
            <View style={styles.cityStatsCard}>
              <Text style={styles.cityStatsTitle}>NYC Statistics</Text>
              <View style={styles.cityStatsGrid}>
                <View style={styles.cityStat}>
                  <Text style={styles.cityStatValue}>{cityStats.totalFoodies.toLocaleString()}</Text>
                  <Text style={styles.cityStatLabel}>Total Foodies</Text>
                </View>
                <View style={styles.cityStat}>
                  <Text style={styles.cityStatValue}>{cityStats.activeThisWeek.toLocaleString()}</Text>
                  <Text style={styles.cityStatLabel}>Active This Week</Text>
                </View>
                <View style={styles.cityStat}>
                  <Text style={styles.cityStatValue}>{cityStats.totalReviews.toLocaleString()}</Text>
                  <Text style={styles.cityStatLabel}>Reviews</Text>
                </View>
                <View style={styles.cityStat}>
                  <Text style={styles.cityStatValue}>{cityStats.topCuisine}</Text>
                  <Text style={styles.cityStatLabel}>Top Cuisine</Text>
                </View>
              </View>
            </View>

            {/* Achievements */}
            <View style={styles.achievementsSection}>
              <Text style={styles.sectionTitle}>Achievements</Text>
              {achievements.map((achievement) => (
                <View key={achievement.id} style={[
                  styles.achievementCard,
                  achievement.unlocked && styles.achievementCardUnlocked
                ]}>
                  <View style={styles.achievementIcon}>
                    <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
                    {achievement.unlocked && (
                      <View style={styles.unlockedBadge}>
                        <Star size={12} color="#FFAD27" fill="#FFAD27" />
                      </View>
                    )}
                  </View>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementDescription}>{achievement.description}</Text>
                    <View style={styles.achievementProgress}>
                      <View style={styles.achievementBar}>
                        <View
                          style={[
                            styles.achievementFill,
                            {
                              width: `${(achievement.progress / achievement.total) * 100}%`,
                              backgroundColor: achievement.unlocked ? '#10B981' : '#F97316',
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.achievementProgressText}>
                        {achievement.progress}/{achievement.total}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.achievementReward}>
                    <Trophy size={14} color="#FFAD27" />
                    <Text style={styles.rewardText}>{achievement.reward}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <TouchableOpacity style={styles.ctaButton}>
          <Flame size={16} color="#FFFFFF" />
          <Text style={styles.ctaButtonText}>Boost Your Rank</Text>
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

  // Status Card
  statusCard: {
    margin: 20,
    padding: 16,
    backgroundColor: '#F9731610',
    borderRadius: 16,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statusInfo: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 12,
    color: '#8C8C8C',
    marginBottom: 4,
  },
  statusRank: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  statusRankNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F97316',
  },
  statusChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#10B98115',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusChangeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  statusStats: {
    flexDirection: 'row',
    gap: 20,
  },
  statusStat: {
    alignItems: 'center',
  },
  statusStatValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
  },
  statusStatLabel: {
    fontSize: 10,
    color: '#8C8C8C',
    marginTop: 2,
  },
  statusProgress: {
    gap: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E8E8E8',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F97316',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: '#8C8C8C',
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
    borderBottomColor: '#F97316',
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

  // Timeframe
  timeframeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    maxHeight: 60,
  },
  timeframeChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    marginRight: 8,
  },
  timeframeChipActive: {
    backgroundColor: '#F97316',
  },
  timeframeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#595959',
  },
  timeframeTextActive: {
    color: '#FFFFFF',
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

  // Top 3
  topThree: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  topCard: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  topCardFirst: {
    backgroundColor: '#FFAD2710',
    borderWidth: 1,
    borderColor: '#FFAD27',
  },
  topRankBadge: {
    marginBottom: 8,
  },
  topAvatar: {
    fontSize: 28,
    marginBottom: 6,
  },
  topName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 4,
  },
  topScore: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F97316',
    marginBottom: 6,
  },
  topBadges: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 6,
  },
  badgeIcon: {
    fontSize: 14,
  },
  topStats: {
    alignItems: 'center',
  },
  topStat: {
    fontSize: 10,
    color: '#8C8C8C',
  },

  // Leaderboard List
  leaderboardList: {
    marginBottom: 24,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  leaderboardItemYou: {
    backgroundColor: '#F9731610',
    borderWidth: 1,
    borderColor: '#F97316',
  },
  leaderboardRank: {
    width: 50,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8C8C8C',
  },
  rankNumberYou: {
    color: '#F97316',
  },
  rankChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  rankChangeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  leaderboardUser: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  userAvatar: {
    fontSize: 24,
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#262626',
  },
  userNameYou: {
    fontWeight: '600',
    color: '#F97316',
  },
  userBadges: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 2,
  },
  smallBadge: {
    fontSize: 10,
  },
  leaderboardScore: {
    alignItems: 'flex-end',
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
  },
  scoreLabel: {
    fontSize: 10,
    color: '#8C8C8C',
  },

  // Friends Empty
  friendsEmpty: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#8C8C8C',
    marginBottom: 24,
  },
  inviteButton: {
    backgroundColor: '#F97316',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  inviteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // City Stats
  cityStatsCard: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  cityStatsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 12,
  },
  cityStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cityStat: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
  },
  cityStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F97316',
  },
  cityStatLabel: {
    fontSize: 10,
    color: '#8C8C8C',
    marginTop: 2,
  },

  // Achievements
  achievementsSection: {
    marginBottom: 24,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  achievementCardUnlocked: {
    backgroundColor: '#10B98110',
  },
  achievementIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    position: 'relative',
  },
  achievementEmoji: {
    fontSize: 20,
  },
  unlockedBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#8C8C8C',
    marginBottom: 6,
  },
  achievementProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  achievementBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E8E8E8',
    borderRadius: 2,
    overflow: 'hidden',
  },
  achievementFill: {
    height: '100%',
    borderRadius: 2,
  },
  achievementProgressText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#595959',
  },
  achievementReward: {
    alignItems: 'center',
    marginLeft: 12,
  },
  rewardText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFAD27',
    marginTop: 2,
  },

  // Bottom CTA
  bottomCTA: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    backgroundColor: '#FFFFFF',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F97316',
    paddingVertical: 14,
    borderRadius: 24,
  },
  ctaButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});