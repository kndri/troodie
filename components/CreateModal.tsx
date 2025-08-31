import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { 
  Camera,
  Users,
  Folder,
  X,
  PlusCircle,
  Grid3x3,
  UserPlus
} from 'lucide-react-native';
import { DS } from '@/components/design-system/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface CreateModalProps {
  visible: boolean;
  onClose: () => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({ visible, onClose }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleCreatePost = () => {
    onClose();
    router.push('/add/create-post');
  };

  const handleCreateBoard = () => {
    onClose();
    router.push('/add/create-board');
  };

  const handleCreateCommunity = () => {
    onClose();
    router.push('/add/create-community');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFillObject} />
          
          <TouchableWithoutFeedback>
            <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Start creating now</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <X size={24} color={DS.colors.textWhite} />
                </TouchableOpacity>
              </View>

              {/* Create Options */}
              <View style={styles.optionsContainer}>
                <TouchableOpacity 
                  style={styles.optionCard}
                  onPress={handleCreatePost}
                  activeOpacity={0.8}
                >
                  <View style={styles.iconContainer}>
                    <Camera size={28} color={DS.colors.textWhite} />
                  </View>
                  <Text style={styles.optionLabel}>Post</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.optionCard}
                  onPress={handleCreateBoard}
                  activeOpacity={0.8}
                >
                  <View style={styles.iconContainer}>
                    <Grid3x3 size={28} color={DS.colors.textWhite} />
                  </View>
                  <Text style={styles.optionLabel}>Board</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.optionCard}
                  onPress={handleCreateCommunity}
                  activeOpacity={0.8}
                >
                  <View style={styles.iconContainer}>
                    <Users size={28} color={DS.colors.textWhite} />
                  </View>
                  <Text style={styles.optionLabel}>Community</Text>
                </TouchableOpacity>
              </View>

              {/* Swipe Indicator */}
              <View style={styles.swipeIndicator} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingHorizontal: DS.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DS.spacing.xl,
  },
  title: {
    ...DS.typography.h2,
    color: DS.colors.textWhite,
    fontSize: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: DS.spacing.xl,
  },
  optionCard: {
    alignItems: 'center',
    gap: DS.spacing.sm,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  optionLabel: {
    ...DS.typography.button,
    color: DS.colors.textWhite,
    fontSize: 14,
  },
  swipeIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    marginTop: DS.spacing.sm,
    marginBottom: DS.spacing.sm,
  },
});