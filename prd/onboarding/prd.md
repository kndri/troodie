# Troodie Onboarding Persona Quiz & Favorite Spots PRD

**Feature**: Comprehensive Onboarding Experience with Persona Quiz & Favorite Spots Collection**Target Launch**: August 1, 2025 MVP**Written by**: Product Team | Updated January 2025

---

## 1. Overview

This feature creates a comprehensive onboarding experience that assigns users a "Troodie Persona" based on their dining preferences and collects their favorite local restaurants. This personalization enables targeted content delivery, community matching, and improved recommendation algorithms from day one.

---

## 2. Business Objectives

### Primary Goals

- **Reduce Time-to-Value**: Users get personalized content immediately after signup
- **Improve Retention**: Personalized experience increases 7-day and 30-day retention
- **Enable Network Effects**: Persona-based community matching creates stronger connections
- **Gather Rich User Data**: Deep preference insights for recommendation algorithms


### Success Metrics

- **Onboarding Completion Rate**: >75% of users complete full flow
- **Persona Distribution**: Balanced distribution across all 8 personas
- **Post-Onboarding Engagement**: 40% increase in first-week activity vs. non-personalized users
- **Community Join Rate**: 60% of users join at least one persona-matched community


---

## 3. Persona System Architecture

### 3.1 The 8 Troodie Personas

#### **1. Trendsetter**

- **Core Identity**: Social media-driven, early adopter of food trends
- **Dining Behavior**: Seeks Instagram-worthy spots, follows food influencers
- **Community Role**: Content creator, trend spotter
- **Monetization Potential**: High - responds to sponsored content and exclusive access


#### **2. Culinary Adventurer**

- **Core Identity**: Experimental eater, seeks authentic and unique experiences
- **Dining Behavior**: Tries new cuisines, values food quality over ambiance
- **Community Role**: Experience curator, authenticity validator
- **Monetization Potential**: Medium-High - values premium experiences


#### **3. Luxe Planner**

- **Core Identity**: Occasion-focused, appreciates fine dining and special experiences
- **Dining Behavior**: Plans ahead, values service and ambiance
- **Community Role**: Event organizer, experience curator
- **Monetization Potential**: Highest - willing to pay premium for quality


#### **4. Hidden Gem Hunter**

- **Core Identity**: Discovery-focused, finds off-the-beaten-path spots
- **Dining Behavior**: Explores neighborhoods, values authenticity over popularity
- **Community Role**: Local expert, discovery leader
- **Monetization Potential**: Medium - values unique experiences over luxury


#### **5. Comfort Seeker**

- **Core Identity**: Consistency-focused, prefers familiar and reliable spots
- **Dining Behavior**: Returns to favorites, values comfort over novelty
- **Community Role**: Reliability validator, neighborhood anchor
- **Monetization Potential**: Medium - responds to loyalty programs


#### **6. Budget Foodie**

- **Core Identity**: Value-conscious, finds great food at reasonable prices
- **Dining Behavior**: Researches deals, maximizes food quality per dollar
- **Community Role**: Deal finder, value validator
- **Monetization Potential**: Lower - price-sensitive but high volume


#### **7. Social Explorer**

- **Core Identity**: Community-driven, dining as social experience
- **Dining Behavior**: Group dining, follows friend recommendations
- **Community Role**: Community builder, social connector
- **Monetization Potential**: Medium - influenced by peer recommendations


#### **8. Local Expert**️

- **Core Identity**: Neighborhood-focused, supports local businesses
- **Dining Behavior**: Deep local knowledge, community-oriented
- **Community Role**: Local authority, business supporter
- **Monetization Potential**: Medium - values local partnerships


---

## 4. Persona Quiz Implementation

### 4.1 Complete Question Set

#### **Question 1: Friday Night Preference**

*"What's your ideal Friday night?"*

**Option A**: "Trying a new trendy restaurant I saw on social media"

- Trendsetter: +3, Social Explorer: +2, Luxe Planner: +1


**Option B**: "Going to my favorite neighborhood spot"

