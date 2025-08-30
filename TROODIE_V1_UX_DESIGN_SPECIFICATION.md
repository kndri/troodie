# Troodie v1.0 Complete UX Design Specification
**For Designers & Developers**  
**Launch Target:** September 20th, 2025  
**Design Philosophy:** Progressive Enhancement Through Social Growth

---

## Design Principles

### Core Philosophy: "Never Empty, Always Evolving"
Every screen adapts based on user state, ensuring the app feels alive and valuable from minute one. We use **progressive disclosure** to reveal features as users demonstrate engagement, preventing overwhelm while maintaining discovery.

### Key Principles
1. **Content First:** Always show restaurants, even without social connections
2. **Social Amplification:** Layer social signals as they become available
3. **Clear Value Moments:** Every interaction demonstrates why Troodie is valuable
4. **Earned Complexity:** Advanced features unlock through usage, not time
5. **Contextual Intelligence:** UI adapts to time, location, and behavior

---

## NAVIGATION ARCHITECTURE

### Primary Navigation Structure

```
UNIFIED TAB BAR - CONSISTENT ACROSS USER JOURNEY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CORE NAVIGATION (States 1-3: Anonymous → New User → Active User)
[Discover] [Map] [+] [Saves] [Profile]
     ↓       ↓    ↓     ↓        ↓
   Home    Find  Add  Boards    You

The SAME tabs for all users, but CONTENT ADAPTS based on state:

State 1: ANONYMOUS USER
- Discover: Trending & popular (no personalization)
- Map: Full access to browse
- [+]: Prompts to sign up
- Saves: "Sign in to save" state
- Profile: Sign in/Sign up screen

State 2: NEW USER (0 Friends, <10 Saves)  
- Discover: AI-personalized + "Find friends" prompts
- Map: Same as anonymous
- [+]: Full save functionality
- Saves: Encouragement to organize (after 3+ saves)
- Profile: Onboarding progress + friend discovery

State 3: ACTIVE USER (Friends, 10+ Saves)
- Discover: Friend activity + personalized content
- Map: Shows friend favorites
- [+]: Quick actions + board suggestions
- Saves: Full board management
- Profile: Complete profile with stats

State 4: CREATOR USER (Verified Creator)
[Discover] [Map] [+] [Studio] [Profile]
     ↓       ↓    ↓      ↓        ↓
   Home    Find  Add   Create    You
* Only "Saves" changes to "Studio" for creators

State 5: RESTAURANT USER (Different app/view entirely)
[Dashboard] [Campaigns] [+] [Analytics] [Settings]
```

### Why Unified Navigation Works Better

**The Problem with Changing Navigation:**
- Users develop muscle memory for tab locations
- Switching from "Discover" to "Feed" between states is jarring
- "Saves" becoming "Boards" confuses users
- Creates a "graduation" feeling that segments users

**The Solution - Adaptive Content, Stable Structure:**
- Same 5 tabs for all logged-in users
- Content within each tab progressively enhances
- Social signals layer on top of base content
- Features unlock within existing screens
- No relearning required as users grow

**Key Benefits:**
1. **Consistency:** Users always know where things are
2. **Progressive Enhancement:** Rich features appear naturally
3. **Never Empty:** Every screen has value from day one
4. **Smooth Growth:** No jarring transitions between states
5. **Clear Mental Model:** Discover, Map, Add, Save, Profile

### Navigation Behavior Rules

1. **Tab Icons Change With State**
   - Empty bookmark → Filled bookmark (after first save)
   - Generic user → Photo avatar (after upload)
   - Plus icon → Camera icon (for creators)

2. **Badge System**
   - Red dot: New activity requiring attention
   - Number: Specific count (max "9+")
   - Green dot: Earnings available (creators)
   - Blue dot: New feature unlocked

3. **Haptic Feedback**
   - Light: Tab switches
   - Medium: Successful save
   - Strong: Unlock achievement

---

## SCREEN-BY-SCREEN SPECIFICATIONS

## 1. DISCOVER SCREEN (Unified Across States)

### Purpose
Primary content discovery surface that shows the SAME screen structure but with progressively richer content as users engage. No jarring navigation changes - just smarter content.

### Core Principle: "Always Discover, Never Empty"
The Discover tab remains consistent but intelligently layers in social signals as they become available. Users don't need to relearn the interface as they grow.

### Unified Layout with Progressive Content

### Unified Discover Screen Design

