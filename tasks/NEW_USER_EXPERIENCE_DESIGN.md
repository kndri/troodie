# Troodie New User Experience Design - No Friends Scenario

## Overview
This document expands on all screens from ENHANCED_DESIGN_PROMPTS.md specifically for the **new user with no friends on the platform** scenario. Each screen is redesigned to provide value, engagement, and motivation even when the social layer is empty.

## Core Principles for Solo Users
1. **Value Before Social**: Demonstrate core value without requiring friends
2. **Progressive Social Disclosure**: Introduce social features gradually
3. **AI-Powered Personalization**: Use ML to fill the gap left by missing social signals
4. **Community Building**: Connect users with local food community, not just friends
5. **Gamification**: Solo achievements and exploration rewards
6. **Content-First**: Focus on restaurant discovery over social features initially

---

## 1. ONBOARDING - NO FRIENDS VARIANT

### User Scenario
**New user Sarah, 28, just downloaded the app**
"I don't know anyone using this app yet. I need to see immediate value without the social aspect."

### Screen 1.1: Welcome Without Social Pressure

```
┌─────────────────────────┐
│     Welcome to Troodie  │ H1, #262626
│                         │
│   Your Personal Food    │ H3, #8C8C8C
│   Discovery Journey     │
│                         │
│     🍽️                  │ Large icon (80px)
│                         │
│  ┌─────────────────────┐ │
│  │ 📍 Discover 47 great│ │ Location-based
│  │    spots near you   │ │ value prop
│  │    right now        │ │ BG: #FFAD27
│  └─────────────────────┘ │ Text: White
│                         │
│  ┌─────────────────────┐ │
│  │ 🎯 Build your       │ │ Personal value
│  │    taste profile    │ │ BG: #FAFAFA
│  └─────────────────────┘ │
│                         │
│  ┌─────────────────────┐ │
│  │ 🏆 Explore & earn   │ │ Gamification
│  │    rewards          │ │ No friends needed
│  └─────────────────────┘ │
│                         │
│  [Get Started Solo]      │ Acknowledge solo
│  [I have friends here]   │ Secondary option
└─────────────────────────┘

Key Design Decision:
- Removed "See what friends are eating"
- Added "Get Started Solo" to normalize experience
- Focus on personal journey, not social
```

### Screen 1.2: Taste Profile Builder (Replaces Friend Finding)

```
┌─────────────────────────┐
│  Let's learn your taste │ H2, #262626
│                         │
│  Quick picks (3 of 5):  │ Progress shown
│                         │
│  Which looks amazing?   │ Visual selection
│  ┌────────┬────────────┐ │
│  │ [Sushi]│  [Tacos]   │ │ Large images
│  │   🍣   │     🌮     │ │ Tap to select
│  ├────────┼────────────┤ │
│  │ [Pizza]│  [Curry]   │ │
│  │   🍕   │     🍛     │ │
│  └────────┴────────────┘ │
│                         │
│  Your Profile: 60% Built│ Progress bar
│  ████████░░░░           │
│                         │
│  [Continue →]           │
│                         │
│  Why this matters:      │ Small text
│  • Personalized recs    │ Value explanation
│  • No reviews needed    │
│  • Find hidden gems     │
└─────────────────────────┘

Key Design Decision:
- Build taste profile instead of finding friends
- Visual, quick interactions
- Clear value proposition for solo users
```

### Screen 1.3: First Achievement (Immediate Reward)

