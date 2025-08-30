# Create Post Flow Audit

## Flow: Create Post/Review
**Files:**
- `app/add/create-post.tsx` - Main creation form
- `app/add/post-preview.tsx` - Preview before posting
- `app/add/post-success.tsx` - Success confirmation

### Main Creation Screen
**File:** `app/add/create-post.tsx`

| Component/Feature | Functionality Description | Displayed Data | User Interactions | States |
|------------------|---------------------------|----------------|-------------------|---------|
| **Header** | Navigation and actions | • Title<br>• Cancel/Save buttons | • Cancel: Discard<br>• Next: Preview | • Default<br>• Has changes |
| **Caption Field** | Main post text | • Text input<br>• Character count | • Type: Enter text<br>• Focus/blur | • Empty<br>• Has text<br>• Max length |
| **Photo Carousel** | Image management | • Selected photos<br>• Add photo button | • Add photo: Camera/gallery<br>• Delete: Remove photo<br>• Reorder: Drag | • No photos<br>• Has photos (max 10) |
| **Restaurant Selector** | Restaurant association | • Selected restaurant<br>• Search button | • Tap: Open search<br>• Remove: Clear selection | • None selected<br>• Selected |
| **Rating Stars** | 5-star rating | • Star icons<br>• Selected rating | • Tap star: Set rating | • Unrated<br>• Rated (1-5) |
| **Attachment Bar** | Additional options | • Photo, Link, Restaurant, Rating, Details icons | • Tap icon: Open tool | • Default<br>• Active attachment |
| **Visit Details** | Optional metadata | • Visit type<br>• Date<br>• Price range | • Select options | • Hidden<br>• Expanded |
| **Community Selector** | Cross-posting | • Selected communities<br>• Community badges | • Tap: Select communities | • None<br>• Selected (multiple) |
| **Privacy Selector** | Post visibility | • Public/Friends/Private | • Tap: Change privacy | • Public (default)<br>• Friends<br>• Private |
| **Link Attachment** | External content | • Link preview<br>• Metadata | • Add link: Enter URL | • No link<br>• Has link |
| **Completion Progress** | Form validation | • Progress bar<br>• Missing fields | • Visual feedback | • Incomplete<br>• Complete |

### Preview Screen
**File:** `app/add/post-preview.tsx`

| Component/Feature | Functionality Description | Displayed Data | User Interactions | States |
|------------------|---------------------------|----------------|-------------------|---------|
| **Post Preview** | Final post appearance | • All post data<br>• Formatted layout | • Scroll: View full | • Default |
| **User Info** | Author display | • Avatar<br>• Name<br>• Timestamp (preview) | • None | • Default |
| **Content Display** | Post content | • Caption<br>• Photos<br>• Restaurant<br>• Rating | • None (view only) | • Default |
| **Community Tags** | Cross-post targets | • Community names | • None | • Default |
| **Edit Button** | Return to edit | • Edit action | • Tap: Back to edit | • Default |
| **Post Button** | Submit post | • Post action | • Tap: Create post | • Default<br>• Posting |

### Success Screen
**File:** `app/add/post-success.tsx`

| Component/Feature | Functionality Description | Displayed Data | User Interactions | States |
|------------------|---------------------------|----------------|-------------------|---------|
| **Success Animation** | Celebration | • Checkmark/confetti | • None | • Animating |
| **Post Summary** | Created post info | • Restaurant name<br>• Rating<br>• Communities posted to | • None | • Default |
| **Action Buttons** | Next steps | • View Post<br>• Share<br>• Create Another<br>• Done | • Tap: Navigate | • Default |
| **Achievement** | Gamification | • Points earned<br>• Milestones | • None | • Show if earned |

### Data Flow

| Step | Data Collected | Validation |
|------|---------------|------------|
| Caption | Text content | Optional but recommended |
| Photos | Image files | Optional, max 10 |
| Restaurant | Restaurant selection | Required for reviews |
| Rating | 1-5 stars | Required if restaurant selected |
| Visit Details | Type, date, price | Optional |
| Communities | Cross-post targets | Optional |
| Privacy | Visibility setting | Default: Public |

### Navigation Flows

| Action | From | To | Data |
|--------|------|----|----|
| Cancel | Create Post | Previous screen | Confirmation if has data |
| Next | Create Post | Preview | Form data |
| Edit | Preview | Create Post | Preserves data |
| Post | Preview | Success | Creates post |
| View Post | Success | Post Detail | `post.id` |
| Share | Success | Share sheet | Post link |
| Create Another | Success | Create Post (new) | Reset form |
| Done | Success | Home/Profile | N/A |

### Features

**Media Management:**
- Camera integration
- Photo library access
- Multi-select photos
- Image compression
- Reorder capability

**Restaurant Search:**
- Text search
- Recent restaurants
- Add new restaurant option
- Location-based results

**Community Cross-posting:**
- Multi-select communities
- Member-only communities shown
- Community rules display

**Form Validation:**
- Real-time validation
- Progress tracking
- Missing field indicators
- Character limits

### Edit Mode

When `editMode=true`:
- Loads existing post data
- Shows "Update" instead of "Post"
- Preserves post ID
- Updates instead of creates