/**
 * BOARD MANAGEMENT SCREEN
 * Allows users to edit, delete, and organize their boards
 */

import { DS } from '@/components/design-system/tokens';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { useAuth } from '@/contexts/AuthContext';
import { boardService } from '@/services/boardService';
import { ToastService } from '@/services/toastService';
import { Board } from '@/types/board';
import { useRouter } from 'expo-router';
import { ArrowLeft, Edit2, Globe, Lock, MoreHorizontal, Trash2, Users, GripVertical } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
  Dimensions
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ManageBoardsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBoard, setEditingBoard] = useState<Board | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editIsPublic, setEditIsPublic] = useState(false);

  const loadBoards = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const userBoards = await boardService.getUserBoards(user.id);
      setBoards(userBoards);
    } catch (error) {
      console.error('Error loading boards:', error);
      ToastService.showError('Failed to load boards');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadBoards();
  }, [loadBoards]);

  const handleEditBoard = (board: Board) => {
    setEditingBoard(board);
    setEditName(board.name);
    setEditDescription(board.description || '');
    setEditIsPublic(board.is_public || false);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editingBoard || !editName.trim()) return;

    try {
      const updated = await boardService.updateBoard(editingBoard.id, {
        name: editName.trim(),
        description: editDescription.trim() || null,
        is_public: editIsPublic
      });

      if (updated) {
        setBoards(boards.map(b => b.id === editingBoard.id ? { ...b, name: editName, description: editDescription, is_public: editIsPublic } : b));
        ToastService.showSuccess('Board updated');
        setShowEditModal(false);
        setEditingBoard(null);
      }
    } catch (error) {
      console.error('Error updating board:', error);
      ToastService.showError('Failed to update board');
    }
  };

  const handleDeleteBoard = (board: Board) => {
    Alert.alert(
      'Delete Board',
      `Are you sure you want to delete "${board.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await boardService.deleteBoard(board.id);
              if (success) {
                setBoards(boards.filter(b => b.id !== board.id));
                ToastService.showSuccess('Board deleted');
              }
            } catch (error) {
              console.error('Error deleting board:', error);
              ToastService.showError('Failed to delete board');
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={DS.colors.primaryOrange} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={DS.colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.title}>Manage Boards</Text>
        <ProfileAvatar size={32} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Your Boards ({boards.length})</Text>

        {boards.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No boards yet</Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => router.push('/add/create-board')}
            >
              <Text style={styles.createButtonText}>Create Your First Board</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.boardsList}>
            {boards.map((board) => (
              <View key={board.id} style={styles.boardItem}>
                <TouchableOpacity
                  style={styles.boardContent}
                  onPress={() => router.push(`/boards/${board.id}`)}
                >
                  <GripVertical size={20} color={DS.colors.textGray} style={styles.dragHandle} />

                  <View style={styles.boardInfo}>
                    <View style={styles.boardHeader}>
                      <Text style={styles.boardName}>{board.name}</Text>
                      <View style={styles.boardMeta}>
                        {board.is_public ? (
                          <Globe size={14} color={DS.colors.textGray} />
                        ) : (
                          <Lock size={14} color={DS.colors.textGray} />
                        )}
                        <Text style={styles.restaurantCount}>
                          {board.restaurant_count || 0} places
                        </Text>
                      </View>
                    </View>
                    {board.description && (
                      <Text style={styles.boardDescription} numberOfLines={1}>
                        {board.description}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>

                <View style={styles.boardActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEditBoard(board)}
                  >
                    <Edit2 size={18} color={DS.colors.primaryOrange} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteBoard(board)}
                  >
                    <Trash2 size={18} color={DS.colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Board</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Board Name</Text>
                <TextInput
                  style={styles.input}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="e.g., Date Nights"
                  placeholderTextColor={DS.colors.textGray}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description (optional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={editDescription}
                  onChangeText={setEditDescription}
                  placeholder="What's this board about?"
                  placeholderTextColor={DS.colors.textGray}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.switchGroup}>
                <View style={styles.switchLabel}>
                  <Globe size={20} color={DS.colors.textDark} />
                  <View style={styles.switchTextContainer}>
                    <Text style={styles.switchTitle}>Public Board</Text>
                    <Text style={styles.switchDescription}>
                      Anyone can view this board
                    </Text>
                  </View>
                </View>
                <Switch
                  value={editIsPublic}
                  onValueChange={setEditIsPublic}
                  trackColor={{ false: DS.colors.border, true: DS.colors.primaryOrange }}
                  thumbColor={DS.colors.surface}
                />
              </View>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveEdit}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DS.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: DS.spacing.xs,
  },
  title: {
    ...DS.typography.h1,
    color: DS.colors.textDark,
    flex: 1,
    marginLeft: DS.spacing.md,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
    paddingHorizontal: DS.spacing.lg,
    paddingTop: DS.spacing.lg,
    paddingBottom: DS.spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: DS.spacing.xxl,
  },
  emptyText: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    marginBottom: DS.spacing.lg,
  },
  createButton: {
    backgroundColor: DS.colors.primaryOrange,
    paddingHorizontal: DS.spacing.xl,
    paddingVertical: DS.spacing.md,
    borderRadius: DS.borderRadius.full,
  },
  createButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
  boardsList: {
    paddingHorizontal: DS.spacing.lg,
  },
  boardItem: {
    backgroundColor: DS.colors.surface,
    borderRadius: DS.borderRadius.lg,
    marginBottom: DS.spacing.md,
    ...DS.shadows.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DS.spacing.md,
    paddingLeft: DS.spacing.sm,
    paddingRight: DS.spacing.md,
  },
  dragHandle: {
    opacity: 0.3,
    marginRight: DS.spacing.sm,
  },
  boardInfo: {
    flex: 1,
  },
  boardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DS.spacing.xs,
  },
  boardName: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
  },
  boardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DS.spacing.xs,
  },
  restaurantCount: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
  },
  boardDescription: {
    ...DS.typography.body,
    color: DS.colors.textGray,
    fontSize: 13,
  },
  boardActions: {
    flexDirection: 'row',
    paddingRight: DS.spacing.md,
    gap: DS.spacing.xs,
  },
  actionButton: {
    padding: DS.spacing.sm,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: DS.colors.surface,
    borderTopLeftRadius: DS.borderRadius.xl,
    borderTopRightRadius: DS.borderRadius.xl,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DS.spacing.lg,
    paddingVertical: DS.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: DS.colors.borderLight,
  },
  modalTitle: {
    ...DS.typography.h2,
    color: DS.colors.textDark,
  },
  cancelText: {
    ...DS.typography.button,
    color: DS.colors.primaryOrange,
  },
  modalBody: {
    padding: DS.spacing.lg,
  },
  inputGroup: {
    marginBottom: DS.spacing.lg,
  },
  inputLabel: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    marginBottom: DS.spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: DS.colors.backgroundLight,
    borderRadius: DS.borderRadius.md,
    paddingHorizontal: DS.spacing.md,
    paddingVertical: DS.spacing.md,
    ...DS.typography.body,
    color: DS.colors.textDark,
    borderWidth: 1,
    borderColor: DS.colors.borderLight,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: DS.colors.backgroundLight,
    borderRadius: DS.borderRadius.md,
    padding: DS.spacing.md,
    marginBottom: DS.spacing.xl,
  },
  switchLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  switchTextContainer: {
    marginLeft: DS.spacing.md,
    flex: 1,
  },
  switchTitle: {
    ...DS.typography.h3,
    color: DS.colors.textDark,
  },
  switchDescription: {
    ...DS.typography.metadata,
    color: DS.colors.textGray,
    marginTop: 2,
  },
  saveButton: {
    backgroundColor: DS.colors.primaryOrange,
    borderRadius: DS.borderRadius.full,
    paddingVertical: DS.spacing.md,
    alignItems: 'center',
  },
  saveButtonText: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
  },
});