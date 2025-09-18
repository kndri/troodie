-- Comprehensive Test Account Creation Script for Troodie
-- This script creates multiple test accounts with different user types and data

-- Function to create test accounts with bypass authentication
CREATE OR REPLACE FUNCTION create_test_accounts()
RETURNS void AS $$
DECLARE
    test_user_id UUID;
    board_id UUID;
BEGIN
    -- Test Account 1: Basic User (Foodie)
    SELECT id INTO test_user_id FROM auth.users WHERE email = 'test.foodie@troodieapp.com';
    IF test_user_id IS NULL THEN
        -- Create auth user (requires admin privileges)
        test_user_id := gen_random_uuid();
        INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at)
        VALUES (test_user_id, 'test.foodie@troodieapp.com', NOW(), NOW(), NOW());
    END IF;

    -- Create user profile
    INSERT INTO public.users (
        id, email, username, display_name, bio,
        onboarding_completed, created_at
    ) VALUES (
        test_user_id,
        'test.foodie@troodieapp.com',
        'test_foodie',
        'Test Foodie User',
        'Love trying new restaurants and sharing my experiences!',
        true,
        NOW()
    ) ON CONFLICT (id) DO UPDATE SET
        onboarding_completed = true,
        display_name = EXCLUDED.display_name;

    -- Create boards for foodie user
    INSERT INTO public.boards (user_id, name, description, is_public)
    VALUES
        (test_user_id, 'Favorite Pizza Places', 'My go-to spots for pizza', true),
        (test_user_id, 'Brunch Adventures', 'Weekend brunch destinations', true),
        (test_user_id, 'Hidden Gems', 'Off-the-beaten-path restaurants', false)
    ON CONFLICT DO NOTHING;

    -- Test Account 2: Restaurant Owner
    SELECT id INTO test_user_id FROM auth.users WHERE email = 'test.owner@troodieapp.com';
    IF test_user_id IS NULL THEN
        test_user_id := gen_random_uuid();
        INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at)
        VALUES (test_user_id, 'test.owner@troodieapp.com', NOW(), NOW(), NOW());
    END IF;

    INSERT INTO public.users (
        id, email, username, display_name, bio,
        onboarding_completed, is_business, created_at
    ) VALUES (
        test_user_id,
        'test.owner@troodieapp.com',
        'test_restaurant',
        'Test Restaurant Owner',
        'Owner of Test Bistro - Fresh, local ingredients daily',
        true,
        true,
        NOW()
    ) ON CONFLICT (id) DO UPDATE SET
        onboarding_completed = true,
        is_business = true;

    -- Test Account 3: Food Critic
    SELECT id INTO test_user_id FROM auth.users WHERE email = 'test.critic@troodieapp.com';
    IF test_user_id IS NULL THEN
        test_user_id := gen_random_uuid();
        INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at)
        VALUES (test_user_id, 'test.critic@troodieapp.com', NOW(), NOW(), NOW());
    END IF;

    INSERT INTO public.users (
        id, email, username, display_name, bio,
        onboarding_completed, verified, created_at
    ) VALUES (
        test_user_id,
        'test.critic@troodieapp.com',
        'test_critic',
        'Test Food Critic',
        'Professional food critic | 10+ years experience',
        true,
        true,
        NOW()
    ) ON CONFLICT (id) DO UPDATE SET
        onboarding_completed = true,
        verified = true;

    -- Create extensive boards and saves for critic
    INSERT INTO public.boards (user_id, name, description, is_public)
    VALUES
        (test_user_id, 'Michelin Worthy', 'Restaurants deserving a star', true),
        (test_user_id, 'Best New Openings', 'Recently opened restaurants to watch', true),
        (test_user_id, 'Disappointing Experiences', 'Places that didn't live up to the hype', false)
    ON CONFLICT DO NOTHING;

    -- Test Account 4: New User (for onboarding flow testing)
    SELECT id INTO test_user_id FROM auth.users WHERE email = 'test.newuser@troodieapp.com';
    IF test_user_id IS NULL THEN
        test_user_id := gen_random_uuid();
        INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at)
        VALUES (test_user_id, 'test.newuser@troodieapp.com', NOW(), NOW(), NOW());
    END IF;

    INSERT INTO public.users (
        id, email, username, display_name,
        onboarding_completed, created_at
    ) VALUES (
        test_user_id,
        'test.newuser@troodieapp.com',
        'test_newuser',
        'New Test User',
        false, -- Onboarding not completed for testing
        NOW()
    ) ON CONFLICT (id) DO UPDATE SET
        onboarding_completed = false;

    RAISE NOTICE 'Test accounts created successfully!';
END;
$$ LANGUAGE plpgsql;

-- Execute the function
SELECT create_test_accounts();

-- Add sample restaurant saves for test users
DO $$
DECLARE
    foodie_id UUID;
    critic_id UUID;