```
┌─────────────────────────┐
│     Congratulations! 🎉  │ Celebration
│                         │
│  ┌─────────────────────┐ │
│  │     🏆 Pioneer      │ │ First badge
│  │ "Early Explorer of  │ │ earned
│  │  [Neighborhood]"    │ │ Location-specific
│  └─────────────────────┘ │
│                         │
│  You're one of the first│ Exclusive feeling
│  50 food explorers in   │
│  your area!             │
│                         │
│  ┌─────────────────────┐ │
│  │ Your first mission: │ │ Gamified task
│  │ Try 1 new spot this│ │ No friends needed
│  │ week for bonus pts │ │
│  └─────────────────────┘ │
│                         │
│  [Start Exploring]      │ Primary CTA
│                         │
│  [Invite Friends +100pts]│ Optional social
└─────────────────────────┘

Key Design Decision:
- Immediate achievement/reward
- Solo missions and challenges
- Social as optional bonus, not requirement
```

---

## 2. HOME/DISCOVER - NO FRIENDS VARIANT

### User Scenario
**Mike has no friends on the app yet**
"I want to discover great food without feeling lonely or like I'm missing out on the social features."

### Screen 2.1: AI-Curated Personal Feed

```
┌─────────────────────────┐
│ Good evening, Mike 🌙   │ Personal greeting
│ Ready to explore?       │ No mention of friends
│                         │
│ ┌─────────────────────┐ │
│ │ 🎯 For You Tonight  │ │ AI-powered section
│ │ Based on your taste │ │ Replaces friends
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ Italian Kitchen      │ │ Restaurant card
│ │ ⭐4.8 · $$ · 0.3mi   │ │ 
│ │ "87% match for you" │ │ AI match score
│ │ 👥 23 diners tonight│ │ Community activity
│ └─────────────────────┘ │ (not friends)
│                         │
│ Community Loves 🔥      │ Local trending
│ ┌─────────────────────┐ │ Not friend-based
│ │ Thai House          │ │
│ │ "Trending this week"│ │
│ │ 142 saves locally   │ │ Community stats
│ └─────────────────────┘ │
│                         │
│ Your Daily Challenge 🎯 │ Gamification
│ ┌─────────────────────┐ │
│ │ Try a new cuisine:  │ │ Solo achievement
│ │ Japanese (+50 pts)  │ │
│ │ [View Options →]    │ │
│ └─────────────────────┘ │
└─────────────────────────┘

Key Design Decision:
- AI "For You" replaces "Friends loving"
- Community activity instead of friend activity
- Daily challenges for engagement
```

### Screen 2.2: Explore Mode (Discovery Focus)

```
┌─────────────────────────┐
│ ┌──────────────────────┐│ Hero section
│ │ 📍 Discover Mode     ││ Emphasize explore
│ │ 3 hidden gems nearby ││ Gamified discovery
│ └──────────────────────┘│
│                         │
│ Categories to Explore:  │ Browse by type
│ ┌────────┬────────────┐ │
│ │ 🍕 Pizza│ 🍜 Ramen   │ │ Visual categories
│ │ 12 spots│ 8 spots    │ │ With counts
│ ├────────┼────────────┤ │
│ │ ☕ Cafe │ 🍺 Bars    │ │
│ │ 24 spots│ 15 spots   │ │
│ └────────┴────────────┘ │
│                         │
│ Solo Diner Friendly 🌟  │ Special section
│ ┌─────────────────────┐ │ for new users
│ │ • Counter seating   │ │
│ │ • WiFi + outlets    │ │
│ │ • Quick service     │ │
│ │ [See all 18 spots]  │ │
│ └─────────────────────┘ │
│                         │
│ Your Stats This Week:   │ Personal progress
│ 🏃 Places explored: 3   │ No social comparison
│ 🎯 Challenges done: 1   │
│ 🏆 Points earned: 150   │
└─────────────────────────┘

Key Design Decision:
- Category browsing prominent
- Solo-friendly filter
- Personal stats, not social
```

---

## 3. NEARBY/MAP - NO FRIENDS VARIANT

### User Scenario
**Lisa exploring alone without friends on the app**
"I want to explore my neighborhood and feel part of the local food scene even without friends here."

### Screen 3.1: Community Heat Map

