# Add Screen Audit (Quick Actions Modal)

## Screen: Add/Create Hub
**File Path:** `app/(tabs)/add.tsx`
**Purpose:** Central hub for content creation and discovery actions
**Route:** `/add` (center tab - floating button)

### Component Inventory

| Component/Feature | Functionality Description | Displayed Data | User Interactions | States |
|------------------|---------------------------|----------------|-------------------|---------|
| **Header** | Screen title and context | • "Discover & Create"<br>• Subtitle | • None (display only) | • Default |
| **Core Actions Section** | Primary discovery actions | • Action cards | • Tap: Execute action | • Default |
| **Add Restaurant Card** | Add new restaurant | • Icon<br>• Title<br>• Description | • Tap: Open modal | • Default<br>• Pressed |
| **Find Friends Card** | Friend discovery | • Icon<br>• Title<br>• Description | • Tap: Navigate to find friends | • Default<br>• Pressed |
| **Create Content Section** | Content creation options | • Option cards | • Tap: Navigate to create flow | • Default |
| **Create Post Option** | Review creation | • Camera icon<br>• Title<br>• Description | • Tap: Navigate to create post | • Default |
| **Create Board Option** | Collection creation | • Folder icon<br>• Title<br>• Description | • Tap: Navigate to create board | • Default |
| **Create Community Option** | Community creation | • Users icon<br>• Title<br>• Description<br>• Beta badge | • Tap: Navigate to create community | • Default<br>• Beta |
| **Progress Card** | Gamification element | • Progress title<br>• Current/target<br>• Reward info | • Tap CTA: Create board | • Default |
| **Add Restaurant Modal** | Restaurant addition form | • Form fields | • Fill form<br>• Submit | • Hidden<br>• Visible |
| **Auth Gate** | Login prompt | • Benefits message | • Login/signup | • Shown (not auth)<br>• Hidden (auth) |

### Conditional Elements

| Condition | Element | Behavior |
|-----------|---------|----------|
| Not authenticated | Auth gate | Shows login benefits |
| Admin user | Extra options | May show admin features |
| Progress milestone | Achievement unlock | Shows celebration |
| Beta features | Beta badge | Shows on community option |
| Modal open | Add restaurant form | Overlay modal |

### Navigation Flows

| Trigger | Destination | Data Passed |
|---------|-------------|-------------|
| Add Restaurant | Modal overlay | N/A |
| Find Friends | Find Friends screen | N/A |
| Create Post | Create Post flow | N/A |
| Create Board | Create Board flow | N/A |
| Create Community | Create Community flow | N/A |
| Progress CTA | Create Board | Pre-filled context |
| Auth gate | Login screen | Return route |

### Data Requirements

- User authentication
- User progress/stats
- Achievement tracking
- Admin privileges check

### Design Elements

**Color Coding:**
- Add Restaurant: Primary Orange (#FF8C00)
- Find Friends: Green (#10B981)
- Create Post: Blue (#3B82F6)
- Create Board: Purple (#7C3AED)
- Create Community: Pink (#EC4899)

**Card Layouts:**
- Discovery cards: Large, prominent
- Create options: List style with icons
- Progress card: Full-width gamification

### Gamification Features

- Progress tracking (boards created)
- Achievement points (+50)
- Weekly goals
- Unlock mechanics