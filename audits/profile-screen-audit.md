# Profile Screen Audit

## Screen: User Profile
**File Path:** `app/(tabs)/profile.tsx`
**Purpose:** Display user profile, achievements, content, and collections
**Route:** `/profile` (fifth tab)

### Component Inventory

| Component/Feature | Functionality Description | Displayed Data | User Interactions | States |
|------------------|---------------------------|----------------|-------------------|---------|
| **Profile Header** | User info and stats display | • `profile.avatar_url`<br>• `profile.name`<br>• `profile.username`<br>• `profile.bio`<br>• `profile.persona` | • Tap avatar: Change photo<br>• Tap edit: Edit profile<br>• Tap settings: Open settings | • Default<br>• Loading |
| **Stats Row** | User activity metrics | • `followersCount`<br>• `followingCount`<br>• `postsCount`<br>• `savesCount` | • Tap followers: View list<br>• Tap following: View list | • Default<br>• Updating |
| **Action Buttons** | Profile actions | N/A | • Edit Profile: Open modal<br>• Share: Share profile<br>• Settings: Open settings | • Default<br>• Pressed |
| **Achievement Badge** | Persona and achievements | • `profile.persona`<br>• `achievements.count`<br>• `achievements.recent` | • Tap: View all achievements | • Default<br>• New achievement |
| **Tab Bar** | Content type switcher | • Active tab indicator | • Tap tab: Switch content<br>• Horizontal scroll | • Quick Saves (default)<br>• Boards<br>• Posts<br>• Communities |
| **Quick Saves Grid** | 3-column grid of saved restaurants | • `restaurant.image`<br>• `restaurant.name`<br>• `save.personal_rating`<br>• `save.notes` | • Tap item: View restaurant<br>• Long press: Quick actions | • Default<br>• Empty<br>• Loading |
| **Boards List** | User's curated boards | • `board.name`<br>• `board.cover_image`<br>• `board.restaurant_count`<br>• `board.is_public` | • Tap board: View detail<br>• Tap create: New board | • Default<br>• Empty |
| **Posts Feed** | User's reviews and posts | • `post.images`<br>• `post.caption`<br>• `post.rating`<br>• `post.restaurant_name`<br>• `post.created_at` | • Tap post: View detail<br>• Tap edit: Edit post<br>• Tap delete: Delete post | • Default<br>• Empty |
| **Communities Tab** | User's community memberships | • `community.name`<br>• `community.member_count`<br>• `community.role` | • Tap community: View detail<br>• Tap create: New community | • Default<br>• Empty |
| **Edit Profile Modal** | Form to update profile | • All profile fields | • Edit fields: Update info<br>• Save: Submit changes<br>• Cancel: Close modal | • Closed<br>• Open<br>• Saving |
| **Settings Modal** | App settings and preferences | • Settings options | • Toggle settings<br>• Logout: Sign out | • Closed<br>• Open |

### Conditional Elements

| Condition | Element | Behavior |
|-----------|---------|----------|
| Not authenticated | Auth gate | Shows login prompt |
| New user | Welcome message | Shows onboarding tips |
| No saves | Empty state | Shows "Start exploring" message |
| No boards | Create board CTA | Shows "Create your first board" |
| No posts | Empty state | Shows "Share your first review" |
| Profile loading | Skeleton | Shows placeholder content |
| Achievements earned | Badge indicator | Shows red dot on achievements |

### Navigation Flows

| Trigger | Destination | Data Passed |
|---------|-------------|-------------|
| Tap restaurant (saves) | Restaurant Detail | `restaurant.id` |
| Tap board | Board Detail | `board.id` |
| Tap post | Post Detail | `post.id` |
| Tap community | Community Detail | `community.id` |
| Tap followers | Followers List | `user.id` |
| Tap following | Following List | `user.id` |
| Tap achievements | Achievements Screen | `user.id`, `achievements` |
| Tap create board | Create Board Modal | N/A |
| Tap share | Share Sheet | Profile URL |

### Data Requirements

- User authentication
- User profile data
- Follow relationships
- User posts
- User boards
- Quick saves
- Community memberships
- Achievement progress
- Avatar storage

### Tab Content Details

**Quick Saves:**
- 3-column grid layout
- Shows last 50 saves
- Includes personal ratings
- Private by default

**Boards:**
- List view with cover images
- Public/private indicator
- Restaurant count
- Last updated date

**Posts:**
- Vertical feed layout
- Full post cards
- Chronological order
- Edit/delete options

**Communities:**
- List view
- Role badges (admin/moderator/member)
- Member count
- Activity indicators

### Performance Metrics

- Initial load: < 1 second
- Tab switch: Instant (pre-loaded)
- Image loading: Progressive
- Pull to refresh: < 1 second
- Modal open: < 200ms