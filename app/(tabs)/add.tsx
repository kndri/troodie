import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Utensils, 
  FolderPlus, 
  Users,
  Search,
  UserPlus
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { AddOption, ProgressCard } from '@/types/add-flow';

export default function AddScreen() {
  const router = useRouter();

  const addOptions: AddOption[] = [
    {
      id: 'restaurant',
      title: 'Save a Restaurant',
      description: 'Add a new spot to your collection',
      icon: Utensils,
      color: '#FFAD27',
      navigateTo: '/add/save-restaurant'
    },
    {
      id: 'board',
      title: 'Create a Board',
      description: 'Curate a themed collection',
      icon: FolderPlus,
      color: '#3B82F6',
      navigateTo: '/add/create-board'
    },
    {
      id: 'community',
      title: 'Join Communities',
      description: 'Connect with like-minded Troodies',
      icon: Users,
      color: '#8B5CF6',
      navigateTo: '/add/communities'
    },
    // Creator Dashboard is hidden for now as per PRD
    // {
    //   id: 'creator',
    //   title: 'Creator Dashboard',
    //   description: 'Manage collaborations & earnings',
    //   icon: Crown,
    //   color: '#10B981',
    //   navigateTo: '/add/creator-dashboard'
    // }
  ];

  const progressCard: ProgressCard = {
    title: 'Keep exploring!',
    description: 'You\'ve saved 3 places this week. Add one more to complete your goal.',
    progress: {
      current: 3,
      target: 4,
      unit: 'places'
    },
    reward: '+50 points',
    cta: 'Add Another Spot'
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Add Content</Text>
      <Text style={styles.subtitle}>What would you like to add?</Text>
    </View>
  );

  const renderPrimaryActions = () => (
    <View style={styles.primaryActions}>
      {addOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.optionCard}
          onPress={() => router.push(option.navigateTo)}
          activeOpacity={0.8}
        >
          <View style={[styles.optionIcon, { backgroundColor: option.color + '20' }]}>
            <option.icon size={24} color={option.color} />
          </View>
          <Text style={styles.optionTitle}>{option.title}</Text>
          <Text style={styles.optionDescription}>{option.description}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionCard} onPress={() => router.push('/add/search-places')}>
          <Search size={20} color="#666" />
          <Text style={styles.quickActionText}>Search Places</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionCard} onPress={() => router.push('/add/find-friends')}>
          <UserPlus size={20} color="#666" />
          <Text style={styles.quickActionText}>Find Friends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderProgressGamification = () => (
    <View style={styles.progressCard}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>{progressCard.title}</Text>
        <Text style={styles.progressReward}>{progressCard.reward}</Text>
      </View>
      <Text style={styles.progressDescription}>{progressCard.description}</Text>
      
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(progressCard.progress.current / progressCard.progress.target) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {progressCard.progress.current}/{progressCard.progress.target} {progressCard.progress.unit}
        </Text>
      </View>
      
      <TouchableOpacity style={styles.progressCTA} onPress={() => router.push('/add/save-restaurant')}>
        <Text style={styles.progressCTAText}>{progressCard.cta}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderPrimaryActions()}
        {renderQuickActions()}
        {renderProgressGamification()}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  primaryActions: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 32,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#333',
  },
  progressCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
  },
  progressReward: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: theme.colors.primary,
  },
  progressDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#666',
    textAlign: 'right',
  },
  progressCTA: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  progressCTAText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  bottomPadding: {
    height: 100,
  },
});