```
┌─────────────────────────┐
│ ┌─────────────────────┐ │
│ │ 🔍 Explore [Area]   │ │ Location focus
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │                     │ │ Map view
│ │    [Heat Map]       │ │ Shows activity
│ │   🔥 🔥 🔥          │ │ Hot spots
│ │      📍 YOU         │ │ (community-based,
│ │   🔥     🔥         │ │  not friend-based)
│ │                     │ │
│ └─────────────────────┘ │
│                         │
│ What's Happening Now:   │ Live community
│ ┌─────────────────────┐ │ activity
│ │ 📍 Thai House       │ │
│ │ 12 people now       │ │ Real-time diners
│ │ "Busy - 20min wait" │ │ Helpful info
│ ├─────────────────────┤ │
│ │ 📍 Coffee Co        │ │
│ │ Perfect for work    │ │ Context tags
│ │ "Quiet, has WiFi"   │ │
│ └─────────────────────┘ │
│                         │
│ [🎯 Start Food Hunt]    │ Gamified explore
└─────────────────────────┘

Key Design Decision:
- Heat map shows community activity
- Real-time occupancy info
- Gamified exploration ("Food Hunt")
```

### Screen 3.2: Exploration Rewards Map

```
┌─────────────────────────┐
│ Your Exploration Map 🗺️ │ Personal progress
│ ┌─────────────────────┐ │
│ │ [Map with badges]   │ │ Unlockable areas
│ │  🏆  ?  ?           │ │ Completed vs locked
│ │    YOU  ?           │ │ Mystery spots
│ │  ✓  ?  🏆          │ │ Achievements
│ └─────────────────────┘ │
│                         │
│ Unlock Rewards:         │ Motivation
│ • Visit 3 spots = Badge│ No friends needed
│ • Try 5 cuisines = Bonus│
│ • Complete area = Title │
│                         │
│ Next Achievement:       │ Clear goal
│ ┌─────────────────────┐ │
│ │ 🎯 Neighborhood Pro │ │
│ │ Visit 2 more spots  │ │ Progress shown
│ │ ████████░░ (80%)    │ │
│ └─────────────────────┘ │
└─────────────────────────┘

Key Design Decision:
- Personal exploration map
- Mystery/unlock mechanics
- Achievement-based motivation
```

---

## 4. QUICK ACTION (+) - NO FRIENDS VARIANT

### User Scenario
**Alex wants to save places but has no one to share with yet**
"I want to build my personal collection without feeling pressure to share."

### Screen 4.1: Personal Collection Builder

```
┌─────────────────────────┐
│ Save to Your Journey 📌 │ Personal framing
│                         │
│ ┌─────────────────────┐ │
│ │ 🔍 Search place...  │ │
│ └─────────────────────┘ │
│                         │
│ Save as:                │ Personal categories
│ ┌─────────────────────┐ │
│ │ 📍 Want to try      │ │ Standard options
│ ├─────────────────────┤ │
│ │ ✅ Been there       │ │
│ ├─────────────────────┤ │
│ │ ❤️ Love it         │ │
│ ├─────────────────────┤ │
│ │ 🎯 Challenge spot   │ │ Gamified option
│ └─────────────────────┘ │
│                         │
│ Add private note:       │ Emphasis on private
│ ┌─────────────────────┐ │
│ │ "My thoughts..."    │ │ Personal journal
│ └─────────────────────┘ │
│                         │
│ [Save Privately]        │ Default private
│                         │
│ 🏆 Earn +10 points      │ Reward for saving
│ Build streaks for bonus!│ Engagement mechanic
└─────────────────────────┘

Key Design Decision:
- Emphasize private/personal saving
- Add gamification rewards
- No social sharing pressure
```

---

## 5. SAVED/COLLECTIONS - NO FRIENDS VARIANT

### User Scenario
**Emma organizing her saves without social features**
"I want to organize my restaurant discoveries for myself, not for sharing."

### Screen 5.1: Personal Food Journal