```
SINGLE SCREEN STRUCTURE - CONTENT ADAPTS
┌─────────────────────────────────────────┐
│  📍 Charlotte, NC          🔔 •          │ ← Always present
├─────────────────────────────────────────┤
│                                          │
│  [Conditional Welcome Section]           │ ← Shows for new users
│                                          │
│  Section 1: SOCIAL LAYER                 │ ← Priority when available
│  ┌──────────────────────────────────┐   │
│  │ IF has friends:                  │   │
│  │   "Friend Activity" section      │   │
│  │ ELSE IF new user:                │   │
│  │   "For You" (AI personalized)    │   │
│  │ ELSE (anonymous):                 │   │
│  │   "Trending Now" (community)     │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Section 2: DISCOVERY CARDS              │ ← Always present
│  ┌──────────────────────────────────┐   │
│  │ [Restaurant Card]                │   │
│  │ Restaurant Name                  │   │
│  │ ⭐ Rating • Type • Distance      │   │
│  │                                  │   │
│  │ [Dynamic Social Proof Line]      │   │ ← Adapts to state
│  │ Anonymous: "147 saved this week" │   │
│  │ New User: "Matches your taste"   │   │
│  │ Active: "Alex saved yesterday"   │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Section 3: CATEGORIES                   │ ← Always visible
│  [Breakfast] [Lunch] [Dinner] [Coffee]   │
│  [Bars] [Dessert] [More...]             │
│                                          │
│  Section 4: SMART RECOMMENDATIONS        │ ← Context-aware
│  Title changes based on state:           │
│  - Anonymous: "Popular Right Now"        │
│  - New User: "Based on Your Preferences" │
│  - Active: "Your Friends Love"          │
│  [Grid of 4-6 restaurants]              │
│                                          │
│  Section 5: ENGAGEMENT PROMPT            │ ← Adaptive CTA
│  ┌──────────────────────────────────┐   │
│  │ Anonymous: "Sign up to save"     │   │
│  │ New User: "Find friends"         │   │
│  │ Active: "Become a creator"       │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### How Content Adapts (Same Structure, Different Data)

#### SOCIAL LAYER RULES:
```javascript
function getSocialSection(userState) {
  if (userState.friendCount > 0) {
    return {
      title: "Friend Activity",
      content: friendActivityFeed,
      priority: 1
    }
  } else if (userState.isLoggedIn) {
    return {
      title: "For You", 
      content: aiPersonalizedContent,
      priority: 1,
      subtitle: "Based on your saved places"
    }
  } else {
    return {
      title: "Trending Now",
      content: communityTrending,
      priority: 1,
      subtitle: "Popular in Charlotte"
    }
  }
}
```

#### SOCIAL PROOF ADAPTATION:
```javascript
function getSocialProof(restaurant, userState) {
  // Priority order of what to show
  if (userState.friends?.savedThis > 0) {
    return `${userState.friends.savedThis} friends saved`
  } else if (userState.matchScore > 0.8) {
    return `${Math.round(userState.matchScore * 100)}% match`
  } else if (restaurant.weeklyS saves > 100) {
    return `${restaurant.weeklySaves} saved this week`
  } else if (restaurant.isNew) {
    return "New this week"
  } else {
    return `${restaurant.rating} rating`
  }
}
```

#### SMART SECTION TITLES:
```javascript
const sectionTitles = {
  recommendations: {
    anonymous: "Popular Right Now 🔥",
    newUser: "Based on Your Preferences 🎯",
    active: "Your Friends Love 👥",
    creator: "Trending Campaigns 💰"
  },
  
  categories: {
    morning: "Breakfast & Coffee ☕",
    lunch: "Quick Lunch Spots 🥗",
    evening: "Dinner & Drinks 🍷",
    latenight: "Open Late 🌙"
  },
  
  engagement: {
    anonymous: "Join to save your favorites",
    newUser: "Connect with friends for better recommendations", 
    active: "You've saved 47 places - become a creator!",
    creator: "3 new campaigns match your style"
  }
}
```

#### State D: Creator User
```
┌─────────────────────────────────────────┐
│  Creator Dashboard    💰 $127 pending    │ ← Earnings visible
├─────────────────────────────────────────┤
│                                          │
│  📊 Your Impact This Week                │
│  ┌──────────────────────────────────┐   │
│  │ 234 saves • 89 visits • $127     │   │ ← Performance
│  └──────────────────────────────────┘   │
│                                          │
│  💼 Available Campaigns                  │
│  ┌──────────────────────────────────┐   │
│  │ 🏷️ $50 | Optimist Hall           │   │
│  │ "Showcase our new menu"          │   │ ← Opportunity
│  │ Perfect match: 89% • [Apply]     │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Regular feed continues below...         │
└─────────────────────────────────────────┘
```

### Interaction Patterns

#### Pull to Refresh
- **Animation:** Troodie logo spins while loading
- **Haptic:** Medium feedback on release
- **Update:** New content slides in from top

#### Card Interactions
- **Tap:** Opens restaurant detail
- **Long Press:** Quick save menu
- **Swipe Right:** Save to default board
- **Swipe Left:** Hide from feed

#### Scroll Behavior
- **Momentum:** iOS-native feel
- **Refresh threshold:** 80px pull
- **Load more:** 3 screens from bottom
- **Return to top:** Double-tap status bar

---

## 2. MAP SCREEN

### Purpose
Visual, location-based discovery with real-time context.

### Core Functionality

```
┌─────────────────────────────────────────┐
│  [Search this area]        [Filters]     │
├─────────────────────────────────────────┤
│                                          │
│         [Interactive Map]                │
│              📍 You                      │
│     🍽️        🍽️      🍽️               │ ← Clustered pins
│         🍽️                               │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ ↑ Swipe up for list               │   │
├──┴──────────────────────────────────┴───┤
│  Nearby (23 places)                      │
│  ┌──────────────────────────────────┐   │
│  │ 1. Snooze • 0.2 mi • Open now    │   │
│  │ 2. Amélie's • 0.3 mi • Busy      │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘

Map Interactions:
- Pinch: Zoom in/out
- Tap pin: Show preview card
- Tap preview: Open details
- Drag map: Update results
```

### Dynamic Pin States

1. **Default:** Gray pin (unvisited)
2. **Saved:** Orange pin (in your boards)
3. **Visited:** Green checkmark
4. **Friend Saved:** Blue pin with count
5. **Trending:** Red flame icon
6. **Campaign Active:** Purple dollar sign (creators)

### Time-Based Adaptations

#### Breakfast (6 AM - 11 AM)
- Prioritize coffee shops, bakeries
- Show "Open now for breakfast"
- Highlight quick options

#### Lunch (11 AM - 2 PM)
- Show wait times
- Highlight fast casual
- "Lunch specials" badge

#### Dinner (5 PM - 10 PM)
- Reservation availability
- "Happy Hour" indicators
- Date night filters

#### Late Night (10 PM - 2 AM)
- "Open late" filter auto-applied
- Bar emphasis
- "Kitchen closes at" warnings

---

## 3. ADD CONTENT SCREEN (Plus Button)

### Purpose
Central creation hub that adapts to user capabilities.

### Modal Design

```
┌─────────────────────────────────────────┐
│  ✕                                       │
├─────────────────────────────────────────┤
│                                          │
│  What would you like to do?              │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 📸 Save a Restaurant              │   │
│  │ Take a photo or add from gallery │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 📝 Write a Review                 │   │
│  │ Share your experience            │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 📋 Create a Board                 │   │
│  │ Organize your favorites          │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 🔗 Share a Link                   │   │
│  │ Save from TikTok or Instagram    │   │ ← New feature
│  └──────────────────────────────────┘   │
│                                          │
│  For Creators:                           │ ← Conditional
│  ┌──────────────────────────────────┐   │
│  │ 💰 Create Campaign Content        │   │
│  │ 3 active campaigns               │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘

Animation:
- Slides up from bottom
- Blurred background
- Spring physics on appear
- Swipe down to dismiss
```

### Quick Save Flow (Primary Path)

#### Step 1: Capture
```
┌─────────────────────────────────────────┐
│  ← Cancel              Save              │
├─────────────────────────────────────────┤
│                                          │
│         [Camera Viewfinder]              │
│                                          │
│    [Gallery] [Photo] [Boomerang]         │ ← Mode selector
└─────────────────────────────────────────┘
```

#### Step 2: Identify
```
┌─────────────────────────────────────────┐
│  ← Back                Next →            │
├─────────────────────────────────────────┤
│         [Photo Preview]                  │
│                                          │
│  📍 Detected Location                    │ ← AI detection
│  ┌──────────────────────────────────┐   │
│  │ Haberdish                        │   │
│  │ 3519 N Davidson St               │   │
│  │ ✓ Correct  or  [Search manually] │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Add a note (optional)                   │
│  ┌──────────────────────────────────┐   │
│  │ Best fried chicken in Charlotte!  │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

#### Step 3: Organize
```
┌─────────────────────────────────────────┐
│  ← Back                Save ✓            │
├─────────────────────────────────────────┤
│                                          │
│  Save to Board                           │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ ◉ Date Nights (12)               │   │ ← Smart suggestion
│  │ ○ Quick Bites (8)                │   │
│  │ ○ Want to Try (23)               │   │
│  │ + Create New Board                │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Share with Friends                      │
│  ┌──────────────────────────────────┐   │
│  │ □ Share to feed                  │   │
│  │ □ Recommend to Jessica           │   │ ← Smart targeting
│  └──────────────────────────────────┘   │
│                                          │
│  For Creators:                           │
│  ┌──────────────────────────────────┐   │
│  │ 💰 Tag for Haberdish campaign    │   │
│  │ Earn $15 for this post           │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘

Success Animation:
- Checkmark burst
- Haptic: Success pattern
- Auto-dismiss after 1.5s
```

---

## 4. BOARDS/SAVES SCREEN

