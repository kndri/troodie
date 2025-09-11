# Troodie Creator Marketplace - Comprehensive UI/UX Design Document

## Table of Contents
1. [Navigation Architecture](#navigation-architecture)
2. [User Type Transformations](#user-type-transformations)
3. [Restaurant Claiming & Admin Experience](#restaurant-claiming--admin-experience)
4. [Creator Journey Deep Dive](#creator-journey-deep-dive)
5. [Contextual Navigation Changes](#contextual-navigation-changes)
6. [Micro-Interactions & Transitions](#micro-interactions--transitions)
7. [Edge Cases & Error Handling](#edge-cases--error-handling)
8. [Communication & Notifications](#communication--notifications)

---

## 1. NAVIGATION ARCHITECTURE

### 1.1 Core Navigation Hierarchy

```
APP STRUCTURE BY USER TYPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REGULAR USER (Default State)
├── Bottom Navigation (5 tabs)
│   ├── 🏠 Discover (Home)
│   ├── 📍 Nearby 
│   ├── ➕ Quick Action
│   ├── 💾 Saved
│   └── 👤 You
│
└── Hidden/Accessible via Profile
    └── Settings
        └── "Become a Creator" CTA

CREATOR USER (After Transformation)
├── Bottom Navigation (5 tabs) - MODIFIED
│   ├── 🏠 Discover (Home)
│   ├── 📍 Nearby
│   ├── ➕ Create (EXPANDED OPTIONS)
│   │   ├── Save Restaurant
│   │   ├── Create Content
│   │   ├── Start Campaign
│   │   └── Share Board
│   ├── 💼 Creator Hub (REPLACES Saved)
│   │   ├── My Content
│   │   ├── Active Campaigns  
│   │   ├── Analytics
│   │   └── Earnings
│   └── 👤 You (ENHANCED)
│       ├── Public Profile
│       ├── Creator Stats
│       └── Settings
│
└── Contextual Top Bar
    └── Mode Switcher: [Consumer | Creator]

RESTAURANT OWNER (After Claiming)
├── Bottom Navigation (5 tabs) - MODIFIED
│   ├── 🏠 Discover
│   ├── 📍 Nearby
│   ├── ➕ Quick Action
│   ├── 🏪 My Restaurant (REPLACES Saved)
│   │   ├── Dashboard
│   │   ├── Campaigns
│   │   ├── Analytics
│   │   └── Settings
│   └── 👤 You
│
└── Contextual Top Bar
    └── Account Switcher: [Personal | Business]
```

### 1.2 Navigation Entry Points

#### Discovery Entry Points
```
WAYS TO ACCESS CREATOR MARKETPLACE:

1. From Profile → Settings
   [You Tab] → [Settings] → [Creator Settings] → [Become a Creator]

2. From Discover Feed
   [Discover] → [Creator Content Card] → [View Creator] → [Become One Too]

3. From Save Flow  
   [Save Restaurant] → [Share as Creator] → [Setup Creator Account]

4. From Onboarding
   [New User] → [What brings you here?] → [I'm a food creator]

5. From Restaurant Detail
   [Restaurant Page] → [Creator Content Section] → [Join Creators]

6. From Push Notification
   [Notification: "Your content could earn $"] → [Deep link to creator setup]

7. From In-App Campaign
   [Banner: "Creators earn avg $500/mo"] → [Learn More]
```

### 1.3 Navigation State Management

```typescript
interface NavigationState {
  userType: 'regular' | 'creator' | 'restaurant_owner' | 'multi_role';
  activeMode: 'consumer' | 'creator' | 'business';
  
  // Dynamic tab configuration
  bottomTabs: {
    discover: TabConfig;
    nearby: TabConfig;
    center: TabConfig; // Changes based on userType
    fourth: TabConfig; // Saved/Creator Hub/My Restaurant
    profile: TabConfig;
  };
  
  // Contextual actions
  quickActions: QuickAction[];
  
  // Navigation history for smart back button
  navigationStack: NavigationEntry[];
  
  // Deep link handling
  pendingDeepLink?: string;
}

// Tab morphing based on user type
const getTabConfiguration = (userType: UserType): TabConfig => {
  switch(userType) {
    case 'creator':
      return {
        fourth: {
          icon: '💼',
          label: 'Creator Hub',
          screen: 'CreatorHubScreen',
          badge: pendingEarnings > 0 ? '$' : null
        }
      };
    case 'restaurant_owner':
      return {
        fourth: {
          icon: '🏪',
          label: 'My Restaurant',
          screen: 'RestaurantDashboard',
          badge: newApplications > 0 ? newApplications : null
        }
      };
    default:
      return defaultTabConfig;
  }
};
```

---

## 2. USER TYPE TRANSFORMATIONS

### 2.1 Regular User → Creator Transformation

```
TRANSFORMATION FLOW: REGULAR USER TO CREATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TRIGGER POINTS:
1. Organic Discovery (User has 20+ saves)
2. Direct Intent (Searches for "creator" or "earn money")
3. Social Proof (Sees friend earning as creator)
4. Prompted (AI detects high-quality content patterns)

┌─────────────────────────────────────────────────────────────┐
│ STEP 1: DISCOVERY & INTEREST                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Regular User Profile                                      │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Sarah Chen                                           │ │
│  │  @sarahc · Member since 2024                         │ │
│  │                                                       │ │
│  │  [!] You've saved 47 restaurants!                    │ │
│  │      Your recommendations could help others          │ │
│  │                                                       │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │  💡 Did you know?                               │ │ │
│  │  │  Creators like you earn avg $400/mo sharing     │ │ │
│  │  │  their favorite spots                           │ │ │
│  │  │                                                 │ │ │
│  │  │  [Learn About Creator Program →]                │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  Tap "Learn About Creator Program"                         │
│                           ↓                                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ STEP 2: EDUCATION & VALUE PROPOSITION                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Full-screen takeover with parallax scroll                 │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  [X]                    Creator Program               │ │
│  │                                                       │ │
│  │  "Turn your food journey into income"                │ │
│  │                                                       │ │
│  │  [Animated illustration of user journey]             │ │
│  │                                                       │ │
│  │  ✓ Keep doing what you love                         │ │
│  │    Share restaurants, earn from campaigns            │ │
│  │                                                       │ │
│  │  ✓ Your existing saves = instant portfolio          │ │
│  │    We'll transform your 47 saves into content       │ │
│  │                                                       │ │
│  │  ✓ Work with restaurants you already love           │ │
│  │    Get exclusive perks and early access              │ │
│  │                                                       │ │
│  │  ✓ Average creator earns $400/mo                    │ │
│  │    Top creators earn $2000+                          │ │
│  │                                                       │ │
│  │  [See How It Works]                                  │ │
│  │                                                       │ │
│  │  "Already convinced?"                                │ │
│  │  [Start Setup →]                                     │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ STEP 3: QUALIFICATION CHECK                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Quick Qualification (Auto-filled where possible)          │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Let's see if you're ready!                          │ │
│  │                                                       │ │
│  │  ✅ Account age > 30 days                           │ │
│  │  ✅ 10+ restaurant saves                            │ │
│  │  ✅ Profile photo uploaded                          │ │
│  │  ⏳ Connect one social platform                     │ │
│  │  ⏳ Verify phone number                             │ │
│  │                                                       │ │
│  │  [Connect Instagram]  [Connect TikTok]              │ │
│  │                                                       │ │
│  │  Phone: [___________]  [Send Code]                  │ │
│  │                                                       │ │
│  │  [Continue →]                                        │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ STEP 4: PORTFOLIO GENERATION                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  AI-Powered Portfolio Creation                             │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Creating your creator portfolio...                  │ │
│  │                                                       │ │
│  │  [Animated progress with live updates]               │ │
│  │                                                       │ │
│  │  ✓ Analyzing your 47 saved restaurants              │ │
│  │  ✓ Identifying your specialties: Brunch, Asian      │ │
│  │  ✓ Calculating your influence score: 7.2/10         │ │
│  │  ✓ Finding matching campaigns: 3 available now      │ │
│  │                                                       │ │
│  │  Your Creator Preview:                               │ │
│  │  ┌─────────────────────────────────────────────┐     │ │
│  │  │ [Avatar] Sarah Chen ✓                      │     │ │
│  │  │ Food Explorer · Brunch Enthusiast          │     │ │
│  │  │ 47 recommendations · 3 neighborhoods        │     │ │
│  │  │                                             │     │ │
│  │  │ Top Spots:                                 │     │ │
│  │  │ [Mini gallery of top 6 restaurants]        │     │ │
│  │  └─────────────────────────────────────────────┘     │ │
│  │                                                       │ │
│  │  [Customize Portfolio]  [Looks Good!]                │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ STEP 5: PAYMENT SETUP (SIMPLIFIED)                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Deferred Stripe Setup                                     │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  How do you want to get paid?                        │ │
│  │                                                       │ │
│  │  ○ Set up now (recommended)                          │ │
│  │    Get paid instantly when you complete campaigns    │ │
│  │                                                       │ │
│  │  ○ Set up later                                      │ │
│  │    You can still browse campaigns                    │ │
│  │                                                       │ │
│  │  [Continue]                                           │ │
│  │                                                       │ │
│  │  🔒 Secure payments by Stripe                        │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ STEP 6: NAVIGATION TRANSFORMATION                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Animated Navigation Change                                │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  🎉 Welcome to the Creator Community!                │ │
│  │                                                       │ │
│  │  Your app is updating with creator features...       │ │
│  │                                                       │ │
│  │  [Animation showing bottom nav morphing]             │ │
│  │                                                       │ │
│  │  Before:  [Discover][Nearby][+][Saved][You]        │ │
│  │     ↓                    ↓                          │ │
│  │  After:   [Discover][Nearby][+][Creator Hub][You]  │ │
│  │                                                       │ │
│  │  NEW: Creator Hub - Your command center             │ │
│  │  • Track campaigns                                   │ │
│  │  • View analytics                                    │ │
│  │  • Manage earnings                                   │ │
│  │                                                       │ │
│  │  [Explore Creator Hub →]                             │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Navigation Changes Post-Transformation

```
BEFORE & AFTER: NAVIGATION TRANSFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REGULAR USER - SAVED TAB:
┌────────────────┐
│     Saved      │
│  ┌──────────┐  │
│  │ Want to  │  │
│  │ Try (23) │  │
│  └──────────┘  │
│  ┌──────────┐  │
│  │ Been     │  │
│  │ There(15)│  │
│  └──────────┘  │
└────────────────┘

CREATOR - CREATOR HUB TAB:
┌────────────────┐
│  Creator Hub   │
│ ┌────────────┐ │
│ │ Campaigns  │ │
│ │ 3 Active   │ │
│ └────────────┘ │
│ ┌────────────┐ │
│ │ Analytics  │ │
│ │ ↑23% views │ │
│ └────────────┘ │
│ ┌────────────┐ │
│ │ Earnings   │ │
│ │ $327 pending│ │
│ └────────────┘ │
│ ┌────────────┐ │
│ │ My Content │ │
│ │ 47 items   │ │
│ └────────────┘ │
└────────────────┘

REGULAR USER - PROFILE TAB:
┌────────────────┐
│      You       │
│   [Avatar]     │
│   Sarah Chen   │
│                │
│  234 Saved     │
│  12 Reviews    │
│                │
│  [Settings]    │
└────────────────┘

CREATOR - ENHANCED PROFILE:
┌────────────────┐
│      You       │
│   [Avatar] ✓   │
│   Sarah Chen   │
│   Creator      │
│                │
│  👁 2.3k views │
│  💰 $1,247 earned│
│  ⭐ 4.9 rating │
│                │
│ [Public Profile]│
│ [Creator Stats] │
│ [Settings]     │
└────────────────┘

QUICK ACTION (+) CHANGES:
Regular User:          Creator:
┌─────────────┐       ┌─────────────┐
│     (+)     │       │     (+)     │
│ Save Spot   │       │ Save Spot   │
│ Write Review│       │ Create Post │
│ Share List  │       │ Start Campaign│
└─────────────┘       │ Share Board │
                      │ Upload Content│
                      └─────────────┘
```

---

## 3. RESTAURANT CLAIMING & ADMIN EXPERIENCE

### 3.1 Restaurant Claiming Flow

```
COMPLETE RESTAURANT CLAIMING JOURNEY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ENTRY POINTS FOR CLAIMING:

1. From Restaurant Detail Page (Most Common)
   [Restaurant Page] → [⋮ Menu] → [Claim This Business]

2. From Search
   [Search: "claim my restaurant"] → [Claim Business Page]

3. From Profile Settings
   [You] → [Settings] → [Business Tools] → [Claim Restaurant]

4. From Direct Link/QR Code
   [Physical QR at restaurant] → [Deep link to claim flow]

5. From Email Campaign
   [Email: "Is this your restaurant?"] → [Claim Now]

┌─────────────────────────────────────────────────────────────┐
│ STEP 1: INITIATE CLAIM                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Restaurant: Thai House                                    │
│  123 Main St, New York, NY                                 │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Claim This Business                                  │ │
│  │                                                       │ │
│  │  Are you the owner or authorized manager of          │ │
│  │  Thai House?                                          │ │
│  │                                                       │ │
│  │  Benefits of claiming:                               │ │
│  │  • Respond to reviews                                │ │
│  │  • Update hours & menu                               │ │
│  │  • Launch creator campaigns                          │ │
│  │  • Access analytics                                  │ │
│  │                                                       │ │
│  │  [Yes, I'm the Owner]  [I'm a Manager]               │ │
│  │                                                       │ │
│  │  Not the owner? [Report incorrect info]              │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ STEP 2: VERIFICATION METHOD SELECTION                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  How would you like to verify ownership?                   │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📧 Email Verification (Instant)                     │ │
│  │     We'll send a code to:                            │ │
│  │     • info@thaihouse.com                             │ │
│  │     • Listed on your website                         │ │
│  │     [Use This Method]                                │ │
│  ├───────────────────────────────────────────────────────┤ │
│  │  📱 Phone Verification (2 min)                       │ │
│  │     We'll call: (212) 555-0100                       │ │
│  │     Listed on Google                                 │ │
│  │     [Use This Method]                                │ │
│  ├───────────────────────────────────────────────────────┤ │
│  │  📄 Document Upload (24-48 hours)                    │ │
│  │     Upload business license or utility bill          │ │
│  │     Manual review required                           │ │
│  │     [Use This Method]                                │ │
│  ├───────────────────────────────────────────────────────┤ │
│  │  📍 Physical Verification (5-7 days)                 │ │
│  │     We'll mail a postcard with code                  │ │
│  │     Most secure method                               │ │
│  │     [Use This Method]                                │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ STEP 3: VERIFICATION PROCESS (Email Example)               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Verification Code Sent!                             │ │
│  │                                                       │ │
│  │  We've sent a 6-digit code to:                       │ │
│  │  info@thaihouse.com                                   │ │
│  │                                                       │ │
│  │  Enter code:                                         │ │
│  │  [_] [_] [_] - [_] [_] [_]                          │ │
│  │                                                       │ │
│  │  [Verify]                                             │ │
│  │                                                       │ │
│  │  Didn't receive it?                                  │ │
│  │  [Resend Code] [Try Different Method]                │ │
│  │                                                       │ │
│  │  ⏱ Code expires in 9:47                             │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ STEP 4: BUSINESS PROFILE SETUP                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ✅ Verification Successful!                               │
│  Let's set up your business profile                        │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Business Information                                 │ │
│  │                                                       │ │
│  │  Legal Business Name*                                │ │
│  │  [Thai House LLC_______________]                      │ │
│  │                                                       │ │
│  │  Your Role*                                          │ │
│  │  [Owner ▼]                                           │ │
│  │                                                       │ │
│  │  Business Phone                                      │ │
│  │  [(212) 555-0100______________]                      │ │
│  │                                                       │ │
│  │  Business Email                                      │ │
│  │  [info@thaihouse.com__________]                      │ │
│  │                                                       │ │
│  │  Tax ID (Optional - for payments)                    │ │
│  │  [________________________]                          │ │
│  │                                                       │ │
│  │  Team Members (Optional)                             │ │
│  │  [+ Add Manager]                                     │ │
│  │                                                       │ │
│  │  [Continue →]                                         │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ STEP 5: ACCOUNT TYPE SELECTION                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  How do you want to manage Thai House?                     │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  🔄 Dual Account (Recommended)                        │ │
│  │                                                       │ │
│  │  Keep your personal and business accounts separate   │ │
│  │  • Switch between accounts easily                    │ │
│  │  • Personal saves stay private                       │ │
│  │  • Business analytics separate                       │ │
│  │                                                       │ │
│  │  [Choose This]                                        │ │
│  ├───────────────────────────────────────────────────────┤ │
│  │  🏪 Convert to Business Only                         │ │
│  │                                                       │ │
│  │  Transform this account to business-only             │ │
│  │  • Lose personal features                            │ │
│  │  • All activity as business                          │ │
│  │  • Cannot be undone                                  │ │
│  │                                                       │ │
│  │  [Choose This]                                        │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ STEP 6: RESTAURANT DASHBOARD INTRODUCTION                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Welcome to Your Restaurant Dashboard!                     │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Thai House Dashboard                    [Switch ▼]  │ │
│  │                                                       │ │
│  │  Quick Stats:                                         │ │
│  │  ┌─────────┬─────────┬─────────┬─────────┐          │ │
│  │  │  Views  │  Saves  │ Reviews │ Ranking │          │ │
│  │  │  1,234  │   89    │   4.7   │  #12    │          │ │
│  │  │  ↑23%   │  ↑15%   │  (45)   │  Thai   │          │ │
│  │  └─────────┴─────────┴─────────┴─────────┘          │ │
│  │                                                       │ │
│  │  Get Started:                                         │ │
│  │  □ Complete your restaurant profile (70%)            │ │
│  │  □ Add menu and photos                               │ │
│  │  □ Create your first campaign                        │ │
│  │  □ Invite team members                               │ │
│  │                                                       │ │
│  │  [Complete Profile]  [Explore Dashboard]              │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Restaurant Owner Navigation

```
RESTAURANT OWNER - DUAL ACCOUNT NAVIGATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ACCOUNT SWITCHER (Always visible in header):
┌─────────────────────────────────────────────────────────────┐
│  [☰]  Discover          [Personal ▼]            [🔔]      │
│                         ┌──────────────┐                   │
│                         │ • Personal    │                   │
│                         │ • Thai House  │                   │
│                         │ + Add Business│                   │
│                         └──────────────┘                   │
└─────────────────────────────────────────────────────────────┘

BOTTOM NAVIGATION - PERSONAL MODE:
┌─────────────────────────────────────────────────────────────┐
│  [Discover]  [Nearby]  [+]  [Saved]  [You]                │
└─────────────────────────────────────────────────────────────┘

BOTTOM NAVIGATION - BUSINESS MODE:
┌─────────────────────────────────────────────────────────────┐
│  [Dashboard] [Campaigns] [+] [Analytics] [Settings]        │
└─────────────────────────────────────────────────────────────┘

MY RESTAURANT TAB STRUCTURE:
┌────────────────────────┐
│    My Restaurant       │
├────────────────────────┤
│ Dashboard              │
│ ├── Overview           │
│ ├── Today's Activity   │
│ └── Action Items       │
│                        │
│ Campaigns              │
│ ├── Active (3)         │
│ ├── Drafts (1)         │
│ ├── Completed (12)     │
│ └── Create New         │
│                        │
│ Analytics              │
│ ├── Performance        │
│ ├── Audience           │
│ ├── Competition        │
│ └── Reports            │
│                        │
│ Restaurant Info        │
│ ├── Basic Info         │
│ ├── Hours              │
│ ├── Menu               │
│ ├── Photos             │
│ └── Amenities          │
│                        │
│ Team                   │
│ ├── Members (3)        │
│ ├── Roles              │
│ └── Invite             │
└────────────────────────┘
```

---

## 4. CREATOR JOURNEY DEEP DIVE

### 4.1 First Campaign Experience

```
CREATOR'S FIRST CAMPAIGN - GUIDED EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────────┐
│ ONBOARDING: FIRST CAMPAIGN DISCOVERY                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Creator Hub - First Visit                                 │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  🎉 3 Campaigns Match Your Profile!                   │ │
│  │                                                       │ │
│  │  We found campaigns from restaurants you've saved:    │ │
│  │                                                       │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │ 1. Brunch Special at Sunny Cafe                  │ │ │
│  │  │    You saved this 2 weeks ago!                   │ │ │
│  │  │    💰 $200 for 3 posts                           │ │ │
│  │  │    📅 Starts in 3 days                           │ │ │
│  │  │    🎯 Perfect match: 95%                         │ │ │
│  │  │                                                   │ │ │
│  │  │    [View Details]  [Quick Apply]                 │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  │                                                       │ │
│  │  💡 Pro Tip: Your first campaign is special!         │ │
│  │     We'll guide you through every step               │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

APPLYING TO FIRST CAMPAIGN:
┌─────────────────────────────────────────────────────────────┐
│  Campaign Application - Guided Mode                        │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Applying to: Brunch Special at Sunny Cafe           │ │
│  │                                                       │ │
│  │  Step 1: Your Rate                                   │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │ Suggested rate: $200                            │ │ │
│  │  │ Based on your engagement and followers          │ │ │
│  │  │                                                 │ │ │
│  │  │ Your rate: [$200_____]                         │ │ │
│  │  │                                                 │ │ │
│  │  │ ℹ️ This is fair for your first campaign        │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  │                                                       │ │
│  │  Step 2: Your Proposal                              │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │ Tell them why you're perfect:                  │ │ │
│  │  │                                                 │ │ │
│  │  │ [AI Pre-filled Draft]                          │ │ │
│  │  │ "I'm a regular at Sunny Cafe and love your    │ │ │
│  │  │  weekend brunch menu! I specialize in brunch   │ │ │
│  │  │  content and have an engaged audience of       │ │ │
│  │  │  food lovers in the area..."                   │ │ │
│  │  │                                                 │ │ │
│  │  │ [Edit]  [Use This]                             │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  │                                                       │ │
│  │  Step 3: Content Examples                           │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │ Select 3 examples from your portfolio:         │ │ │
│  │  │                                                 │ │ │
│  │  │ ☑ [Brunch at Garden Bistro]                    │ │ │
│  │  │ ☑ [Coffee & Pastries at Cafe Luna]            │ │ │
│  │  │ ☑ [Weekend Vibes at The Local]                │ │ │
│  │  │                                                 │ │ │
│  │  │ AI: These show your brunch expertise! ✓        │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  │                                                       │ │
│  │  [Submit Application →]                              │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

POST-APPLICATION GUIDANCE:
┌─────────────────────────────────────────────────────────────┐
│  ✅ Application Submitted!                                 │
│                                                             │
│  What happens next:                                        │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Timeline:                                           │ │
│  │                                                       │ │
│  │  Now ──────● Submitted                               │ │
│  │            │                                         │ │
│  │  1-2 hrs ──○ Restaurant reviews                      │ │
│  │            │                                         │ │
│  │  < 24 hrs ─○ Decision                                │ │
│  │            │                                         │ │
│  │  If accepted:                                        │ │
│  │  Day 1 ────○ Content creation                        │ │
│  │  Day 3 ────○ Post & get paid                         │ │
│  │                                                       │ │
│  │  We'll notify you:                                   │ │
│  │  ☑ Push notification                                 │ │
│  │  ☑ Email                                             │ │
│  │  ☑ In-app alert                                      │ │
│  │                                                       │ │
│  │  [Browse More Campaigns]  [View Application]         │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Content Creation Flow

```
CREATOR CONTENT WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTENT CREATION HUB:
┌─────────────────────────────────────────────────────────────┐
│  Create Content                                    [X]     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  What type of content?                                     │
│                                                             │
│  ┌─────────────────┬─────────────────┬─────────────────┐  │
│  │  📷 Photo Post  │  🎬 Video/Reel  │  📝 Review     │  │
│  │                 │                 │                 │  │
│  │  Single or      │  Short-form     │  Detailed      │  │
│  │  carousel       │  video content  │  written       │  │
│  └─────────────────┴─────────────────┴─────────────────┘  │
│                                                             │
│  ┌─────────────────┬─────────────────┬─────────────────┐  │
│  │  📋 List        │  🗺️ Guide       │  💡 Tips       │  │
│  │                 │                 │                 │  │
│  │  Top 10,        │  Neighborhood   │  Insider       │  │
│  │  Best of        │  food guide     │  knowledge     │  │
│  └─────────────────┴─────────────────┴─────────────────┘  │
│                                                             │
│  For campaign: [Sunny Cafe Brunch ▼]                       │
│  Or create:    [General Content]                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

PHOTO POST CREATION:
┌─────────────────────────────────────────────────────────────┐
│  Create Photo Post                                 Step 1/4│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Upload Photos (1-10)                                      │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  ┌─────┬─────┬─────┬─────┬─────┐                     │ │
│  │  │ [+] │     │     │     │     │                     │ │
│  │  │ Add │     │     │     │     │                     │ │
│  │  └─────┴─────┴─────┴─────┴─────┘                     │ │
│  │                                                       │ │
│  │  Drag to reorder                                     │ │
│  │                                                       │ │
│  │  AI Enhancement:                                      │ │
│  │  ☑ Auto-enhance colors                               │ │
│  │  ☑ Smart crop for Instagram                          │ │
│  │  ☐ Remove background objects                         │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  [Import from Instagram]  [Take Photo]  [Next →]           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Create Photo Post                                 Step 2/4│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Tag Restaurant & Location                                 │
│                                                             │
│  Restaurant:                                               │
│  [Sunny Cafe_____________] [📍]                           │
│  ✓ Auto-detected from campaign                             │
│                                                             │
│  Specific Items (Optional):                                │
│  [+ Add dish] [+ Add drink]                               │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  AI Detected in your photos:                         │ │
│  │  • Avocado Toast                                     │ │
│  │  • Eggs Benedict                                     │ │
│  │  • Mimosa                                            │ │
│  │  [Add All]  [Select Individual]                      │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  [← Back]  [Next →]                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Create Photo Post                                 Step 3/4│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Write Your Caption                                        │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  [AI-Generated Draft - Edit me!]                     │ │
│  │                                                       │ │
│  │  Sunday brunch perfection at @SunnyCafe ☀️          │ │
│  │                                                       │ │
│  │  Their new weekend menu is absolutely incredible -   │ │
│  │  the avocado toast comes with perfectly poached     │ │
│  │  eggs and their signature chili oil that adds       │ │
│  │  just the right kick! 🥑                            │ │
│  │                                                       │ │
│  │  Pro tip: Come before 11am to skip the wait and     │ │
│  │  catch their early bird special 🕐                  │ │
│  │                                                       │ │
│  │  #SundayBrunch #NYCEats #BrunchTime                 │ │
│  │                                                       │ │
│  │  280/500 characters                                  │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  Tone: [Casual ▼]  [Generate New]  [Add Emojis]           │
│                                                             │
│  [← Back]  [Next →]                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Create Photo Post                                 Step 4/4│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Review & Publish                                          │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Preview:                                            │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │ [Photo carousel preview]                        │ │ │
│  │  │                                                 │ │ │
│  │  │ @sarahchen                                      │ │ │
│  │  │ Sunday brunch perfection at @SunnyCafe ☀️       │ │ │
│  │  │ ...                                             │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  Publishing Options:                                       │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  ☑ Post to Troodie                                   │ │
│  │  ☑ Cross-post to Instagram                           │ │
│  │  ☐ Cross-post to TikTok                              │ │
│  │  ☐ Schedule for later: [Date/Time]                   │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  Campaign: Sunny Cafe Brunch Special ✓                     │
│  Earnings: $67 (1 of 3 posts)                             │
│                                                             │
│  [← Back]  [Save Draft]  [Publish Now →]                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. CONTEXTUAL NAVIGATION CHANGES

### 5.1 Dynamic Navigation Based on Context

```typescript
// Navigation Context System
interface NavigationContext {
  // User context
  userType: 'regular' | 'creator' | 'owner' | 'multi';
  activeRole: 'consumer' | 'creator' | 'business';
  location: GeoLocation;
  timeOfDay: 'morning' | 'lunch' | 'dinner' | 'late';
  
  // Screen context
  currentScreen: string;
  previousScreen: string;
  sessionDepth: number;
  
  // Campaign context
  activeCampaigns?: Campaign[];
  pendingActions?: Action[];
  
  // Adaptive elements
  quickActions: QuickAction[];
  suggestedScreens: Screen[];
  notifications: NotificationBadge[];
}

// Dynamic Quick Actions
const getQuickActions = (context: NavigationContext): QuickAction[] => {
  const baseActions = ['save_restaurant'];
  
  if (context.userType === 'creator') {
    if (context.activeCampaigns?.length > 0) {
      return [...baseActions, 'create_campaign_content', 'view_campaign'];
    }
    return [...baseActions, 'create_content', 'browse_campaigns'];
  }
  
  if (context.userType === 'owner') {
    if (context.timeOfDay === 'morning') {
      return [...baseActions, 'check_overnight_stats', 'respond_reviews'];
    }
    return [...baseActions, 'create_campaign', 'view_analytics'];
  }
  
  return baseActions;
};
```

### 5.2 Smart Back Navigation

```
INTELLIGENT BACK BUTTON BEHAVIOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Standard Flow:
Home → Restaurant → Save → Success
  ←────────────────────────┘ (Back to Restaurant, not Save)

Creator Flow:
Creator Hub → Campaign → Apply → Success
  ←──────────────────────────┘ (Back to Campaign details)

Cross-Context Flow:
Personal Mode → Restaurant → Claim → Business Mode → Dashboard
  ←───────────────────────────────────┘ (Stays in Business Mode)

Deep Link Recovery:
Notification → Deep Screen → [Back] → Home (not previous app)

Modal Handling:
Any Screen → Modal → Complete
  ←──────────────┘ (Dismiss modal, stay on screen)
```

### 5.3 Tab Badge System

```
DYNAMIC TAB BADGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Regular User Badges:
┌──────┬────────┬───┬───────┬─────┐
│      │        │   │   3   │     │
│ Home │ Nearby │ + │ Saved │ You │
└──────┴────────┴───┴───────┴─────┘
                     (3 new saves from friends)

Creator Badges:
┌──────┬────────┬───┬─────────────┬─────┐
│      │   2    │   │     $87     │  !  │
│ Home │ Nearby │ + │ Creator Hub │ You │
└──────┴────────┴───┴─────────────┴─────┘
       (2 new campaigns)  (Earnings ready)  (Action required)

Restaurant Owner Badges:
┌───────────┬───────────┬───┬───────────┬──────────┐
│     5     │     3     │   │    📈     │    🔴    │
│ Dashboard │ Campaigns │ + │ Analytics │ Settings │
└───────────┴───────────┴───┴───────────┴──────────┘
  (5 new applications)  (3 active)  (Trending up)  (Urgent)

Badge Priority System:
1. 🔴 Urgent/Error (Highest)
2. $ Money available
3. Numbers (Count)
4. ! Action needed
5. 📈 Status indicator (Lowest)
```

---

## 6. MICRO-INTERACTIONS & TRANSITIONS

### 6.1 Screen Transition Patterns

```
TRANSITION SPECIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Navigation Transitions:

1. Tab Switch
   Duration: 200ms
   Type: Fade + Scale
   Easing: ease-out
   
   Old Tab: fade(1→0), scale(1→0.95)
   New Tab: fade(0→1), scale(0.95→1)

2. Push Navigation
   Duration: 300ms
   Type: Slide + Parallax
   Easing: cubic-bezier(0.4, 0, 0.2, 1)
   
   Current: translateX(0→-30%)
   New: translateX(100%→0)
   Shadow: opacity(0→0.3)

3. Modal Presentation
   Duration: 250ms
   Type: Slide up + Backdrop
   Easing: spring(stiffness: 300, damping: 30)
   
   Modal: translateY(100%→0)
   Backdrop: opacity(0→0.6)

4. Role Switch (Creator ↔ Personal)
   Duration: 400ms
   Type: Flip + Morph
   Easing: ease-in-out
   
   Entire UI: rotateY(0→90→0)
   Tab icons: morph with shape interpolation

5. Success States
   Duration: 600ms
   Type: Scale + Confetti
   
   Checkmark: scale(0→1.2→1) with bounce
   Confetti: particle system, 20 particles
```

### 6.2 Gesture Interactions

```
GESTURE SPECIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pull to Refresh:
- Threshold: 80px
- Max overscroll: 120px
- Spinner appears at 40px
- Haptic: light impact at threshold
- Spring back: 300ms

Swipe Actions (Lists):
- Activation: 75px horizontal swipe
- Actions revealed: Save, Share, Delete
- Full swipe (>200px): Quick action
- Rubber band: beyond 250px
- Snap points: 0, 75px, 150px

Long Press:
- Duration: 500ms
- Haptic: medium impact
- Scale animation: 0.95
- Context menu: appears with spring

Pinch to Zoom (Images):
- Min scale: 1.0
- Max scale: 3.0
- Double tap: zoom to 2.0
- Momentum scrolling when zoomed

Tab Bar Hide on Scroll:
- Hide threshold: 20px down
- Show threshold: 10px up
- Animation: translateY with spring
- Duration: 200ms
```

### 6.3 Loading & Skeleton States

```
LOADING STATES BY CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Campaign List Loading:
┌─────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░ │ <- Animated shimmer
│ ░░░░░░░░░░░  ░░░░░░    │    Speed: 1.5s
│ ░░░░░░░      ░░░░      │    Direction: L→R
├─────────────────────────┤
│ ░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░  ░░░░░░    │
│ ░░░░░░░      ░░░░      │
└─────────────────────────┘

Content Import Progress:
┌─────────────────────────┐
│ Importing your content  │
│                         │
│ [████████░░░░░░] 52%   │
│                         │
│ ✓ Connected Instagram   │
│ ⟳ Analyzing 127 posts   │ <- Spinning icon
│ ○ Matching restaurants  │
│                         │
│ Est. time: 45 seconds   │
└─────────────────────────┘

Smart Placeholders:
- Text: Show actual line heights
- Images: Show aspect ratio containers
- Buttons: Show disabled state
- Data: Show last known good state
```

---

## 7. EDGE CASES & ERROR HANDLING

### 7.1 Account State Conflicts

```
EDGE CASE: MULTIPLE ROLE CONFLICTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scenario 1: Creator tries to claim own reviewed restaurant
┌─────────────────────────────────────────────────────────────┐
│  ⚠️ Role Conflict Detected                                 │
│                                                             │
│  You're trying to claim "Thai House" but you've:           │
│  • Posted 3 creator campaigns here                         │
│  • Earned $450 from this restaurant                        │
│                                                             │
│  Options:                                                   │
│  1. Continue as Creator only (Recommended)                 │
│  2. Transfer creator earnings and become owner             │
│  3. Create separate business account                       │
│                                                             │
│  [Learn More]  [Choose Option]                             │
└─────────────────────────────────────────────────────────────┘

Scenario 2: Restaurant owner becomes creator for other venues
┌─────────────────────────────────────────────────────────────┐
│  Create Creator Profile                                    │
│                                                             │
│  ℹ️ You own "Pasta Palace"                                │
│                                                             │
│  As a creator, you:                                        │
│  • Cannot create campaigns for your own restaurant         │
│  • Must disclose ownership in competitor campaigns         │
│  • Will have separate analytics for each role             │
│                                                             │
│  ☑ I understand the guidelines                             │
│                                                             │
│  [Continue]  [Cancel]                                      │
└─────────────────────────────────────────────────────────────┘

Scenario 3: Suspended creator tries restaurant interaction
┌─────────────────────────────────────────────────────────────┐
│  ❌ Account Restricted                                     │
│                                                             │
│  Your creator privileges are suspended due to:             │
│  "Incomplete campaign deliverables"                        │
│                                                             │
│  You can still:                                            │
│  • Browse as regular user                                  │
│  • Save restaurants                                        │
│  • View your profile                                       │
│                                                             │
│  You cannot:                                               │
│  • Apply to campaigns                                      │
│  • Create paid content                                     │
│  • Access earnings                                         │
│                                                             │
│  [Resolve Issue]  [Contact Support]                        │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Payment & Verification Failures

```
PAYMENT EDGE CASES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Stripe Connect Failure:
┌─────────────────────────────────────────────────────────────┐
│  Payment Setup Issue                                       │
│                                                             │
│  We couldn't verify your information:                      │
│  • Tax ID doesn't match name                              │
│                                                             │
│  What you can do:                                          │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Option 1: Fix Now                                    │ │
│  │  Update your tax information                          │ │
│  │  [Update Information]                                 │ │
│  ├───────────────────────────────────────────────────────┤ │
│  │  Option 2: Continue Without Payments                  │ │
│  │  Browse campaigns, save for later                     │ │
│  │  [Skip for Now]                                       │ │
│  ├───────────────────────────────────────────────────────┤ │
│  │  Option 3: Get Help                                   │ │
│  │  Chat with support                                    │ │
│  │  [Contact Support]                                    │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

Payout Failure:
┌─────────────────────────────────────────────────────────────┐
│  💳 Payout Failed                                          │
│                                                             │
│  Your $327 earning couldn't be transferred                │
│                                                             │
│  Reason: Bank account closed                               │
│                                                             │
│  Your money is safe and will be retried once you:          │
│  [Update Bank Details]                                     │
│                                                             │
│  Timeline:                                                 │
│  • Update by Nov 30: Instant transfer                      │
│  • After Nov 30: Next payout cycle (Dec 15)               │
│                                                             │
│  [Update Now]  [Remind Me Later]                           │
└─────────────────────────────────────────────────────────────┘
```

### 7.3 Content & Campaign Conflicts

```
CONTENT CONFLICT RESOLUTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Duplicate Content Detection:
┌─────────────────────────────────────────────────────────────┐
│  ⚠️ Similar Content Detected                               │
│                                                             │
│  This looks similar to content you posted 3 days ago:      │
│  [Thumbnail of previous post]                              │
│                                                             │
│  For campaign compliance:                                  │
│  • Each post must be unique                                │
│  • Reposting may affect payment                            │
│                                                             │
│  [Create New Content]  [Edit Existing]  [Post Anyway]      │
└─────────────────────────────────────────────────────────────┘

Campaign Overlap:
┌─────────────────────────────────────────────────────────────┐
│  Campaign Conflict                                         │
│                                                             │
│  You're already in a campaign for "Joe's Pizza"            │
│  Active until: Dec 15                                      │
│                                                             │
│  "Tony's Pizza" campaign requires exclusivity              │
│                                                             │
│  Options:                                                  │
│  • Wait until Dec 16 to apply                             │
│  • Contact Joe's Pizza about early release                │
│  • Find non-competing campaigns                           │
│                                                             │
│  [See Other Campaigns]  [Set Reminder]                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. COMMUNICATION & NOTIFICATIONS

### 8.1 Notification Strategy

```
NOTIFICATION ARCHITECTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATOR NOTIFICATIONS (Priority Order):

1. URGENT - Payment/Account Issues
   🔴 "Action required: Update payment info"
   → Deep link: Payment settings
   
2. HIGH - Campaign Acceptance
   🎉 "You've been selected for Sunny Cafe!"
   → Deep link: Campaign details
   
3. HIGH - Earnings Available
   💰 "Your $327 is ready for payout"
   → Deep link: Earnings page
   
4. MEDIUM - New Campaign Match
   ✨ "3 new campaigns match your profile"
   → Deep link: Campaign browse
   
5. MEDIUM - Content Performance
   📈 "Your post reached 10K views!"
   → Deep link: Analytics
   
6. LOW - Tips & Education
   💡 "Pro tip: Best times to post"
   → Deep link: Creator resources

RESTAURANT OWNER NOTIFICATIONS:

1. URGENT - Campaign Issues
   🔴 "Campaign paused: Budget exceeded"
   → Deep link: Campaign settings
   
2. HIGH - Creator Applications
   👥 "5 creators applied to your campaign"
   → Deep link: Applications
   
3. HIGH - Review Response Needed
   ⭐ "New 3-star review needs response"
   → Deep link: Review
   
4. MEDIUM - Performance Milestones
   🎯 "Campaign reached 50K impressions!"
   → Deep link: Analytics
   
5. LOW - Weekly Reports
   📊 "Your weekly performance report"
   → Deep link: Reports
```

### 8.2 In-App Messaging

```
IN-APP COMMUNICATION TOUCHPOINTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Campaign Communication Thread:
┌─────────────────────────────────────────────────────────────┐
│  Sunny Cafe Campaign                              [···]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ Sunny Cafe:                                    2:30 PM│ │
│  │ Hi Sarah! Excited to work with you. Could you        │ │
│  │ focus on our new brunch menu items?                   │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                                    You:        2:45 PM│ │
│  │ Absolutely! I'll highlight the avocado toast and      │ │
│  │ your signature pancakes. Planning to visit Sunday     │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ System:                                       3:00 PM │ │
│  │ 📎 Content draft submitted for review                 │ │
│  │ [View Draft]                                          │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  [Type message...]                              [Send]     │
│                                                             │
│  Quick Replies:                                            │
│  [Thanks!] [Will do] [Question about...]                   │
└─────────────────────────────────────────────────────────────┘

System Messages Types:
1. Milestone notifications
2. Submission confirmations  
3. Payment confirmations
4. Deadline reminders
5. Performance updates
```

### 8.3 Email Communication Templates

```
EMAIL TOUCHPOINTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Creator Welcome Email:
Subject: Welcome to Troodie Creators! 🎉

Hi Sarah,

You're officially a Troodie Creator! Here's what happens next:

✓ Your profile is live
✓ 3 campaigns are waiting for you
✓ Average creator earns $400/month

Your first steps:
1. Complete payment setup (2 min)
2. Apply to your first campaign
3. Create your first paid post

[Open Creator Hub →]

Questions? Reply to this email or check our Creator Guide.

---

Campaign Acceptance Email:
Subject: 🎉 You're selected for Sunny Cafe's campaign!

Congratulations Sarah!

Sunny Cafe selected you for their Valentine's Brunch campaign.

Campaign Details:
• Payment: $300 for 3 posts
• Deadline: February 14
• Requirements: 1 reel, 2 photo posts

Next Steps:
1. Visit Sunny Cafe by Feb 10
2. Create content by Feb 12
3. Post by Feb 14
4. Get paid instantly!

[View Full Details →]

---

Weekly Performance Email (Creator):
Subject: Your weekly creator report 📊

Hi Sarah,

Great week! Here's your performance:

Content Performance:
• Views: 12,847 (↑ 23%)
• Engagement: 892 (↑ 15%)
• Saves: 234 (↑ 45%)

Earnings:
• This week: $450
• Pending: $327
• Next payout: Friday

New Opportunities:
• 5 new campaigns match your profile
• Trending: Valentine's content

[View Full Report →]
```

---

## 9. ACCESSIBILITY & INCLUSIVE DESIGN

### 9.1 Screen Reader Optimizations

```
ACCESSIBILITY MARKUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Campaign Card Accessibility:
<View
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel="Valentine's Brunch Campaign at Sunny Cafe"
  accessibilityHint="Double tap to view campaign details"
  accessibilityValue={{
    text: "Paying 300 dollars, 3 posts required, expires in 5 days"
  }}
>
  <!-- Visual content -->
</View>

Navigation Announcements:
- Tab switch: "Creator Hub, tab 4 of 5"
- Mode switch: "Switched to creator mode"
- New content: "3 new campaigns available"
- Success: "Success! Application submitted"
- Error: "Error: Payment information required"

Gesture Alternatives:
- All swipe actions have button alternatives
- Long press menus accessible via more button
- Pinch zoom has zoom button controls
- Pull to refresh has refresh button
```

### 9.2 Visual Accessibility

```
COLOR CONTRAST COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WCAG AAA Compliance:
- Text on white: #262626 (17.87:1) ✓
- Text on orange: #FFFFFF (3.52:1) ✓ Large text only
- Secondary text: #8C8C8C (4.84:1) ✓
- Error text: #F5222D (4.51:1) ✓

High Contrast Mode:
- Increases all contrasts by 20%
- Adds borders to buttons
- Increases font weights
- Removes decorative elements

Color Blind Modes:
- Protanopia: Adjust reds/greens
- Deuteranopia: Adjust greens/reds  
- Tritanopia: Adjust blues/yellows
- Uses patterns + colors for status
```

---

## 10. IMPLEMENTATION PRIORITIES

### 10.1 Phase 1: Foundation (Weeks 1-4)

```
PHASE 1 DELIVERABLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Week 1-2: Navigation Architecture
□ Implement role-based navigation
□ Create account switcher
□ Build tab morphing system
□ Add deep linking support

Week 3-4: Creator Onboarding
□ Build qualification flow
□ Implement platform OAuth
□ Create portfolio generator
□ Setup basic Stripe Connect
```

### 10.2 Phase 2: Core Features (Weeks 5-8)

```
PHASE 2 DELIVERABLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Week 5-6: Campaign System
□ Campaign creation wizard
□ Application flow
□ Creator-restaurant messaging
□ Basic attribution tracking

Week 7-8: Content Creation
□ Multi-format content tools
□ AI caption generation
□ Cross-posting functionality
□ Campaign compliance checks
```

### 10.3 Phase 3: Intelligence & Scale (Weeks 9-12)

```
PHASE 3 DELIVERABLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Week 9-10: AI Features
□ Smart campaign matching
□ Content recommendations
□ Performance predictions
□ Automated insights

Week 11-12: Polish & Launch
□ Error state handling
□ Notification system
□ Analytics dashboards
□ Beta testing
```

---

## Conclusion

This comprehensive UI/UX document provides complete specifications for the Creator Marketplace experience. Every user journey has been mapped, edge cases considered, and interactions detailed. The design ensures smooth transitions between user types while maintaining clarity and purpose at each step.

The system is designed to scale from 500 creators at launch to 50,000+ within the first year, with navigation and interactions that adapt intelligently to user context and behavior.

---

_UI/UX Design Document v1.0_
_Last Updated: January 2025_
_Prepared by: Senior Experience Design Team_