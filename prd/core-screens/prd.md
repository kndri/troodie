## Core Screens Implementation: Home, Explore, Activity, Profile

---

## **1. Home Screen Implementation**

### **Purpose & Goals**

- Primary landing screen for user engagement
- Personalized content discovery based on user state
- Network building for new users
- Quick access to core platform features


### **User States & Variations**

1. **New User** (no friends, limited activity)
2. **Active User** (established network, regular activity)
3. **Restaurant Owner** (business dashboard view)


### **Layout Structure**

#### **Header Section**

- **Brand**: "troodie" (Poppins font, bold, lowercase)
- **Tagline**: "Social Commerce Platform"
- **Actions**: Search, Restaurant Switch, Notifications
- **Sticky positioning** for persistent access


#### **Content Sections (New User State)**

1. **Welcome Banner** - Onboarding encouragement
2. **Network Building** - Friend connection prompts (when < 5 friends)
3. **Personalized Recommendations** - Curated categories
4. **Your Saves** - Collection with empty state
5. **Trending Content** - Platform-wide popular content
6. **Quick Actions** - Explore and Add shortcuts


#### **Content Sections (Active User State)**

1. **Recent Activity** - Friend saves and reviews
2. **Your Saves** - Personal collection grid
3. **Friend Activity Feed** - Social proof content
4. **Recommendations** - AI-powered suggestions
5. **Trending** - Popular content


### **Component Specifications**

#### **Welcome Banner**

```typescript
interface WelcomeBanner {
  title: "Welcome to troodie!"
  description: "Discover amazing restaurants and build your food network"
  cta: "Get Started" → navigates to explore
  styling: gradient background (#FFAD27/10 to orange-50)
}
```

#### **Network Building Cards**

```typescript
interface NetworkSuggestion {
  action: string // "Invite Friends", "Follow Local Troodies", "Share Your First Save"
  description: string
  icon: LucideIcon
  cta: string
  benefit: string // Value proposition
  onClick: () => void
}
```

#### **Trending Content Cards**

```typescript
interface TrendingContent {
  restaurant: {
    name: string
    image: string
    cuisine: string
    rating: number
    location: string
    priceRange: string
  }
  stats: {
    saves: number
    visits: number
    photos: number
  }
  highlights: string[] // ["Great for dates", "Amazing views"]
  type: "trending_spot" | "local_favorite" | "featured"
}
```

---

## **2. Explore Screen Implementation**

### **Purpose & Goals**

- Content discovery through social network
- Restaurant search and filtering
- Social proof integration
- Pinterest-style visual browsing


### **Layout Structure**

#### **Header Section**

- **Title**: "Explore" with subtitle "Discover through your network"
- **Search Bar**: Global restaurant/friend/cuisine search
- **Filter Button**: Advanced filtering options
- **Filter Pills**: Horizontal scrollable filters


#### **Filter System**

```typescript
const filters = ["All", "Friends", "Trending", "Nearby", "New", "Top Rated"]
```

#### **Content Grid**

- **Masonry layout** (Pinterest-style)
- **Variable height cards** based on content
- **Infinite scroll** loading
- **Social context integration**


### **Post Card Specifications**

#### **Enhanced Post Structure**

```typescript
interface ExplorePost {
  id: number
  restaurant: RestaurantInfo
  user: UserInfo & {
    persona: string // "Luxe Planner", "Local Explorer"
    verified: boolean
    followers: number
  }
  socialProof: {
    friendsVisited: string[]
    friendsPhotos: string[]
    totalFriendVisits: number
    mutualFriends: number
  }
  photos: string[]
  engagement: {
    likes: number
    saves: number
    comments: number
  }
  trending: boolean
  caption: string
  time: string
}
```

#### **Social Proof Display**

- **Friend avatars** (max 3 visible)
- **Visit count** from network
- **Mutual friend indicator**
- **Blue highlight box** for social context


#### **Interaction Elements**

- **Like button** with count
- **Comment button** with count
- **Save button** with count
- **Primary Save CTA** (orange button)


---

## **3. Activity Screen Implementation**

### **Purpose & Goals**

- User engagement tracking
- Social interaction management
- Platform activity discovery
- User activation for new users


### **User States**

#### **Empty State (New Users)**

- **Onboarding message**: "Your Activity Will Appear Here"
- **Suggested actions** to generate activity
- **Trending platform activity** as content filler


#### **Active State (Established Users)**

- **Personal activity feed**
- **Interaction notifications**
- **Social updates**


### **Layout Structure**

#### **Header**

- **Back button** (when navigated from other screens)
- **Title**: "Activity"
- **Minimal design** for content focus


#### **Empty State Components**

##### **Suggested Activities**

```typescript
interface SuggestedActivity {
  title: string
  description: string
  icon: LucideIcon
  action: string // Button text
  benefit: string // Value proposition
  color: string // Background color scheme
  onClick: () => void
}

const suggestedActivities = [
  {
    title: "Save Your First Restaurant",
    description: "Start building your collection and get recommendations",
    action: "Explore Restaurants",
    benefit: "Get personalized suggestions",
    color: "bg-blue-50 border-blue-200"
  },
  // ... more activities
]
```

##### **Trending Activity**

```typescript
interface TrendingActivity {
  type: "trending_save" | "new_opening" | "local_favorite"
  restaurant: string
  image: string
  stats: string // "247 saves today"
  description: string
}
```