### Purpose
Personal organization system that grows with usage.

### Progressive States

#### State A: First Save (0-5 items)
```
┌─────────────────────────────────────────┐
│  Your Saves                              │
├─────────────────────────────────────────┤
│                                          │
│  🎉 You saved your first place!          │ ← Celebration
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ All Saves (1)                    │   │
│  │ [Restaurant thumbnail]           │   │
│  └──────────────────────────────────┘   │
│                                          │
│  💡 Tip: Create boards to organize       │
│  your favorites by occasion              │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ + Create Your First Board         │   │ ← Clear CTA
│  └──────────────────────────────────┘   │
│                                          │
│  Suggested Boards:                       │
│  • Date Nights                          │
│  • Quick Lunch                          │
│  • Weekend Brunch                       │
└─────────────────────────────────────────┘
```

#### State B: Growing Collection (5-20 items)
```
┌─────────────────────────────────────────┐
│  My Boards                    [Edit]     │
├─────────────────────────────────────────┤
│                                          │
│  ┌────────────┐ ┌────────────┐          │
│  │ Date Night │ │ Want to Try│          │ ← Visual boards
│  │ [4 images] │ │ [4 images] │          │
│  │ 8 places   │ │ 12 places  │          │
│  └────────────┘ └────────────┘          │
│                                          │
│  ┌────────────┐ ┌────────────┐          │
│  │ + New Board│ │            │          │
│  │            │ │            │          │
│  └────────────┘ └────────────┘          │
│                                          │
│  Recent Saves ─────────────────          │
│  [List of last 5 saves with timestamps]  │
└─────────────────────────────────────────┘
```

#### State C: Power User (20+ items)
```
┌─────────────────────────────────────────┐
│  My Collection         [Search] [Filter] │
├─────────────────────────────────────────┤
│  Quick Stats:                            │
│  47 saves • 6 boards • 3 cities         │ ← Achievement
│                                          │
│  [Tab: Boards | Lists | Map | Stats]     │ ← Advanced views
│                                          │
│  Featured Board ──────────────           │ ← Rotation
│  ┌──────────────────────────────────┐   │
│  │ "Fall Favorites" (New!)          │   │
│  │ [Hero image collage]             │   │
│  │ 6 restaurants for cozy season    │   │
│  │ [View] [Share] [Collaborate]     │   │ ← Social features
│  └──────────────────────────────────┘   │
│                                          │
│  All Boards ───────────────              │
│  [Grid of boards with cover images]      │
│                                          │
│  💰 Monetize Your Collection             │ ← Creator upsell
│  You're in the top 10% of savers!       │
│  [Become a Creator]                     │
└─────────────────────────────────────────┘
```

### Board Detail View

```
┌─────────────────────────────────────────┐
│  ← Boards    Date Nights    [Share] [⋯] │
├─────────────────────────────────────────┤
│  [Hero image from restaurants]           │
│  8 restaurants • Updated 2 days ago      │
│                                          │
│  [Map View] [List View] [Route]          │ ← View options
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 1. Barcelona Wine Bar            │   │
│  │    Spanish • $$ • SouthEnd       │   │
│  │    "Perfect ambiance"            │   │ ← Your note
│  │    [Visited ✓] [Share]           │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Board Insights ─────────────            │ ← Intelligence
│  • Most saved: Barcelona (3 friends)     │
│  • New addition: The Asbury              │
│  • Trending up: Haberdish (+45%)        │
└─────────────────────────────────────────┘
```

---

## 5. PROFILE SCREEN

### Purpose
Personal hub that evolves from private stats to public persona.

### Progressive Profile States

#### New User Profile
```
┌─────────────────────────────────────────┐
│                    [Settings]            │
├─────────────────────────────────────────┤
│           [Add Photo]                    │ ← Prompt
│          @username                       │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 🎯 Complete Your Profile          │   │
│  │ ████░░░░░░ 40%                  │   │ ← Progress
│  │ • Add profile photo              │   │
│  │ • Connect Instagram              │   │
│  │ • Find 3 friends                │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Getting Started ─────────────           │
│  □ Save 5 restaurants (1/5)             │ ← Missions
│  □ Create your first board              │
│  □ Write your first review              │
│                                          │
│  [Find Friends]                         │ ← Discovery
└─────────────────────────────────────────┘
```

#### Active User Profile
```
┌─────────────────────────────────────────┐
│                    [Settings] [Share]    │
├─────────────────────────────────────────┤
│         [Profile Photo]                  │
│         Sarah Chen                       │
│         @sarahfoodie                     │
│                                          │
│  47 Saves • 6 Boards • 12 Friends       │ ← Stats
│                                          │
│  [Edit Profile]                         │
│                                          │
│  [Saves] [Reviews] [Activity]           │ ← Tabs
│  ─────────────────────────────          │
│  Recent Activity:                        │
│  • Saved Barcelona Wine Bar             │
│  • Created "Date Nights" board          │
│  • Reviewed Haberdish (4.5★)           │
│                                          │
│  Food Personality ─────────              │ ← Unique feature
│  🌮 "The Adventurous Foodie"            │
│  You love trying new cuisines!          │
│  [Retake Quiz]                          │
│                                          │
│  Achievements ──────────                 │ ← Gamification
│  🏆 Early Adopter                       │
│  🗺️ Charlotte Explorer                  │
│  ⭐ Trusted Reviewer                    │
└─────────────────────────────────────────┘
```

#### Creator Profile
```
┌─────────────────────────────────────────┐
│                    [Settings] [Share]    │
├─────────────────────────────────────────┤
│         [Profile Photo]                  │
│         Jessica Kim ✓                    │ ← Verified
│         @jesseatsclt                     │
│         Food Creator • Charlotte         │
│                                          │
│  234 Saves • 2.3K Followers • $420/mo   │ ← Earnings
│                                          │
│  [Creator Dashboard]                     │ ← Special access
│                                          │
│  [Portfolio] [Reviews] [Campaigns]       │ ← Creator tabs
│  ─────────────────────────────          │
│  Featured Work:                          │
│  ┌──────────────────────────────────┐   │
│  │ [Video thumbnail]                │   │
│  │ "Best Brunch Spots in NoDa"      │   │
│  │ 1.2K saves • $75 earned         │   │ ← Performance
│  └──────────────────────────────────┘   │
│                                          │
│  Active Campaigns (3)                    │
│  • Optimist Hall - $50                  │
│  • Vana - $35                           │
│  • Barcelona - $40                      │
│                                          │
│  [View Media Kit] [Availability]        │ ← Professional
└─────────────────────────────────────────┘
```

---

## 6. RESTAURANT DETAIL SCREEN

### Purpose
Conversion-optimized detail page that drives saves and visits.

### Core Layout

