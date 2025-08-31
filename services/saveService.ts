import * as Haptics from 'expo-haptics';
import { boardService } from './boardService';
import { restaurantService } from './restaurantService';
import { ToastService } from './toastService';
import { supabase } from '@/lib/supabase';
import { RestaurantInfo } from '@/types/core';
// import { Vibration } from 'react-native';

export interface SaveState {
  isSaved: boolean;
  boards: string[]; // Board IDs where the restaurant is saved
  quickSavesBoardId?: string;
}

export interface SaveOptions {
  userId: string;
  restaurantId: string;
  restaurantName: string;
  boardId?: string;
  onBoardSelection?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface RetryOptions {
  maxRetries?: number;
  retryDelay?: number;
}

class SaveService {
  private saveStates: Map<string, SaveState> = new Map();
  private pendingSaves: Map<string, Promise<void>> = new Map();

  /**
   * Get the current save state for a restaurant
   */
  async getSaveState(restaurantId: string, userId: string): Promise<SaveState> {
    const key = `${restaurantId}-${userId}`;
    
    // Return cached state if available
    if (this.saveStates.has(key)) {
      return this.saveStates.get(key)!;
    }

    try {
      const [boards, quickSavesBoard] = await Promise.all([
        boardService.getBoardsForRestaurant(restaurantId, userId),
        boardService.getUserQuickSavesBoard(userId)
      ]);

      const state: SaveState = {
        isSaved: boards.length > 0,
        boards: boards.map(b => b.id),
        quickSavesBoardId: quickSavesBoard?.id
      };

      this.saveStates.set(key, state);
      return state;
    } catch (error) {
      console.error('Error getting save state:', error);
      return { isSaved: false, boards: [] };
    }
  }

  /**
   * Toggle save state with optimistic updates
   */
  async toggleSave(options: SaveOptions): Promise<void> {
    const { userId, restaurantId, restaurantName, onBoardSelection, onSuccess, onError } = options;
    const key = `${restaurantId}-${userId}`;

    // Prevent duplicate saves
    if (this.pendingSaves.has(key)) {
      return this.pendingSaves.get(key);
    }

    // Subtle haptic feedback on normal save tap
    Haptics.selectionAsync();

    const savePromise = this.performToggleSave(options);
    this.pendingSaves.set(key, savePromise);

    try {
      await savePromise;
    } finally {
      this.pendingSaves.delete(key);
    }
  }

  private async performToggleSave(options: SaveOptions): Promise<void> {
    const { userId, restaurantId, restaurantName, onBoardSelection, onSuccess, onError } = options;
    const key = `${restaurantId}-${userId}`;

    try {
      const currentState = await this.getSaveState(restaurantId, userId);
      let quickSavesBoardId = currentState.quickSavesBoardId;

      // If no Your Saves board exists, try to create it
      if (!quickSavesBoardId) {
        quickSavesBoardId = await boardService.ensureQuickSavesBoard(userId);
        
        if (!quickSavesBoardId) {
          throw new Error('Could not create Your Saves board');
        }
        
        // Update cached state
        currentState.quickSavesBoardId = quickSavesBoardId;
        this.saveStates.set(key, currentState);
      }

      const isInQuickSaves = currentState.boards.includes(quickSavesBoardId);

      if (isInQuickSaves) {
        // Optimistic update
        this.updateSaveState(key, {
          isSaved: currentState.boards.length > 1,
          boards: currentState.boards.filter(id => id !== quickSavesBoardId),
          quickSavesBoardId
        });

        // Remove from Your Saves
        await boardService.removeRestaurantFromBoard(quickSavesBoardId, restaurantId);
        
        ToastService.showSuccess('Removed from Your Saves');
        onSuccess?.();
      } else {
        // Optimistic update
        this.updateSaveState(key, {
          isSaved: true,
          boards: [...currentState.boards, quickSavesBoardId],
          quickSavesBoardId
        });

        // Add to Your Saves
        await boardService.saveRestaurantToQuickSaves(userId, restaurantId);
        
        // Show toast with board selection action
        ToastService.showSuccess(
          'Added to Your Saves',
          {
            label: 'Add to Board',
            onPress: () => {
              onBoardSelection?.();
            }
          }
        );
        
        onSuccess?.();
      }
    } catch (error: any) {
      console.error('Save toggle error:', error);
      
      // Revert optimistic update on error
      this.saveStates.delete(key);
      
      if (error.message?.includes('already exists')) {
        // Update state to reflect reality
        const freshState = await this.getSaveState(restaurantId, userId);
        this.saveStates.set(key, freshState);
      } else {
        // Show error with retry option
        ToastService.show({
          message: 'Failed to save restaurant',
          type: 'error',
          duration: 5000,
          action: {
            label: 'Retry',
            onPress: async () => {
              // Retry the save operation
              await this.retryLastOperation(options);
            }
          }
        });
      }
      
      onError?.(error);
    }
  }

