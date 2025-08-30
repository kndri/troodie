# Save Restaurant Flow Audit

## Flow: Save Restaurant (Multi-Step)
**Files:** 
- `app/add/save-restaurant.tsx` - Search/selection
- `app/add/restaurant-details.tsx` - Details/rating
- `app/add/board-assignment.tsx` - Board selection
- `app/add/save-success.tsx` - Confirmation

### Step 1: Restaurant Search & Selection
**File:** `app/add/save-restaurant.tsx`

| Component/Feature | Functionality Description | Displayed Data | User Interactions | States |
|------------------|---------------------------|----------------|-------------------|---------|
| **Header** | Navigation and title | • "Save a Restaurant" | • Back: Cancel flow<br>• Plus: Add new restaurant | • Default |
| **Search Methods** | Toggle search approach | • Active method indicator | • Tap: Switch method | • Text (default)<br>• Nearby<br>• Photo<br>• Manual |
| **Search Bar** | Text-based search | • Search query<br>• Placeholder text | • Type: Enter query<br>• Submit: Search | • Empty<br>• Has query<br>• Searching |
| **Results List** | Restaurant search results | • `restaurant.name`<br>• `restaurant.address`<br>• `restaurant.cuisine`<br>• `restaurant.rating`<br>• `restaurant.photo` | • Tap item: Select restaurant<br>• Scroll: View more | • Empty<br>• Loading<br>• Has results |
| **Popular Restaurants** | Pre-search suggestions | • Trending restaurants | • Tap: Select restaurant | • Default<br>• Hidden (searching) |
| **Beta Notice** | Feature status | • Beta message | • None | • Visible |
| **Add Restaurant Modal** | Manual addition | • Form fields | • Fill form<br>• Submit | • Hidden<br>• Visible |

### Step 2: Restaurant Details
**File:** `app/add/restaurant-details.tsx`

| Component/Feature | Functionality Description | Displayed Data | User Interactions | States |
|------------------|---------------------------|----------------|-------------------|---------|
| **Restaurant Card** | Selected restaurant display | • Name<br>• Photo<br>• Address<br>• Cuisine | • None (display only) | • Default |
| **Personal Rating** | Star rating selector | • 5 stars | • Tap star: Set rating | • Unrated<br>• Rated |
| **Notes Field** | Personal notes | • Text input | • Type: Add notes | • Empty<br>• Has text |
| **Photo Upload** | Add personal photos | • Photo thumbnails | • Tap: Add photo<br>• Camera/gallery | • No photos<br>• Has photos |
| **Visited Toggle** | Mark as visited | • Toggle state | • Tap: Toggle visited | • Not visited<br>• Visited |
| **Continue Button** | Proceed to boards | • Button state | • Tap: Continue | • Disabled<br>• Enabled |

### Step 3: Board Assignment
**File:** `app/add/board-assignment.tsx`

| Component/Feature | Functionality Description | Displayed Data | User Interactions | States |
|------------------|---------------------------|----------------|-------------------|---------|
| **Board List** | User's boards | • Board names<br>• Cover images<br>• Restaurant count | • Tap: Select board(s)<br>• Multi-select | • Loading<br>• Empty<br>• Has boards |
| **Quick Save Option** | Default save location | • "Quick Saves" | • Tap: Select | • Selected<br>• Unselected |
| **Create Board** | New board creation | • Plus icon<br>• "Create New Board" | • Tap: Create board flow | • Default |
| **Selected Indicator** | Board selection state | • Checkmarks | • Visual feedback | • Selected<br>• Unselected |
| **Save Button** | Complete save | • Button state | • Tap: Save | • Disabled<br>• Enabled<br>• Saving |

### Step 4: Success Screen
**File:** `app/add/save-success.tsx`

| Component/Feature | Functionality Description | Displayed Data | User Interactions | States |
|------------------|---------------------------|----------------|-------------------|---------|
| **Success Animation** | Celebration visual | • Checkmark/confetti | • None | • Animating |
| **Restaurant Summary** | Saved restaurant | • Name<br>• Board(s) saved to | • None | • Default |
| **Action Buttons** | Next steps | • View Restaurant<br>• Add Another<br>• Done | • Tap: Navigate | • Default |
| **Share Option** | Social sharing | • Share button | • Tap: Share sheet | • Default |

### Navigation Flows

| Step | Action | Destination | Data Passed |
|------|--------|-------------|-------------|
| Search | Select restaurant | Restaurant Details | `restaurant` object |
| Search | Add new | Add Restaurant Modal | N/A |
| Details | Continue | Board Assignment | `restaurant`, `rating`, `notes` |
| Details | Back | Search | Preserves state |
| Boards | Save | Success | Complete save data |
| Boards | Create board | Create Board flow | Context |
| Success | View Restaurant | Restaurant Detail | `restaurant.id` |
| Success | Add Another | Search (reset) | N/A |
| Success | Done | Home/Profile | N/A |

### Data Requirements

- Restaurant database
- User's boards
- Save relationships
- Photo upload capability
- Personal ratings storage

### Validation Rules

- Rating: Optional but encouraged
- Notes: Optional, 500 char limit
- Photos: Optional, max 5
- Board: At least one required
- Visited: Boolean flag