```
┌─────────────────────────────────────────┐
│  ← Back                      [Share]     │
├─────────────────────────────────────────┤
│  [Hero Image Gallery - Swipeable]        │ ← Immersive
│  ● ● ○ ○ ○                              │
│                                          │
│  Barcelona Wine Bar                      │
│  Spanish Tapas • $$ • SouthEnd          │
│  ⭐ 4.7 (234 reviews) • 📍 0.8 mi       │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ [Save] [Directions] [Call] [Menu]│   │ ← Primary CTAs
│  └──────────────────────────────────┘   │
│                                          │
│  Right Now ─────────────                 │ ← Real-time
│  🟢 Open until 11 PM                    │
│  ⏱️ 30 min wait (usually 45 min)        │
│  🔥 23 people viewing                    │
│                                          │
│  [Info] [Reviews] [Similar]             │ ← Tabs
│  ─────────────────────────────          │
│                                          │
│  About ──────────                       │
│  Authentic Spanish tapas with an        │
│  extensive wine selection...            │
│                                          │
│  Popular Dishes ─────                    │ ← AI-extracted
│  • Patatas Bravas (87 mentions)         │
│  • Bacon-Wrapped Dates (76)             │
│  • Mushroom Coca (62)                   │
│                                          │
│  What People Say ────                    │ ← Sentiment
│  "Perfect for dates" - 34 reviews       │
│  "Great wine selection" - 28            │
│  "Can get loud" - 12                    │
└─────────────────────────────────────────┘
```

### Social Proof Layers

#### With Friends
```
Friend Activity ─────────────
┌──────────────────────────────────┐
│ [Avatar] Alex saved this         │
│ "Best Spanish food in Charlotte" │
│ 2 days ago                      │
└──────────────────────────────────┘

3 friends have been here
[Show all]
```

#### With Creators
```
Creator Reviews ─────────────
┌──────────────────────────────────┐
│ [Avatar] Jessica Kim ✓           │
│ ⭐⭐⭐⭐⭐ "Absolute must-try"      │
│ [Video thumbnail]                │
│ 234 found helpful                │
└──────────────────────────────────┘
```

### Save Flow Integration

```
After tapping [Save]:

┌─────────────────────────────────────────┐
│         Quick Save Options               │ ← Modal
├─────────────────────────────────────────┤
│  Save to:                                │
│  ◉ Want to Try (Suggested)              │ ← AI suggestion
│  ○ Date Nights                          │
│  ○ Create New Board                     │
│                                          │
│  Add a note:                            │
│  [Alex recommended the paella]          │
│                                          │
│  [Cancel]            [Save]              │
└─────────────────────────────────────────┘

Success state:
- Checkmark animation
- "Saved to Want to Try"
- Haptic feedback
```

---

## 7. ONBOARDING FLOW

### Purpose
Get users to first value moment in under 60 seconds.

### Screen Flow

#### Screen 1: Welcome (Immediate Value)
```
┌─────────────────────────────────────────┐
│                                          │
│           [App Icon]                     │
│                                          │
│         Welcome to Troodie               │
│                                          │
│    Discover restaurants through          │
│        people you trust                  │
│                                          │
│  [Video: Friend saves → You discover]    │ ← Show value
│                                          │
│                                          │
│  [Get Started]                          │
│  [I have an account]                    │
│                                          │
│  ──────────────────────────             │
│  Continue as Guest                       │ ← Low friction
└─────────────────────────────────────────┘
```

#### Screen 2: Personalization (10 seconds)
```
┌─────────────────────────────────────────┐
│  What brings you here?                   │ ← Intent
├─────────────────────────────────────────┤
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 🗺️ Exploring a new city          │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │ 🍽️ Finding new restaurants       │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │ 📱 Organizing my favorites        │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │ 💰 Monetizing food content        │   │ ← Creator path
│  └──────────────────────────────────┘   │
│                                          │
│  [Skip]                                  │
└─────────────────────────────────────────┘
```

#### Screen 3: Location (Context)
```
┌─────────────────────────────────────────┐
│  Where are you?                          │
├─────────────────────────────────────────┤
│                                          │
│  📍 Enable location to see what's        │
│     nearby right now                     │
│                                          │
│  [Enable Location]                       │
│                                          │
│  Or select manually:                     │
│  [Charlotte ▼]                          │
│                                          │
└─────────────────────────────────────────┘
```

#### Screen 4: First Save Challenge
```
┌─────────────────────────────────────────┐
│  Let's build your first collection!      │
├─────────────────────────────────────────┤
│                                          │
│  Save 3 restaurants you love:            │
│                                          │
│  Based on your location:                 │
│  ┌──────────────────────────────────┐   │
│  │ [Restaurant Card]                │   │
│  │ Snooze                           │   │
│  │ [Save] [Skip]                    │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │ [Restaurant Card]                │   │
│  │ Amélie's                         │   │
│  │ [Save] [Skip]                    │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ○ ○ ○  0/3 saved                       │ ← Progress
│                                          │
│  [I'll do this later]                   │
└─────────────────────────────────────────┘
```

#### Success State
```
┌─────────────────────────────────────────┐
│                                          │
│            🎉                            │
│                                          │
│     Great taste! You're all set.         │
│                                          │
│   Your personalized feed is ready        │
│                                          │
│         [Explore Troodie]                │
│                                          │
└─────────────────────────────────────────┘

Animation: Confetti burst
Haptic: Success pattern
Auto-advance: After 2 seconds
```

---

## 8. RESTAURANT CLAIMING FLOW

### Purpose
Enable restaurant owners to claim, verify, and manage their business presence on Troodie with minimal friction while preventing fraud.

### Entry Points
1. **Restaurant Detail Screen:** "Own this restaurant?" link
2. **Profile Menu:** "For Business Owners" option
3. **Web Landing Page:** Direct marketing campaigns
4. **Creator Referral:** Personalized invite from creator

### Complete Claiming Flow

#### Step 1: Initiate Claim
```
┌─────────────────────────────────────────┐
│  ← Back                                  │
├─────────────────────────────────────────┤
│                                          │
│     Claim Your Restaurant                │
│                                          │
│  Take control of your Troodie presence   │
│  and connect with customers              │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ Barcelona Wine Bar                │   │
│  │ 2900 Selwyn Ave, Charlotte       │   │
│  │ ⭐ 4.7 • 234 saves               │   │
│  └──────────────────────────────────┘   │
│                                          │
│  What you'll get:                        │
│  ✓ Respond to reviews                   │
│  ✓ Run creator campaigns                │
│  ✓ See who visits from Troodie          │
│  ✓ Update photos and info               │
│                                          │
│  [Start Claim Process]                   │
│  Already claimed? [Sign In]              │
└─────────────────────────────────────────┘
```

