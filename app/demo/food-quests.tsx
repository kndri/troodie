/**
 * FOOD QUEST CHALLENGES - Full Screen Demo
 * Weekly gamified exploration challenges
 */

import { useRouter } from 'expo-router';
import {
  Award,
  ChevronRight,
  Clock,
  Flag,
  Map,
  Star,
  Trophy,
  Users
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

// Mock quest data
const ACTIVE_QUEST = {
  id: 'neighborhood-navigator',
  title: 'Neighborhood Navigator',
  description: 'Explore 3 new restaurants in Williamsburg you\'ve never tried before',
  icon: Map,
  progress: 1,
  total: 3,
  timeLeft: '4 days',
  points: 150,
  badge: 'Explorer Badge',
  difficulty: 'Medium',
  participants: 234,
  completedBy: ['Alex M.', 'Sarah K.', 'Jamie L.'],
  restaurants: [
    { name: 'Sunday in Brooklyn', visited: true, date: 'Yesterday', rating: 4.8 },
    { name: 'Llama Inn', visited: false },
    { name: 'Lilia', visited: false },
  ]
};

const UPCOMING_QUESTS = [
  {
    id: 'cuisine-passport',
    title: 'Cuisine Passport',
    description: 'Try 5 different cuisines in a week',
    icon: Flag,
    difficulty: 'Hard',
    points: 250,
    startsIn: '2 days'
  },
  {
    id: 'brunch-crawler',
    title: 'Brunch Crawler',
    description: 'Visit 3 top-rated brunch spots this weekend',
    icon: Clock,
    difficulty: 'Easy',
    points: 100,
    startsIn: '5 days'
  },
];

const LEADERBOARD = [
  { rank: 1, name: 'Alex M.', avatar: 'https://i.pravatar.cc/100?img=5', quests: 12, points: 2847 },
  { rank: 2, name: 'Sarah K.', avatar: 'https://i.pravatar.cc/100?img=9', quests: 10, points: 2341 },
  { rank: 3, name: 'You', avatar: 'https://i.pravatar.cc/100?img=1', quests: 8, points: 1923, isUser: true },
  { rank: 4, name: 'Jamie L.', avatar: 'https://i.pravatar.cc/100?img=12', quests: 7, points: 1654 },
  { rank: 5, name: 'Pat K.', avatar: 'https://i.pravatar.cc/100?img=3', quests: 6, points: 1432 },
];

export default function FoodQuestsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'leaderboard'>('active');

  const progressPercentage = (ACTIVE_QUEST.progress / ACTIVE_QUEST.total) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#10B981';
      case 'Medium': return '#F59E0B';
      case 'Hard': return '#EF4444';
      default: return '#8C8C8C';
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
          <Flag size={16} color="#EC4899" />
          <Text style={styles.headerTitle}>Food Quests</Text>
        </View>
        <TouchableOpacity style={styles.streakBadge}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakText}>7</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setActiveTab('active')}
          style={[styles.tab, activeTab === 'active' && styles.tabActive]}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>
            Active Quest
          </Text>
          {activeTab === 'active' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('upcoming')}
          style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>
            Upcoming
          </Text>
          {activeTab === 'upcoming' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('leaderboard')}
          style={[styles.tab, activeTab === 'leaderboard' && styles.tabActive]}
        >
          <Text style={[styles.tabText, activeTab === 'leaderboard' && styles.tabTextActive]}>
            Leaderboard
          </Text>
          {activeTab === 'leaderboard' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === 'active' && (
          <>
            {/* Active Quest Card */}
            <View style={styles.questCard}>
              <View style={styles.questHeader}>
                <View style={styles.questBadge}>
                  <ACTIVE_QUEST.icon size={28} color="#FFFFFF" />
                </View>
                <View style={styles.questInfo}>
                  <View style={styles.questTags}>
                    <View style={[styles.difficultyTag, { backgroundColor: getDifficultyColor(ACTIVE_QUEST.difficulty) + '15' }]}>
                      <Text style={[styles.difficultyText, { color: getDifficultyColor(ACTIVE_QUEST.difficulty) }]}>
                        {ACTIVE_QUEST.difficulty}
                      </Text>
                    </View>
                    <View style={styles.timeTag}>
                      <Clock size={10} color="#8C8C8C" />
                      <Text style={styles.timeText}>{ACTIVE_QUEST.timeLeft} left</Text>
                    </View>
                  </View>
                  <Text style={styles.questTitle}>{ACTIVE_QUEST.title}</Text>
                  <Text style={styles.questDescription}>{ACTIVE_QUEST.description}</Text>
                </View>
              </View>

              {/* Progress Section */}
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Progress</Text>
                  <Text style={styles.progressCount}>
                    {ACTIVE_QUEST.progress} / {ACTIVE_QUEST.total}
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
                </View>
                <Text style={styles.progressHint}>2 more restaurants to complete!</Text>
              </View>

              {/* Restaurants Checklist */}
              <View style={styles.checklistSection}>
                <Text style={styles.checklistTitle}>Your Targets</Text>
                {ACTIVE_QUEST.restaurants.map((restaurant, index) => (
                  <TouchableOpacity key={index} style={styles.checklistItem}>
                    <View style={[styles.checkbox, restaurant.visited && styles.checkboxChecked]}>
                      {restaurant.visited && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <View style={styles.checklistInfo}>
                      <Text style={[styles.checklistName, restaurant.visited && styles.checklistNameCompleted]}>
                        {restaurant.name}
                      </Text>
                      {restaurant.visited && (
                        <Text style={styles.checklistDate}>Visited {restaurant.date}</Text>
                      )}
                    </View>
                    {restaurant.rating && (
                      <View style={styles.rating}>
                        <Star size={12} color="#F59E0B" fill="#F59E0B" />
                        <Text style={styles.ratingText}>{restaurant.rating}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {/* Rewards Section */}
              <View style={styles.rewardsSection}>
                <Text style={styles.rewardsTitle}>🏆 Quest Rewards</Text>
                <View style={styles.rewardsGrid}>
                  <View style={styles.rewardCard}>
                    <Text style={styles.rewardEmoji}>⚡</Text>
                    <Text style={styles.rewardValue}>{ACTIVE_QUEST.points}</Text>
                    <Text style={styles.rewardLabel}>Points</Text>
                  </View>
                  <View style={styles.rewardCard}>
                    <Text style={styles.rewardEmoji}>🎖️</Text>
                    <Text style={styles.rewardValue}>Badge</Text>
                    <Text style={styles.rewardLabel}>Explorer</Text>
                  </View>
                  <View style={styles.rewardCard}>
                    <Text style={styles.rewardEmoji}>🎟️</Text>
                    <Text style={styles.rewardValue}>10%</Text>
                    <Text style={styles.rewardLabel}>Off Next</Text>
                  </View>
                </View>
              </View>

              {/* Friends on Quest */}
              <View style={styles.friendsSection}>
                <View style={styles.friendsHeader}>
                  <Users size={16} color="#8C8C8C" />
                  <Text style={styles.friendsTitle}>{ACTIVE_QUEST.participants} friends on this quest</Text>
                </View>
                <View style={styles.friendsList}>
                  {ACTIVE_QUEST.completedBy.map((friend, index) => (
                    <View key={index} style={styles.friendChip}>
                      <Image
                        source={{ uri: `https://i.pravatar.cc/100?img=${index + 5}` }}
                        style={styles.friendAvatar}
                      />
                      <Text style={styles.friendName}>{friend}</Text>
                      <Trophy size={12} color="#F59E0B" />
                    </View>
                  ))}
                </View>
              </View>

              <TouchableOpacity style={styles.findButton}>
                <Map size={16} color="#FFFFFF" />
                <Text style={styles.findButtonText}>Find Restaurants</Text>
              </TouchableOpacity>
            </View>

            {/* Weekly Stats */}
            <View style={styles.statsCard}>
              <Text style={styles.statsTitle}>This Week\'s Stats</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statEmoji}>🍽️</Text>
                  <Text style={styles.statValue}>5</Text>
                  <Text style={styles.statLabel}>Places Visited</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statEmoji}>⚡</Text>
                  <Text style={styles.statValue}>320</Text>
                  <Text style={styles.statLabel}>Points Earned</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statEmoji}>🏆</Text>
                  <Text style={styles.statValue}>#12</Text>
                  <Text style={styles.statLabel}>City Rank</Text>
                </View>
              </View>
            </View>
          </>
        )}

        {activeTab === 'upcoming' && (
          <View style={styles.upcomingSection}>
            {UPCOMING_QUESTS.map((quest) => (
              <View key={quest.id} style={styles.upcomingCard}>
                <View style={styles.upcomingBadge}>
                  <quest.icon size={24} color="#8C8C8C" />
                </View>
                <View style={styles.upcomingInfo}>
                  <View style={styles.upcomingHeader}>
                    <Text style={styles.upcomingTitle}>{quest.title}</Text>
                    <View style={[styles.difficultyTag, { backgroundColor: getDifficultyColor(quest.difficulty) + '15' }]}>
                      <Text style={[styles.difficultyText, { color: getDifficultyColor(quest.difficulty) }]}>
                        {quest.difficulty}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.upcomingDescription}>{quest.description}</Text>
                  <View style={styles.upcomingFooter}>
                    <Text style={styles.upcomingPoints}>⚡ {quest.points} points</Text>
                    <Text style={styles.upcomingStarts}>Starts in {quest.startsIn}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.notifyButton}>
                  <Text style={styles.notifyText}>Notify Me</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'leaderboard' && (
          <View style={styles.leaderboardSection}>
            <View style={styles.leaderboardHeader}>
              <Text style={styles.leaderboardTitle}>Weekly Leaderboard</Text>
              <TouchableOpacity>
                <Text style={styles.leaderboardFilter}>NYC</Text>
              </TouchableOpacity>
            </View>

            {LEADERBOARD.map((user) => (
              <View key={user.rank} style={[styles.leaderboardCard, user.isUser && styles.leaderboardCardUser]}>
                <Text style={[styles.rank, user.rank <= 3 && styles.rankTop]}>{user.rank}</Text>
                <Image source={{ uri: user.avatar }} style={styles.leaderboardAvatar} />
                <View style={styles.leaderboardInfo}>
                  <Text style={styles.leaderboardName}>{user.name}</Text>
                  <Text style={styles.leaderboardStats}>{user.quests} quests completed</Text>
                </View>
                <View style={styles.leaderboardPoints}>
                  <Text style={styles.pointsValue}>{user.points.toLocaleString()}</Text>
                  <Text style={styles.pointsLabel}>pts</Text>
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View Full Leaderboard</Text>
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
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#FFF8E7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE2B2',
  },
  streakEmoji: {
    fontSize: 14,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F59E0B',
  },

  // Tabs
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
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
    left: '20%',
    right: '20%',
    height: 2,
    backgroundColor: '#EC4899',
  },

  // Quest Card
  questCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  questHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  questBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EC4899',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questInfo: {
    flex: 1,
  },
  questTags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  difficultyTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '600',
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
  },
  timeText: {
    fontSize: 11,
    color: '#8C8C8C',
    fontWeight: '500',
  },
  questTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#262626',
    marginBottom: 4,
  },
  questDescription: {
    fontSize: 14,
    color: '#8C8C8C',
    lineHeight: 20,
  },

  // Progress
  progressSection: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#8C8C8C',
    fontWeight: '500',
  },
  progressCount: {
    fontSize: 12,
    color: '#262626',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F7F7F7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#EC4899',
  },
  progressHint: {
    fontSize: 11,
    color: '#8C8C8C',
    marginTop: 6,
  },

  // Checklist
  checklistSection: {
    marginBottom: 20,
  },
  checklistTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 12,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F7F7',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  checklistInfo: {
    flex: 1,
  },
  checklistName: {
    fontSize: 14,
    color: '#262626',
    fontWeight: '500',
  },
  checklistNameCompleted: {
    textDecorationLine: 'line-through',
    color: '#8C8C8C',
  },
  checklistDate: {
    fontSize: 11,
    color: '#10B981',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#262626',
  },

  // Rewards
  rewardsSection: {
    marginBottom: 20,
  },
  rewardsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 12,
  },
  rewardsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  rewardCard: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  rewardEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  rewardValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#262626',
  },
  rewardLabel: {
    fontSize: 10,
    color: '#8C8C8C',
  },

  // Friends
  friendsSection: {
    marginBottom: 20,
  },
  friendsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  friendsTitle: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  friendsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  friendChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 3,
    paddingRight: 10,
    paddingVertical: 3,
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
  },
  friendAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  friendName: {
    fontSize: 12,
    color: '#262626',
    fontWeight: '500',
  },

  // Buttons
  findButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#262626',
    paddingVertical: 14,
    borderRadius: 16,
  },
  findButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Stats
  statsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#262626',
  },
  statLabel: {
    fontSize: 11,
    color: '#8C8C8C',
    marginTop: 2,
  },

  // Upcoming
  upcomingSection: {
    padding: 20,
    gap: 12,
  },
  upcomingCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginBottom: 12,
  },
  upcomingBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
  },
  upcomingDescription: {
    fontSize: 13,
    color: '#8C8C8C',
    marginBottom: 8,
  },
  upcomingFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  upcomingPoints: {
    fontSize: 12,
    color: '#262626',
    fontWeight: '500',
  },
  upcomingStarts: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  notifyButton: {
    justifyContent: 'center',
  },
  notifyText: {
    fontSize: 12,
    color: '#EC4899',
    fontWeight: '600',
  },

  // Leaderboard
  leaderboardSection: {
    padding: 20,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
  },
  leaderboardFilter: {
    fontSize: 13,
    color: '#8C8C8C',
    fontWeight: '500',
  },
  leaderboardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  leaderboardCardUser: {
    backgroundColor: '#FFF0F9',
    borderColor: '#EC4899',
  },
  rank: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8C8C8C',
    width: 30,
  },
  rankTop: {
    color: '#F59E0B',
  },
  leaderboardAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
  leaderboardStats: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  leaderboardPoints: {
    alignItems: 'flex-end',
  },
  pointsValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#EC4899',
  },
  pointsLabel: {
    fontSize: 10,
    color: '#8C8C8C',
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 12,
  },
  viewAllText: {
    fontSize: 13,
    color: '#8C8C8C',
    fontWeight: '500',
  },
});