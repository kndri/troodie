/**
 * DEMO SCREEN - Restaurant Bingo
 * Turn group dining decisions into a fun game
 */

import { DS } from '@/components/design-system/tokens';
import { useRouter } from 'expo-router';
import {
  ChevronRight,
  Clock,
  Crown,
  Gift,
  MapPin,
  Share2,
  Trophy,
  Users
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

interface BingoSquare {
  id: string;
  challenge: string;
  completed: boolean;
  completedBy?: string;
  points: number;
  emoji: string;
}

interface ActiveGame {
  id: string;
  name: string;
  participants: number;
  progress: number;
  timeLeft: string;
  leader: string;
  prize: string;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  score: number;
  completedSquares: number;
}

export default function RestaurantBingoScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'create' | 'history'>('active');

  // Mock bingo board
  const bingoBoard: BingoSquare[] = [
    { id: '1', challenge: 'Try a dish you can\'t pronounce', completed: true, completedBy: 'You', points: 100, emoji: '🤔' },
    { id: '2', challenge: 'Order the chef\'s special', completed: true, completedBy: 'Sarah', points: 150, emoji: '👨‍🍳' },
    { id: '3', challenge: 'Eat at a rooftop restaurant', completed: false, points: 200, emoji: '🏙️' },
    { id: '4', challenge: 'Try authentic ramen', completed: true, completedBy: 'Mike', points: 100, emoji: '🍜' },
    { id: '5', challenge: 'FREE SPACE', completed: true, completedBy: 'Everyone', points: 0, emoji: '⭐' },
    { id: '6', challenge: 'Visit a Michelin-starred spot', completed: false, points: 300, emoji: '🌟' },
    { id: '7', challenge: 'Eat dessert first', completed: true, completedBy: 'You', points: 75, emoji: '🍰' },
    { id: '8', challenge: 'Try a new cuisine', completed: false, points: 125, emoji: '🌍' },
    { id: '9', challenge: 'Dine solo at the bar', completed: false, points: 150, emoji: '🍸' },
  ];

  // Mock active games
  const activeGames: ActiveGame[] = [
    {
      id: '1',
      name: 'December Foodie Challenge',
      participants: 8,
      progress: 56,
      timeLeft: '5 days',
      leader: 'Sarah',
      prize: '$50 Gift Card',
    },
    {
      id: '2',
      name: 'Weekend Warriors',
      participants: 12,
      progress: 33,
      timeLeft: '2 days',
      leader: 'Mike',
      prize: 'Free Dinner',
    },
  ];

  // Mock friends in game
  const friendsInGame: Friend[] = [
    { id: '1', name: 'You', avatar: '👤', score: 525, completedSquares: 4 },
    { id: '2', name: 'Sarah', avatar: '👩', score: 450, completedSquares: 3 },
    { id: '3', name: 'Mike', avatar: '👨', score: 375, completedSquares: 3 },
    { id: '4', name: 'Emma', avatar: '👱‍♀️', score: 300, completedSquares: 2 },
  ];

  // Game templates
  const gameTemplates = [
    { id: '1', name: 'Classic Foodie', difficulty: 'Easy', squares: 9, emoji: '🍔' },
    { id: '2', name: 'Fine Dining Explorer', difficulty: 'Hard', squares: 16, emoji: '🍷' },
    { id: '3', name: 'Street Food Champion', difficulty: 'Medium', squares: 9, emoji: '🌮' },
    { id: '4', name: 'Dessert Hunter', difficulty: 'Easy', squares: 9, emoji: '🍰' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronRight size={24} color="#262626" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Restaurant Bingo</Text>
          <Text style={styles.headerSubtitle}>Make dining decisions fun</Text>
        </View>
      </View>

      {/* Current Game Status */}
      <View style={styles.gameStatus}>
        <View style={styles.gameInfo}>
          <Text style={styles.gameName}>December Foodie Challenge</Text>
          <View style={styles.gameStats}>
            <View style={styles.gameStat}>
              <Users size={14} color="#8C8C8C" />
              <Text style={styles.gameStatText}>8 playing</Text>
            </View>
            <View style={styles.gameStat}>
              <Clock size={14} color="#8C8C8C" />
              <Text style={styles.gameStatText}>5 days left</Text>
            </View>
            <View style={styles.gameStat}>
              <Gift size={14} color="#FFAD27" />
              <Text style={styles.gameStatText}>$50 prize</Text>
            </View>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>56% Complete</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '56%' }]} />
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['active', 'create', 'history'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as any)}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'active' ? 'Active Board' : tab === 'create' ? 'Create Game' : 'History'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Active Board */}
        {activeTab === 'active' && (
          <View style={styles.tabContent}>
            {/* Bingo Board */}
            <View style={styles.bingoBoard}>
              {bingoBoard.map((square) => (
                <TouchableOpacity
                  key={square.id}
                  style={[
                    styles.bingoSquare,
                    square.completed && styles.bingoSquareCompleted,
                    square.challenge === 'FREE SPACE' && styles.bingoSquareFree,
                  ]}
                >
                  <Text style={styles.squareEmoji}>{square.emoji}</Text>
                  <Text style={[
                    styles.squareChallenge,
                    square.completed && styles.squareChallengeCompleted
                  ]}>
                    {square.challenge}
                  </Text>
                  {square.completed && square.completedBy && (
                    <Text style={styles.squareCompletedBy}>{square.completedBy}</Text>
                  )}
                  {square.points > 0 && (
                    <Text style={styles.squarePoints}>{square.points}pts</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Leaderboard */}
            <View style={styles.leaderboardSection}>
              <Text style={styles.sectionTitle}>Leaderboard</Text>
              {friendsInGame.map((friend, index) => (
                <View key={friend.id} style={styles.leaderboardItem}>
                  <View style={styles.leaderboardRank}>
                    {index === 0 && <Crown size={16} color="#FFAD27" />}
                    {index > 0 && <Text style={styles.rankNumber}>{index + 1}</Text>}
                  </View>
                  <View style={styles.leaderboardPlayer}>
                    <Text style={styles.playerAvatar}>{friend.avatar}</Text>
                    <Text style={[
                      styles.playerName,
                      friend.name === 'You' && styles.playerNameYou
                    ]}>
                      {friend.name}
                    </Text>
                  </View>
                  <View style={styles.leaderboardStats}>
                    <Text style={styles.playerSquares}>{friend.completedSquares} squares</Text>
                    <Text style={styles.playerScore}>{friend.score} pts</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton}>
                <Trophy size={16} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Complete Challenge</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
                <Share2 size={16} color="#262626" />
                <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Invite Friends</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Create Game */}
        {activeTab === 'create' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Choose a Template</Text>
            {gameTemplates.map((template) => (
              <TouchableOpacity key={template.id} style={styles.templateCard}>
                <View style={styles.templateIcon}>
                  <Text style={styles.templateEmoji}>{template.emoji}</Text>
                </View>
                <View style={styles.templateInfo}>
                  <Text style={styles.templateName}>{template.name}</Text>
                  <View style={styles.templateMeta}>
                    <Text style={styles.templateDifficulty}>{template.difficulty}</Text>
                    <Text style={styles.templateDot}>•</Text>
                    <Text style={styles.templateSquares}>{template.squares} squares</Text>
                  </View>
                </View>
                <ChevronRight size={20} color="#8C8C8C" />
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.customGameButton}>
              <Text style={styles.customGameIcon}>✨</Text>
              <View style={styles.customGameInfo}>
                <Text style={styles.customGameTitle}>Create Custom Game</Text>
                <Text style={styles.customGameSubtitle}>Design your own challenges</Text>
              </View>
            </TouchableOpacity>

            {/* Quick Start */}
            <View style={styles.quickStartSection}>
              <Text style={styles.sectionTitle}>Quick Start Options</Text>
              <View style={styles.quickStartGrid}>
                <TouchableOpacity style={styles.quickStartCard}>
                  <Text style={styles.quickStartEmoji}>⚡</Text>
                  <Text style={styles.quickStartTitle}>Lightning Round</Text>
                  <Text style={styles.quickStartTime}>1 hour</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickStartCard}>
                  <Text style={styles.quickStartEmoji}>📅</Text>
                  <Text style={styles.quickStartTitle}>Weekend Sprint</Text>
                  <Text style={styles.quickStartTime}>3 days</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickStartCard}>
                  <Text style={styles.quickStartEmoji}>📆</Text>
                  <Text style={styles.quickStartTitle}>Monthly Challenge</Text>
                  <Text style={styles.quickStartTime}>30 days</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickStartCard}>
                  <Text style={styles.quickStartEmoji}>🎯</Text>
                  <Text style={styles.quickStartTitle}>Themed Quest</Text>
                  <Text style={styles.quickStartTime}>Custom</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* History */}
        {activeTab === 'history' && (
          <View style={styles.tabContent}>
            <View style={styles.statsOverview}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Games Won</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>156</Text>
                <Text style={styles.statLabel}>Challenges</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>8,450</Text>
                <Text style={styles.statLabel}>Total Points</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Past Games</Text>
            {activeGames.map((game) => (
              <View key={game.id} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyTitle}>{game.name}</Text>
                  <View style={styles.historyBadge}>
                    <Trophy size={14} color="#FFAD27" />
                    <Text style={styles.historyPosition}>2nd</Text>
                  </View>
                </View>
                <View style={styles.historyStats}>
                  <Text style={styles.historyStat}>{game.participants} players</Text>
                  <Text style={styles.historyDot}>•</Text>
                  <Text style={styles.historyStat}>Completed</Text>
                  <Text style={styles.historyDot}>•</Text>
                  <Text style={styles.historyStat}>1,250 pts</Text>
                </View>
                <TouchableOpacity style={styles.viewDetailsButton}>
                  <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
              </View>
            ))}
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

  // Game Status
  gameStatus: {
    margin: 20,
    padding: 16,
    backgroundColor: '#6366F110',
    borderRadius: 16,
  },
  gameInfo: {
    marginBottom: 12,
  },
  gameName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 6,
  },
  gameStats: {
    flexDirection: 'row',
    gap: 16,
  },
  gameStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gameStatText: {
    fontSize: 12,
    color: '#595959',
  },
  progressContainer: {
    gap: 6,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366F1',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },

  // Tabs
  tabs: {
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
    borderBottomColor: '#6366F1',
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
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 12,
  },

  // Bingo Board
  bingoBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  bingoSquare: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  bingoSquareCompleted: {
    backgroundColor: '#10B98115',
    borderColor: '#10B981',
  },
  bingoSquareFree: {
    backgroundColor: '#FFAD2715',
    borderColor: '#FFAD27',
  },
  squareEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  squareChallenge: {
    fontSize: 10,
    textAlign: 'center',
    color: '#595959',
    lineHeight: 13,
  },
  squareChallengeCompleted: {
    fontWeight: '600',
    color: '#262626',
  },
  squareCompletedBy: {
    fontSize: 9,
    color: '#10B981',
    marginTop: 2,
  },
  squarePoints: {
    fontSize: 9,
    fontWeight: '600',
    color: '#8C8C8C',
    marginTop: 2,
  },

  // Leaderboard
  leaderboardSection: {
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
  leaderboardRank: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8C8C8C',
  },
  leaderboardPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  playerAvatar: {
    fontSize: 20,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#262626',
  },
  playerNameYou: {
    fontWeight: '600',
    color: '#6366F1',
  },
  leaderboardStats: {
    alignItems: 'flex-end',
  },
  playerSquares: {
    fontSize: 11,
    color: '#8C8C8C',
  },
  playerScore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },

  // Actions
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 20,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: '#F7F7F7',
  },
  secondaryButtonText: {
    color: '#262626',
  },

  // Templates
  templateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  templateIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  templateEmoji: {
    fontSize: 20,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 2,
  },
  templateMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  templateDifficulty: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  templateDot: {
    fontSize: 12,
    color: '#D4D4D4',
  },
  templateSquares: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  customGameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF8E7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE2B2',
    marginTop: 12,
  },
  customGameIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  customGameInfo: {
    flex: 1,
  },
  customGameTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 2,
  },
  customGameSubtitle: {
    fontSize: 12,
    color: '#8C8C8C',
  },

  // Quick Start
  quickStartSection: {
    marginTop: 24,
  },
  quickStartGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickStartCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  quickStartEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  quickStartTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 4,
  },
  quickStartTime: {
    fontSize: 11,
    color: '#8C8C8C',
  },

  // Stats Overview
  statsOverview: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6366F1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#8C8C8C',
  },

  // History
  historyCard: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
  historyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFAD2715',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  historyPosition: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6F4F1F',
  },
  historyStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyStat: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  historyDot: {
    fontSize: 12,
    color: '#D4D4D4',
    marginHorizontal: 6,
  },
  viewDetailsButton: {
    alignSelf: 'flex-start',
  },
  viewDetailsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366F1',
  },
});