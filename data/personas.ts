import { Persona, PersonaType } from '@/types/onboarding';

export const personas: Record<PersonaType, Persona> = {
  trendsetter: {
    id: 'trendsetter',
    name: 'Trendsetter',
    emoji: '📸',
    color: '#FF6B6B',
    description: 'Social media-driven, early adopter of food trends',
    traits: [
      'Seeks Instagram-worthy spots',
      'Follows food influencers',
      'First to try new restaurants',
      'Values aesthetics and presentation'
    ]
  },
  culinary_adventurer: {
    id: 'culinary_adventurer',
    name: 'Culinary Adventurer',
    emoji: '🌮',
    color: '#4ECDC4',
    description: 'Experimental eater, seeks authentic and unique experiences',
    traits: [
      'Tries new cuisines regularly',
      'Values food quality over ambiance',
      'Seeks authentic experiences',
      'Loves chef specials and unique dishes'
    ]
  },
  luxe_planner: {
    id: 'luxe_planner',
    name: 'Luxe Planner',
    emoji: '🥂',
    color: '#9B59B6',
    description: 'Occasion-focused, appreciates fine dining and special experiences',
    traits: [
      'Plans dining experiences in advance',
      'Values service and ambiance',
      'Enjoys fine dining',
      'Makes reservations for special occasions'
    ]
  },
  hidden_gem_hunter: {
    id: 'hidden_gem_hunter',
    name: 'Hidden Gem Hunter',
    emoji: '💎',
    color: '#F39C12',
    description: 'Discovery-focused, finds off-the-beaten-path spots',
    traits: [
      'Explores neighborhoods for unique spots',
      'Values authenticity over popularity',
      'Discovers hole-in-the-wall restaurants',
      'Shares local secrets with friends'
    ]
  },
  comfort_seeker: {
    id: 'comfort_seeker',
    name: 'Comfort Seeker',
    emoji: '🍕',
    color: '#3498DB',
    description: 'Consistency-focused, prefers familiar and reliable spots',
    traits: [
      'Returns to favorite restaurants',
      'Values comfort over novelty',
      'Knows what to order',
      'Appreciates consistent quality'
    ]
  },
  budget_foodie: {
    id: 'budget_foodie',
    name: 'Budget Foodie',
    emoji: '💰',
    color: '#2ECC71',
    description: 'Value-conscious, finds great food at reasonable prices',
    traits: [
      'Researches deals and happy hours',
      'Maximizes food quality per dollar',
      'Knows the best value spots',
      'Appreciates generous portions'
    ]
  },
  social_explorer: {
    id: 'social_explorer',
    name: 'Social Explorer',
    emoji: '👥',
    color: '#E74C3C',
    description: 'Community-driven, dining as social experience',
    traits: [
      'Enjoys group dining experiences',
      'Follows friend recommendations',
      'Values atmosphere for socializing',
      'Organizes food outings'
    ]
  },
  local_expert: {
    id: 'local_expert',
    name: 'Local Expert',
    emoji: '🏘️',
    color: '#95A5A6',
    description: 'Neighborhood-focused, supports local businesses',
    traits: [
      'Deep knowledge of local spots',
      'Supports independent restaurants',
      'Community-oriented dining',
      'Knows owners and staff by name'
    ]
  }
};