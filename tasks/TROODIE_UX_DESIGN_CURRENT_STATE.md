# Troodie UX Design Document - Current State & Future Vision

## Executive Summary

### One-Sentence Pitch
**"Troodie transforms restaurant discovery from overwhelming choice into a trusted, personalized journey by connecting real social recommendations to measurable sales outcomes."**

### Product Overview
Troodie is an AI-powered social commerce platform that bridges the gap between food content creators and restaurant success. Unlike traditional review platforms that rely on anonymous opinions, Troodie leverages trusted social connections and creator content to drive real restaurant visits with measurable ROI. The platform serves three interconnected audiences: food enthusiasts seeking personalized recommendations, content creators monetizing their influence, and restaurants tracking marketing effectiveness.

### UX Positioning
From a user experience perspective, Troodie positions itself as the **"Pinterest of food discovery meets the attribution power of Google Analytics"** - a visually-driven, socially-connected platform where every save, share, and recommendation can be traced to actual restaurant visits. We prioritize:
- **Trust over volume** (friends' recommendations vs. stranger reviews)
- **Curation over search** (organized boards vs. endless listings)
- **Attribution over assumptions** (measurable ROI vs. marketing guesswork)
- **Personal journey over generic discovery** (AI-powered personalization vs. one-size-fits-all)

---

## 1. USER PERSONAS & USE CASES

### PERSONA 1: The Social Foodie - "Sarah Chen"
**Age:** 28  
**Occupation:** Marketing Manager  
**Location:** Urban (NYC/LA/Chicago)  
**Income:** $75,000-$95,000  
**Tech Savvy:** High  

#### Psychographics
- Views dining as a social experience and form of entertainment
- Active on Instagram, shares food photos regularly
- Values authenticity and unique experiences over chains
- Trusts friends' recommendations over online reviews
- Plans meals in advance for special occasions

#### App Usage Pattern
- **Frequency:** 4-5 times per week
- **Peak Times:** Lunch planning (11 AM), dinner decisions (5-7 PM), weekend planning (Thursday evening)
- **Session Duration:** 5-8 minutes per session
- **Primary Actions:**
  - Browsing friend activity feed (40% of time)
  - Saving restaurants to boards (25%)
  - Checking nearby trending spots (20%)
  - Sharing discoveries with friends (15%)

#### Current Pain Points & Solutions
| Pain Point | Current Workaround | Troodie Solution |
|------------|-------------------|------------------|
| "I screenshot restaurants from Instagram but forget why I saved them" | Multiple screenshots in camera roll | Context-rich saves with automatic tagging |
| "Group dinner planning is chaotic in text threads" | Long message chains, lost suggestions | Collaborative boards with voting |
| "I don't trust Yelp reviews from strangers" | Asks friends individually | Friend activity feed with real visits |
| "Can't remember that place Jessica recommended" | Scrolls through old texts | Searchable friend recommendations |

#### Feature Priorities
1. **Quick save with context** - One-tap save with auto-generated tags
2. **Friend activity visibility** - See where trusted people actually eat
3. **Smart notifications** - "3 friends tried your saved spot this week"
4. **Visual organization** - Pinterest-style boards for occasions

---

### PERSONA 2: The Restaurant Owner - "Michael Russo"
**Age:** 42  
**Occupation:** Restaurant Owner (2 locations)  
**Location:** Suburban metro area  
**Income:** Variable ($100K-$200K)  
**Tech Savvy:** Medium  

#### Psychographics
- Passionate about hospitality but overwhelmed by marketing
- Skeptical of digital marketing ROI
- Relies heavily on word-of-mouth and repeat customers
- Time-constrained, wears multiple hats
- Frustrated by platform fees and lack of control

#### App Usage Pattern
- **Frequency:** Daily (morning check-in, evening review)
- **Peak Times:** 9-10 AM (previous day's performance), 10-11 PM (daily wrap-up)
- **Session Duration:** 10-15 minutes per session
- **Primary Actions:**
  - Checking campaign performance (35%)
  - Responding to creator applications (25%)
  - Viewing competitor insights (20%)
  - Adjusting campaign parameters (20%)

#### Current Pain Points & Solutions
| Pain Point | Current Workaround | Troodie Solution |
|------------|-------------------|------------------|
| "I spend $2K/month on Instagram ads with no idea if they work" | Guesses based on busy nights | Direct attribution from content to visits |
| "Influencers charge a fortune and ghost after posting" | Avoids influencer marketing | Performance-based creator marketplace |
| "Yelp holds my business hostage with pay-to-play" | Reluctantly pays for ads | Earned visibility through quality content |
| "I don't know what my competitors are doing" | Manually checks their social media | Competitive intelligence dashboard |

#### Feature Priorities
1. **ROI Dashboard** - Real-time campaign performance metrics
2. **Automated campaign management** - AI suggests optimal timing and creators
3. **Competitive insights** - See what's working for similar restaurants
4. **Budget control** - Set limits, pause anytime, no commitments

---

### PERSONA 3: The Micro-Influencer Creator - "Jessica Kim"
**Age:** 26  
**Occupation:** Part-time Content Creator / Full-time Graphic Designer  
**Location:** Major city  
**Income:** $55,000 (job) + $500-$2000/month (content)  
**Tech Savvy:** Very High  

#### Psychographics
- Building personal brand around food expertise
- Seeks flexible income opportunities
- Values creative freedom and authenticity
- Frustrated by Instagram algorithm changes
- Wants to monetize without feeling "salesy"

#### App Usage Pattern
- **Frequency:** Multiple times daily
- **Peak Times:** Morning planning (8 AM), lunch break (12 PM), evening content creation (7-9 PM)
- **Session Duration:** 15-20 minutes per session
- **Primary Actions:**
  - Browsing available campaigns (30%)
  - Creating and uploading content (25%)
  - Checking earnings and analytics (25%)
  - Engaging with follower comments (20%)

#### Current Pain Points & Solutions
| Pain Point | Current Workaround | Troodie Solution |
|------------|-------------------|------------------|
| "Brands want huge followings I don't have" | Misses opportunities | Matches based on engagement quality |
| "Creating media kits is time-consuming" | Manually updates PDFs | Auto-generated creator portfolio |
| "Chasing payments from restaurants" | Awkward payment reminders | Instant payment on delivery |
| "Don't know what content performs" | Posts and hopes | Performance analytics and AI suggestions |

#### Feature Priorities
1. **Smart campaign matching** - AI suggests best-fit opportunities
2. **Content calendar integration** - Plan posts across platforms
3. **Instant payments** - Get paid immediately upon approval
4. **Portfolio analytics** - Track what content drives visits

---

### PERSONA 4: The Trip Planner - "David & Amy Thompson"
**Age:** 34 & 32  
**Occupation:** Dual-income professionals  
**Location:** Traveling 4-5 times per year  
**Income:** $150,000 combined  
**Tech Savvy:** Medium-High  

#### Psychographics
- Food is central to travel experiences
- Researches extensively before trips
- Values local, authentic experiences
- Saves recommendations throughout the year
- Shares experiences with friend network

#### App Usage Pattern
- **Frequency:** 2-3 times per week (daily during trip planning)
- **Peak Times:** Evening planning sessions (8-10 PM), weekend mornings
- **Session Duration:** 20-30 minutes when planning, 2-3 minutes when saving
- **Primary Actions:**
  - Creating destination boards (35%)
  - Researching local favorites (30%)
  - Saving from friend recommendations (20%)
  - Building day-by-day itineraries (15%)

#### Current Pain Points & Solutions
| Pain Point | Current Workaround | Troodie Solution |
|------------|-------------------|------------------|
| "Google Maps lists are clunky for trip planning" | Complex spreadsheets | Visual trip boards with maps |
| "Tourist trap restaurants in new cities" | Hours of research | Local creator recommendations |
| "Can't remember why we saved places" | Loses context by trip time | Rich context and notes on saves |
| "Hard to coordinate with travel companions" | Email chains and screenshots | Shared planning boards |

#### Feature Priorities
1. **Destination discovery** - Curated local creator guides
2. **Trip planning tools** - Day-by-day itinerary builder
3. **Offline access** - Download boards for travel
4. **Local insider tips** - Time-specific recommendations

---

### PERSONA 5: The Busy Parent - "Lisa Martinez"
**Age:** 38  
**Occupation:** Healthcare Administrator  
**Location:** Suburban  
**Income:** $85,000  
**Tech Savvy:** Medium  

#### Psychographics
- Limited time for meal planning
- Seeks family-friendly options
- Values convenience and reliability
- Budget-conscious but willing to pay for quality
- Relies heavily on routines and trusted spots

#### App Usage Pattern
- **Frequency:** 2-3 times per week
- **Peak Times:** Sunday meal planning (2-4 PM), weekday quick decisions (4-5 PM)
- **Session Duration:** 3-5 minutes per session
- **Primary Actions:**
  - Checking saved family favorites (40%)
  - Finding nearby kid-friendly options (30%)
  - Looking for deals/specials (20%)
  - Quick takeout decisions (10%)

#### Current Pain Points & Solutions
| Pain Point | Current Workaround | Troodie Solution |
|------------|-------------------|------------------|
| "Need to know if restaurants work for kids" | Calls ahead or risks it | Family-friendly filters and parent reviews |
| "Tired of the same 5 places" | Stays in comfort zone | AI suggests similar but new options |
| "Special dietary needs for family" | Extensive menu research | Dietary filters and allergy alerts |
| "Weekend activity + dining combos" | Separate planning | Integrated neighborhood guides |

#### Feature Priorities
1. **Family filters** - High chairs, kids menu, noise level
2. **Quick decision mode** - "Open now within 10 minutes"
3. **Meal planning assistant** - Weekly dinner suggestions
4. **Group ordering** - Easy takeout coordination

---

## 2. CURRENT APP UX ANALYSIS

### Information Architecture
```
TROODIE APP STRUCTURE (Current State)
┌─────────────────────────────────────────┐
│              Header Bar                  │
│  [Location ▼]  TROODIE  [🔍] [🔔]      │
└─────────────────────────────────────────┘
                    │
    ┌───────────────┼───────────────┬───────────────┐
    ▼               ▼               ▼               ▼
┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐
│Discover│    │ Nearby │    │  Saved │    │  You   │
│  Home  │    │  Map   │    │ Boards │    │Profile │
└────────┘    └────────┘    └────────┘    └────────┘
    │             │             │             │
    ├─Feed        ├─Map View    ├─My Boards   ├─Stats
    ├─Trending    ├─List View   ├─Shared      ├─Settings
    ├─Friends     ├─Filters     ├─Recent      ├─History
    └─For You     └─Search      └─Create      └─Friends

[+] Floating Action Button
├─ Save Restaurant
├─ Create Board
├─ Share Discovery
└─ Write Review
```

### Current User Flows

#### Critical Path 1: First-Time User Activation
```
App Download → Onboarding (3 screens) → Location Permission → 
Browse Without Account → Hit Paywall (Save limit) → 
Create Account → Connect Social → First Save → 
Discovery of Friends → First Board Creation
```

**Current Friction Points:**
- Generic onboarding doesn't show personal value
- Location permission asked too early
- Save limit (3) feels arbitrary and frustrating
- No immediate "aha moment" upon account creation
- Friend discovery buried in settings

#### Critical Path 2: Restaurant Discovery & Save
```
Open App → See Generic Feed → Search/Browse → Find Restaurant → 
View Details → Decide to Save → Choose Board → Add Context → 
Confirm Save → Return to Browse
```

**Current Friction Points:**
- Generic feed not personalized enough
- Search requires specific restaurant names
- Save flow has too many steps (4 taps minimum)
- Context/notes field underutilized
- No immediate gratification after saving

#### Critical Path 3: Social Interaction
```
Open App → Navigate to Friends → Find Friend → View Their Profile → 
Browse Their Boards → See Restaurant → Save to Own Board → 
No Engagement Options → Exit
```

**Current Friction Points:**
- Friends section hidden in profile
- No friend activity in main feed
- Can't comment or react to saves
- Missing social proof signals
- No collaborative features

### Visual Design Analysis

#### Current Design System
- **Color Palette:** Orange (#FFAD27) primary, white background, gray text
- **Typography:** System fonts, inconsistent hierarchy
- **Components:** Mix of material and custom design
- **Icons:** Inconsistent style (outlined vs. filled)
- **Spacing:** Inconsistent padding and margins

#### Design Weaknesses
1. **Visual Hierarchy Issues**
   - All content appears equally important
   - Insufficient use of white space
   - Text-heavy cards lack visual appeal

2. **Interaction Feedback**
   - No micro-animations on actions
   - Save confirmation too subtle
   - Loading states are generic spinners

3. **Information Density**
   - Restaurant cards show too much information
   - Cluttered UI in list views
   - Poor progressive disclosure

---

## 3. FRICTION POINTS & OPTIMIZATION OPPORTUNITIES

### Major Friction Points

#### 1. Onboarding Drop-off (68% abandon rate)
**Current Issue:** Generic value proposition, immediate account requirement
**Optimization Opportunity:**
- Implement "browse first, register later" flow
- Show personalized value based on first interaction
- Progressive onboarding over first week
- Social proof: "23 friends are already here"

#### 2. Save Abandonment (45% start but don't complete)
**Current Issue:** Multi-step process with context switching
**Optimization Opportunity:**
- One-tap save with smart defaults
- Inline board selection (no modal)
- Auto-suggest context based on time/location
- Swipe gestures for quick actions

#### 3. Low Social Engagement (12% interact with friends' content)
**Current Issue:** Social features buried, no engagement mechanisms
**Optimization Opportunity:**
- Friend activity prominent in main feed
- React/comment on saves
- "Friend tried your save" notifications
- Collaborative board invitations

#### 4. Creator Conversion (3% of users become creators)
**Current Issue:** Creator features hidden, high barrier to entry
**Optimization Opportunity:**
- Surface creator earnings potential
- "You could earn $X" based on saves
- One-tap creator application from profile
- Show success stories in feed

#### 5. Restaurant Attribution Gap (Can't prove ROI)
**Current Issue:** No visit tracking mechanism
**Optimization Opportunity:**
- Implement location-based attribution
- QR code check-ins for rewards
- Receipt upload for cashback
- Integration with payment providers

### Quick Wins (Implement within 2 weeks)

1. **Smart Save Button**
   - Floating save button on all restaurant views
   - Remembers last used board
   - One-tap with haptic feedback

2. **Friend Activity Feed Card**
   - Add "Friends eating now" section to home
   - Real-time updates with location
   - Social proof badges

3. **Contextual Notifications**
   - "Perfect for tonight" based on time
   - "3 friends loved this" social proof
   - Weather-based suggestions

4. **Visual Board Covers**
   - Auto-generate beautiful collages
   - Show board stats (places, visits)
   - Share-worthy designs

---

## 4. FEATURE EXPLORATION ROADMAP

### Phase 1: Foundation (Q1 2025)
**Goal:** Reduce friction, increase activation

#### Features to Implement:
1. **Progressive Onboarding**
   - Skip account creation initially
   - Value demonstration before commitment
   - Smart friend discovery

2. **One-Tap Save Flow**
   - Gesture-based saving
   - Smart context detection
   - Instant gratification animation

3. **Social Feed Reimagined**
   - Friend activity prioritized
   - Live "eating now" updates
   - Trending in your network

4. **Basic Attribution**
   - Location verification
   - Visit tracking opt-in
   - Simple ROI dashboard

**Success Metrics:**
- Onboarding completion: 50% → 75%
- Save completion rate: 55% → 85%
- Friend connections: 2 → 5 per user

### Phase 2: Engagement (Q2 2025)
**Goal:** Build habits, increase retention

#### Features to Explore:
1. **AI Personalization Engine**
   - Taste profile development
   - Smart recommendation timing
   - Predictive suggestions

2. **Social Mechanics**
   - Reactions and comments
   - Collaborative planning
   - Group ordering coordination

3. **Creator Tools Beta**
   - Portfolio import
   - Campaign matching
   - Performance analytics

4. **Gamification Elements**
   - Neighborhood explorer badges
   - Cuisine adventurer rewards
   - Streak tracking

**Success Metrics:**
- DAU/MAU: 15% → 30%
- Sessions per week: 2 → 4
- Creator signups: 50/month

### Phase 3: Monetization (Q3 2025)
**Goal:** Revenue generation, platform sustainability

#### Features to Build:
1. **Creator Marketplace Launch**
   - Full campaign management
   - Automated payments
   - Content distribution

2. **Premium Subscriptions**
   - Advanced analytics for users
   - Exclusive creator content
   - Early access features

3. **Restaurant Suite**
   - Full attribution dashboard
   - Competitor intelligence
   - Automated campaigns

4. **Sponsored Discovery**
   - Native advertising format
   - Performance-based pricing
   - Brand safety controls

**Success Metrics:**
- Creator GMV: $10K/month
- Premium subscribers: 500
- Restaurant MRR: $25K

### Phase 4: Scale (Q4 2025 & Beyond)
**Goal:** Market expansion, platform evolution

#### Features to Innovate:
1. **AI Restaurant Assistant**
   - Natural language search
   - Conversational planning
   - Predictive recommendations

2. **AR Discovery Mode**
   - Real-world overlays
   - Virtual food tours
   - Interactive menus

3. **Blockchain Attribution**
   - Transparent tracking
   - Creator smart contracts
   - Loyalty tokenization

4. **Global Expansion Features**
   - Multi-language support
   - Local payment methods
   - Cultural customization

**Success Metrics:**
- 1M+ users
- $1M ARR
- 3 new markets

---

## 5. UX DIFFERENTIATION STRATEGY

### Core Differentiators

#### 1. Trust-First Discovery
**Unlike Yelp:** No anonymous reviews or paid placements
**Unlike Instagram:** Actionable saves, not just pretty pictures
**Unlike Google:** Social context, not just location data

**Implementation:**
- Friend recommendations weighted 10x higher
- "Trusted by X friends" badges
- Social graph-based ranking
- Transparency in sponsorships

#### 2. Attribution-Driven Design
**Industry First:** Every interaction trackable to visit
**Unique Value:** Creators and restaurants see real impact

**Implementation:**
- Passive location tracking (opt-in)
- QR code integration
- Receipt scanning rewards
- Payment provider partnerships

#### 3. Creator-Centric Platform
**Unlike Traditional Influencer Platforms:** Built for micro-creators
**Unique Value:** Democratized monetization

**Implementation:**
- No follower minimums
- Performance-based compensation
- Automated campaign matching
- Instant payments

#### 4. AI-Powered Personalization
**Beyond Basic Recommendations:** Contextual, temporal, social

**Implementation:**
- Time-aware suggestions
- Weather-based recommendations  
- Social occasion detection
- Dietary preference learning

### Competitive Moats

1. **Data Network Effects**
   - More users = better recommendations
   - More saves = smarter AI
   - More creators = more content
   - More restaurants = more choice

2. **Social Graph Lock-in**
   - Friend connections create switching costs
   - Shared boards build collaboration
   - Social history creates value
   - Trust relationships are hard to rebuild

3. **Creator Economy Flywheel**
   - Creators bring audiences
   - Audiences bring restaurants
   - Restaurants bring revenue
   - Revenue brings more creators

4. **Attribution Technology**
   - Proprietary tracking methods
   - Integration partnerships
   - Historical data advantage
   - AI model training data

---

## 6. DESIGN PRINCIPLES FOR TROODIE

### Core Design Principles

#### 1. Progressive Disclosure
- Start simple, reveal complexity
- Context-dependent features
- Just-in-time education
- Earned feature access

#### 2. Social Proof First
- Friend activity visible everywhere
- Trust signals prominent
- Real behaviors over ratings
- Transparent attribution

#### 3. Delightful Efficiency
- One-tap primary actions
- Smart defaults everywhere
- Predictive assistance
- Micro-interactions that inform

#### 4. Visual Storytelling
- Images over text
- Stories over lists
- Journey over destination
- Progress over perfection

#### 5. Inclusive Accessibility
- Voice-first options
- High contrast modes
- Scalable typography
- Gesture alternatives

### Design System Evolution

#### Typography Hierarchy
```
H1: 32px - Bold - Screen titles
H2: 24px - Semibold - Section headers  
H3: 20px - Medium - Card titles
Body: 16px - Regular - Primary content
Caption: 14px - Regular - Secondary info
Small: 12px - Regular - Metadata
```

#### Color System Extension
```
Primary Actions: #FFAD27 (Orange)
Success States: #52C41A (Green)
Social Actions: #4A90E2 (Blue)
Creator Content: #9B59B6 (Purple)
Premium Features: #F39C12 (Gold)
```

#### Component Library
- Cards: Visual-first with progressive info
- Buttons: Clear hierarchy with haptic feedback
- Navigation: Contextual with smart defaults
- Forms: Inline validation with helpful hints
- Modals: Minimized in favor of inline actions

---

## 7. MEASURING SUCCESS

### Key Performance Indicators (KPIs)

#### User Activation Metrics
- **Onboarding Completion:** Target 75% (from 32%)
- **First Save:** Within 3 minutes (from 8 minutes)
- **Friend Connection:** 5+ in first week (from 2)
- **Board Creation:** Within first session (from day 3)

#### Engagement Metrics
- **DAU/MAU:** Target 35% (from 15%)
- **Saves per User:** 10/month (from 4)
- **Social Interactions:** 5/week (from 1)
- **Session Duration:** 8 minutes (from 4)

#### Creator Metrics
- **Creator Conversion:** 10% of active users (from 3%)
- **Content Production:** 3 posts/creator/week
- **Campaign Completion:** 85% (from 60%)
- **Creator Retention:** 70% 6-month (from 40%)

#### Business Metrics
- **Restaurant Attribution:** 25% of saves → visits
- **Campaign ROI:** 3.5x average (from unknown)
- **Platform Take Rate:** 15% of GMV
- **LTV/CAC Ratio:** 3:1 minimum

### A/B Testing Framework

#### Test Priority Queue
1. Onboarding: Skip vs. Required account
2. Save Flow: One-tap vs. Multi-step
3. Feed Algorithm: Social vs. Proximity vs. Hybrid
4. Creator Prompt: Earnings vs. Impact vs. Recognition
5. Navigation: Bottom tabs vs. Hamburger + FAB

#### Testing Methodology
- Minimum 10,000 users per variant
- 95% statistical significance required
- 2-week minimum test duration
- Cohort analysis for retention impact
- Qualitative feedback collection

---

## 8. IMPLEMENTATION PRIORITIES

### Immediate Actions (Week 1-2)

1. **Fix Save Flow**
   - Reduce to 2 taps maximum
   - Add haptic feedback
   - Show success animation
   - Implement quick-save gesture

2. **Surface Social Features**
   - Add friend activity to home feed
   - Show "friends who saved" on restaurants
   - Enable social notifications
   - Add friend discovery prompt

3. **Improve Onboarding**
   - Allow browse without account
   - Show value before asking for signup
   - Progressive permission requests
   - Personalized welcome based on entry point

### Short-term Improvements (Month 1-2)

1. **Launch Creator Beta**
   - Simple application flow
   - Basic campaign matching
   - Portfolio import tool
   - Performance dashboard

2. **Implement Attribution MVP**
   - Location-based visit tracking
   - Basic ROI reporting
   - Campaign performance metrics
   - Creator impact scores

3. **Enhance Personalization**
   - Time-based recommendations
   - Dietary preference detection
   - Social occasion awareness
   - Taste profile development

### Medium-term Goals (Quarter 1-2)

1. **Full Creator Marketplace**
   - Automated campaign management
   - AI-powered matching
   - Instant payments
   - Cross-platform posting

2. **Advanced Analytics**
   - Predictive insights
   - Competitive intelligence
   - Trend detection
   - Audience segmentation

3. **Social Commerce Features**
   - Group ordering
   - Event planning
   - Gift cards
   - Loyalty programs

---

## 9. CONCLUSION

### Strategic Imperatives

Troodie's success hinges on three critical UX transformations:

1. **Reduce Friction Radically**
   - Every additional tap costs 20% of users
   - Progressive disclosure prevents overwhelm
   - Smart defaults eliminate decisions

2. **Amplify Social Signals**
   - Friends create trust
   - Trust drives action
   - Action creates value
   - Value attracts restaurants

3. **Close the Attribution Loop**
   - Prove ROI to get restaurant buy-in
   - Restaurant revenue funds creators
   - Creator content attracts users
   - Users provide attribution data

### The Path Forward

Troodie has the opportunity to redefine restaurant discovery by solving the attribution problem that has plagued the industry. By focusing on trust-based social recommendations and measurable outcomes, we can build a platform that serves all stakeholders better than existing solutions.

The key is to start with reducing friction in core flows, then layer in social mechanics, and finally close the loop with attribution. Each phase builds on the previous, creating compounding value and network effects.

Success will be measured not just in user growth, but in restaurants saved, creators empowered, and dining experiences enhanced. Troodie isn't just another food app - it's the missing link between social influence and restaurant success.

---

*UX Design Document v1.0*
*Last Updated: January 2025*
*Prepared by: Senior UX Design Team*