- Comfort Seeker: +3, Local Expert: +2, Budget Foodie: +1


**Option C**: "Splurging on a special tasting menu"

- Luxe Planner: +3, Culinary Adventurer: +2, Trendsetter: +1


**Option D**: "Discovering a hidden gem off the beaten path"

- Hidden Gem Hunter: +3, Culinary Adventurer: +2, Local Expert: +1


---

#### **Question 2: Restaurant Discovery Method**

*"How do you typically find new restaurants?"*

**Option A**: "Instagram and TikTok recommendations"

- Trendsetter: +3, Social Explorer: +2


**Option B**: "Word of mouth from friends and family"

- Social Explorer: +3, Comfort Seeker: +2, Local Expert: +1


**Option C**: "Food blogs and professional reviews"

- Culinary Adventurer: +3, Luxe Planner: +2


**Option D**: "Walking around and stumbling upon places"

- Hidden Gem Hunter: +3, Local Expert: +2, Culinary Adventurer: +1


---

#### **Question 3: Decision Factors**

*"What's most important when choosing a restaurant?"*

**Option A**: "The food quality and taste"

- Culinary Adventurer: +3, Comfort Seeker: +2, Luxe Planner: +1


**Option B**: "The atmosphere and ambiance"

- Luxe Planner: +3, Social Explorer: +2, Trendsetter: +1


**Option C**: "Value for money"

- Budget Foodie: +3, Comfort Seeker: +2, Local Expert: +1


**Option D**: "How Instagram-worthy it is"

- Trendsetter: +3, Social Explorer: +2


---

#### **Question 4: Travel Dining Style**

*"Your travel dining style is:"*

**Option A**: "Research and book the best restaurants in advance"

- Luxe Planner: +3, Culinary Adventurer: +2


**Option B**: "Ask locals for their favorite spots"

- Local Expert: +3, Hidden Gem Hunter: +2, Social Explorer: +1


**Option C**: "Find budget-friendly places with great food"

- Budget Foodie: +3, Comfort Seeker: +2


**Option D**: "Go wherever looks busy and popular"

- Social Explorer: +3, Trendsetter: +2, Comfort Seeker: +1


---

#### **Question 5: Menu Ordering Behavior**

*"When dining out, you usually:"*

**Option A**: "Order something I've never tried before"

- Culinary Adventurer: +3, Trendsetter: +2, Hidden Gem Hunter: +1


**Option B**: "Stick to dishes I know I'll enjoy"

- Comfort Seeker: +3, Budget Foodie: +2


**Option C**: "Ask the server for recommendations"

- Social Explorer: +3, Local Expert: +2, Luxe Planner: +1


**Option D**: "Order the most photogenic dish"

- Trendsetter: +3, Social Explorer: +1


---

#### **Question 6: Brunch Spot Preference**

*"Your ideal brunch spot is:"*

**Option A**: "A trendy cafe with unique menu items"

- Trendsetter: +3, Culinary Adventurer: +2


**Option B**: "A cozy neighborhood diner"

- Comfort Seeker: +3, Local Expert: +2, Budget Foodie: +1


**Option C**: "An upscale restaurant with bottomless mimosas"

- Luxe Planner: +3, Social Explorer: +2


**Option D**: "A hole-in-the-wall with amazing food"

- Hidden Gem Hunter: +3, Budget Foodie: +2, Local Expert: +1


---

#### **Question 7: Waiting Tolerance**

*"How do you feel about waiting in line for food?"*

**Option A**: "If it's trending, I'll wait as long as it takes"

- Trendsetter: +3, Social Explorer: +2


**Option B**: "I'll wait if I know the food is exceptional"

- Culinary Adventurer: +3, Hidden Gem Hunter: +2


**Option C**: "I prefer making reservations to avoid waiting"

- Luxe Planner: +3, Comfort Seeker: +2


**Option D**: "I'd rather find somewhere else with no wait"

- Comfort Seeker: +3, Budget Foodie: +2, Local Expert: +1


---

#### **Question 8: Ethnic Cuisine Approach**

*"Your approach to trying ethnic cuisines is:"*

