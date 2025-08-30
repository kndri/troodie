# Explore Screen Audit

## Screen: Explore/Discovery
**File Path:** `app/(tabs)/explore.tsx`
**Purpose:** Discover restaurants, posts, and communities through search and browsing
**Route:** `/explore` (second tab)

### Component Inventory

| Component/Feature | Functionality Description | Displayed Data | User Interactions | States |
|------------------|---------------------------|----------------|-------------------|---------|
| **Sticky Header** | Explore title with action buttons | • Screen title<br>• User location | • Tap re-randomize: Shuffle content<br>• Tap find friends: Navigate<br>• Tap filters: Open filter modal | • Default<br>• Re-randomizing |
| **Search Bar** | Search across current tab content | • `searchQuery`<br>• Placeholder text | • Type: Filter results<br>• Focus: Expand view<br>• Clear: Reset search | • Default<br>• Focused<br>• Has query |
| **Tab Switcher** | Switch between content types | • Active tab indicator | • Tap tab: Switch view<br>• Communities: Navigate to screen | • Restaurants (active)<br>• Posts<br>• Communities |
| **Restaurant Grid** | 2-column grid of restaurant cards | • `restaurant.name`<br>• `restaurant.image`<br>• `restaurant.cuisine`<br>• `restaurant.rating`<br>• `restaurant.location`<br>• `restaurant.price_range` | • Tap card: View restaurant<br>• Scroll: Load more | • Default<br>• Loading<br>• Empty<br>• Error |
| **Posts Feed** | Vertical list of post cards | • `post.user_name`<br>• `post.user_avatar`<br>• `post.images`<br>• `post.caption`<br>• `post.restaurant_name`<br>• `post.rating`<br>• `post.likes_count`<br>• `post.comments_count` | • Tap post: View detail<br>• Tap like: Toggle like<br>• Tap comment: Add comment<br>• Tap save: Save post<br>• Tap user: View profile | • Default<br>• Loading<br>• Empty |
| **Pull to Refresh** | Refresh current tab content | N/A | • Pull down: Refresh | • Idle<br>• Refreshing |
| **Floating Add Button** | Add new restaurant (admin only) | N/A | • Tap: Open add modal | • Visible (admin)<br>• Hidden (regular user) |
| **Add Restaurant Modal** | Form to add new restaurant | • Form fields | • Fill form: Input data<br>• Submit: Create restaurant<br>• Cancel: Close modal | • Closed<br>• Open<br>• Submitting |

### Conditional Elements

| Condition | Element | Behavior |
|-----------|---------|----------|
| User is admin | Add restaurant button | Shows floating plus button |
| Search active | Clear button | Shows in search bar |
| No results | Empty state | Shows "No results found" message |
| Network error | Error state | Shows retry button |
| Initial load | Skeleton loaders | Shows placeholder cards |
| Randomizing | Loading overlay | Shows while shuffling content |
| Search query | Filtered results | Shows only matching items |

### Navigation Flows

| Trigger | Destination | Data Passed |
|---------|-------------|-------------|
| Tap restaurant card | Restaurant Detail | `restaurant.id` |
| Tap post card | Post Detail | `post.id` |
| Tap communities tab | Communities List | N/A |
| Tap find friends | Find Friends | N/A |
| Tap user on post | User Profile | `user.id` |
| Tap filters | Filter Modal | Current filters |
| Pull to refresh | Same screen | Refreshed data |

### Data Requirements

- Restaurant database (all restaurants)
- Posts feed (recent posts)
- Community listings
- User authentication state
- Admin privileges check
- Search indexing
- Filter preferences

### Search & Filter Logic

**Search Behavior:**
- Real-time filtering as user types
- Debounced at 300ms
- Searches: name, cuisine, location
- Case-insensitive matching

**Randomization:**
- Fisher-Yates shuffle algorithm
- Applies to restaurant tab only
- Maintains shuffle until refresh

**Filter Options (planned):**
- Price range
- Cuisine type
- Distance
- Rating
- Open now

### Performance Metrics

- Initial load: < 1.5 seconds
- Search response: < 100ms
- Image loading: Progressive
- Grid render: 60 FPS
- Cache: 10-minute TTL