#### **Active State Components**

##### **Activity Item**

```typescript
interface ActivityItem {
  id: number
  type: "like" | "comment" | "save" | "follow"
  user: UserInfo
  action: string // "liked your save"
  target?: string // Restaurant name
  time: string
  restaurant?: RestaurantInfo
}
```

---

## **4. Profile Screen Implementation**

### **Purpose & Goals**

- User identity and personal brand management
- Content collection display (saves, boards, posts)
- Profile completion and gamification
- Social networking and creator features


### **User States & Variations**

1. **Own Profile** (editable, completion prompts)
2. **Other User Profile** (follow/unfollow, social actions)
3. **New User Profile** (onboarding, empty states)
4. **Creator Profile** (creator dashboard access)


### **Layout Structure**

#### **Header Section**

- **Back button** (for other profiles)
- **Title**: "Profile" or user name
- **Settings/More options** button


#### **Profile Information Section**

- **Avatar** with edit option (own profile)
- **Name and username**
- **Bio** with edit prompt if empty
- **Persona badge** (e.g., "Luxe Planner", "Local Explorer")
- **Stats row**: Followers, Following, Saves, Posts
- **Action buttons**: Edit Profile/Share (own) or Follow/Message (others)


#### **Profile Completion (New Users)**

```typescript
interface ProfileCompletion {
  percentage: number // 0-100
  suggestions: CompletionSuggestion[]
}

interface CompletionSuggestion {
  id: number
  action: string // "Add Profile Photo", "Write Bio"
  description: string
  icon: LucideIcon
  completed: boolean
  points: number
  onClick: () => void
}
```

#### **Creator Section (If Applicable)**

```typescript
interface CreatorStats {
  totalEarnings: number
  activeCampaigns: number
  rating: number
}
```

#### **Content Tabs**

- **Saves Tab**: Restaurant collection
- **Boards Tab**: Organized collections
- **Posts Tab**: User-generated content


### **Tab Content Specifications**

#### **Saves Tab**

- **Grid layout** (2 columns)
- **Restaurant cards** with image, name, cuisine, rating, location
- **Empty state**: Onboarding to save first restaurant


#### **Boards Tab**

- **List layout** with board previews
- **Board info**: Title, count, privacy status, preview image
- **Empty state**: Create first board prompt


#### **Posts Tab**

- **Grid layout** (2 columns)
- **Post previews** with engagement stats
- **Empty state**: Share first post encouragement


### **Empty State Designs**

#### **Empty State Card Component**

```typescript
interface EmptyStateCard {
  title: string
  description: string
  icon: LucideIcon
  action: {
    text: string
    onClick: () => void
  }
  tip?: string // Pro tip or additional guidance
}
```

#### **Network Building Prompts**

- **Low follower count** (< 10): "Grow Your Network" suggestion
- **No mutual friends**: "Find Troodies" recommendation
- **Limited activity**: Profile completion prompts


---

## **5. Bottom Navigation Implementation**

### **Navigation Structure**

```typescript
interface NavItem {
  screen: Screen
  icon: LucideIcon
  label: string
  isActive: boolean
  badge?: boolean // For notifications
}

const navigationItems = [
  { screen: "home", icon: Home, label: "Home" },
  { screen: "explore", icon: Compass, label: "Explore" },
  { screen: "add", icon: Plus, label: "", special: true }, // Floating action
  { screen: "activity", icon: Heart, label: "Activity" },
  { screen: "profile", icon: User, label: "Profile" }
]
```

### **Visual Specifications**

- **Fixed positioning** at bottom
- **White background** with top border
- **Active state**: Orange color (`#FFAD27`)
- **Inactive state**: Gray color
- **Add button**: Floating orange circle with white plus icon
- **Badge indicators** for notifications


### **Responsive Behavior**

- **Safe area padding** for mobile devices
- **Touch target size**: Minimum 44px
- **Haptic feedback** on selection
- **Smooth transitions** between states


---

## **6. Cross-Screen Interactions**

### **Navigation Flow**

```typescript
// Primary navigation paths
Home → Explore (via search button or quick action)
Home → Activity (via bottom nav)
Home → Profile (via bottom nav)
Explore → Restaurant Detail (via post tap)
Explore → User Profile (via user avatar tap)
Activity → Profile (via user avatar tap)
Profile → Edit Profile (via edit button)
Profile → Restaurant Detail (via save tap)
Any Screen → Add (via floating action button)
```

### **State Management**

```typescript
interface AppState {
  currentScreen: Screen
  screenHistory: Screen[]
  screenData?: any
  user: {
    hasLimitedActivity: boolean
    friendsCount: number
    isRestaurant: boolean
    profileCompletion: number
    isNewUser: boolean
  }
}
```

### **Data Flow**

- **Screen data passing** via navigation props
- **Back navigation** with history stack
- **Deep linking** support for restaurant details and user profiles
- **State persistence** across screen changes
- **Profile completion tracking** across sessions


---

## 7. Visual Reference

The following image provides a visual reference for the main core screens described above:

![Core Screens](assets/images/image.png)

- **Left:** Home screen with onboarding, network building, recommendations, saves, and trending content
- **Second:** Explore screen with search, filters, and social content grid
- **Third:** Activity screen showing onboarding actions and recent activity
- **Right:** Profile screen with user info, stats, and actions

> Place the referenced image at `assets/images/image.png`. Update the image as the UI evolves to keep this section current.