  /**
   * Save to a specific board
   */
  async saveToBoard(
    userId: string, 
    restaurantId: string, 
    boardId: string,
    restaurantName: string
  ): Promise<void> {
    const key = `${restaurantId}-${userId}`;
    
    try {
      // Optimistic update
      const currentState = await this.getSaveState(restaurantId, userId);
      this.updateSaveState(key, {
        ...currentState,
        isSaved: true,
        boards: [...new Set([...currentState.boards, boardId])]
      });

      await boardService.addRestaurantToBoard(boardId, restaurantId, userId);
      
      ToastService.showSuccess(`Added to board!`);
    } catch (error: any) {
      // Revert optimistic update
      this.saveStates.delete(key);
      
      if (error.message?.includes('already exists')) {
        ToastService.showInfo('Already saved to this board');
      } else {
        // Show error with retry option
        ToastService.show({
          message: 'Failed to add to board',
          type: 'error',
          duration: 5000,
          action: {
            label: 'Retry',
            onPress: async () => {
              // Retry the operation
              await this.saveToBoard(userId, restaurantId, boardId, restaurantName);
            }
          }
        });
      }
      
      throw error;
    }
  }

  /**
   * Save to multiple boards
   */
  async saveToBoards(
    userId: string,
    restaurantId: string,
    boardIds: string[],
    includeQuickSaves: boolean,
    restaurantName: string
  ): Promise<void> {
    const saves = [];
    
    if (includeQuickSaves) {
      saves.push(boardService.saveRestaurantToQuickSaves(userId, restaurantId));
    }
    
    for (const boardId of boardIds) {
      saves.push(boardService.addRestaurantToBoard(boardId, restaurantId, userId));
    }
    
    try {
      await Promise.all(saves);
      
      // Clear cache to force refresh
      const key = `${restaurantId}-${userId}`;
      this.saveStates.delete(key);
      
      const totalBoards = boardIds.length + (includeQuickSaves ? 1 : 0);
      const message = totalBoards > 1
        ? `Added to ${totalBoards} boards!`
        : includeQuickSaves
          ? 'Added to Your Saves!'
          : 'Added to board!';
      
      ToastService.showSuccess(message);
    } catch (error: any) {
      if (error.message?.includes('already exists')) {
        ToastService.showInfo('Already saved to some boards');
      } else {
        ToastService.showError('Failed to save to boards');
      }
      throw error;
    }
  }

  private updateSaveState(key: string, state: SaveState): void {
    this.saveStates.set(key, state);
  }

  /**
   * Clear cache for a specific restaurant/user combo
   */
  clearCache(restaurantId: string, userId: string): void {
    const key = `${restaurantId}-${userId}`;
    this.saveStates.delete(key);
  }

  /**
   * Clear all cached states
   */
  clearAllCache(): void {
    this.saveStates.clear();
  }

  /**
   * Retry the last failed operation
   */
  private async retryLastOperation(options: SaveOptions): Promise<void> {
    // Clear cache to force fresh state
    const key = `${options.restaurantId}-${options.userId}`;
    this.saveStates.delete(key);
    
    // Retry the toggle operation
    await this.toggleSave(options);
  }

  /**
   * Generic retry wrapper for any async operation
   */
  private async withRetry<T>(
    operation: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<T> {
    const { maxRetries = 3, retryDelay = 1000 } = options;
    let lastError: Error;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        lastError = error;
        
        // Don't retry on specific errors
        if (error.message?.includes('already exists')) {
          throw error;
        }
        
        // Wait before retrying (exponential backoff)
        if (attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
        }
      }
    }

    throw lastError!;
  }

  /**
   * Get all saved restaurants for a user
   */
  async getUserSaves(userId: string): Promise<RestaurantInfo[]> {
    try {
      // Get all user's boards
      const boards = await boardService.getUserBoards(userId);
      
      // Collect all unique restaurant IDs
      const restaurantIds = new Set<string>();
      
      for (const board of boards) {
        const { data: boardRestaurants } = await supabase
          .from('board_restaurants')
          .select('restaurant_id')
          .eq('board_id', board.id);
        
        if (boardRestaurants) {
          boardRestaurants.forEach(br => restaurantIds.add(br.restaurant_id));
        }
      }

      if (restaurantIds.size === 0) {
        return [];
      }

      // Fetch restaurant details
      const { data: restaurants, error } = await supabase
        .from('restaurants')
        .select('*')
        .in('id', Array.from(restaurantIds));

      if (error) throw error;

      // Transform restaurants to ensure they have proper image URLs
      const transformedRestaurants = (restaurants || []).map(restaurant => ({
        ...restaurant,
        image: restaurantService.getRestaurantImage(restaurant),
        main_image: restaurant.main_image || restaurant.cover_photo_url || restaurantService.getRestaurantImage(restaurant)
      }));

      return transformedRestaurants;
    } catch (error) {
      console.error('Error fetching user saves:', error);
      return [];
    }
  }
}

export const saveService = new SaveService();