```
┌─────────────────────────┐
│ Your Food Journey 📔    │ Personal framing
│ ┌─────────────────────┐ │
│ │ 47 discoveries      │ │ Personal stats
│ │ 12 favorites        │ │ No social metrics
│ │ 5 cuisines explored │ │
│ └─────────────────────┘ │
│                         │
│ Your Collections:       │ Private by default
│ ┌──────────┬──────────┐ │
│ │ Want to  │ Weekend  │ │
│ │ Try (23) │ Spots(8) │ │
│ │ [grid]   │ [grid]   │ │
│ ├──────────┼──────────┤ │
│ │ Date     │ Quick    │ │
│ │ Ideas(5) │ Lunch(11)│ │
│ │ [grid]   │ [grid]   │ │
│ └──────────┴──────────┘ │
│                         │
│ AI Suggested Lists:     │ Smart organization
│ ┌─────────────────────┐ │
│ │ "You might like     │ │ Based on saves
│ │  organizing by:"    │ │ Not social
│ │ • Price range       │ │
│ │ • Distance          │ │
│ │ • Cuisine type      │ │
│ │ [Auto-organize →]   │ │
│ └─────────────────────┘ │
└─────────────────────────┘

Key Design Decision:
- Frame as personal journal
- AI helps organize, not social
- Private collections emphasized
```

---

## 6. PROFILE/YOU - NO FRIENDS VARIANT

### User Scenario
**David viewing his profile without social connections**
"I want to see my food journey and progress without comparing to others."

### Screen 6.1: Personal Achievement Dashboard

```
┌─────────────────────────┐
│ Your Food Personality 🍽️│ Identity focus
│ ┌────────────────────┐  │
│ │ [Avatar] David K.   │  │ 
│ │ 🏆 Local Explorer   │  │ Earned title
│ │ Level 5 · 450 pts   │  │ Gamification
│ └────────────────────┘  │
│                         │
│ Your Taste DNA:         │ Personal insights
│ ┌─────────────────────┐ │
│ │ Adventurous  75%    │ │ Personality traits
│ │ Traditional  40%    │ │ Not comparisons
│ │ Budget-aware 60%    │ │
│ └─────────────────────┘ │
│                         │
│ This Month:             │ Personal goals
│ ┌─────────────────────┐ │
│ │ 🎯 Goal: 5 new spots│ │ Self-improvement
│ │ ████████░░ (4/5)    │ │ Progress tracking
│ │ Complete for badge! │ │
│ └─────────────────────┘ │
│                         │
│ Your Journey:           │ Timeline view
│ • Started: 2 weeks ago  │ Personal milestones
│ • Explored: 12 places   │
│ • Favorite: Thai cuisine│
│ • Next unlock: Level 6  │
│                         │
│ [Share Achievements]    │ Optional sharing
└─────────────────────────┘

Key Design Decision:
- Focus on personal progress
- Gamification replaces social
- Achievement-based identity
```

---

## 7. EMPTY STATES & PROMPTS

### Screen 7.1: Activity Feed Empty State

```
┌─────────────────────────┐
│ Your Personalized Feed  │
│                         │
│ ┌─────────────────────┐ │
│ │    🌱 Growing...    │ │ Positive framing
│ │                     │ │
│ │ Your feed gets      │ │ Explain value
│ │ smarter with every  │ │
│ │ place you explore!  │ │
│ └─────────────────────┘ │
│                         │
│ Start with these:       │ Immediate actions
│ ┌─────────────────────┐ │
│ │ 📍 Trending nearby  │ │ No friends needed
│ │ 🎯 Daily challenge  │ │
│ │ 🔥 Hot right now    │ │
│ └─────────────────────┘ │
│                         │
│ Want social features?   │ Gentle nudge
│ [Invite your friends]   │ Optional
│ Earn 100 points each!   │ Incentivized
└─────────────────────────┘
```

### Screen 7.2: Social Features Placeholder