#### Step 2: Verification Method
```
┌─────────────────────────────────────────┐
│  ← Back              Step 1 of 4         │
├─────────────────────────────────────────┤
│                                          │
│     Verify You Own This Business         │
│                                          │
│  Choose verification method:             │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 📧 Business Email                 │   │ ← Fastest
│  │ Receive code at your domain      │   │
│  │ email (e.g., @barcelonawine.com) │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 📱 Phone Verification            │   │
│  │ We'll call your business number  │   │
│  │ Listed: (704) 555-0123           │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 📄 Document Upload               │   │ ← Manual review
│  │ Upload business license or       │   │
│  │ utility bill (1-2 days)          │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 💳 Stripe Connect                │   │ ← If they have it
│  │ Instant verification via Stripe  │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

#### Step 3: Business Information
```
┌─────────────────────────────────────────┐
│  ← Back              Step 2 of 4         │
├─────────────────────────────────────────┤
│                                          │
│     Confirm Business Details             │
│                                          │
│  Business Name                           │
│  [Barcelona Wine Bar        ]            │
│                                          │
│  Your Role                               │
│  [Owner ▼]                               │
│  • Owner                                 │
│  • Manager                               │
│  • Marketing Director                    │
│                                          │
│  Business Type                           │
│  [Restaurant ▼]                          │
│                                          │
│  Operating Hours                         │
│  ┌────────────────────────────────┐     │
│  │ Mon-Thu: 11:30 AM - 10:00 PM   │     │
│  │ Fri-Sat: 11:30 AM - 11:00 PM   │     │
│  │ Sunday:  11:30 AM - 9:00 PM    │     │
│  │ [Edit Hours]                   │     │
│  └────────────────────────────────┘     │
│                                          │
│  Contact for Campaigns                   │
│  [marketing@barcelonawine.com    ]       │
│  [704-555-0123                  ]       │
│                                          │
│  [Continue]                              │
└─────────────────────────────────────────┐
```

#### Step 4: Onboarding & First Campaign
```
┌─────────────────────────────────────────┐
│  ← Back              Step 3 of 4         │
├─────────────────────────────────────────┤
│                                          │
│  🎉 Welcome to Troodie for Business!     │
│                                          │
│  Your restaurant is now verified         │
│                                          │
│  Quick Start Options:                    │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 🚀 Launch Your First Campaign    │   │
│  │ Get $100 in free credits         │   │ ← Incentive
│  │ Reach 5,000+ local foodies       │   │
│  │ [Start Campaign] (Recommended)   │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 📸 Update Photos & Menu          │   │
│  │ Refresh your restaurant's look   │   │
│  │ [Update Content]                 │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 📊 View Your Dashboard           │   │
│  │ See who's saving your restaurant │   │
│  │ [Go to Dashboard]                │   │
│  └──────────────────────────────────┘   │
│                                          │
│  [Skip for now]                          │
└─────────────────────────────────────────┘
```

#### Step 5: Business Dashboard (Post-Claim)
```
┌─────────────────────────────────────────┐
│  Barcelona Wine Bar        [Settings]    │
├─────────────────────────────────────────┤
│                                          │
│  This Week's Performance                 │
│  ┌──────────────────────────────────┐   │
│  │ 👁️ 1,247 views  ↑ 23%            │   │
│  │ 💾 89 saves     ↑ 12%            │   │
│  │ 🚶 34 visits    ↑ 8%             │   │
│  │ 💰 $2,380 attributed revenue     │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Active Campaigns (1)                    │
│  ┌──────────────────────────────────┐   │
│  │ "Summer Tapas Special"           │   │
│  │ 3 creators • $150 budget         │   │
│  │ 12 days remaining                │   │
│  │ [View Details] [Pause]           │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Quick Actions                           │
│  [Create Campaign] [Invite Creators]     │
│  [Update Info] [View Analytics]          │
│                                          │
│  Recent Activity                         │
│  • Sarah K. saved to "Date Nights"       │
│  • Mike R. visited after seeing post     │
│  • New review from Jessica (4.5★)        │
│                                          │
│  [View Full Dashboard →]                 │
└─────────────────────────────────────────┘
```

### Fraud Prevention Measures
1. **Domain email verification** for instant approval
2. **Phone verification** matches public listings
3. **Manual review** for document uploads
4. **Existing claims** prevent duplicates
5. **Flag system** for disputed claims

---

## 9. USER TO CREATOR TRANSFORMATION

### Purpose
Convert engaged users with quality content into monetized creators through a frictionless, encouraging onboarding that feels like unlocking an achievement rather than applying for a job.

### Trigger Points for Creator Prompts

```javascript
const creatorEligibility = {
  automatic_prompts: [
    { saves: 20, message: "Your collection could earn money!" },
    { boards: 3, message: "You're a natural curator!" },
    { friends: 10, message: "Your network trusts your taste!" },
    { reviews: 5, message: "Your reviews drive visits!" }
  ],
  
  qualification_requirements: {
    minimum_saves: 10,
    minimum_friends: 5,
    profile_photo: true,
    account_age_days: 7
  }
}
```

### Creator Onboarding Flow

#### Discovery: Organic Prompt
```
┌─────────────────────────────────────────┐
│  Discover Feed                           │
├─────────────────────────────────────────┤
│                                          │
│  ... regular feed content ...            │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 💰 You're in the top 10% of users │   │ ← Contextual
│  │                                  │   │
│  │ Your 47 saves have been viewed   │   │
│  │ 1,234 times this month!          │   │
│  │                                  │   │
│  │ Turn your taste into income      │   │
│  │                                  │   │
│  │ [Learn More] [Dismiss]           │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ... feed continues ...                  │
└─────────────────────────────────────────┘
```

#### Step 1: Value Proposition
```
┌─────────────────────────────────────────┐
│  ← Back                                  │
├─────────────────────────────────────────┤
│                                          │
│     Become a Troodie Creator             │
│                                          │
│  [Animated illustration of user → $$$]   │
│                                          │
│  Your saves are already helping others   │
│  discover great restaurants. Now get     │
│  paid for your recommendations!          │
│                                          │
│  How it works:                           │
│                                          │
│  1️⃣ Share what you already save         │
│  2️⃣ Restaurants pay for your exposure    │
│  3️⃣ Earn $25-100 per campaign           │
│  4️⃣ Get paid instantly via Stripe        │
│                                          │
│  Success Stories:                        │
│  ┌──────────────────────────────────┐   │
│  │ "I earn $400/month sharing places│   │
│  │ I already love!" - Sarah, CLT    │   │
│  └──────────────────────────────────┘   │
│                                          │
│  [Get Started] (2 min setup)             │
│  [See Example Creators]                  │
└─────────────────────────────────────────┘
```

#### Step 2: Quick Qualification
```
┌─────────────────────────────────────────┐
│  ← Back              Step 1 of 3         │
├─────────────────────────────────────────┤
│                                          │
│     Let's Check Your Creator Status      │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ ✅ 47 restaurant saves            │   │ ← Already met
│  │ ✅ 6 boards created               │   │
│  │ ✅ Profile photo uploaded         │   │
│  │ ✅ 12 friends connected           │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Wow! You're already qualified! 🎉       │
│                                          │
│  Choose your creator focus:              │
│  (Select all that apply)                 │
│                                          │
│  ☑️ Local Favorites                      │
│  ☐ Date Night Spots                     │
│  ☑️ Hidden Gems                          │
│  ☐ Family Friendly                      │
│  ☐ Vegan/Vegetarian                     │
│  ☐ Fine Dining                          │
│  ☑️ Casual Eats                          │
│                                          │
│  [Continue]                              │
└─────────────────────────────────────────┘
```

#### Step 3: Content Showcase
```
┌─────────────────────────────────────────┐
│  ← Back              Step 2 of 3         │
├─────────────────────────────────────────┤
│                                          │
│     Showcase Your Best Content           │
│                                          │
│  Select 3-5 of your best saves to        │
│  feature in your creator portfolio:      │
│                                          │
│  Your Recent Saves:                      │
│  ┌──────────────────────────────────┐   │
│  │ ☑️ Haberdish                      │   │
│  │   "Best fried chicken in CLT!"   │   │
│  │   Saved 2 days ago                │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │ ☑️ Barcelona Wine Bar            │   │
│  │   "Perfect date night spot"      │   │
│  │   Saved last week                │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │ ☐ Amelie's French Bakery        │   │
│  │   "Amazing pastries"             │   │
│  │   Saved last month               │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Add a creator bio (optional):           │
│  ┌──────────────────────────────────┐   │
│  │ Charlotte foodie who loves        │   │
│  │ finding hidden gems...           │   │
│  └──────────────────────────────────┘   │
│                                          │
│  [Continue]                              │
└─────────────────────────────────────────┘
```

#### Step 4: Payment Setup
```
┌─────────────────────────────────────────┐
│  ← Back              Step 3 of 3         │
├─────────────────────────────────────────┤
│                                          │
│     Set Up Instant Payments              │
│                                          │
│  Get paid immediately when campaigns     │
│  complete. No chasing payments!          │
│                                          │
│  Payment Method:                         │
│  ┌──────────────────────────────────┐   │
│  │ 💳 Connect with Stripe            │   │ ← Recommended
│  │ • Instant payouts                │   │
│  │ • Direct to your bank            │   │
│  │ • Secure & trusted               │   │
│  │ [Connect Stripe]                 │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 🏦 Direct Deposit                │   │
│  │ • Weekly payments                │   │
│  │ • $10 minimum payout             │   │
│  │ [Add Bank Details]               │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Your Rate (you can change this later):  │
│  Starting rate: $25-50 per campaign      │
│  [Accept Suggested Rate]                 │
│                                          │
│  Terms:                                  │
│  ☑️ I agree to create authentic content  │
│  ☑️ I'll disclose sponsored posts        │
│                                          │
│  [Become a Creator]                      │
└─────────────────────────────────────────┘
```

#### Success State: Welcome to Creator Mode
```
┌─────────────────────────────────────────┐
│                                          │
│            🎉 You're Now a               │
│            Troodie Creator!              │
│                                          │
│  [Confetti animation]                    │
│                                          │
│  Your first opportunities:               │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ 💰 3 campaigns match your style  │   │
│  │ Total potential: $125            │   │
│  │ [View Campaigns]                 │   │
│  └──────────────────────────────────┘   │
│                                          │
│  What's new:                             │
│  • "Studio" tab in your navigation       │
│  • Creator badge on your profile ✓       │
│  • Priority in search results            │
│  • Weekly earning opportunities          │
│                                          │
│  [Go to Creator Studio]                  │
│  [Browse Campaigns]                      │
│  [Complete Profile]                      │
└─────────────────────────────────────────┘
```

### Creator Studio (New Tab)
```
┌─────────────────────────────────────────┐
│  Creator Studio         💰 $47 pending   │
├─────────────────────────────────────────┤
│                                          │
│  [Opportunities] [Active] [Completed]    │
│                                          │
│  New Opportunities (3)                   │
│  ┌──────────────────────────────────┐   │
│  │ Optimist Hall Food Hall          │   │
│  │ 💰 $50 • 📍 0.8 mi               │   │
│  │ "Share your favorite stall"      │   │
│  │ Match: 92% • Ends in 3 days      │   │
│  │ [View Details] [Quick Apply]     │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Your Stats This Month                   │
│  • 12 campaigns completed                │
│  • $420 earned                          │
│  • 1,247 people reached                 │
│  • 89 restaurant visits attributed       │
│                                          │
│  Level Up:                               │
│  ┌──────────────────────────────────┐   │
│  │ 🏆 3 more campaigns to Gold      │   │
│  │ Gold creators earn 20% more      │   │
│  │ ████████░░ 70% complete          │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## 10. COMPLETE SCREEN INVENTORY & NAVIGATION FLOWS

