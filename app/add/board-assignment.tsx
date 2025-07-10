import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ChevronLeft,
  Plus,
  Check,
  Lock,
  Globe,
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { RestaurantSaveForm, Board } from '@/types/add-flow';

export default function BoardAssignmentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const saveForm: RestaurantSaveForm = JSON.parse(params.saveForm as string);

  const [selectedBoards, setSelectedBoards] = useState<string[]>([]);
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [newBoardPrivacy, setNewBoardPrivacy] = useState<'public' | 'private'>('public');

  // Mock user boards
  const mockBoards: Board[] = [
    {
      id: '1',
      title: 'Date Night Spots',
      description: 'Romantic restaurants for special occasions',
      type: 'free',
      coverImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
      category: 'Romance',
      restaurantCount: 8,
      createdAt: new Date(),
      isPrivate: false
    },
    {
      id: '2',
      title: 'Quick Lunch Spots',
      description: 'Fast and delicious lunch options',
      type: 'free',
      coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
      category: 'Casual',
      restaurantCount: 12,
      createdAt: new Date(),
      isPrivate: false
    },
    {
      id: '3',
      title: 'My Private Collection',
      description: 'Personal favorites',
      type: 'private',
      coverImage: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
      category: 'Personal',
      restaurantCount: 5,
      createdAt: new Date(),
      isPrivate: true
    }
  ];

  const handleBoardToggle = (boardId: string) => {
    if (selectedBoards.includes(boardId)) {
      setSelectedBoards(selectedBoards.filter(id => id !== boardId));
    } else {
      setSelectedBoards([...selectedBoards, boardId]);
    }
  };

  const handleCreateBoard = () => {
    // In a real app, this would create the board
    setShowCreateBoard(false);
    setNewBoardName('');
    setNewBoardDescription('');
    setNewBoardPrivacy('public');
  };

  const handleNext = () => {
    router.push({
      pathname: '/add/share-restaurant',
      params: { 
        saveForm: params.saveForm,
        selectedBoards: JSON.stringify(selectedBoards)
      }
    });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeft size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}>Add to Boards</Text>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRestaurantPreview = () => (
    <View style={styles.restaurantPreview}>
      <Image 
        source={{ uri: saveForm.restaurant.photos[0] }} 
        style={styles.previewImage} 
      />
      <View style={styles.previewInfo}>
        <Text style={styles.previewName}>{saveForm.restaurant.name}</Text>
        <Text style={styles.previewDetails}>
          {saveForm.restaurant.cuisine.join(' • ')} • {saveForm.userInput.priceRange}
        </Text>
      </View>
    </View>
  );

  const renderBoards = () => (
    <View style={styles.boardsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Select Boards</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowCreateBoard(true)}
        >
          <Plus size={20} color={theme.colors.primary} />
          <Text style={styles.createButtonText}>Create New</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.boardsList} showsVerticalScrollIndicator={false}>
        {mockBoards.map((board) => (
          <TouchableOpacity
            key={board.id}
            style={[
              styles.boardCard,
              selectedBoards.includes(board.id) && styles.boardCardSelected
            ]}
            onPress={() => handleBoardToggle(board.id)}
          >
            <Image source={{ uri: board.coverImage }} style={styles.boardImage} />
            <View style={styles.boardInfo}>
              <View style={styles.boardHeader}>
                <Text style={styles.boardTitle}>{board.title}</Text>
                {board.isPrivate ? (
                  <Lock size={16} color="#666" />
                ) : (
                  <Globe size={16} color="#666" />
                )}
              </View>
              <Text style={styles.boardDescription}>{board.description}</Text>
              <Text style={styles.boardStats}>
                {board.restaurantCount} restaurants • {board.category}
              </Text>
            </View>
            <View style={[
              styles.checkbox,
              selectedBoards.includes(board.id) && styles.checkboxSelected
            ]}>
              {selectedBoards.includes(board.id) && (
                <Check size={16} color="#FFFFFF" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedBoards.length === 0 && (
        <Text style={styles.helperText}>
          Select at least one board or create a new one
        </Text>
      )}
    </View>
  );

  const renderCreateBoardModal = () => showCreateBoard && (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Create New Board</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Board Name"
          value={newBoardName}
          onChangeText={setNewBoardName}
          placeholderTextColor="#999"
        />
        
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description (optional)"
          value={newBoardDescription}
          onChangeText={setNewBoardDescription}
          multiline
          numberOfLines={3}
          placeholderTextColor="#999"
        />
        
        <View style={styles.privacyOptions}>
          <TouchableOpacity
            style={[
              styles.privacyOption,
              newBoardPrivacy === 'public' && styles.privacyOptionActive
            ]}
            onPress={() => setNewBoardPrivacy('public')}
          >
            <Globe size={20} color={newBoardPrivacy === 'public' ? theme.colors.primary : '#666'} />
            <Text style={[
              styles.privacyText,
              newBoardPrivacy === 'public' && styles.privacyTextActive
            ]}>
              Public
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.privacyOption,
              newBoardPrivacy === 'private' && styles.privacyOptionActive
            ]}
            onPress={() => setNewBoardPrivacy('private')}
          >
            <Lock size={20} color={newBoardPrivacy === 'private' ? theme.colors.primary : '#666'} />
            <Text style={[
              styles.privacyText,
              newBoardPrivacy === 'private' && styles.privacyTextActive
            ]}>
              Private
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.modalActions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShowCreateBoard(false)}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.createBoardButton, !newBoardName && styles.createBoardButtonDisabled]}
            onPress={handleCreateBoard}
            disabled={!newBoardName}
          >
            <Text style={styles.createBoardText}>Create Board</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderRestaurantPreview()}
      {renderBoards()}
      {renderCreateBoardModal()}
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
  nextButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  nextText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: theme.colors.primary,
  },
  restaurantPreview: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  previewInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  previewName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  previewDetails: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  boardsSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  createButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: theme.colors.primary,
  },
  boardsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  boardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    marginBottom: 12,
  },
  boardCardSelected: {
    backgroundColor: theme.colors.primary + '10',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  boardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  boardInfo: {
    flex: 1,
  },
  boardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  boardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
  },
  boardDescription: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginBottom: 4,
  },
  boardStats: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#999',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  helperText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#333',
    marginBottom: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  privacyOptions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  privacyOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  privacyOptionActive: {
    backgroundColor: theme.colors.primary + '20',
  },
  privacyText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#666',
  },
  privacyTextActive: {
    color: theme.colors.primary,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#666',
  },
  createBoardButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  createBoardButtonDisabled: {
    opacity: 0.5,
  },
  createBoardText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
});