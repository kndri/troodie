import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Globe,
  Lock,
  Crown,
  Check
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { BoardType } from '@/types/add-flow';

export default function CreateBoardScreen() {
  const router = useRouter();

  const boardTypes: BoardType[] = [
    {
      type: 'free',
      title: 'Free Board',
      description: 'Anyone can view and save your recommendations',
      icon: Globe,
      features: ['Public visibility', 'Social sharing', 'Basic analytics']
    },
    {
      type: 'private',
      title: 'Private Board',
      description: 'Only people you invite can see this board',
      icon: Lock,
      features: ['Invite-only access', 'Collaboration', 'Privacy controls']
    },
    {
      type: 'paid',
      title: 'Paid Board',
      description: 'Monetize your exclusive recommendations',
      icon: Crown,
      features: ['Premium content', 'Revenue sharing', 'Advanced analytics']
    }
  ];

  const handleSelectType = (type: 'free' | 'private' | 'paid') => {
    router.push({
      pathname: '/add/board-details',
      params: { boardType: type }
    });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeft size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}>Create Board</Text>
      <View style={styles.placeholder} />
    </View>
  );

  const renderBoardTypes = () => (
    <View style={styles.content}>
      <Text style={styles.subtitle}>Board Type</Text>
      
      {boardTypes.map((board) => (
        <TouchableOpacity
          key={board.type}
          style={[
            styles.boardTypeCard,
            board.type === 'paid' && styles.boardTypeCardPremium
          ]}
          onPress={() => handleSelectType(board.type)}
        >
          <View style={[
            styles.iconContainer,
            board.type === 'paid' && styles.iconContainerPremium
          ]}>
            <board.icon size={24} color={board.type === 'paid' ? '#FFD700' : theme.colors.primary} />
          </View>
          
          <View style={styles.boardInfo}>
            <View style={styles.boardHeader}>
              <Text style={styles.boardTitle}>{board.title}</Text>
              {board.type === 'paid' && (
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumText}>Premium</Text>
                </View>
              )}
            </View>
            <Text style={styles.boardDescription}>{board.description}</Text>
            
            <View style={styles.features}>
              {board.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Check size={14} color="#4CAF50" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <ChevronLeft 
            size={20} 
            color="#999" 
            style={{ transform: [{ rotate: '180deg' }] }} 
          />
        </TouchableOpacity>
      ))}
      
      <View style={styles.note}>
        <Text style={styles.noteTitle}>Note:</Text>
        <Text style={styles.noteText}>
          • Users can create 1 private board for free{'\n'}
          • Paid boards require a Troodie+ subscription
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderBoardTypes()}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#666',
    marginBottom: 16,
  },
  boardTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
  boardTypeCardPremium: {
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconContainerPremium: {
    backgroundColor: '#FFD700' + '20',
  },
  boardInfo: {
    flex: 1,
  },
  boardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  boardTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
  },
  premiumBadge: {
    marginLeft: 8,
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  premiumText: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
  },
  boardDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginBottom: 12,
  },
  features: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  note: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
  },
  noteTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    lineHeight: 20,
  },
});