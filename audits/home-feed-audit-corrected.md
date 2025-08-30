# Home Feed Screen Audit (CORRECTED)

## Screen: Home Feed
**File Path:** `app/(tabs)/index.tsx`
**Purpose:** Personalized restaurant recommendations and network building suggestions
**Route:** `/` (default tab)

### Component Inventory

| Component/Feature | Functionality Description | Displayed Data | User Interactions | States |
|------------------|---------------------------|----------------|-------------------|---------|
| **Header Section** | Welcome message with notifications | • Greeting text<br>• `unreadCount` | • Tap bell: Open notification center<br>• Tap search: Navigate to explore | • Default<br>• Has notifications (badge) |
| **City Selector** | Current city display and switcher | • `selectedCity`<br>• Available cities list | • Tap: Open city selector<br>• Select city: Update content | • Default<br>• Loading<br>• Expanded |
| **Persona Card** | User's food personality display | • `persona.name`<br>• `persona.emoji`<br>• `persona.description`<br>• `persona.traits` | • Tap info: Show explanation | • Default<br>• No persona |
| **Network Progress** | Gamified onboarding progress | • Board creation status<br>• Post creation status<br>• Community join status | • View progress indicators | • Not started<br>• In progress<br>• Completed |
| **Quick Saves Board** | User's saved restaurants | • Saved restaurant cards<br>• Personal ratings<br>• Notes | • Tap restaurant: View detail<br>• Horizontal scroll | • Default<br>• Empty<br>• Loading |
| **Top Rated Section** | Best restaurants in city | • `restaurant.name`<br>• `restaurant.image`<br>• `restaurant.cuisine`<br>• `restaurant.rating`<br>• `restaurant.price_range`<br>• `restaurant.neighborhood` | • Tap card: View restaurant<br>• Tap save: Quick save<br>• Scroll horizontally | • Default<br>• Loading<br>• Empty |
| **Featured Section** | Curated restaurant picks | • Same as top rated | • Same as top rated | • Default<br>• Loading |
| **Network Building CTAs** | Social feature prompts | • Contextual prompts | • Find Friends: Navigate<br>• Join Community: Navigate<br>• Create Board: Navigate | • Default<br>• Completed |
| **Notification Center** | Slide-over notifications panel | • Notifications list<br>• Timestamps<br>• Action items | • Tap notification: Navigate<br>• Swipe: Dismiss<br>• Close: Hide panel | • Hidden<br>• Visible |
| **Pull to Refresh** | Refresh all content | N/A | • Pull down: Refresh | • Idle<br>• Refreshing |
| **Info Modal** | Recommendations explanation | • Static content | • Close: Dismiss | • Hidden<br>• Visible |

### Conditional Elements

| Condition | Element | Behavior |
|-----------|---------|----------|
| New user | Network building prompts | Shows progressive CTAs |
| No saves | Quick saves empty state | Shows "Start exploring" |
| No restaurants | Empty state | Shows "No restaurants in this city" |
| Loading | Skeleton loaders | Shows placeholder cards |
| Network error | Error state | Shows retry button |
| Has notifications | Badge on bell | Shows red dot with count |
| Completed network | Achievement celebration | Shows success message |

### Navigation Flows

| Trigger | Destination | Data Passed |
|---------|-------------|-------------|
| Notification bell | Notification Center (overlay) | N/A |
| Search icon | Explore tab | N/A |
| Restaurant card | Restaurant Detail | `restaurant.id` |
| Find Friends CTA | Find Friends screen | N/A |
| Join Community CTA | Communities screen | N/A |
| Create Board CTA | Create Board modal | N/A |
| City selector | City picker (modal) | Current city |

### Data Requirements

- User authentication
- User profile with persona
- Selected city preference
- Restaurant data (top rated, featured)
- User's quick saves
- Network progress tracking
- Notification count
- Available cities list

### Key Differences from Previous Audit

This is the ACTUAL home feed with:
- **Network building focus** - Progressive CTAs for social features
- **Persona-based personalization** - Not time-based
- **Quick saves prominently featured** - User's saved restaurants
- **City selector** - Multi-city support
- **Gamified onboarding** - Progress tracking
- **No friend stories** - Different social approach
- **No activity feed** - Simplified content

### Performance Metrics

- Initial load: < 1.5 seconds
- City switch: < 1 second
- Smooth horizontal scrolling
- Image lazy loading
- 5-second cache for restaurants
- 1-minute cache for user boards