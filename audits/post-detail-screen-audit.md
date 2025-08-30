# Post Detail Screen Audit (/app/posts/[id].tsx)

## Component Inventory

### Core Functionality
- **Post Display**: Complete post content with media, restaurant info, and metadata
- **Social Engagement**: Like, save, share, comment functionality with real-time updates
- **Comment System**: Dual-mode comments (inline list + fixed input)
- **Navigation**: Smart back navigation with floating back button
- **Real-time Updates**: Live engagement statistics and comment updates

### Data Management
- **Post Data**: PostWithUser with complete user and restaurant information
- **Engagement State**: Real-time like, save, share, comment counts via usePostEngagement hook
- **Comment Management**: Real-time comment addition/deletion with count updates
- **Media Handling**: Multiple photo support with horizontal scrolling

### Interactive Elements

1. **Navigation**
   - **Floating Back Button**: Fixed position with semi-transparent background
   - **Smart Navigation**: Auto-positioned with proper z-index

2. **User Header Section**
   - **Clickable User Info**: Navigates to user profile
   - **Avatar Display**: User avatar with default fallback
   - **User Details**:
     - Name/username display
     - Verification badge (checkmark-circle icon)
     - User persona
     - Timestamp with relative formatting
   - **Underlined Username**: Visual indication of clickability

3. **Content Badges**
   - **External Content Badge**: Link icon + "External Content" for external posts
   - **Simple Post Badge**: Chat icon + "Discussion" for text-only posts

4. **Post Content**
   - **Caption Display**: Full caption text
   - **External Content Preview**: ExternalContentPreview component for links
   - **Photo Gallery**:
     - Single photo: Full-width display
     - Multiple photos: Horizontal scroll with card layout

5. **Restaurant Information** (if applicable)
   - **Clickable Restaurant Card**: Navigates to restaurant detail
   - Restaurant image with fallback
   - Restaurant name and location
   - Cuisine type and price range
   - ChevronRight navigation indicator

6. **Visit Information Card**
   - **Rating Display**: Traffic light system with colored dots
   - **Visit Type Badge**: Restaurant icon + visit type (Dine In/Takeout/Delivery)
   - **Price Range Badge**: Cash icon + price range display

7. **Action Bar**
   - **Like Button**: Heart icon with fill animation, count display
   - **Comment Button**: MessageCircle icon, scrolls to comments, count display
   - **Save Button**: Bookmark icon with fill animation, count display
   - **Share Button**: Share icon with count display

8. **Comments System**
   - **Comments Section**: Scrollable list of comments
   - **Fixed Comment Input**: Twitter-style bottom input
   - **Dual Integration**: Separate input/list components with shared state

## Conditional Elements

### Content Type Detection
- **External Content**: Shows external badge and ExternalContentPreview
- **Simple Posts**: Shows discussion badge for text-only posts
- **Restaurant Posts**: Shows restaurant card and visit information

### Media Display Logic
- **No Photos**: Hidden when content_type === 'external' or no photos
- **Single Photo**: Full-width display (SCREEN_WIDTH)
- **Multiple Photos**: Horizontal scroll with 250px width cards

### Restaurant Information
- **Visibility**: Only when post.restaurant exists
- **Click Navigation**: Routes to /restaurant/[id]

### Visit Information Card
- **Visibility**: When rating OR visit_type OR price_range exists
- **Rating Section**: Only when post.rating exists
- **Visit Details**: Only when visit_type or price_range exist

### Comments Display
- **Comments Section**: Only when post && commentsCount > 0
- **Input Section**: Always visible when post exists
- **Dual Mode**: Separate rendering for list vs input

### Loading and Error States
- **Loading Screen**: Full-screen spinner with "Loading post..." text
- **Error State**: ErrorState component with retry functionality
- **Post Not Found**: Custom error handling for missing posts

## Navigation Flows

### Entry Points
- Direct post ID navigation
- Links from feed, user profiles, notifications
- Deep linking support

### User Interactions
- **User Profile**: Click user header → /user/[id]
- **Restaurant Detail**: Click restaurant card → /restaurant/[id]
- **Back Navigation**: Floating back button → router.back()

### Comment Navigation
- **Scroll to Comments**: Comment button scrolls to bottom
- **Comment Input Focus**: Fixed input at bottom for easy access

### Share Flows
- **Native Share**: Platform share sheet
- **Copy Link**: Clipboard integration
- **Share Count**: Tracked engagement metric

## Data Requirements

### Post Data Structure
```typescript
interface PostWithUser {
  id: string;
  caption?: string;
  photos?: string[];
  rating?: number;
  visit_type?: 'dine_in' | 'takeout' | 'delivery';
  price_range?: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  saves_count: number;
  share_count: number;
  is_liked_by_user: boolean;
  is_saved_by_user: boolean;
  user: {
    id: string;
    name?: string;
    username?: string;
    avatar?: string;
    persona?: string;
    verified?: boolean;
  };
  restaurant?: {
    id: string;
    name: string;
    location: string;
    cuisine: string;
    priceRange: string;
    image?: string;
  };
}
```

### External Content Extensions
- **content_type**: 'external' for external links
- **external_url**: Source URL
- **external_title, external_description**: Metadata
- **external_thumbnail**: Preview image
- **external_author, external_source**: Attribution

### API Dependencies
- **postService.getPost()**: Main post data retrieval
- **usePostEngagement hook**: Real-time engagement management
- **PostComments component**: Comment system integration

## Real-time Features

### Engagement Updates
- **Like State**: Real-time like/unlike with optimistic updates
- **Save State**: Real-time save/unsave with optimistic updates
- **Share Tracking**: Share count increments
- **Comment Updates**: Live comment count updates

### Comment System
- **Live Addition**: Real-time comment count increment
- **Live Deletion**: Real-time comment count decrement
- **Optimistic Updates**: Immediate UI feedback
- **Dual Sync**: Coordination between input and list components

## Performance Considerations
- **Image Loading**: Error handling for photo failures
- **Keyboard Avoidance**: Platform-specific keyboard behavior
- **Scroll Performance**: Efficient ScrollView with proper showsVerticalScrollIndicator
- **Bottom Spacing**: Adequate spacing for fixed comment input and bottom navigation

## Rating System
- **Traffic Light System**: 1=Red (Poor), 2=Yellow (Average), 3=Green (Excellent)
- **5-Star System**: 1-5 star ratings with color coding
- **Dynamic Labels**: Context-aware rating descriptions
- **Visual Indicators**: Colored dots with semantic meaning

## Error Handling
- **Post Loading Failures**: ErrorState component with retry
- **Image Loading**: Graceful fallback for broken images
- **Network Issues**: Proper error states and retry mechanisms
- **Engagement Failures**: Toast notifications for action failures

## Social Features
- **Share Options**: Native share sheet with multiple options
- **Copy Link**: Direct clipboard integration
- **Engagement Tracking**: Comprehensive metrics collection
- **Comment Threading**: Support for nested comment discussions

## Media Handling
- **Multiple Format Support**: Image gallery with horizontal scroll
- **Aspect Ratio**: Proper image sizing and cropping
- **Loading States**: Progressive image loading
- **Error Fallback**: Broken image handling

## Accessibility
- **Touch Targets**: Proper hitSlop for all interactive elements
- **Screen Reader**: Semantic structure for post content
- **Focus Management**: Proper focus flow through comments
- **Loading Indicators**: Clear loading states with descriptive text
- **Alternative Text**: Image accessibility support