**Option A**: "I love exploring authentic, traditional dishes"

- Culinary Adventurer: +3, Hidden Gem Hunter: +2, Local Expert: +1


**Option B**: "I prefer fusion or Americanized versions"

- Comfort Seeker: +3, Social Explorer: +2


**Option C**: "I go for the most popular/reviewed places"

- Trendsetter: +3, Social Explorer: +2, Luxe Planner: +1


**Option D**: "I look for the best value authentic spots"

- Budget Foodie: +3, Local Expert: +2, Hidden Gem Hunter: +1


---

### 4.2 Scoring Algorithm

```typescript
interface PersonaScores {
  trendsetter: number
  culinary_adventurer: number
  luxe_planner: number
  hidden_gem_hunter: number
  comfort_seeker: number
  budget_foodie: number
  social_explorer: number
  local_expert: number
}

function calculatePersona(answers: Record<number, string>): string {
  const scores: PersonaScores = {
    trendsetter: 0,
    culinary_adventurer: 0,
    luxe_planner: 0,
    hidden_gem_hunter: 0,
    comfort_seeker: 0,
    budget_foodie: 0,
    social_explorer: 0,
    local_expert: 0
  }

  // Apply scoring weights for each answer
  answers.forEach((answer, questionIndex) => {
    const weights = getWeightsForAnswer(questionIndex, answer)
    Object.entries(weights).forEach(([persona, weight]) => {
      scores[persona as keyof PersonaScores] += weight
    })
  })

  // Find highest scoring persona
  return Object.entries(scores).reduce((a, b) => 
    scores[a[0] as keyof PersonaScores] > scores[b[0] as keyof PersonaScores] ? a : b
  )[0]
}
```

### 4.3 Tie-Breaking Logic

When multiple personas have the same score:

1. **Primary Tie-Breaker**: Question 1 (Friday Night) has 1.5x weight multiplier
2. **Secondary Tie-Breaker**: Question 3 (Decision Factors) has 1.25x weight multiplier
3. **Final Tie-Breaker**: Default to most common persona in user base for consistency


---

## 5. Favorite Spots Collection System

### 5.1 Category Structure

#### **Category 1: Go-to Brunch**

- **Purpose**: Weekend social dining preferences
- **Data Value**: Social dining patterns, price sensitivity for leisure
- **Recommendation Use**: Weekend activity suggestions, group dining


#### **Category 2: Dinner with Friends**️

- **Purpose**: Social dining preferences for groups
- **Data Value**: Group-friendly venues, atmosphere preferences
- **Recommendation Use**: Group event planning, social dining suggestions


#### **Category 3: Date Night**

- **Purpose**: Romantic dining preferences
- **Data Value**: Ambiance importance, special occasion spending
- **Recommendation Use**: Romantic venue suggestions, anniversary planning


#### **Category 4: Always Recommend**

- **Purpose**: Personal favorites they'd suggest to anyone
- **Data Value**: Quality indicators, personal taste markers
- **Recommendation Use**: High-confidence suggestions, taste matching


#### **Category 5: Comfort Food**

- **Purpose**: Reliable, familiar dining preferences
- **Data Value**: Consistency preferences, emotional dining needs
- **Recommendation Use**: Stress-relief dining, familiar options


#### **Category 6: Special Occasions**

- **Purpose**: Celebration and milestone dining
- **Data Value**: Luxury spending patterns, event planning needs
- **Recommendation Use**: Birthday/anniversary suggestions, milestone celebrations


### 5.2 Data Collection Schema

```typescript
interface FavoriteSpot {
  id: string
  user_id: string
  restaurant_name: string
  category: 'brunch' | 'dinner' | 'date' | 'recommend' | 'comfort' | 'special'
  location?: string
  address?: string
  price_range?: 1 | 2 | 3 | 4  // $ to $$$$
  cuisine_type?: string
  notes?: string
  created_at: timestamp
  last_visited?: timestamp
  visit_frequency?: 'weekly' | 'monthly' | 'occasionally' | 'rarely'
}
```

