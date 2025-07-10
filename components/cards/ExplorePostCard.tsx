import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Heart, MessageCircle, Bookmark, MoreVertical } from 'lucide-react-native';
import { ExplorePost } from '@/types/core';
import { theme } from '@/constants/theme';

interface ExplorePostCardProps {
  post: ExplorePost;
  onPress?: () => void;
  onLike?: () => void;
  onComment?: () => void;
  onSave?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 36) / 2; // 2 columns with padding

export function ExplorePostCard({ 
  post, 
  onPress, 
  onLike, 
  onComment, 
  onSave 
}: ExplorePostCardProps) {
  const imageHeight = Math.random() > 0.5 ? 200 : 260; // Variable height for masonry effect

  return (
    <TouchableOpacity 
      style={[styles.container, { width: CARD_WIDTH }]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: post.photos[0] }} 
        style={[styles.image, { height: imageHeight }]} 
      />
      
      {post.trending && (
        <View style={styles.trendingBadge}>
          <Text style={styles.trendingText}>Trending</Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <Text style={styles.userName} numberOfLines={1}>
              {post.user.name}
            </Text>
            <Text style={styles.userPersona} numberOfLines={1}>
              {post.user.persona}
            </Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <MoreVertical size={16} color="#666" />
          </TouchableOpacity>
        </View>

        <Text style={styles.restaurantName} numberOfLines={2}>
          {post.restaurant.name}
        </Text>
        
        <Text style={styles.caption} numberOfLines={2}>
          {post.caption}
        </Text>

        {post.socialProof.totalFriendVisits > 0 && (
          <View style={styles.socialProof}>
            <View style={styles.friendAvatars}>
              {post.socialProof.friendsVisited.slice(0, 3).map((friend, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.friendAvatar, 
                    { marginLeft: index > 0 ? -8 : 0, zIndex: 3 - index }
                  ]}
                >
                  <Image 
                    source={{ uri: `https://i.pravatar.cc/150?img=${index + 1}` }} 
                    style={styles.friendAvatarImage} 
                  />
                </View>
              ))}
            </View>
            <Text style={styles.socialProofText}>
              {post.socialProof.totalFriendVisits} friends visited
            </Text>
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={onLike}>
            <Heart 
              size={20} 
              color={post.engagement.likes > 0 ? '#FF4444' : '#666'} 
              fill={post.engagement.likes > 0 ? '#FF4444' : 'none'}
            />
            <Text style={styles.actionCount}>{post.engagement.likes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.action} onPress={onComment}>
            <MessageCircle size={20} color="#666" />
            <Text style={styles.actionCount}>{post.engagement.comments}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.action} onPress={onSave}>
            <Bookmark 
              size={20} 
              color={post.engagement.saves > 0 ? theme.colors.primary : '#666'}
              fill={post.engagement.saves > 0 ? theme.colors.primary : 'none'}
            />
            <Text style={styles.actionCount}>{post.engagement.saves}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: '100%',
    backgroundColor: '#F0F0F0',
  },
  trendingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  trendingText: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  content: {
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#333',
  },
  userPersona: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },
  moreButton: {
    padding: 4,
  },
  restaurantName: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginBottom: 4,
  },
  caption: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    marginBottom: 8,
    lineHeight: 16,
  },
  socialProof: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  friendAvatars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  friendAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  friendAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  socialProofText: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    color: '#1976D2',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionCount: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#666',
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
});