### Screen Hierarchy Map

```
APP STRUCTURE - ALL SCREENS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROOT
├── Onboarding Flow (First Launch)
│   ├── /onboarding/welcome
│   ├── /onboarding/intent (What brings you here?)
│   ├── /onboarding/location
│   ├── /onboarding/preferences
│   ├── /onboarding/first-saves
│   └── /onboarding/complete
│
├── Auth Screens
│   ├── /auth/login
│   ├── /auth/signup
│   ├── /auth/forgot-password
│   └── /auth/verify-email
│
├── Main Tab Navigation
│   ├── /discover (Tab 1)
│   │   ├── /discover/category/[category]
│   │   └── /discover/trending
│   │
│   ├── /map (Tab 2)
│   │   ├── /map/filters
│   │   └── /map/search
│   │
│   ├── /add (Tab 3 - Modal)
│   │   ├── /add/save-restaurant
│   │   │   ├── /add/save/camera
│   │   │   ├── /add/save/identify
│   │   │   └── /add/save/organize
│   │   ├── /add/create-review
│   │   ├── /add/create-board
│   │   └── /add/share-link
│   │
│   ├── /saves (Tab 4)
│   │   ├── /saves/boards/[id]
│   │   ├── /saves/recent
│   │   ├── /saves/shared
│   │   └── /saves/map-view
│   │
│   └── /profile (Tab 5)
│       ├── /profile/edit
│       ├── /profile/settings
│       │   ├── /settings/notifications
│       │   ├── /settings/privacy
│       │   ├── /settings/account
│       │   └── /settings/payments
│       ├── /profile/achievements
│       └── /profile/food-personality
│
├── Restaurant Screens
│   ├── /restaurant/[id]
│   │   ├── /restaurant/[id]/photos
│   │   ├── /restaurant/[id]/reviews
│   │   ├── /restaurant/[id]/menu
│   │   └── /restaurant/[id]/similar
│   ├── /restaurant/claim/[id]
│   └── /restaurant/dashboard/[id] (Owners only)
│
├── Social Screens
│   ├── /user/[id] (Other user profiles)
│   │   ├── /user/[id]/boards
│   │   └── /user/[id]/reviews
│   ├── /friends
│   │   ├── /friends/find
│   │   ├── /friends/invite
│   │   └── /friends/pending
│   └── /activity
│       └── /activity/notifications
│
├── Creator Screens
│   ├── /creator/onboarding
│   │   ├── /creator/onboarding/qualify
│   │   ├── /creator/onboarding/portfolio
│   │   └── /creator/onboarding/payments
│   ├── /creator/studio (Replaces Saves for creators)
│   │   ├── /studio/opportunities
│   │   ├── /studio/campaigns/[id]
│   │   ├── /studio/earnings
│   │   └── /studio/analytics
│   └── /creator/profile/edit
│
├── Search & Discovery
│   ├── /search
│   │   ├── /search/restaurants
│   │   ├── /search/users  
│   │   └── /search/boards
│   └── /explore/category/[category]
│
├── Business Portal (Restaurant Owners)
│   ├── /business/dashboard
│   ├── /business/campaigns
│   │   ├── /campaigns/create
│   │   ├── /campaigns/[id]/edit
│   │   └── /campaigns/[id]/creators
│   ├── /business/analytics
│   └── /business/settings
│
└── Utility Screens
    ├── /error/404
    ├── /error/500
    ├── /maintenance
    └── /terms-privacy
```

