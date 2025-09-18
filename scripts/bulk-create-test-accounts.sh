#!/bin/bash

# Bulk Test Account Creation Script for Troodie
# This script sets up all test accounts with a single command

set -e  # Exit on error

echo "🚀 Starting Troodie Test Account Setup..."
echo "======================================="

# Load environment variables
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
elif [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ Error: No .env or .env.local file found"
    echo "Please create an .env file with your Supabase credentials"
    exit 1
fi

# Check for required environment variables
if [ -z "$EXPO_PUBLIC_SUPABASE_URL" ] || [ -z "$EXPO_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo "❌ Error: Missing required environment variables"
    echo "Please ensure EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY are set"
    exit 1
fi

echo "✅ Environment variables loaded"
echo ""

# Function to run SQL scripts
run_sql() {
    local script=$1
    local description=$2

    echo "📝 $description..."

    if [ -f "$script" ]; then
        # Use Supabase CLI if available
        if command -v supabase &> /dev/null; then
            supabase db push --local < "$script"
        else
            echo "⚠️  Supabase CLI not found. Please run this SQL manually in Supabase Dashboard:"
            echo "   $script"
        fi
    else
        echo "❌ Script not found: $script"
        return 1
    fi
}

# Step 1: Create test accounts
echo "Step 1: Creating test accounts"
echo "------------------------------"
run_sql "scripts/create-test-accounts.sql" "Creating test user accounts"

# Step 2: Generate test data
echo ""
echo "Step 2: Generating test data"
echo "----------------------------"

if command -v node &> /dev/null; then
    echo "📝 Generating restaurant data and reviews..."
    node scripts/generate-test-restaurant-data.js
else
    echo "⚠️  Node.js not found. Skipping JavaScript data generation."
    echo "   Please run: node scripts/generate-test-restaurant-data.js"
fi

# Step 3: Verify setup
echo ""
echo "Step 3: Verifying setup"
echo "-----------------------"

# Create verification SQL
cat > /tmp/verify-test-accounts.sql << EOF
SELECT
    u.email,
    u.username,
    u.display_name,
    u.is_business,
    u.verified,
    u.onboarding_completed,
    COUNT(DISTINCT b.id) as boards,
    COUNT(DISTINCT rs.id) as saves,
    COUNT(DISTINCT p.id) as posts
FROM public.users u
LEFT JOIN public.boards b ON b.user_id = u.id
LEFT JOIN public.restaurant_saves rs ON rs.user_id = u.id
LEFT JOIN public.posts p ON p.user_id = u.id
WHERE u.email IN (
    'test.foodie@troodieapp.com',
    'test.owner@troodieapp.com',
    'test.critic@troodieapp.com',
    'test.newuser@troodieapp.com',
    'review@troodieapp.com'
)
GROUP BY u.id, u.email, u.username, u.display_name, u.is_business, u.verified, u.onboarding_completed
ORDER BY u.email;
EOF

echo "✅ Verification query created at: /tmp/verify-test-accounts.sql"
echo "   Run this in your Supabase SQL Editor to verify the setup"

# Display summary
echo ""
echo "======================================="
echo "✨ Test Account Setup Complete!"
echo "======================================="
echo ""
echo "Test Accounts Created:"
echo "---------------------"
echo "1. test.foodie@troodieapp.com"
echo "   - Role: Regular foodie user"
echo "   - OTP Code: 000000"
echo ""
echo "2. test.owner@troodieapp.com"
echo "   - Role: Restaurant owner (business account)"
echo "   - OTP Code: 000000"
echo ""
echo "3. test.critic@troodieapp.com"
echo "   - Role: Verified food critic"
echo "   - OTP Code: 000000"
echo ""
echo "4. test.newuser@troodieapp.com"
echo "   - Role: New user (onboarding incomplete)"
echo "   - OTP Code: 000000"
echo ""
echo "5. review@troodieapp.com"
echo "   - Role: App Store review account"
echo "   - OTP Code: 000000"
echo ""
echo "How to use:"
echo "-----------"
echo "1. Open the Troodie app"
echo "2. Enter one of the test emails"
echo "3. Tap 'Send Code' (no email will be sent)"
echo "4. Enter OTP: 000000"
echo "5. The app will authenticate successfully"
echo ""
echo "Notes:"
echo "------"
echo "- All test accounts bypass real OTP verification"
echo "- Test data includes boards, saves, and posts"
echo "- No passwords needed - pure OTP bypass with code 000000"
echo "- These accounts should only be used in development/testing"
echo ""

# Check if all files exist
echo "File Status:"
echo "------------"
for file in \
    "scripts/create-test-accounts.sql" \
    "scripts/generate-test-restaurant-data.js" \
    "services/authService.ts"
do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
    fi
done

echo ""
echo "🎉 Setup complete! Test accounts are ready to use."