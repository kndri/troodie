import { QuizQuestion } from '@/types/onboarding';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your ideal Friday night?",
    options: [
      {
        id: 'A',
        text: 'Trying a new trendy restaurant I saw on social media',
        weights: {
          trendsetter: 3,
          social_explorer: 2,
          luxe_planner: 1
        }
      },
      {
        id: 'B',
        text: 'Going to my favorite neighborhood spot',
        weights: {
          comfort_seeker: 3,
          local_expert: 2,
          budget_foodie: 1
        }
      },
      {
        id: 'C',
        text: 'Splurging on a special tasting menu',
        weights: {
          luxe_planner: 3,
          culinary_adventurer: 2,
          trendsetter: 1
        }
      },
      {
        id: 'D',
        text: 'Discovering a hidden gem off the beaten path',
        weights: {
          hidden_gem_hunter: 3,
          culinary_adventurer: 2,
          local_expert: 1
        }
      }
    ]
  },
  {
    id: 2,
    question: 'How do you typically find new restaurants?',
    options: [
      {
        id: 'A',
        text: 'Instagram and TikTok recommendations',
        weights: {
          trendsetter: 3,
          social_explorer: 2
        }
      },
      {
        id: 'B',
        text: 'Word of mouth from friends and family',
        weights: {
          social_explorer: 3,
          comfort_seeker: 2,
          local_expert: 1
        }
      },
      {
        id: 'C',
        text: 'Food blogs and professional reviews',
        weights: {
          culinary_adventurer: 3,
          luxe_planner: 2
        }
      },
      {
        id: 'D',
        text: 'Walking around and stumbling upon places',
        weights: {
          hidden_gem_hunter: 3,
          local_expert: 2,
          culinary_adventurer: 1
        }
      }
    ]
  },
  {
    id: 3,
    question: "What's most important when choosing a restaurant?",
    options: [
      {
        id: 'A',
        text: 'The food quality and taste',
        weights: {
          culinary_adventurer: 3,
          comfort_seeker: 2,
          luxe_planner: 1
        }
      },
      {
        id: 'B',
        text: 'The atmosphere and ambiance',
        weights: {
          luxe_planner: 3,
          social_explorer: 2,
          trendsetter: 1
        }
      },
      {
        id: 'C',
        text: 'Value for money',
        weights: {
          budget_foodie: 3,
          comfort_seeker: 2,
          local_expert: 1
        }
      },
      {
        id: 'D',
        text: 'How Instagram-worthy it is',
        weights: {
          trendsetter: 3,
          social_explorer: 2
        }
      }
    ]
  },
  {
    id: 4,
    question: 'Your travel dining style is:',
    options: [
      {
        id: 'A',
        text: 'Research and book the best restaurants in advance',
        weights: {
          luxe_planner: 3,
          culinary_adventurer: 2
        }
      },
      {
        id: 'B',
        text: 'Ask locals for their favorite spots',
        weights: {
          local_expert: 3,
          hidden_gem_hunter: 2,
          social_explorer: 1
        }
      },
      {
        id: 'C',
        text: 'Find budget-friendly places with great food',
        weights: {
          budget_foodie: 3,
          comfort_seeker: 2
        }
      },
      {
        id: 'D',
        text: 'Go wherever looks busy and popular',
        weights: {
          social_explorer: 3,
          trendsetter: 2,
          comfort_seeker: 1
        }
      }
    ]
  },
  {
    id: 5,
    question: 'When dining out, you usually:',
    options: [
      {
        id: 'A',
        text: "Order something I've never tried before",
        weights: {
          culinary_adventurer: 3,
          trendsetter: 2,
          hidden_gem_hunter: 1
        }
      },
      {
        id: 'B',
        text: "Stick to dishes I know I'll enjoy",
        weights: {
          comfort_seeker: 3,
          budget_foodie: 2
        }
      },
      {
        id: 'C',
        text: 'Ask the server for recommendations',
        weights: {
          social_explorer: 3,
          local_expert: 2,
          luxe_planner: 1
        }
      },
      {
        id: 'D',
        text: 'Order the most photogenic dish',
        weights: {
          trendsetter: 3,
          social_explorer: 1
        }
      }
    ]
  },
  {
    id: 6,
    question: 'Your ideal brunch spot is:',
    options: [
      {
        id: 'A',
        text: 'A trendy cafe with unique menu items',
        weights: {
          trendsetter: 3,
          culinary_adventurer: 2
        }
      },
      {
        id: 'B',
        text: 'A cozy neighborhood diner',
        weights: {
          comfort_seeker: 3,
          local_expert: 2,
          budget_foodie: 1
        }
      },
      {
        id: 'C',
        text: 'An upscale restaurant with bottomless mimosas',
        weights: {
          luxe_planner: 3,
          social_explorer: 2
        }
      },
      {
        id: 'D',
        text: 'A hole-in-the-wall with amazing food',
        weights: {
          hidden_gem_hunter: 3,
          budget_foodie: 2,
          local_expert: 1
        }
      }
    ]
  },
  {
    id: 7,
    question: 'How do you feel about waiting in line for food?',
    options: [
      {
        id: 'A',
        text: "If it's trending, I'll wait as long as it takes",
        weights: {
          trendsetter: 3,
          social_explorer: 2
        }
      },
      {
        id: 'B',
        text: "I'll wait if I know the food is exceptional",
        weights: {
          culinary_adventurer: 3,
          hidden_gem_hunter: 2
        }
      },
      {
        id: 'C',
        text: 'I prefer making reservations to avoid waiting',
        weights: {
          luxe_planner: 3,
          comfort_seeker: 2
        }
      },
      {
        id: 'D',
        text: "I'd rather find somewhere else with no wait",
        weights: {
          comfort_seeker: 3,
          budget_foodie: 2,
          local_expert: 1
        }
      }
    ]
  },
  {
    id: 8,
    question: 'Your approach to trying ethnic cuisines is:',
    options: [
      {
        id: 'A',
        text: 'I love exploring authentic, traditional dishes',
        weights: {
          culinary_adventurer: 3,
          hidden_gem_hunter: 2,
          local_expert: 1
        }
      },
      {
        id: 'B',
        text: 'I prefer fusion or Americanized versions',
        weights: {
          comfort_seeker: 3,
          social_explorer: 2
        }
      },
      {
        id: 'C',
        text: 'I go for the most popular/reviewed places',
        weights: {
          trendsetter: 3,
          social_explorer: 2,
          luxe_planner: 1
        }
      },
      {
        id: 'D',
        text: 'I look for the best value authentic spots',
        weights: {
          budget_foodie: 3,
          local_expert: 2,
          hidden_gem_hunter: 1
        }
      }
    ]
  }
];