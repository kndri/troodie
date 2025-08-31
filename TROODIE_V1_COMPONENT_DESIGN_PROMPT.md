# Troodie v1.0 Complete Component Design Prompt
**For Design Team: Component Library & Moodboard Creation**  
**Primary Brand Color:** Troodie Gold (#FFAD27)  
**Target Delivery:** Component Library Before Screen Design  
**Date:** August 29, 2025

---

## DESIGN BRIEF

You are tasked with creating a comprehensive component library and moodboard for Troodie, a social commerce platform for restaurant discovery. This library will be the foundation for 75+ screens. Every component should feel cohesive, use Troodie Gold (#FFAD27) as the primary accent, and adapt seamlessly across user states (anonymous, new user, active user, creator, business owner).

**Core Philosophy:** "Never Empty, Always Evolving" - Components must work whether a user has 0 friends or 100, 0 saves or 1000.

---

## 1. ATOMIC COMPONENTS (Build First)

### 1.1 COLOR SYSTEM
Design a complete color palette showing:
- **Troodie Gold (#FFAD27)** - Primary brand color for all CTAs, saves, highlights
- **Troodie Gold Dark (#E89A1F)** - Pressed/active states
- **Troodie Gold Light (#FFF4E0)** - Light backgrounds (10% opacity)
- **Troodie Gold Faint (#FFFAF2)** - Very light tints (5% opacity)
- **Success Green (#4CAF50)** - Verified badges, online status, success states
- **Warning Amber (#FF9800)** - Busy states, caution indicators
- **Error Red (#F44336)** - Errors, required fields
- **Info Blue (#2196F3)** - Tips, links, information
- **Creator Purple (#7C4DFF)** - Creator features, badges
- **Business Teal (#00BCD4)** - Restaurant owner features
- **Neutrals** - Black (#1A1A1A), Grays (900/600/300/100), White (#FFFFFF)

Show each color with:
- Hex value
- Use cases
- Contrast ratios for text
- Gradient combinations

### 1.2 TYPOGRAPHY SYSTEM
Create specimens for:
- **Display (34px)** - Screen titles
- **Headline (28px)** - Section headers
- **Title (22px)** - Card titles
- **Body (17px)** - Primary content
- **Secondary (15px)** - Supporting text
- **Caption (13px)** - Metadata
- **Micro (11px)** - Labels

Each showing:
- Regular, Medium, Semibold, Bold weights
- Line heights (tight: 1.2, normal: 1.5, relaxed: 1.75)
- Letter spacing
- iOS Dynamic Type scaling

### 1.3 SPACING & GRID
Visual guide showing:
- **4pt grid system** (4, 8, 12, 16, 24, 32, 48, 64px)
- Safe areas for iOS devices
- Tab bar height (49px + safe area)
- Navigation bar height (44px + safe area)
- Content padding standards
- Card spacing relationships

### 1.4 ICONOGRAPHY
Design or specify icons for:
- **Navigation:** Discover, Map, Add (+), Saves, Profile
- **Actions:** Save, Share, Like, Comment, Follow, Visit
- **Categories:** Breakfast, Lunch, Dinner, Coffee, Drinks, Dessert
- **Status:** Verified, Online, Busy, Closed, New, Trending
- **Features:** Creator badge, Business badge, Campaign, Earnings
- **Utilities:** Search, Filter, Settings, Edit, Delete, More

Requirements:
- 24x24px base size
- 2px stroke weight
- Rounded corners
- Filled and outlined variants
- Troodie Gold tint capability

---

## 2. BUTTON COMPONENTS

### 2.1 Primary Button
```
States: Default, Pressed, Disabled, Loading
Sizes: Large (48px), Medium (40px), Small (32px)
Variants: Full width, Fixed width, Icon + Text, Icon only

Visual Requirements:
- Background: Troodie Gold (#FFAD27)
- Text: White (#FFFFFF)
- Border radius: 24px
- Shadow: 0 2px 8px rgba(255, 173, 39, 0.25)
- Pressed: Scale 0.96, darker gold
- Loading: Animated spinner replacing text
```

### 2.2 Secondary Button
```
States: Default, Pressed, Disabled
Variants: Outline, Ghost

Visual Requirements:
- Border: 2px solid Troodie Gold
- Text: Troodie Gold
- Background: Transparent (outline) or Faint gold (ghost)
- Same sizing as primary
```

### 2.3 Text Button
```
Simple text link
- Color: Troodie Gold
- Underline on hover/press
- Opacity 0.7 when pressed
```

### 2.4 Floating Action Button (FAB)
```
Sizes: Standard (56px), Mini (40px)
States: Default, Expanded (showing options)

Visual Requirements:
- Background: Troodie Gold gradient
- Shadow: Elevated (0 4px 12px)
- Icon: White plus sign, rotates 45° when expanded
- Sub-actions slide out with spring animation
```

### 2.5 Icon Button
```
For actions like save, share, settings
Sizes: 44x44px (minimum touch target)
States: Default, Active, Disabled

Visual Requirements:
- Icon color changes on state
- Optional badge (number or dot)
- Ripple effect on tap
```

---

## 3. CARD COMPONENTS

### 3.1 Restaurant Card
Design multiple variants:

#### Variant A: Feed Card (Horizontal)
```
Layout: Image left (120px) | Content right
Height: 140px
Content: Name, cuisine, price, distance, social proof
Actions: Save button overlay on image

States:
- Default (no social data)
- Friend saved (shows friend avatar)
- Trending (flame icon)
- Campaign active (dollar badge)
```

#### Variant B: Grid Card (Square)
```
Layout: Image top | Content bottom
Size: 50% screen width - padding
Aspect ratio: 1:1 image, 3:1 content

States:
- Loading (skeleton)
- Saved (bookmark filled)
- New (NEW badge)
```

#### Variant C: Detail Card (Large)
```
Full width hero image (16:9)
Gradient overlay for text
Floating action buttons
Expandable description
```

### 3.2 Board Card
```
Visual collage of 4 restaurant images
Title overlay with count
Creator badge if applicable
Share button

States:
- Public/Private indicator
- Collaborative (multiple avatars)
- Paid (premium badge)
```

### 3.3 User/Creator Card
```
Avatar (60px) with verification badge slot
Name, username, bio preview
Stats row (followers, saves, boards)
Follow/Following button

Creator variant adds:
- Earnings badge
- Specialties chips
- Rating stars
```

### 3.4 Campaign Card
```
Restaurant hero image
Campaign title and description
Budget and timeline
Creator match percentage
Apply/View button

States:
- Open, In Progress, Completed
- Invited (special highlight)
```

### 3.5 Activity Card
```
Actor avatar + action icon
Activity description with highlights
Timestamp
Object preview (restaurant/board thumbnail)
Engagement actions
```

### 3.6 Notification Card
```
Icon or avatar left
Title and description
Timestamp
Action button(s)
Swipe to dismiss gesture
```

---

## 4. INPUT COMPONENTS

### 4.1 Text Input
```
States: Empty, Focused, Filled, Error, Success
Variants: Single line, Multi-line, With icon

Visual Requirements:
- Border: 1px solid gray-300, Gold on focus
- Height: 48px (single), flexible (multi)
- Placeholder: Gray-600
- Error: Red border and helper text
- Character counter for limited inputs
```

### 4.2 Search Bar
```
Sticky positioning capability
Search icon left
Clear button right
Recent searches dropdown
Voice input icon

States:
- Default
- Active (with suggestions)
- Results loading
```

### 4.3 Select/Dropdown
```
Custom styled to match design system
Chevron down icon (Troodie Gold)
Options panel with scroll
Multi-select variant with checkboxes
```

### 4.4 Checkbox & Radio
```
Custom styled:
- Troodie Gold when selected
- 20x20px touch target minimum 44x44px
- Smooth transition animation
```

### 4.5 Switch/Toggle
```
iOS-style switch
Gold when on, gray when off
56x32px size
Labels optional
```

### 4.6 Slider
```
For price ranges, distances
Gold filled track
Circular thumb (20px)
Value tooltip on drag
Stepped or continuous
```

---

## 5. NAVIGATION COMPONENTS

### 5.1 Tab Bar (Bottom Navigation)
```
5 tabs: Discover, Map, +, Saves, Profile
Height: 49px + safe area
Icons: 24x24px
Labels: 10px text (optional hide on small screens)

States per tab:
- Inactive (gray icon/text)
- Active (Gold icon/text, filled icon variant)
- Badge (red dot or number)

Special handling:
- Middle (+) button elevated/different
- Haptic feedback on tap
- Double-tap to scroll to top
```

### 5.2 Navigation Bar (Top)
```
Height: 44px + safe area
Variants:
- Standard (title center)
- Search (search bar replaces title)
- Transparent (over images)

Elements:
- Back button/close
- Title (can be logo)
- Right actions (2 max)
- Bottom border or shadow
```

### 5.3 Segmented Control
```
For switching views (Info/Reviews/Photos)
Gold underline for active
Equal width segments or content-width
Smooth slide animation between segments
```

### 5.4 Tab Pills (Horizontal Scroll)
```
For categories/filters
Pill shape (rounded)
Gold background when selected
Horizontal scroll with fade edges
16px height, variable width
```

### 5.5 Breadcrumbs
```
For deep navigation
Chevron separators
Truncate middle items if too long
Tappable to navigate back
```

---

## 6. FEEDBACK COMPONENTS

### 6.1 Loading States

#### Skeleton Screens
```
Design skeletons for:
- Restaurant card loading
- Feed loading
- Profile loading
Show animated shimmer effect
Match exact component dimensions
```

#### Spinner
```
Troodie Gold color
Small (16px), Medium (24px), Large (32px)
Can replace button text
Subtle rotation animation
```

#### Pull to Refresh
```
Custom Troodie logo animation
Elastic pull effect
Threshold indicator
```

### 6.2 Empty States
Design illustrated empty states for:

```
Categories needed:
- No restaurants found
- No saves yet  
- No friends yet
- No notifications
- No search results
- No internet connection
- Location services off
- Account required

Each needs:
- Custom illustration (cohesive style)
- Title
- Description
- CTA button
- Alternative action link
```

### 6.3 Error States
```
Types:
- Inline error (under inputs)
- Toast error (temporary)
- Full screen error
- Card error state

Include:
- Error icon/illustration
- Clear error message
- Recovery action
- Dismiss option
```

### 6.4 Success States
```
Types:
- Checkmark animation
- Success toast
- Confetti burst (for big moments)
- Progress completion

Visual Requirements:
- Green accent color
- Smooth animations
- Auto-dismiss timing
- Haptic feedback
```

### 6.5 Toasts & Snackbars
```
Position: Bottom or top
Max width: Screen width - 32px
Auto-dismiss: 3-5 seconds
Actions: 1-2 maximum
Swipe to dismiss gesture
Queue multiple toasts
```

---

## 7. OVERLAY COMPONENTS

### 7.1 Modal/Bottom Sheet
```
Variants:
- Full screen modal
- Bottom sheet (50%, 75%, full)
- Center dialog

Features:
- Drag handle for sheets
- Backdrop blur/dim
- Close button/swipe down
- Safe area handling
```

### 7.2 Action Sheet
```
iOS-style action menu
Destructive actions in red
Cancel button separated
Icons optional
Maximum 5-6 actions
```

### 7.3 Popover/Tooltip
```
Small info bubbles
Arrow pointing to trigger
Auto-position to stay on screen
Light shadow
Max width: 240px
```

### 7.4 Dropdown Menu
```
Triggered by three-dots or chevron
Right-aligned to trigger
Dividers between sections
Icons + text
Checkmarks for selected items
```

---

## 8. SPECIAL COMPONENTS

### 8.1 Map Components
```
Design for:
- Restaurant pin (default, saved, trending, friend)
- Cluster pin (with count)
- User location marker
- Search area overlay
- Restaurant preview card (on pin tap)
- Map controls (zoom, location, filters)
```

### 8.2 Photo Components
```
Gallery layouts:
- Single photo (full width)
- 2-photo grid
- 3-photo grid (1 large + 2 small)
- 4-photo grid
- Carousel with dots

Features:
- Pinch to zoom
- Double-tap to like
- Share button overlay
- Photo count badge
```

### 8.3 Rating Components
```
Star rating:
- 5 stars, half-star precision
- Gold when filled
- 16px, 20px, 24px sizes
- Tappable for input

Traffic light rating:
- Red/Yellow/Green dots
- With labels (Avoid/Maybe/Go)
```

### 8.4 Badge Components
```
Types:
- Verified (blue check)
- New (red NEW)
- Trending (flame icon)
- Creator (purple C)
- Business (teal B)
- Campaign ($)
- Notification count (red circle)

Positions:
- Avatar overlay
- Card corner
- Inline with text
```

### 8.5 Avatar Component
```
Sizes: XS(24), S(32), M(48), L(64), XL(96)
States:
- With image
- Initials fallback
- Default icon
- With status dot
- With story ring
- With verification badge

Groups:
- Overlapping avatars (-8px overlap)
- +N indicator for overflow
```

---

## 9. CREATOR-SPECIFIC COMPONENTS

### 9.1 Earnings Display
```
Large number with currency
Animated count-up
Period selector (week/month/all)
Trend indicator (up/down arrow)
Withdraw button
```

### 9.2 Campaign Progress
```
Progress bar with percentage
Days remaining countdown
Metrics cards (views, clicks, visits)
Live indicator pulsing dot
```

### 9.3 Portfolio Grid
```
Instagram-style post grid
Video indicator overlay
Engagement overlay on hover
Reorder capability
Import from social button
```

### 9.4 Creator Level Badge
```
Bronze/Silver/Gold/Platinum tiers
Progress bar to next level
Benefits unlocked display
Trophy icon
```

---

## 10. BUSINESS-SPECIFIC COMPONENTS

### 10.1 Analytics Charts
```
Line chart (trends over time)
Bar chart (comparisons)
Donut chart (breakdowns)
Heat map (busy times)
All in Troodie Gold gradient
Responsive to data ranges
```

### 10.2 Campaign Builder
```
Step indicator (1 of 5)
Form sections with expand/collapse
Preview panel
Budget calculator
AI suggestion cards
```

### 10.3 ROI Calculator
```
Input fields for costs
Real-time calculation
Comparison to average
Visual indicator (gauge/meter)
```

### 10.4 Business Verification Badge
```
Claimed checkmark
Verification status steps
Documents upload area
Contact support link
```

---

## 11. INTERACTION PATTERNS

### 11.1 Gestures
Document visual feedback for:
- **Tap:** Scale down 0.98, release scale up
- **Long Press:** Haptic, show context menu
- **Swipe Right:** Save action, green background reveal
- **Swipe Left:** Hide/Delete, red background reveal
- **Pull Down:** Refresh with elastic bounce
- **Pinch:** Zoom on images/map
- **Double Tap:** Like/Save quick action

### 11.2 Micro-animations
Design specifications for:
- **Button press:** 100ms scale animation
- **Save action:** Star burst, bookmark fill
- **Tab switch:** 200ms slide
- **Card appearance:** Fade in + slide up
- **Loading:** Pulse/shimmer effect
- **Success:** Checkmark draw, confetti
- **Number changes:** Count up/down animation

### 11.3 Haptic Feedback Map
```
Light Impact: Tab switches, toggles
Medium Impact: Saves, selections
Heavy Impact: Errors, deletions
Success Pattern: Task completion
Warning Pattern: Destructive actions
Selection: Picker changes
```

---

## 12. RESPONSIVE VARIANTS

### 12.1 Device-Specific Layouts
Show how components adapt for:
- **iPhone SE (375px)** - Compact layout
- **iPhone 14 (390px)** - Standard layout
- **iPhone Pro Max (428px)** - Expanded layout
- **iPad Mini (768px)** - 2-column where applicable
- **iPad Pro (1024px)** - 3-column where applicable

### 12.2 Orientation Changes
- Portrait vs Landscape layouts
- Tab bar behavior in landscape
- Modal presentation differences
- Image gallery adaptations

### 12.3 Dynamic Type Support
Show components at:
- Default size
- Large text (120%)
- Extra large text (140%)
- Maximum (200%)

---

## 13. DARK MODE VARIANTS

Create dark mode versions showing:
- Inverted backgrounds
- Adjusted Troodie Gold for visibility
- Elevated surfaces (gray-900)
- Modified shadows
- Preserved brand identity

---

## 14. COMPONENT STATES MATRIX

Create a comprehensive matrix showing every component in these states:

### Universal States
- Default/Rest
- Hover (where applicable)
- Active/Pressed
- Disabled
- Loading
- Error
- Success
- Empty

### User-Specific States
- Anonymous (locked/limited)
- New User (onboarding hints)
- Active User (full features)
- Creator (purple accents)
- Business (teal accents)

---

## 15. MOODBOARD REQUIREMENTS

Create cohesive moodboards for:

### 15.1 Visual Style
- Modern, clean, friendly
- Food photography style guide
- Color usage in context
- Typography in use
- Spacing rhythm

### 15.2 Illustration Style
- Characters for empty states
- Icon illustration style
- Background patterns
- Decorative elements
- Celebration moments

### 15.3 Photography Direction
- Restaurant photography style
- Food photography style
- User-generated content treatment
- Avatar styles
- Hero image treatments

### 15.4 Brand Personality
- Warm and inviting
- Trustworthy and social
- Smart but not intimidating
- Fun but professional
- Inclusive and diverse

---

## DELIVERABLES CHECKLIST

### Phase 1: Foundation (Priority)
- [ ] Color system with all variants
- [ ] Typography specimens
- [ ] Spacing guide
- [ ] Core buttons (all states)
- [ ] Restaurant card (all variants)
- [ ] Navigation components
- [ ] Input fields
- [ ] Loading states

### Phase 2: Essential Components
- [ ] All card types
- [ ] Empty states (illustrated)
- [ ] Error/Success states
- [ ] Modals and sheets
- [ ] Tab bars with badges
- [ ] Avatar system
- [ ] Map components
- [ ] Photo galleries

### Phase 3: Feature-Specific
- [ ] Creator components
- [ ] Business components
- [ ] Campaign elements
- [ ] Analytics displays
- [ ] Badge system
- [ ] Special interactions

### Phase 4: Polish
- [ ] Dark mode variants
- [ ] Responsive layouts
- [ ] Micro-animations
- [ ] Haptic feedback map
- [ ] Final moodboards
- [ ] Usage guidelines

---

## DESIGN PRINCIPLES TO FOLLOW

1. **Troodie Gold is Sacred:** Every primary action must use #FFAD27
2. **Never Empty:** Every state must provide value and next steps
3. **Progressive Enhancement:** Components reveal complexity as users grow
4. **Friend Signals First:** Social proof always visible when available
5. **One-Tap Actions:** Minimize steps for core actions
6. **Delightful Efficiency:** Beautiful but fast
7. **Inclusive Design:** Accessible to all users
8. **Consistent Physics:** Animations follow natural motion
9. **Clear Hierarchy:** Users always know what to do next
10. **Earned Complexity:** Advanced features unlock through usage

---

## TECHNICAL SPECIFICATIONS

### Export Requirements
- Components at @1x, @2x, @3x
- SVG for icons and illustrations
- Lottie files for complex animations
- Color values in HEX, RGB, and Swift/Kotlin
- Spacing values in points and pixels
- Component sizing in fixed and flexible units

### Documentation Needs
- Component usage guidelines
- Do's and don'ts for each component
- Accessibility notes
- Animation timing functions
- State change triggers
- Platform-specific variations

---

## SUCCESS CRITERIA

Your component library is successful when:
1. Any designer can build any of the 75 screens without questions
2. Components work across all 5 user states seamlessly
3. Troodie Gold usage is consistent and impactful
4. Empty states never feel empty
5. The system feels cohesive from component to component
6. Developers have clear specifications for every state
7. Users intuitively understand interactive elements
8. The brand personality shines through consistently

---

**Remember:** This component library is the foundation of Troodie's entire user experience. Every component should feel like it belongs to the same family, with Troodie Gold (#FFAD27) as the unifying thread that ties everything together. When in doubt, choose warmth, clarity, and delight.

**Final Note:** Start with the Restaurant Card - it's the most important component and sets the tone for everything else. If you nail the Restaurant Card, the rest will follow naturally.