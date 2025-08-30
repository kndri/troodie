# Restaurant Detail Screen Audit

## Screen: Restaurant Detail
**File Path:** `app/restaurant/[id].tsx`
**Purpose:** Display comprehensive restaurant information with social context
**Route:** `/restaurant/[id]` (dynamic route)

### Component Inventory

| Component/Feature | Functionality Description | Displayed Data | User Interactions | States |
|------------------|---------------------------|----------------|-------------------|---------|
| **Header Image** | Restaurant cover photo with gradient | • `restaurant.cover_photo_url`<br>• `restaurant.name` overlay | • Tap back: Navigate back | • Default<br>• No image fallback |
| **Quick Actions Bar** | Primary restaurant actions | • Save status indicator | • Tap save: Toggle save/boards<br>• Tap share: Share restaurant<br>• Tap camera: Add photo<br>• Tap review: Create post | • Default<br>• Saved<br>• Saving |
| **Restaurant Info** | Basic restaurant details | • `restaurant.name`<br>• `restaurant.cuisine_types`<br>• `restaurant.price_range`<br>• `restaurant.neighborhood` | • None (display only) | • Default |
| **Rating Section** | Aggregated ratings | • `restaurant.google_rating`<br>• `restaurant.troodie_rating`<br>• Review count | • Tap: View all reviews | • Default<br>• No ratings |
| **Tab Switcher** | Content section navigation | • Active tab indicator | • Tap tab: Switch section | • Info (default)<br>• Social<br>• Photos |
| **Info Tab** | Restaurant details and metadata | • `restaurant.address`<br>• `restaurant.phone`<br>• `restaurant.website`<br>• `restaurant.hours`<br>• `restaurant.description` | • Tap address: Open maps<br>• Tap phone: Call<br>• Tap website: Open browser | • Default<br>• Loading |
| **Social Tab** | Friend activity and reviews | • `friendsWhoVisited[]`<br>• `powerUsersAndCritics[]`<br>• `recentActivity[]`<br>• Visit stats | • Tap user: View profile<br>• Tap activity: View detail | • Default<br>• Empty<br>• Loading |
| **Photos Tab** | User-submitted photos | • `photos[]`<br>• Upload timestamps<br>• User info | • Tap photo: View fullscreen<br>• Tap add: Upload photo | • Default<br>• Empty<br>• Loading |
| **Friend Visit Cards** | Friends who visited | • `friend.avatar`<br>• `friend.name`<br>• `friend.rating`<br>• `friend.visit_date` | • Tap card: View friend profile | • Default<br>• Empty state |
| **Power User Reviews** | Influencer reviews | • `user.avatar`<br>• `user.name`<br>• `user.followers_count`<br>• `review.rating`<br>• `review.caption` | • Tap review: View full review<br>• Tap user: View profile | • Default<br>• Empty |
| **Board Selection Modal** | Save to boards interface | • User's boards list<br>• Board covers | • Select board: Add to board<br>• Create new: New board | • Closed<br>• Open<br>• Saving |

### Conditional Elements

| Condition | Element | Behavior |
|-----------|---------|----------|
| Not authenticated | Save button | Shows login prompt on tap |
| Restaurant saved | Save icon | Shows filled bookmark |
| No cover photo | Header | Shows placeholder gradient |
| No social data | Social tab | Shows "Be the first" message |
| No photos | Photos tab | Shows upload prompt |
| Loading | All tabs | Shows skeleton loaders |
| Error state | Main view | Shows error with retry |
| Admin user | Edit button | Shows edit restaurant option |

### Navigation Flows

| Trigger | Destination | Data Passed |
|---------|-------------|-------------|
| Back button | Previous screen | N/A |
| Tap user avatar | User Profile | `user.id` |
| Tap address | Maps app | `restaurant.address` |
| Tap phone | Phone dialer | `restaurant.phone` |
| Tap website | Browser | `restaurant.website` |
| Tap review button | Create Post | `restaurant.id`, `restaurant.name` |
| Tap photo | Photo viewer | `photo.url` |
| Share button | Share sheet | Restaurant link |

### Data Requirements

- Restaurant details from database
- User authentication state
- Save status for current user
- Friend activity data
- Power user reviews
- Recent check-ins
- User-submitted photos
- Google Places data (ratings, hours)
- Visit statistics

### Tab-Specific Features

**Info Tab:**
- Operating hours by day
- Google Maps integration
- Phone number formatting
- Website link validation
- Distance calculation

**Social Tab:**
- Friend activity feed
- Influencer highlights
- Weekly/total visit counts
- Real-time activity updates
- Social proof indicators

**Photos Tab:**
- Grid layout (3 columns)
- Upload functionality
- Photo attribution
- Timestamp display
- Cover photo selection

### Performance Metrics

- Initial load: < 1.5 seconds
- Tab switch: Instant
- Image loading: Progressive
- Social data: Async load
- Save action: < 500ms
- Share action: Native speed