### User Journey Flows

#### Flow 1: New User First Save
```
App Launch → Welcome → Intent Selection → Location Permission → 
Browse (Discover) → Restaurant Detail → Tap Save → 
Sign Up Prompt → Quick Signup → Return to Save → 
Select Board → Success → Browse More
```

#### Flow 2: Active User Daily Check
```
App Open → Discover (Friend Activity) → See Friend Save → 
Tap Restaurant → View Details → Save to Board → 
Add Note → Back to Discover → Check Notifications → 
View Profile Stats
```

#### Flow 3: Creator Campaign Completion
```
Notification → Open Studio → View Campaign → 
Accept Terms → Visit Restaurant → Take Photos → 
Write Review → Tag Campaign → Submit → 
Instant Payment → Share Achievement
```

#### Flow 4: Restaurant Owner Setup
```
Restaurant Detail → "Own This?" → Verification Flow → 
Business Details → First Campaign Setup → 
Dashboard Access → View Analytics → 
Invite Creators → Monitor Performance
```

#### Flow 5: Social Discovery
```
Discover → Friend Activity → Friend Profile → 
View Their Boards → Browse Board → Save Restaurant → 
Follow Friend → Get Recommendations → 
Engage with Content
```

### Screen State Matrix

| Screen | Anonymous | New User | Active | Creator | Owner |
|--------|-----------|----------|--------|---------|-------|
| Discover | ✅ Trending | ✅ For You | ✅ Friends | ✅ +Campaigns | ❌ |
| Map | ✅ Full | ✅ Full | ✅ +Friends | ✅ Full | ❌ |
| Add | ⚠️ Sign up | ✅ Save | ✅ Full | ✅ +Campaign | ❌ |
| Saves | ⚠️ Sign up | ✅ Limited | ✅ Full | → Studio | ❌ |
| Profile | → Auth | ✅ Building | ✅ Complete | ✅ +Badge | ❌ |
| Restaurant | ✅ View | ✅ +Save | ✅ +Social | ✅ +Create | ✅ +Manage |
| Studio | ❌ | ❌ | ❌ | ✅ Full | ❌ |
| Business | ❌ | ❌ | ❌ | ❌ | ✅ Full |

Legend:
- ✅ Full access
- ⚠️ Limited/Prompted
- → Redirects
- ❌ No access

### Deep Linking Structure

```javascript
const deepLinks = {
  // Public links (work for all users)
  'troodie://restaurant/[id]': 'Open restaurant detail',
  'troodie://user/[username]': 'Open user profile',
  'troodie://board/[id]': 'Open public board',
  'troodie://map?lat=35.2271&lng=-80.8431': 'Open map at location',
  
  // Auth required
  'troodie://save/[restaurant_id]': 'Quick save (auth required)',
  'troodie://create/review/[restaurant_id]': 'Write review',
  'troodie://friends/add/[user_id]': 'Add friend',
  
  // Creator specific
  'troodie://studio/campaign/[id]': 'Open campaign',
  'troodie://creator/apply': 'Become creator',
  
  // Business specific  
  'troodie://business/claim/[restaurant_id]': 'Claim restaurant',
  'troodie://business/dashboard': 'Business dashboard'
}
```

### Navigation Transition Rules

```javascript
const navigationRules = {
  // Modal presentations
  modals: [
    '/add/*',           // All add flows
    '/auth/*',          // Auth screens
    '/restaurant/*/photos', // Photo gallery
    '/profile/edit',    // Edit profile
  ],
  
  // Push navigation
  push: [
    '/restaurant/*',    // Restaurant details
    '/user/*',          // User profiles
    '/saves/boards/*',  // Board details
  ],
  
  // Replace navigation (no back)
  replace: [
    '/onboarding/complete' → '/discover',
    '/auth/signup' → '/discover',
    '/creator/onboarding/complete' → '/studio',
  ],
  
  // Tab switches
  tabSwitch: [
    'Any deep screen' → 'Tab root clears stack',
    'Double tap tab' → 'Scroll to top',
    'Tab badge' → 'Clear on view',
  ]
}
```

---

## VISUAL DESIGN SYSTEM

### Color Palette

```scss
// Primary - Troodie Gold
$troodie-gold: #FFAD27;         // Main brand color, CTAs, saves
$troodie-gold-dark: #E89A1F;    // Pressed state (15% darker)
$troodie-gold-light: #FFF4E0;   // Light backgrounds (10% opacity)
$troodie-gold-faint: #FFFAF2;   // Very light tint (5% opacity)

// Semantic
$success-green: #4CAF50;        // Verified, online, success
$warning-amber: #FF9800;        // Caution, busy states
$error-red: #F44336;            // Errors, required fields
$info-blue: #2196F3;            // Tips, links, information

// Neutrals
$black: #1A1A1A;                // Primary text
$gray-900: #424242;             // Secondary text
$gray-600: #757575;             // Disabled text, captions
$gray-300: #E0E0E0;             // Borders, dividers
$gray-100: #F5F5F5;             // Section backgrounds
$white: #FFFFFF;                // Cards, base surfaces

// Special
$creator-purple: #7C4DFF;       // Creator features, badges
$business-teal: #00BCD4;        // Restaurant owner features
$gradient-start: #FFAD27;       // Troodie Gold gradient start
$gradient-end: #FFC947;         // Lighter gold gradient end
```

### Typography Scale

```scss
// Font Family
$font-primary: 'SF Pro Display', -apple-system, system-ui;
$font-mono: 'SF Mono', 'Courier New', monospace;

// Sizes (iOS Dynamic Type compatible)
$text-xxl: 34px;  // Screen titles
$text-xl: 28px;   // Section headers  
$text-lg: 22px;   // Card titles
$text-md: 17px;   // Body text (base)
$text-sm: 15px;   // Secondary text
$text-xs: 13px;   // Captions
$text-xxs: 11px;  // Labels

// Weights
$weight-regular: 400;
$weight-medium: 500;
$weight-semibold: 600;
$weight-bold: 700;

// Line Heights
$line-tight: 1.2;
$line-normal: 1.5;
$line-relaxed: 1.75;
```

### Spacing System

```scss
// 4pt Grid System
$space-xxs: 4px;   // Minimum space
$space-xs: 8px;    // Tight grouping
$space-sm: 12px;   // Related items
$space-md: 16px;   // Standard gap
$space-lg: 24px;   // Section spacing
$space-xl: 32px;   // Major sections
$space-xxl: 48px;  // Screen padding
$space-xxxl: 64px; // Hero sections
```

### Component Styling

#### Cards
```scss
.restaurant-card {
  background: $white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  
  &:active {
    transform: scale(0.98);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  }
}
```