### 5.3 User Experience Flow

#### **Step 1: Category Introduction**

- Display category with emoji and description
- Show examples: "Places like Pancake House, The Brunch Spot"
- Optional skip for each category


#### **Step 2: Restaurant Entry**

- **Required**: Restaurant name
- **Optional**: Location/neighborhood
- **Auto-complete**: Suggest from restaurant database if available
- **Validation**: Prevent duplicates within same category


#### **Step 3: Enhancement (Future)**

- **Photo Upload**: Let users add photos of their favorite dishes
- **Rating**: Personal rating (different from public reviews)
- **Tags**: Custom tags like "great for groups", "quiet", "outdoor seating"


### 5.4 Data Validation & Quality

#### **Input Validation**

- Restaurant name: 2-100 characters, no special characters except &, ', -
- Location: Optional, 2-50 characters
- Duplicate prevention within same category
- Profanity filtering on restaurant names


#### **Data Enhancement**

- **Address Lookup**: Attempt to find full address via Google Places API
- **Cuisine Detection**: Auto-detect cuisine type from restaurant name
- **Price Range Estimation**: Use external data sources when available


---

## 6. Technical Implementation

### 6.1 Database Schema

```sql
-- Personas table
CREATE TABLE personas (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  emoji VARCHAR(10),
  color VARCHAR(20),
  traits JSONB
);

-- User personas (quiz results)
CREATE TABLE user_personas (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  persona_id VARCHAR(50) REFERENCES personas(id),
  quiz_scores JSONB,
  quiz_answers JSONB,
  assigned_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Favorite spots
CREATE TABLE favorite_spots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  restaurant_name VARCHAR(100) NOT NULL,
  category VARCHAR(20) NOT NULL,
  location VARCHAR(100),
  address TEXT,
  price_range INTEGER CHECK (price_range >= 1 AND price_range <= 4),
  cuisine_type VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, restaurant_name, category)
);
```

### 6.2 API Endpoints

```typescript
// Quiz completion
POST /api/onboarding/quiz
{
  answers: Record<number, string>
}
Response: {
  persona: string,
  scores: PersonaScores,
  persona_details: PersonaDetails
}

// Favorite spots
POST /api/onboarding/favorite-spots
{
  spots: FavoriteSpot[]
}

GET /api/onboarding/favorite-spots
Response: {
  spots: FavoriteSpot[]
}

// Complete onboarding
POST /api/onboarding/complete
{
  persona: string,
  favorite_spots: FavoriteSpot[]
}
```

---

## 7. Personalization Applications

### 7.1 Content Personalization

#### **Feed Algorithm Weights**

- **Trendsetter**: Trending restaurants (40%), New openings (30%), Social posts (30%)
- **Culinary Adventurer**: Unique cuisines (50%), Chef specials (30%), Food events (20%)
- **Luxe Planner**: Fine dining (40%), Special events (35%), Reservations (25%)
- **Hidden Gem Hunter**: Local discoveries (45%), Off-beaten-path (35%), Authentic spots (20%)
- **Comfort Seeker**: Familiar cuisines (40%), Reliable chains (30%), Neighborhood spots (30%)
- **Budget Foodie**: Deals/discounts (45%), Value spots (35%), Happy hours (20%)
- **Social Explorer**: Friend activity (50%), Group-friendly (30%), Popular spots (20%)
- **Local Expert**: Neighborhood news (40%), Local businesses (35%), Community events (25%)


### 7.2 Community Matching

#### **Primary Community Suggestions**

- Match users with same persona (70% compatibility)
- Geographic proximity within persona (25% boost)
- Similar favorite spots (15% boost)


#### **Secondary Community Suggestions**

- **Trendsetter** ↔ **Social Explorer**: Social media synergy
- **Culinary Adventurer** ↔ **Hidden Gem Hunter**: Discovery alignment
- **Luxe Planner** ↔ **Culinary Adventurer**: Quality focus
- **Budget Foodie** ↔ **Local Expert**: Value + local knowledge


---

## 8. Success Metrics & Analytics

