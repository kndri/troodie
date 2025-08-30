# Troodie v1.0 Design Tracker
**Target Launch:** September 20th, 2025  
**Primary Color:** Troodie Gold (#FFAD27)  
**Design System:** v3.0  
**Last Updated:** August 29, 2025

---

## 📊 Design Progress Overview

### Summary Stats
- **Total Screens to Design:** 75
- **Completed:** 0
- **In Progress:** 0
- **Not Started:** 75
- **Completion:** 0%

### Priority Distribution
- 🔴 **Critical (P0):** 15 screens - Core user journey
- 🟠 **High (P1):** 20 screens - Key features
- 🟡 **Medium (P2):** 25 screens - Supporting screens
- 🟢 **Low (P3):** 15 screens - Nice-to-have

---

## 🎯 WEEK 1-2: CRITICAL PATH (Launch Blockers)

### Onboarding Flow - 6 Screens
| Screen | Priority | Status | Designer | Notes |
|--------|----------|--------|----------|-------|
| `/onboarding/welcome` | 🔴 P0 | ⬜ Not Started | - | First impression, must nail value prop |
| `/onboarding/intent` | 🔴 P0 | ⬜ Not Started | - | "What brings you here?" - personalization |
| `/onboarding/location` | 🔴 P0 | ⬜ Not Started | - | Permission request with value explanation |
| `/onboarding/preferences` | 🔴 P0 | ⬜ Not Started | - | Quick cuisine/vibe selection |
| `/onboarding/first-saves` | 🔴 P0 | ⬜ Not Started | - | 3 restaurant quick save challenge |
| `/onboarding/complete` | 🔴 P0 | ⬜ Not Started | - | Success state with confetti |

### Main Navigation - 5 Screens
| Screen | Priority | Status | Designer | Notes |
|--------|----------|--------|----------|-------|
| `/discover` | 🔴 P0 | ⬜ Not Started | - | Unified adaptive feed (all user states) |
| `/map` | 🔴 P0 | ⬜ Not Started | - | Interactive map with restaurant pins |
| `/add` (modal) | 🔴 P0 | ⬜ Not Started | - | Central creation hub |
| `/saves` | 🔴 P0 | ⬜ Not Started | - | Boards & collections |
| `/profile` | 🔴 P0 | ⬜ Not Started | - | User hub with stats |

### Restaurant Detail - 4 Screens
| Screen | Priority | Status | Designer | Notes |
|--------|----------|--------|----------|-------|
| `/restaurant/[id]` | 🔴 P0 | ⬜ Not Started | - | Main detail view with tabs |
| `/restaurant/[id]/photos` | 🟠 P1 | ⬜ Not Started | - | Photo gallery modal |
| `/restaurant/[id]/reviews` | 🟠 P1 | ⬜ Not Started | - | Reviews list |
| `/restaurant/[id]/similar` | 🟡 P2 | ⬜ Not Started | - | AI-powered similar restaurants |

**Week 1-2 Deliverables:** 15 screens minimum

---

## 📱 WEEK 3-4: CORE FEATURES

### Auth Screens - 4 Screens
| Screen | Priority | Status | Designer | Notes |
|--------|----------|--------|----------|-------|
| `/auth/login` | 🔴 P0 | ⬜ Not Started | - | Email + social login |
| `/auth/signup` | 🔴 P0 | ⬜ Not Started | - | Quick registration |
| `/auth/forgot-password` | 🟠 P1 | ⬜ Not Started | - | Password recovery |
| `/auth/verify-email` | 🟠 P1 | ⬜ Not Started | - | Email verification |

### Save Flow - 3 Screens
| Screen | Priority | Status | Designer | Notes |
|--------|----------|--------|----------|-------|
| `/add/save/camera` | 🟠 P1 | ⬜ Not Started | - | Camera capture screen |
| `/add/save/identify` | 🟠 P1 | ⬜ Not Started | - | Restaurant identification |
| `/add/save/organize` | 🟠 P1 | ⬜ Not Started | - | Board selection |

### Boards & Collections - 4 Screens
| Screen | Priority | Status | Designer | Notes |
|--------|----------|--------|----------|-------|
| `/saves/boards/[id]` | 🟠 P1 | ⬜ Not Started | - | Board detail view |
| `/saves/recent` | 🟠 P1 | ⬜ Not Started | - | Recent saves list |
| `/saves/map-view` | 🟡 P2 | ⬜ Not Started | - | Map of saved places |
| `/add/create-board` | 🟠 P1 | ⬜ Not Started | - | New board creation |

### Social Features - 6 Screens
| Screen | Priority | Status | Designer | Notes |
|--------|----------|--------|----------|-------|
| `/user/[id]` | 🟠 P1 | ⬜ Not Started | - | Other user profiles |
| `/friends` | 🟠 P1 | ⬜ Not Started | - | Friends list |
| `/friends/find` | 🟠 P1 | ⬜ Not Started | - | Friend discovery |
| `/activity` | 🟡 P2 | ⬜ Not Started | - | Activity feed |
| `/activity/notifications` | 🟡 P2 | ⬜ Not Started | - | Notifications center |
| `/search` | 🟠 P1 | ⬜ Not Started | - | Universal search |

**Week 3-4 Deliverables:** 17 screens

---

## 💰 WEEK 5-6: MONETIZATION

### Creator Onboarding - 4 Screens
| Screen | Priority | Status | Designer | Notes |
|--------|----------|--------|----------|-------|
| `/creator/onboarding` | 🟠 P1 | ⬜ Not Started | - | Value prop & intro |
| `/creator/onboarding/qualify` | 🟠 P1 | ⬜ Not Started | - | Qualification check |
| `/creator/onboarding/portfolio` | 🟠 P1 | ⬜ Not Started | - | Content showcase |
| `/creator/onboarding/payments` | 🟠 P1 | ⬜ Not Started | - | Stripe Connect setup |

### Creator Studio - 5 Screens
| Screen | Priority | Status | Designer | Notes |
|--------|----------|--------|----------|-------|
| `/studio` | 🟠 P1 | ⬜ Not Started | - | Creator dashboard |
| `/studio/opportunities` | 🟠 P1 | ⬜ Not Started | - | Available campaigns |
| `/studio/campaigns/[id]` | 🟠 P1 | ⬜ Not Started | - | Campaign detail |
| `/studio/earnings` | 🟡 P2 | ⬜ Not Started | - | Earnings & payouts |
| `/studio/analytics` | 🟡 P2 | ⬜ Not Started | - | Performance metrics |

### Restaurant Claiming - 5 Screens
| Screen | Priority | Status | Designer | Notes |
|--------|----------|--------|----------|-------|
| `/restaurant/claim/[id]` | 🟠 P1 | ⬜ Not Started | - | Claim initiation |
| `/restaurant/claim/verify` | 🟠 P1 | ⬜ Not Started | - | Verification methods |
| `/restaurant/claim/details` | 🟠 P1 | ⬜ Not Started | - | Business information |
| `/restaurant/claim/onboard` | 🟠 P1 | ⬜ Not Started | - | First campaign setup |
| `/restaurant/dashboard/[id]` | 🟠 P1 | ⬜ Not Started | - | Owner dashboard |

### Business Portal - 8 Screens
| Screen | Priority | Status | Designer | Notes |
|--------|----------|--------|----------|-------|
| `/business/dashboard` | 🟡 P2 | ⬜ Not Started | - | Business overview |
| `/business/campaigns` | 🟡 P2 | ⬜ Not Started | - | Campaign management |
| `/campaigns/create` | 🟡 P2 | ⬜ Not Started | - | New campaign flow |
| `/campaigns/[id]/edit` | 🟡 P2 | ⬜ Not Started | - | Edit campaign |
| `/campaigns/[id]/creators` | 🟡 P2 | ⬜ Not Started | - | Creator applications |
| `/business/analytics` | 🟡 P2 | ⬜ Not Started | - | Performance metrics |
| `/business/settings` | 🟢 P3 | ⬜ Not Started | - | Business settings |
| `/business/billing` | 🟢 P3 | ⬜ Not Started | - | Billing & invoices |

**Week 5-6 Deliverables:** 22 screens

---

## 🔧 WEEK 7-8: POLISH & EDGE CASES

### Profile & Settings - 8 Screens
| Screen | Priority | Status | Designer | Notes |
|--------|----------|--------|----------|-------|
| `/profile/edit` | 🟡 P2 | ⬜ Not Started | - | Edit profile modal |
| `/profile/achievements` | 🟢 P3 | ⬜ Not Started | - | Gamification badges |
| `/profile/food-personality` | 🟢 P3 | ⬜ Not Started | - | Quiz results |
| `/settings` | 🟡 P2 | ⬜ Not Started | - | Main settings |
| `/settings/notifications` | 🟡 P2 | ⬜ Not Started | - | Notification prefs |
| `/settings/privacy` | 🟡 P2 | ⬜ Not Started | - | Privacy controls |
| `/settings/account` | 🟡 P2 | ⬜ Not Started | - | Account management |
| `/settings/payments` | 🟡 P2 | ⬜ Not Started | - | Payment methods |

### Additional Features - 7 Screens
| Screen | Priority | Status | Designer | Notes |
|--------|----------|--------|----------|-------|
| `/add/create-review` | 🟡 P2 | ⬜ Not Started | - | Review creation |
| `/add/share-link` | 🟡 P2 | ⬜ Not Started | - | External link sharing |
| `/discover/category/[cat]` | 🟢 P3 | ⬜ Not Started | - | Category browse |
| `/discover/trending` | 🟢 P3 | ⬜ Not Started | - | Trending section |
| `/map/filters` | 🟢 P3 | ⬜ Not Started | - | Map filter panel |
| `/friends/invite` | 🟢 P3 | ⬜ Not Started | - | Invite friends |
| `/friends/pending` | 🟢 P3 | ⬜ Not Started | - | Pending requests |

### Error & Utility - 6 Screens
| Screen | Priority | Status | Designer | Notes |
|--------|----------|--------|----------|-------|
| `/error/404` | 🟢 P3 | ⬜ Not Started | - | Not found |
| `/error/500` | 🟢 P3 | ⬜ Not Started | - | Server error |
| `/error/offline` | 🟢 P3 | ⬜ Not Started | - | Offline state |
| `/maintenance` | 🟢 P3 | ⬜ Not Started | - | Maintenance mode |
| `/terms-privacy` | 🟢 P3 | ⬜ Not Started | - | Legal pages |
| `/about` | 🟢 P3 | ⬜ Not Started | - | About Troodie |

**Week 7-8 Deliverables:** 21 screens

---

## 📋 DESIGN CHECKLIST PER SCREEN

For each screen, ensure:

### Visual Design
- [ ] Uses Troodie Gold (#FFAD27) as primary color
- [ ] Follows 4pt spacing grid
- [ ] Typography follows scale (11px to 34px)
- [ ] All states designed (empty, loading, error, success)
- [ ] Dark mode variant (if applicable)

### Interaction Design
- [ ] All CTAs are clear and use Troodie Gold
- [ ] Touch targets minimum 44pt
- [ ] Haptic feedback specified
- [ ] Animations defined (duration, easing)
- [ ] Gesture interactions documented

### Responsive Design
- [ ] iPhone SE (375px) layout
- [ ] iPhone 14 (390px) layout
- [ ] iPhone Pro Max (428px) layout
- [ ] Safe area considerations
- [ ] Keyboard avoidance behavior

### Accessibility
- [ ] Color contrast passes WCAG AA
- [ ] All images have alt text
- [ ] Screen reader labels defined
- [ ] Focus order logical
- [ ] Reduced motion variant

### Content States
- [ ] Anonymous user view
- [ ] New user (no friends) view
- [ ] Active user (with friends) view
- [ ] Creator user additions
- [ ] Empty state design
- [ ] Loading skeleton

### Handoff Requirements
- [ ] Figma file organized by flow
- [ ] Components use auto-layout
- [ ] Exported at @1x, @2x, @3x
- [ ] Redlines for spacing
- [ ] Animation specs included
- [ ] Copy/microcopy finalized

---

## 🎨 DESIGN SYSTEM COMPONENTS NEEDED

### Core Components (Build First)
- [ ] Button (Primary, Secondary, Text)
- [ ] Input Field (Text, Password, Search)
- [ ] Navigation Bar
- [ ] Tab Bar
- [ ] Restaurant Card
- [ ] User Avatar
- [ ] Empty State
- [ ] Loading Skeleton

### Feature Components
- [ ] Board Card
- [ ] Post Card
- [ ] Activity Item
- [ ] Campaign Card
- [ ] Notification Item
- [ ] Search Result
- [ ] Map Pin
- [ ] Review Card

### Modals & Overlays
- [ ] Bottom Sheet
- [ ] Alert Dialog
- [ ] Toast Message
- [ ] Action Sheet
- [ ] Photo Viewer
- [ ] Filter Panel

---

## 📅 WEEKLY MILESTONES

### Week 1 (Sept 1-5)
- **Goal:** Core navigation complete
- **Screens:** 8 (Onboarding + Main tabs)
- **Review:** Friday Sept 5, 2PM

### Week 2 (Sept 6-12)
- **Goal:** Restaurant experience complete
- **Screens:** 7 (Restaurant detail + Save flow)
- **Review:** Thursday Sept 12, 2PM

### Week 3 (Sept 13-19)
- **Goal:** Social features complete
- **Screens:** 8 (Auth + Friends + Profile)
- **Review:** Wednesday Sept 18, 2PM

### Week 4 (Sept 20-26)
- **Goal:** Boards & collections complete
- **Screens:** 9 (Saves + Search + Activity)
- **Review:** Thursday Sept 26, 2PM

### Week 5 (Sept 27 - Oct 3)
- **Goal:** Creator features complete
- **Screens:** 9 (Creator onboarding + Studio)
- **Review:** Thursday Oct 3, 2PM

### Week 6 (Oct 4-10)
- **Goal:** Business portal complete
- **Screens:** 13 (Restaurant claim + Dashboard)
- **Review:** Thursday Oct 10, 2PM

### Week 7 (Oct 11-17)
- **Goal:** Settings & profile complete
- **Screens:** 8 (Settings + Edit flows)
- **Review:** Thursday Oct 17, 2PM

### Week 8 (Oct 18-24)
- **Goal:** Polish & edge cases
- **Screens:** 13 (Errors + Additional features)
- **Final Review:** Thursday Oct 24, 2PM

---

## 🚀 DESIGN PRINCIPLES REMINDER

1. **Never Empty:** Every screen has value, even without data
2. **Progressive Enhancement:** Features reveal as users engage
3. **Troodie Gold First:** Primary actions always use #FFAD27
4. **Friend Signal Priority:** Social proof above algorithmic
5. **One-Tap Actions:** Reduce friction for core actions
6. **Clear Value Moments:** Why Troodie is different is always evident

---

## 📊 TRACKING LEGEND

### Status Icons
- ⬜ Not Started
- 🟦 In Progress
- ✅ Complete
- 🔄 Needs Revision
- ⚠️ Blocked

### Priority Levels
- 🔴 P0: Launch blocker
- 🟠 P1: Core feature
- 🟡 P2: Important
- 🟢 P3: Nice to have

### Designer Assignment
Track who owns each screen to avoid conflicts and ensure accountability.

---

## 🎯 SUCCESS CRITERIA

### Launch Ready Means:
- [ ] All P0 screens complete and approved
- [ ] All P1 screens complete and approved
- [ ] 80% of P2 screens complete
- [ ] Design system fully documented
- [ ] Developer handoff complete
- [ ] QA test cases written
- [ ] Accessibility audit passed

### Quality Bar:
- Every screen uses Troodie Gold consistently
- No screen feels empty or confusing
- Navigation is predictable and learnable
- Social features enhance, not gate
- Creator transformation feels natural
- Business tools are professional

---

**Next Steps:**
1. Assign designers to Week 1-2 screens immediately
2. Set up daily standups for design team
3. Create Figma project with proper structure
4. Build core components in design system
5. Start with onboarding flow (highest impact)

**Remember:** Troodie Gold (#FFAD27) is our signature. Every save, every CTA, every moment of delight should glow with Troodie Gold!