#### Buttons
```scss
.button-primary {
  background: $troodie-gold;
  color: $white;
  border-radius: 24px;
  padding: 12px 24px;
  font-weight: $weight-semibold;
  box-shadow: 0 2px 8px rgba(255, 173, 39, 0.25);
  
  &:active {
    background: $troodie-gold-dark;
    transform: scale(0.96);
    box-shadow: 0 1px 4px rgba(255, 173, 39, 0.15);
  }
  
  &:disabled {
    background: $gray-300;
    color: $gray-600;
    box-shadow: none;
  }
}

.button-secondary {
  background: transparent;
  color: $troodie-gold;
  border: 2px solid $troodie-gold;
  border-radius: 24px;
  
  &:active {
    background: $troodie-gold-faint;
  }
}

.button-text {
  background: transparent;
  color: $troodie-gold;
  padding: 8px;
  
  &:active {
    opacity: 0.7;
  }
}
```

### Animation Patterns

```javascript
// Micro-interactions
const animations = {
  // Save button
  save: {
    duration: 400,
    sequence: [
      { scale: 1.2, duration: 100 },
      { rotate: 360, scale: 1, duration: 300 }
    ],
    haptic: 'impactMedium'
  },
  
  // Tab switch
  tabSwitch: {
    duration: 200,
    easing: 'easeInOut',
    haptic: 'impactLight'
  },
  
  // Pull to refresh
  refresh: {
    threshold: 80,
    duration: 600,
    springDamping: 0.6,
    haptic: 'impactMedium'
  },
  
  // Card press
  cardPress: {
    scale: 0.98,
    duration: 100,
    haptic: 'selection'
  },
  
  // Success state
  success: {
    duration: 800,
    particles: true,
    haptic: 'notificationSuccess'
  }
};
```

### Responsive Breakpoints

```scss
// Device Sizes
$device-se: 375px;      // iPhone SE
$device-standard: 390px; // iPhone 14
$device-plus: 428px;     // iPhone 14 Pro Max
$device-ipad: 768px;     // iPad Mini
$device-ipad-pro: 1024px; // iPad Pro

// Safe Areas
$safe-area-top: env(safe-area-inset-top);
$safe-area-bottom: env(safe-area-inset-bottom);
$tab-bar-height: 49px + $safe-area-bottom;
$nav-bar-height: 44px + $safe-area-top;
```

---

## EMPTY STATES & PROGRESSIVE ENHANCEMENT

### Philosophy
Never show a blank screen. Always provide value, context, and next steps.

### Empty State Templates

#### No Friends Yet
```
Illustration: Two people high-fiving
Title: "Food is better with friends"
Message: "Connect with friends to see their favorite spots"
CTA: [Find Friends]
Alternative: "Or explore popular places nearby"
```

#### No Saves Yet
```
Illustration: Bookmark with sparkles
Title: "Build your personal collection"
Message: "Save restaurants to never forget that amazing meal"
CTA: [Explore Restaurants]
Quick Start: Show 3 trending restaurants with save buttons
```

#### No Restaurants in Area
```
Illustration: Map with question mark
Title: "Exploring new territory!"
Message: "Be the first to add restaurants in this area"
CTA: [Add a Restaurant]
Alternative: "Expand search radius"
```

#### No Search Results
```
Illustration: Magnifying glass
Title: "No matches found"
Message: "Try adjusting your filters or search terms"
Suggestions: 
- Remove filters (3 active)
- Search nearby areas
- Browse all restaurants
```

### Progressive Feature Unlocks

```javascript
const featureGates = {
  // After 1 save
  boards: {
    trigger: saves >= 1,
    message: "Create boards to organize your saves",
    icon: "✨"
  },
  
  // After 5 saves
  friendSuggestions: {
    trigger: saves >= 5,
    message: "See what friends are saving",
    icon: "👥"
  },
  
  // After 10 saves
  insights: {
    trigger: saves >= 10,
    message: "View your taste profile",
    icon: "📊"
  },
  
  // After 20 saves
  creator: {
    trigger: saves >= 20,
    message: "You could be earning as a creator!",
    icon: "💰"
  }
};
```

---

## ACCESSIBILITY REQUIREMENTS

### Core Standards
- WCAG 2.1 AA compliance
- VoiceOver/TalkBack support
- Dynamic Type support
- Reduced Motion support
- High Contrast support

### Implementation

```swift
// Accessibility Labels
saveButton.accessibilityLabel = "Save restaurant"
saveButton.accessibilityHint = "Double tap to save to your collection"

// Dynamic Type
Text("Restaurant Name")
  .font(.system(.title2))
  .dynamicTypeSize(...DynamicTypeSize.xxxLarge)

// Reduced Motion
if (!UIAccessibility.isReduceMotionEnabled) {
  // Apply animations
}

// Color Contrast
// All text must meet 4.5:1 ratio
// Large text (18pt+) must meet 3:1 ratio
```

---

## PERFORMANCE GUIDELINES

### Target Metrics
- App launch: < 2 seconds
- Screen transition: < 200ms
- Image load: < 500ms
- API response: < 1 second
- Scroll: 60 fps minimum

### Optimization Strategies

```javascript
// Image Loading
- Use progressive JPEG
- Implement lazy loading
- Cache aggressively
- Provide placeholders

// Data Fetching
- Prefetch next screen data
- Cache API responses
- Implement optimistic updates
- Use pagination (20 items)

// Animations
- Use native drivers
- Avoid layout animations during scroll
- Batch updates
- Use InteractionManager
```

---

## PLATFORM-SPECIFIC CONSIDERATIONS

### iOS
- Follow Human Interface Guidelines
- Use SF Symbols for icons
- Implement haptic feedback
- Support iOS 15+ features
- Handle Dynamic Island

### Android
- Follow Material Design 3
- Use Material You theming
- Implement edge-to-edge
- Support gesture navigation
- Handle various screen sizes

---

## HANDOFF SPECIFICATIONS

### For Developers

Each screen should include:
1. **Component hierarchy**
2. **State management requirements**
3. **API endpoints needed**
4. **Animation specifications**
5. **Error states**
6. **Loading states**
7. **Accessibility requirements**

### For QA

Test cases for each screen:
1. **Happy path flow**
2. **Error scenarios**
3. **Empty states**
4. **Offline behavior**
5. **Performance benchmarks**
6. **Accessibility audit**
7. **Cross-device testing**

---

## MEASURING SUCCESS

### Screen-Level Metrics

```javascript
const screenMetrics = {
  discover: {
    timeToFirstInteraction: '< 3 seconds',
    scrollDepth: '> 3 screens',
    saveRate: '> 15%',
    bounceRate: '< 30%'
  },
  
  restaurantDetail: {
    saveConversion: '> 40%',
    directionsClick: '> 20%',
    photoViews: '> 60%',
    timeOnPage: '45-90 seconds'
  },
  
  onboarding: {
    completion: '> 75%',
    timeToComplete: '< 60 seconds',
    firstSave: '< 3 minutes',
    skipRate: '< 20%'
  }
};
```

---

This comprehensive UX specification ensures that:
1. **Designers know exactly what to build** - Every screen, state, and interaction is defined
2. **The app never feels empty** - Progressive disclosure and smart empty states
3. **Users see value immediately** - Content-first approach with social amplification
4. **Features unlock naturally** - Based on behavior, not time
5. **Every pixel has purpose** - Focused on driving saves, visits, and engagement

The design adapts to user growth, revealing complexity as users demonstrate engagement, ensuring both new users and power users have an optimal experience.