### 8.1 Onboarding Metrics

- **Completion Rate**: % who finish entire flow
- **Drop-off Analysis**: Screen-by-screen abandonment
- **Time to Complete**: Average duration per screen
- **Question Skip Rate**: Which questions are skipped most


### 8.2 Persona Distribution

- **Balance Monitoring**: Ensure no persona is >25% or <5% of users
- **Geographic Variations**: Persona distribution by city/region
- **Demographic Correlations**: Age, gender patterns by persona


### 8.3 Engagement Impact

- **7-Day Retention**: Onboarded vs. non-onboarded users
- **Content Interaction**: Click-through rates by persona
- **Community Joining**: % who join persona-matched communities
- **Favorite Spots Usage**: How often users reference their saved spots


---

## 9. Future Enhancements

### 9.1 Dynamic Personalization

- **Adaptive Questioning**: Adjust questions based on previous answers
- **Persona Evolution**: Allow persona changes based on behavior
- **Seasonal Adjustments**: Modify recommendations based on time of year


### 9.2 Advanced Features

- **Photo Integration**: Visual favorite spots with dish photos
- **Social Validation**: Friends can validate/comment on favorite spots
- **Recommendation Engine**: AI-powered suggestions based on favorite spots
- **Local Partnerships**: Direct integration with restaurant reservation systems


---

## 10. Implementation Timeline

### **Phase 1: Core Implementation**(Weeks 1-2)

- Basic quiz flow with 8 questions
- Persona assignment algorithm
- Favorite spots collection (6 categories)
- Database schema and API endpoints


### **Phase 2: Enhancement**(Weeks 3-4)

- UI/UX polish and animations
- Data validation and quality checks
- Basic analytics implementation
- Error handling and edge cases


### **Phase 3: Integration**(Weeks 5-6)

- Connect to main app personalization
- Community matching algorithm
- Content feed personalization
- Performance optimization


### **Phase 4: Optimization**(Post-Launch)

- A/B testing different questions
- Machine learning persona refinement
- Advanced favorite spots features
- Social validation features


---

## 11. Implementation

### 11.1 Screenshots

#### Splash & Welcome Screen

`assets/images/image_1.png`  
*Splash screen and welcome screen, showing Troodie branding and onboarding CTA.*

#### Signup Flow

`assets/images/image_2.png`  
*Phone number entry and verification, clean UI, clear CTA.*

#### Persona Quiz & Favorite Spots

`assets/images/image_3.png`  
*Persona quiz questions, favorite spots collection with category tabs and add/edit functionality.*

> **Note:** Place all referenced images in `assets/images/`. If not present, add them.

---

### 11.2 Assets

- **Images:** All UI screenshots and icons should be stored in `assets/images/`.
- **Fonts:** All custom fonts should be managed in `assets/fonts/` if using local files, but for Google Fonts, use the Expo Google Fonts packages.

---

### 11.3 Fonts

#### Font Choices

- **Primary:** Poppins (for headings, CTAs, and key UI elements)
- **Secondary:** Inter (for body text and supporting UI)

#### Implementation (Expo Google Fonts)

Use the official Expo Google Fonts packages for both Poppins and Inter.  
Reference: [Expo Fonts Documentation](https://docs.expo.dev/develop/user-interface/fonts/)

**Install:**
```sh
npx expo install @expo-google-fonts/poppins @expo-google-fonts/inter expo-font expo-splash-screen
```

**Usage Example:**
```tsx
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_700Bold,
    Inter_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <>
      <Text style={{ fontFamily: 'Poppins_700Bold' }}>Heading</Text>
      <Text style={{ fontFamily: 'Inter_400Regular' }}>Body text</Text>
    </>
  );
}
```

- Use Poppins for headings, buttons, and key UI.
- Use Inter for body and supporting text.
- Reference font weights/styles as needed from the Expo Google Fonts package.

---

**Summary of changes:**  
- Added a new Implementation section with screenshot references and asset notes.
- Specified the use of Expo Google Fonts for Poppins and Inter, with install and usage instructions.
- Clarified asset folder usage.

