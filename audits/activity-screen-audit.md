# Activity Screen Audit

## Screen: Activity Feed
**File Path:** `app/(tabs)/activity.tsx`
**Purpose:** Social feed showing friend and community activities
**Route:** `/activity` (fourth tab)

### Component Inventory

| Component/Feature | Functionality Description | Displayed Data | User Interactions | States |
|------------------|---------------------------|----------------|-------------------|---------|
| **Activity Header** | Screen title and context | • Screen title | • None (display only) | • Default |
| **Filter Toggle** | Switch between all/friends | • Active filter state | • Tap: Toggle filter | • All (default)<br>• Friends only |
| **Activity List** | Scrollable feed of activities | • `activity.user`<br>• `activity.action`<br>• `activity.target`<br>• `activity.timestamp`<br>• `activity.content` | • Pull to refresh<br>• Scroll: Load more<br>• Tap item: Navigate | • Loading<br>• Empty<br>• Error<br>• Has content |
| **Activity Item** | Individual activity card | • User avatar<br>• User name<br>• Action type<br>• Restaurant/Post info<br>• Time ago | • Tap: View detail<br>• Tap user: Profile<br>• Tap restaurant: Detail | • Default<br>• New (unread) |
| **Auth Gate** | Login prompt for guests | • Benefits message | • Tap: Login/signup | • Shown (not auth)<br>• Hidden (auth) |
| **Real-time Updates** | Live activity subscription | • New activities | • Auto-prepend to list | • Connected<br>• Disconnected |
| **Pagination** | Infinite scroll | • Load more indicator | • Scroll to bottom: Load | • Has more<br>• End reached |

### Conditional Elements

| Condition | Element | Behavior |
|-----------|---------|----------|
| Not authenticated | Auth gate | Shows login benefits |
| No activities | Empty state | "No activity yet" message |
| Friends filter + no friends | Empty prompt | "Find friends" CTA |
| Loading initial | Skeleton loader | Activity placeholders |
| Loading more | Bottom spinner | Shows while fetching |
| Network error | Error state | Retry button |
| New activity (real-time) | Animation | Slide in from top |
| Blocked user content | Hidden | Filtered from feed |

### Navigation Flows

| Trigger | Destination | Data Passed |
|---------|-------------|-------------|
| Tap user avatar/name | User Profile | `user.id` |
| Tap restaurant | Restaurant Detail | `restaurant.id` |
| Tap post | Post Detail | `post.id` |
| Tap board | Board Detail | `board.id` |
| Auth gate login | Login screen | Return route |
| Pull to refresh | Same screen | Refreshed data |

### Data Requirements

- User authentication
- Activity feed data
- Friend relationships
- Blocked users list
- Real-time subscriptions
- Pagination cursor
- Time formatting

### Activity Types

- **User posted** - New review
- **User saved** - Restaurant saved
- **User created board** - New collection
- **User joined community** - Community membership
- **Friend followed** - New connection
- **Restaurant trending** - Popular spot

### Performance Features

- 30-second refresh cooldown
- Real-time updates via WebSocket
- Pagination (20 items per page)
- Smart focus refresh
- Blocked user filtering
- Activity deduplication