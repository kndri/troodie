// Script to generate test restaurant data for test accounts
// This creates realistic restaurant saves, reviews, and interactions

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for admin operations
)

// Sample restaurant data with real Google Place IDs (example IDs - replace with actual)
const sampleRestaurants = [
  {
    google_place_id: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    name: 'The Italian Corner',
    cuisine: 'Italian',
    price_level: 3
  },
  {
    google_place_id: 'ChIJrTLr-GyuEmsRBfy61i59si0',
    name: 'Sushi Master',
    cuisine: 'Japanese',
    price_level: 4
  },
  {
    google_place_id: 'ChIJxXSgfDyuEmsR3X9qAOXLryE',
    name: 'Burger Palace',
    cuisine: 'American',
    price_level: 2
  },
  {
    google_place_id: 'ChIJCfeffMy7EmsRp7ykjcnb3VY',
    name: 'Le Petit Bistro',
    cuisine: 'French',
    price_level: 4
  },
  {
    google_place_id: 'ChIJN5Pz7FSuEmsRXhyDDnFQ7Qc',
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    price_level: 2
  },
  {
    google_place_id: 'ChIJ3S-JXmauEmsRUcIaWtf4MzE',
    name: 'Golden Dragon',
    cuisine: 'Chinese',
    price_level: 3
  },
  {
    google_place_id: 'ChIJm7Ex8UmuEmsR37qF0h9Lm6k',
    name: 'The Steakhouse',
    cuisine: 'Steakhouse',
    price_level: 5
  },
  {
    google_place_id: 'ChIJtwapWjeuEmsRzH0S7-GAflk',
    name: 'Mediterranean Delights',
    cuisine: 'Mediterranean',
    price_level: 3
  }
]

// Review templates for different user types
const reviewTemplates = {
  foodie: [
    "Absolutely loved this place! The {dish} was incredible and the atmosphere was perfect for a night out.",
    "Hidden gem alert! 🌟 Their {dish} is a must-try. Will definitely be coming back!",
    "Great value for money. The {dish} was delicious and portions were generous.",
    "Perfect spot for {occasion}! The service was excellent and the food exceeded expectations."
  ],
  critic: [
    "The {dish} showcases excellent technique, though the presentation could be more refined. Service was attentive without being intrusive.",
    "While ambitious in concept, the execution falls short. The {dish} lacks the finesse expected at this price point.",
    "A masterclass in {cuisine} cuisine. The chef's attention to detail is evident in every dish.",
    "Disappointing experience. The {dish} was underseasoned and the service inconsistent throughout the evening."
  ],
  owner: [
    "Always great to see how other restaurants operate. The {dish} was well-executed and the staff training shows.",
    "Interesting take on {cuisine} cuisine. Taking notes for my own menu inspiration!",
    "The attention to detail here is impressive. From plating to service, everything is thoughtfully considered."
  ]
}

