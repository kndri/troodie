# User Detail Screen Audit (/app/user/[id].tsx)

## Component Inventory

### Core Functionality
- **User Profile Display**: Complete user information with stats
- **Content Tabs**: Saves, Boards, Posts, Communities with dynamic counts
- **Social Interactions**: Follow/unfollow, share, report, block
- **Real-time Updates**: Follow counts, engagement stats
- **Moderation**: Report and block functionality with confirmation flows

### Data Management
- **Profile Data**: User profile, achievements, persona information
- **Content Collections**: Boards, posts, quick saves, communities
- **Social State**: Follow status, follower/following counts, block status
- **Real-time Hooks**: useFollowState for live follow count updates
- **Privacy Controls**: Own profile vs. other users, private content filtering

### Interactive Elements

1. **Header Navigation**
   - Back button (ChevronLeft icon) with smart navigation
   - User name in header title
   - More options menu (other users only)
     - Share Profile (Share2 icon)
     - Report User (Flag icon) - red color
     - Block/Unblock User (Shield icon) - dynamic color

2. **Profile Information Section**
   - **Avatar Display**: Image with error fallback to initials
   - **User Details**:
     - Username with @ prefix
     - Persona badge (if available)
     - Bio text (2-line limit)
     - Achievement badges (max 3, Award icons)
   - **Statistics Row**:
     - Followers (clickable to /user/[id]/followers)
     - Following (clickable to /user/[id]/following)
     - Boards count (display only)
     - Posts count (display only)

3. **Action Buttons** (other users only)
   - **Follow Button**: Large FollowButton component with loading states
   - **Share Button**: Secondary style with Share2 icon

4. **Content Tabs**
   - **Horizontal Scrolling**: Tabs with icons and counts
   - **Dynamic Visibility**: Saves tab only for own profile if has saves
   - **Tab Options**:
     - Saves (Bookmark icon) - own profile only with count
     - Boards (Grid3X3 icon) with count
     - Posts (MessageSquare icon) with count
     - Communities (Users icon) with count

5. **Tab Content Areas**
   - **Saves Tab**: RestaurantCard components in FlatList
   - **Boards Tab**: BoardCard components in FlatList
   - **Posts Tab**: PostCard components with engagement
   - **Communities Tab**: CommunityTab component with stats

## Conditional Elements

### Profile Type Detection
- **Own Profile**: isOwnProfile = currentUser?.id === id
- **Other Users**: Shows follow button, share, more menu
- **Own Profile**: Shows saves tab, no social actions

### Content Visibility
- **Saves Tab**: Only visible for own profile AND quickSaves.length > 0
- **Private Boards**: Filtered for other users (only public boards shown)
- **Private Saves**: Never shown for other users

### Menu Options
- **More Menu**: Only visible for other users (!isOwnProfile)
- **Block Status**: Dynamic text and color for block/unblock
- **Report Modal**: Conditional rendering based on showReportModal state

### Loading States
- **Initial Load**: Full-screen loading with ActivityIndicator
- **Tab Loading**: Individual loading states per content type
- **Refresh States**: Separate refresh loading for each tab

### Empty States
- **Profile Not Found**: Error container with User icon
- **Empty Content**: Customized per tab type
  - Saves: "No Saves" + "Your saves are private"
  - Boards: "No Boards Yet" + personalized message
  - Posts: "No Posts Yet" + personalized message
  - Communities: Handled by CommunityTab component

### Follow State Display
- **Real-time Counts**: Updates from useFollowState hook
- **Loading States**: Button loading during follow operations
- **Optimistic Updates**: Immediate UI feedback

## Navigation Flows

### Entry Points
- Direct navigation via user ID
- Links from posts, comments, search results
- Following/followers lists

### Smart Back Navigation
- **Can Go Back**: router.back() if navigation history exists
- **No History**: router.replace('/(tabs)/activity') as fallback

### Content Navigation
- **Follower/Following**: Navigate to respective list screens
- **Board Details**: Navigate to /boards/[id]
- **Post Details**: Navigate to /posts/[id]
- **Restaurant Details**: Navigate to /restaurant/[id] from saves

### Modal Flows
- **Report Modal**: In-screen modal for reporting users
- **Block Confirmation**: Alert-based confirmation flow
- **Share Profile**: Native share sheet integration

## Data Requirements

### Profile Data Structure
```typescript
interface Profile {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  bio?: string;
  avatar?: string;
  persona?: PersonaType;
  followers_count: number;
  following_count: number;
  verified?: boolean;
}
```

### Content Collections
- **Boards**: Board[] with privacy filtering
- **Posts**: PostWithUser[] with full engagement data
- **Quick Saves**: BoardRestaurant[] with restaurant details
- **Communities**: { joined: any[], created: any[] }

### API Dependencies
- **profileService.getProfile()**: Core profile data
- **achievementService.getUserAchievements()**: User achievements
- **boardService.getUserBoards()**: User's boards with privacy filter
- **postService.getUserPosts()**: User's posts with engagement
- **boardService.getQuickSavesRestaurants()**: Private saves
- **communityService.getUserCommunities()**: Community memberships
- **moderationService**: Block/report functionality

### Real-time Data
- **Follow State**: Live updates via useFollowState hook
- **Engagement Stats**: Real-time post engagement updates
- **Activity Updates**: Follow state changes broadcast via eventBus

## State Management

### Loading States
- **loading**: Initial profile load
- **refreshing**: Pull-to-refresh state
- **loadingBoards, loadingPosts, etc.**: Individual content loading
- **refreshingQuickSaves, refreshingCommunities**: Tab-specific refresh

### Social State
- **isFollowing, followersCount, followingCount**: From useFollowState hook
- **isBlocked**: Block status for moderation
- **avatarError**: Fallback state for avatar loading

### Modal State
- **showReportModal**: Report modal visibility
- **More menu state**: Managed via popup menu system

## Performance Considerations
- **Memoized Components**: ProfileHeader memoized for performance
- **Memoized Callbacks**: All event handlers wrapped with useCallback
- **FlatList Optimization**: removeClippedSubviews, batch rendering settings
- **Real-time Optimization**: Selective real-time updates for own profile

## Error Handling
- **Profile Not Found**: Dedicated error state with retry option
- **Avatar Fallback**: Automatic fallback to initials avatar
- **Network Failures**: Graceful degradation with retry options
- **Moderation Errors**: User-friendly error messages

## Social Features
- **Follow Management**: Optimistic updates with real-time sync
- **Share Integration**: Native share with deep linking support
- **Reporting System**: Comprehensive report categories
- **Blocking System**: Block/unblock with activity feed updates

## Privacy & Security
- **Content Filtering**: Private boards hidden from other users
- **Save Privacy**: Quick saves completely private
- **Block Enforcement**: Blocked users hidden from feeds
- **Report Processing**: Anonymous reporting system

## Accessibility
- **Touch Targets**: Proper hitSlop for all interactive elements
- **Screen Reader**: Semantic structure for profile information
- **Focus Management**: Proper focus flow through content
- **Loading Indicators**: Clear loading states with descriptive text