```
┌─────────────────────────┐
│ Friend Activity         │
│ ┌─────────────────────┐ │
│ │   Be the Pioneer! 🚀│ │ Positive spin
│ │                     │ │
│ │ You're exploring    │ │ Make them special
│ │ [Area] first!       │ │
│ │                     │ │
│ │ Invite friends to:  │ │ Value props
│ │ • Share discoveries │ │
│ │ • Plan group dining │ │
│ │ • See their spots   │ │
│ └─────────────────────┘ │
│                         │
│ [Share Invite Link]     │ Easy sharing
│ "Join me on Troodie"    │ Pre-written message
│                         │
│ Meanwhile, explore:     │ Alternative value
│ ┌─────────────────────┐ │
│ │ 👥 Community Picks  │ │ Community replaces
│ │ See what locals love│ │ friends temporarily
│ └─────────────────────┘ │
└─────────────────────────┘
```

---

## 8. INVITATION FLOWS

### Screen 8.1: Smart Invite System

```
┌─────────────────────────┐
│ Build Your Food Crew 👥 │ Casual framing
│                         │
│ ┌─────────────────────┐ │
│ │ Earn rewards:       │ │ Clear incentives
│ │ You get: 100 pts    │ │
│ │ They get: 100 pts   │ │
│ │ Unlock: Team badges │ │
│ └─────────────────────┘ │
│                         │
│ Quick Invite:           │ Multiple methods
│ ┌─────────────────────┐ │
│ │ [📱 Text] [📧 Email]│ │ Channel options
│ │ [🔗 Link] [QR Code] │ │
│ └─────────────────────┘ │
│                         │
│ Your Invite Message:    │ Customizable
│ ┌─────────────────────┐ │
│ │ "Hey! I'm exploring │ │ Pre-written
│ │ great food spots on │ │ Editable
│ │ Troodie. Join me to │ │
│ │ discover [Area]'s   │ │ Personalized
│ │ best restaurants!"  │ │
│ └─────────────────────┘ │
│                         │
│ [Send Invites]          │
│                         │
│ No pressure! You earn   │ Reassurance
│ points exploring solo too│
└─────────────────────────┘
```

---

## 9. GAMIFICATION SYSTEM FOR SOLO USERS

### Screen 9.1: Achievement Center

```
┌─────────────────────────┐
│ Your Achievements 🏆    │
│                         │
│ Current Level: 5        │ Progress system
│ ████████████░░░░        │ 450/600 XP
│                         │
│ Recent Unlocks:         │ Celebration
│ ┌─────────────────────┐ │
│ │ 🗺️ Area Explorer   │ │ Location-based
│ │ 🍜 Ramen Rookie     │ │ Cuisine-based
│ │ 📅 Week Warrior     │ │ Consistency
│ └─────────────────────┘ │
│                         │
│ Next Challenges:        │ Clear goals
│ ┌─────────────────────┐ │
│ │ □ Try Mexican food  │ │ Specific tasks
│ │   +50 XP            │ │ Clear rewards
│ │ □ Save 10 spots     │ │
│ │   +30 XP            │ │
│ │ □ Write 3 notes     │ │
│ │   +20 XP            │ │
│ └─────────────────────┘ │
│                         │
│ Leaderboard:            │ Anonymous compete
│ You: #127 in [Area]     │ Local ranking
│ [See Top Explorers]     │ Without names
└─────────────────────────┘
```

---

## 10. ONBOARDING COMPLETION FOR SOLO USERS

### Screen 10.1: Account Creation Without Social Pressure