async function generateTestData() {
  try {
    console.log('🚀 Starting test data generation...')

    // Get test user IDs
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('id, email, username')
      .in('email', [
        'test.foodie@troodieapp.com',
        'test.owner@troodieapp.com',
        'test.critic@troodieapp.com'
      ])

    if (userError) {
      console.error('Error fetching users:', userError)
      return
    }

    if (!users || users.length === 0) {
      console.error('No test users found. Please run create-test-accounts.sql first.')
      return
    }

    console.log(`Found ${users.length} test users`)

    // Generate restaurant saves and reviews for each user
    for (const user of users) {
      console.log(`\nGenerating data for ${user.username}...`)

      const userType = user.email.includes('foodie') ? 'foodie' :
                      user.email.includes('critic') ? 'critic' : 'owner'

      // Generate saves (different patterns for different user types)
      const savesData = []
      const numSaves = userType === 'critic' ? 8 : userType === 'foodie' ? 6 : 4

      for (let i = 0; i < Math.min(numSaves, sampleRestaurants.length); i++) {
        const restaurant = sampleRestaurants[i]
        const status = Math.random() > 0.3 ? 'been_there' : 'want_to_try'

        const save = {
          user_id: user.id,
          google_place_id: restaurant.google_place_id,
          status: status,
          notes: status === 'been_there' ?
            getRandomReview(userType, restaurant) :
            `Heard great things about their ${getRandomDish(restaurant.cuisine)}`,
          rating: status === 'been_there' ? Math.floor(Math.random() * 3) + 3 : null,
          created_at: getRandomDate()
        }

        savesData.push(save)
      }

      // Insert saves
      const { error: saveError } = await supabase
        .from('restaurant_saves')
        .upsert(savesData, { onConflict: 'user_id,google_place_id' })

      if (saveError) {
        console.error(`Error creating saves for ${user.username}:`, saveError)
      } else {
        console.log(`✅ Created ${savesData.length} saves for ${user.username}`)
      }

      // Generate posts about restaurants
      const postsData = []
      const numPosts = userType === 'critic' ? 5 : userType === 'foodie' ? 4 : 2

      for (let i = 0; i < numPosts; i++) {
        const restaurant = sampleRestaurants[Math.floor(Math.random() * sampleRestaurants.length)]
        const post = {
          user_id: user.id,
          caption: generatePostCaption(userType, restaurant),
          privacy: userType === 'critic' ? 'public' : Math.random() > 0.5 ? 'public' : 'friends',
          created_at: getRandomDate()
        }
        postsData.push(post)
      }

      // Insert posts
      const { error: postError } = await supabase
        .from('posts')
        .insert(postsData)

      if (postError) {
        console.error(`Error creating posts for ${user.username}:`, postError)
      } else {
        console.log(`✅ Created ${postsData.length} posts for ${user.username}`)
      }
    }

    // Create boards with restaurant collections
    console.log('\n📋 Creating themed boards...')

    const foodieUser = users.find(u => u.email === 'test.foodie@troodieapp.com')
    const criticUser = users.find(u => u.email === 'test.critic@troodieapp.com')

    if (foodieUser) {
      await createThemedBoards(foodieUser.id, 'foodie')
    }

    if (criticUser) {
      await createThemedBoards(criticUser.id, 'critic')
    }

    console.log('\n✨ Test data generation complete!')

  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

function getRandomReview(userType, restaurant) {
  const templates = reviewTemplates[userType]
  const template = templates[Math.floor(Math.random() * templates.length)]
  const dish = getRandomDish(restaurant.cuisine)
  const occasion = getRandomOccasion()

  return template
    .replace('{dish}', dish)
    .replace('{cuisine}', restaurant.cuisine)
    .replace('{occasion}', occasion)
}

function getRandomDish(cuisine) {
  const dishes = {
    'Italian': ['pasta carbonara', 'margherita pizza', 'osso buco', 'tiramisu'],
    'Japanese': ['sashimi platter', 'ramen', 'tempura', 'unagi roll'],
    'American': ['classic burger', 'BBQ ribs', 'mac and cheese', 'apple pie'],
    'French': ['coq au vin', 'bouillabaisse', 'duck confit', 'crème brûlée'],
    'Mexican': ['street tacos', 'enchiladas', 'guacamole', 'churros'],
    'Chinese': ['peking duck', 'dim sum', 'kung pao chicken', 'dumplings'],
    'Steakhouse': ['ribeye', 'filet mignon', 'porterhouse', 'lobster tail'],
    'Mediterranean': ['mezze platter', 'lamb kebab', 'moussaka', 'baklava']
  }

  const cuisineDishes = dishes[cuisine] || ['signature dish', 'chef special', 'house specialty']
  return cuisineDishes[Math.floor(Math.random() * cuisineDishes.length)]
}

function getRandomOccasion() {
  const occasions = ['date night', 'family dinner', 'business lunch', 'celebration', 'weekend brunch']
  return occasions[Math.floor(Math.random() * occasions.length)]
}

function generatePostCaption(userType, restaurant) {
  const captions = {
    foodie: [
      `Just discovered ${restaurant.name} and I'm obsessed! 😍 #foodie #${restaurant.cuisine.toLowerCase()}food`,
      `Weekend vibes at ${restaurant.name} ✨ That ${getRandomDish(restaurant.cuisine)} though... 🤤`,
      `Add ${restaurant.name} to your must-try list RIGHT NOW! 📍 #hiddenGem`,
      `Perfect ${getRandomOccasion()} spot found! ${restaurant.name} never disappoints 💯`
    ],
    critic: [
      `${restaurant.name} review: ${restaurant.cuisine} cuisine done right. Full review on my blog. ⭐⭐⭐⭐`,
      `Tonight at ${restaurant.name}: A thoughtful exploration of ${restaurant.cuisine} flavors.`,
      `${restaurant.name} needs to address consistency issues. Potential is there, execution varies.`,
      `Impressed by the innovation at ${restaurant.name}. Chef is pushing boundaries.`
    ],
    owner: [
      `Great inspiration from ${restaurant.name} today. Love seeing fellow restaurateurs excel! 👏`,
      `Industry night at ${restaurant.name}. Always learning from the best in the business.`,
      `Supporting local: ${restaurant.name} is doing amazing things with ${restaurant.cuisine} cuisine.`
    ]
  }

  const userCaptions = captions[userType] || captions.foodie
  return userCaptions[Math.floor(Math.random() * userCaptions.length)]
}

function getRandomDate() {
  const daysAgo = Math.floor(Math.random() * 90) // Random date within last 90 days
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString()
}

async function createThemedBoards(userId, userType) {
  const boards = userType === 'critic' ? [
    { name: 'Michelin Worthy', description: 'Exceptional dining experiences' },
    { name: 'Overrated Spots', description: 'Popular but disappointing' },
    { name: 'Rising Stars', description: 'New restaurants to watch' },
    { name: 'Classic Excellence', description: 'Timeless favorites that never disappoint' }
  ] : [
    { name: 'Date Night Spots', description: 'Romantic restaurants for special occasions' },
    { name: 'Budget Eats', description: 'Great food that won\'t break the bank' },
    { name: 'Instagram Worthy', description: 'Photogenic food and ambiance' },
    { name: 'Comfort Food', description: 'When you need something cozy' }
  ]

  for (const board of boards) {
    const { data, error } = await supabase
      .from('boards')
      .insert({
        user_id: userId,
        name: board.name,
        description: board.description,
        is_public: true,
        created_at: getRandomDate()
      })
      .select()

    if (error) {
      console.error(`Error creating board ${board.name}:`, error)
    } else {
      console.log(`✅ Created board: ${board.name}`)

      // Add some restaurants to each board
      const numRestaurants = Math.floor(Math.random() * 3) + 2
      for (let i = 0; i < numRestaurants; i++) {
        const restaurant = sampleRestaurants[Math.floor(Math.random() * sampleRestaurants.length)]

        await supabase
          .from('board_restaurants')
          .insert({
            board_id: data[0].id,
            google_place_id: restaurant.google_place_id,
            added_at: getRandomDate()
          })
          .select()
      }
    }
  }
}

// Run the script
generateTestData()
  .then(() => {
    console.log('\n🎉 All done!')
    process.exit(0)
  })
  .catch(error => {
    console.error('Script failed:', error)
    process.exit(1)
  })