BEGIN
    SELECT id INTO foodie_id FROM public.users WHERE email = 'test.foodie@troodieapp.com';
    SELECT id INTO critic_id FROM public.users WHERE email = 'test.critic@troodieapp.com';

    -- Sample saves for foodie
    INSERT INTO public.restaurant_saves (user_id, google_place_id, status, notes, rating)
    VALUES
        (foodie_id, 'ChIJN1t_tDeuEmsRUsoyG83frY4', 'been_there', 'Amazing pizza, crispy crust!', 5),
        (foodie_id, 'ChIJrTLr-GyuEmsRBfy61i59si0', 'been_there', 'Great atmosphere for dates', 4),
        (foodie_id, 'ChIJxXSgfDyuEmsR3X9qAOXLryE', 'want_to_try', 'Heard they have the best pasta', NULL),
        (foodie_id, 'ChIJCfeffMy7EmsRp7ykjcnb3VY', 'been_there', 'Best brunch in town!', 5),
        (foodie_id, 'ChIJN5Pz7FSuEmsRXhyDDnFQ7Qc', 'want_to_try', 'New Mexican place', NULL)
    ON CONFLICT DO NOTHING;

    -- Sample saves for critic
    INSERT INTO public.restaurant_saves (user_id, google_place_id, status, notes, rating)
    VALUES
        (critic_id, 'ChIJN1t_tDeuEmsRUsoyG83frY4', 'been_there', 'Exceptional technique, worthy of recognition', 5),
        (critic_id, 'ChIJrTLr-GyuEmsRBfy61i59si0', 'been_there', 'Overpriced for the quality delivered', 2),
        (critic_id, 'ChIJxXSgfDyuEmsR3X9qAOXLryE', 'been_there', 'Innovative menu, excellent execution', 4),
        (critic_id, 'ChIJCfeffMy7EmsRp7ykjcnb3VY', 'been_there', 'Disappointing. Service needs improvement', 2)
    ON CONFLICT DO NOTHING;
END $$;

-- Create sample posts for test users
DO $$
DECLARE
    foodie_id UUID;
    critic_id UUID;
    owner_id UUID;
BEGIN
    SELECT id INTO foodie_id FROM public.users WHERE email = 'test.foodie@troodieapp.com';
    SELECT id INTO critic_id FROM public.users WHERE email = 'test.critic@troodieapp.com';
    SELECT id INTO owner_id FROM public.users WHERE email = 'test.owner@troodieapp.com';

    -- Posts for foodie
    INSERT INTO public.posts (user_id, caption, privacy, created_at)
    VALUES
        (foodie_id, 'Found the perfect pizza spot downtown! The truffle oil is to die for 🍕', 'public', NOW() - INTERVAL '2 days'),
        (foodie_id, 'Brunch vibes at my favorite cafe ☕🥞 #weekendvibes', 'public', NOW() - INTERVAL '5 days'),
        (foodie_id, 'That moment when you discover a hidden gem restaurant 💎', 'friends', NOW() - INTERVAL '1 week')
    ON CONFLICT DO NOTHING;

    -- Posts for critic
    INSERT INTO public.posts (user_id, caption, privacy, created_at)
    VALUES
        (critic_id, 'Tonight''s tasting menu: A masterclass in flavor pairing. Full review coming soon.', 'public', NOW() - INTERVAL '1 day'),
        (critic_id, 'Three new restaurants opening this month. Here''s what to expect...', 'public', NOW() - INTERVAL '3 days'),
        (critic_id, 'When presentation meets perfection. This is why we love fine dining.', 'public', NOW() - INTERVAL '1 week')
    ON CONFLICT DO NOTHING;

    -- Posts for owner
    INSERT INTO public.posts (user_id, caption, privacy, created_at)
    VALUES
        (owner_id, 'New seasonal menu launching tomorrow! Come try our fresh summer dishes 🌻', 'public', NOW() - INTERVAL '1 day'),
        (owner_id, 'Behind the scenes: Our chef preparing today''s special', 'public', NOW() - INTERVAL '4 days'),
        (owner_id, 'Thank you for making us #1 on Troodie this month! Special discount code: TROODIE20', 'public', NOW() - INTERVAL '2 weeks')
    ON CONFLICT DO NOTHING;
END $$;

-- Display created test accounts
SELECT
    u.email,
    u.username,
    u.display_name,
    u.is_business,
    u.verified,
    u.onboarding_completed,
    COUNT(DISTINCT b.id) as boards_count,
    COUNT(DISTINCT rs.id) as saves_count,
    COUNT(DISTINCT p.id) as posts_count
FROM public.users u
LEFT JOIN public.boards b ON b.user_id = u.id
LEFT JOIN public.restaurant_saves rs ON rs.user_id = u.id
LEFT JOIN public.posts p ON p.user_id = u.id
WHERE u.email IN (
    'test.foodie@troodieapp.com',
    'test.owner@troodieapp.com',
    'test.critic@troodieapp.com',
    'test.newuser@troodieapp.com'
)
GROUP BY u.id, u.email, u.username, u.display_name, u.is_business, u.verified, u.onboarding_completed
ORDER BY u.created_at;