```
┌─────────────────────────┐
│ Save Your Progress 💾   │ Practical framing
│                         │
│ You've discovered:      │ Show value
│ ┌─────────────────────┐ │
│ │ 📍 12 great spots   │ │ Quantify progress
│ │ 🏆 3 achievements   │ │
│ │ 🎯 150 points       │ │
│ └─────────────────────┘ │
│                         │
│ Create account to:      │ Clear benefits
│ • Keep your discoveries │ Loss aversion
│ • Track your journey    │ Personal value
│ • Unlock more rewards   │ Gamification
│                         │
│ ┌─────────────────────┐ │
│ │ Continue with Apple │ │ Quick options
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ Use Email Instead   │ │ Alternative
│ └─────────────────────┘ │
│                         │
│ [Create Solo Account]   │ Acknowledge solo
│                         │
│ Add friends later       │ No pressure
│ when you're ready       │ Reassurance
└─────────────────────────┘
```

---

## 11. PROGRESSIVE SOCIAL FEATURES

### Timeline for Introducing Social Elements

#### Week 1: Pure Discovery
- Focus on restaurant discovery
- Personal achievements only
- AI recommendations
- Community heat maps

#### Week 2: Soft Social
- "Others also saved"
- Community trending
- Anonymous comparisons
- Optional friend invites

#### Week 3: Social Nudges
- "Invite bonus" promotions
- Show friend benefits
- Team challenges preview
- Success stories

#### Week 4: Full Social
- Friend activity visible
- Social features unlocked
- Group features available
- Collaborative lists

---

## 12. RETENTION STRATEGIES FOR SOLO USERS

### Daily Engagement Hooks

1. **Daily Challenge**
   - New cuisine to try
   - Distance-based goals
   - Time-specific (lunch/dinner)

2. **Streak System**
   - Check-in streaks
   - Save streaks
   - Exploration streaks

3. **Progressive Unlocks**
   - New badges daily
   - Area unlocks
   - Feature unlocks

4. **Smart Notifications**
   - "New spot opened near you"
   - "You haven't tried Indian food yet"
   - "Complete challenge for bonus"

### Weekly Engagement

1. **Weekly Recap**
   - Places discovered
   - Points earned
   - Next goals

2. **Weekend Challenges**
   - Special weekend-only tasks
   - Double points events
   - Limited-time achievements

3. **Community Events**
   - Local food weeks
   - Cuisine celebrations
   - Neighborhood challenges

---

## Implementation Priority

### Phase 1: Core Solo Experience
1. Taste profile builder
2. AI recommendations
3. Basic gamification
4. Personal collections

### Phase 2: Community Layer
1. Community heat maps
2. Anonymous trending
3. Local leaderboards
4. Area challenges

### Phase 3: Social Introduction
1. Invite system
2. Friend benefits preview
3. Team challenges
4. Social features

### Phase 4: Full Social
1. Friend activity
2. Social sharing
3. Group features
4. Collaborative tools

---

## Success Metrics for Solo Users

### Activation (Day 1)
- Complete taste profile: >80%
- Save first restaurant: >70%
- Earn first achievement: >90%
- No friend requirement: 100%

### Retention (Week 1)
- Return Day 2: >60%
- Return Day 7: >40%
- Restaurants saved: >5
- Achievements earned: >3

### Engagement (Month 1)
- Sessions per week: >3
- Restaurants explored: >10
- Collections created: >2
- Friend invites sent: >1 (optional)

### Conversion (Month 2)
- Invite friends: >30%
- Premium upgrade: >10%
- Review written: >20%
- Social features adopted: >25%

---

## Key Design Decisions Summary

1. **Remove ALL friend dependencies** from core flows
2. **Add gamification** to every major action
3. **Use AI/ML** to replace social signals
4. **Show community activity** instead of friend activity
5. **Make social features optional bonuses**, not requirements
6. **Celebrate solo exploration** as valid and rewarding
7. **Progressive disclosure** of social features over time
8. **Personal journey framing** throughout the app
9. **Achievement system** as primary motivation
10. **Community connection** before friend connection

---

_Document created: January 2025_
_Focused on new user experience without friends on platform_
_Complements ENHANCED_DESIGN_PROMPTS.md with solo user scenarios_