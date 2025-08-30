# Home Feed Screen Audit

## Screen: Home Feed
**File Path:** `app/(tabs)/index.tsx`
**Purpose:** Display personalized restaurant content and friend activity
**Route:** `/` (default tab)

### Component Inventory

| Component/Feature | Functionality Description | Displayed Data | User Interactions | States |
|------------------|---------------------------|----------------|-------------------|---------|
| **Navigation Header** | Fixed header with greeting and location | • `user.name`<br>• `user.location`<br>• `notificationCount` | • Tap location: Change city<br>• Tap search: Navigate to explore<br>• Tap bell: Open notifications | • Default<br>• Notifications badge |
| **Story Circles** | Horizontal scroll of friend activity | • `story.user_avatar`<br>• `story.user_name`<br>• `story.is_new` | • Tap story: View user profile<br>• Tap add: Create post<br>• Horizontal scroll | • Default<br>• New story indicator<br>• Empty state |
| **Time-Based Section** | Contextual restaurant recommendations | • `restaurant.name`<br>• `restaurant.image`<br>• `restaurant.cuisine`<br>• `restaurant.rating`<br>• `restaurant.distance` | • Tap card: Navigate to restaurant<br>• Tap save: Quick save<br>• Tap see all: View more | • Breakfast (5am-11am)<br>• Lunch (11am-4pm)<br>• Dinner (4pm-10pm)<br>• Late Night (10pm-5am) |
| **Friends Activity Feed** | Recent friend restaurant visits | • `activity.user_name`<br>• `activity.user_avatar`<br>• `activity.action`<br>• `activity.time_ago`<br>• `activity.restaurant_name`<br>• `activity.restaurant_image`<br>• `activity.comment` | • Tap card: View restaurant<br>• Tap like: Like activity<br>• Tap comment: Add comment<br>• Tap share: Share<br>• Tap save: Save restaurant | • Default<br>• Empty (no friends)<br>• Loading |
| **Trending Section** | Popular restaurants in area | • `restaurant.name`<br>• `restaurant.image`<br>• `restaurant.trending_position`<br>• `restaurant.visit_count` | • Tap card: View restaurant<br>• Horizontal scroll | • Default<br>• Loading |
| **Pull to Refresh** | Refresh all feed content | N/A | • Pull down: Refresh data | • Idle<br>• Refreshing<br>• Complete |
| **Tab Bar** | Bottom navigation | • Active tab indicator | • Tap tab: Navigate | • Active<br>• Inactive |
| **Floating Add Button** | Quick action to create content | N/A | • Tap: Open create modal | • Default<br>• Pressed |

### Conditional Elements

| Condition | Element | Behavior |
|-----------|---------|----------|
| No friend stories | Suggested friends | Shows "Find Friends" CTA with suggested users |
| No friend activity | Empty state card | Shows "Connect with food lovers" message with Find Friends button |
| First time user | Onboarding tooltip | Highlights key features |
| Notification available | Red badge | Shows count on bell icon |
| Loading initial data | Skeleton screens | Shows placeholder content |
| Network error | Error state | Shows retry button with error message |

### Navigation Flows

| Trigger | Destination | Data Passed |
|---------|-------------|-------------|
| Tap restaurant card | Restaurant Detail | `restaurant.id` |
| Tap user story/avatar | User Profile | `user.id` |
| Tap search icon | Explore Screen | Current location |
| Tap notification bell | Notifications Modal | N/A |
| Tap location text | City Selector | Current city |
| Tap "Find Friends" | Find Friends Screen | N/A |
| Tap floating add | Create Post Modal | N/A |
| Pull to refresh | Same screen (refresh) | N/A |

### Data Requirements

- User authentication state
- User profile (name, avatar, location)
- Friend relationships
- Activity feed (last 7 days)
- Restaurant data (trending, recommended)
- Real-time notification count
- Geolocation for distance calculations

### Performance Metrics

- Initial load: < 2 seconds
- Scroll performance: 60 FPS
- Image lazy loading: Yes
- Cache strategy: 5-minute TTL
- Pagination: 20 items per page