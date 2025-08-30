# Find Friends Screen Audit (/app/find-friends.tsx)

## Component Inventory

### Core Functionality
- **Dual Tab System**: Suggested users and search functionality
- **User Discovery**: Paginated suggested users with infinite scroll
- **Real-time Search**: Debounced search with live results
- **Follow Management**: Follow/unfollow with optimistic updates
- **Search Suggestions**: Context-aware search recommendations

### Data Management
- **Tab State**: Toggle between 'suggested' and 'search' modes
- **Pagination**: Infinite scroll with page management (50 users per page)
- **Search State**: Query, results, filters, loading states
- **User Management**: Suggested users, search results, follow states
- **Location Context**: User location for personalized suggestions

### Interactive Elements
1. **Header Section**
   - Back button (ArrowLeft icon) with router.back()
   - Title: "Find Friends"
   - Subtitle: "Connect with other food lovers"

2. **Tab Navigation**
   - Horizontal scrollable tabs
   - **For You Tab**: Users icon + "For You" + description
   - **Search Tab**: Search icon + "Search" + description
   - Active tab highlighting and text color changes

3. **Search Interface** (Search tab only)
   - Search input with Search icon
   - Placeholder: "Search by name or username..."
   - Real-time loading indicator
   - Auto-focus on tab switch

4. **Tab Descriptions**
   - Dynamic description based on active tab
   - "For You": "Discover food lovers in the community"
   - "Search": "Find specific users"

5. **Search Suggestions** (Search tab, empty query)
   - Popular searches based on user location
   - Clickable suggestion chips
   - Title: "Popular searches:"

6. **User Lists**
   - UserSearchResult components for both tabs
   - Section headers: "People to Follow" and "Already Following"
   - Load more functionality for suggested users

7. **Infinite Scroll Controls**
   - Load more button for manual loading
   - Scroll-based automatic loading
   - Loading indicators during pagination

## Conditional Elements

### Tab-Specific Rendering
- **Search Bar**: Only visible when activeTab === 'search'
- **Search Suggestions**: Only when activeTab === 'search' AND searchQuery.length === 0
- **Tab Descriptions**: Dynamic based on current tab

### Search Query States
- **Empty Search**: Shows suggestions and empty state message
- **Active Search (≥2 chars)**: Shows search results
- **Loading Search**: Shows loading indicator in search input

### User List Sections
- **New Users Section**: Shows users not being followed (!user.isFollowing && !user.isCurrentUser)
- **Following Section**: Shows users already being followed (user.isFollowing)
- **Section Visibility**: Only renders sections with users

### Load More Controls
- **Suggested Tab**: Shows load more button/indicator when hasMoreUsers
- **Search Tab**: No pagination (single query results)

### Empty States
- **Suggested Tab**: "No users found" + "Check back later as more people join"
- **Search Tab**: "Start searching" + "Enter a name or username to find other food lovers"

### Loading States
- **Initial Load**: Large loading indicator with "Finding great people to follow..."
- **Search Loading**: Small indicator in search input
- **Load More**: Small indicator in load more section
- **Refresh Loading**: Pull-to-refresh indicator

## Navigation Flows

### Entry Points
- Navigation from other screens
- Direct route access

### Tab Switching
- **To Search Tab**: Auto-focuses search input after 100ms
- **To Suggested Tab**: Loads fresh suggested users if needed
- **State Preservation**: Maintains search query and results during tab switches

### User Interactions
- **Follow User**: Removes from suggested list, optimistic UI updates
- **User Profile**: Navigation to user detail screens
- **Search Suggestions**: Auto-populates search query

### Exit Points
- Back navigation via header button
- Deep navigation to user profiles

## Data Requirements

### Input Data
- **User Context**: Current user ID and location from useAuth()
- **Search Filters**: SearchFilters object for advanced search
- **Pagination**: Page size (50 users), offset calculation, has more flag

### API Dependencies
- **UserSearchService.getAllUsers()**: For suggested users
  - Parameters: limit, offset, excludeFollowing
- **UserSearchService.searchUsers()**: For search functionality
  - Parameters: query, filters, limit, offset
- **getDefaultSearchSuggestions()**: Location-based suggestions

### Output Data
- **SearchUserResult[]**: Unified user data structure
  - id: string
  - name?: string
  - username?: string
  - avatar?: string
  - bio?: string
  - isFollowing: boolean
  - isCurrentUser: boolean
  - verified?: boolean

### State Management
- **Tab State**: activeTab ('suggested' | 'search')
- **Search State**: query, results, loading flags
- **Suggested Users**: paginated list with infinite scroll
- **Follow State**: Optimistic updates with backend sync
- **Pagination**: currentPage, hasMoreUsers, loadingMore

## Performance Considerations
- **Debounced Search**: 300ms delay for search queries
- **Infinite Scroll**: Efficient pagination with scroll detection
- **Auto-focus**: Delayed focus to prevent keyboard flicker
- **Optimistic Updates**: Immediate UI feedback for follow actions
- **Pull-to-Refresh**: Native refresh control implementation

## Animation & UX
- **Screen Entrance**: Fade-in animation (300ms duration)
- **Tab Transitions**: Smooth tab switching
- **Loading Skeletons**: Proper loading states
- **Scroll Behavior**: Smooth infinite scroll with padding detection

## Error Handling
- **Search Failures**: Toast notifications with retry suggestions
- **Load More Failures**: Graceful degradation
- **Network Issues**: Refresh control for retry
- **Empty Results**: Contextual messaging based on tab

## Real-time Features
- **Follow State**: Real-time follow/unfollow updates
- **User Removal**: Automatic removal from suggested list after following
- **Fresh Data**: Periodic refresh for suggested users

## Accessibility
- **Touch Targets**: Proper hitSlop for all interactive elements
- **Focus Management**: Auto-focus on search input when appropriate
- **Screen Reader**: Semantic tab navigation and content structure
- **Loading States**: Clear loading indicators and text