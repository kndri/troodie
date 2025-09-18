# Test Account Implementation Guide

## Overview

This document outlines the complete test account implementation for Troodie, based on the pattern from commit `b9453544424d657b722cd9101f37972011649ab3`. The system allows bypassing OTP verification for test accounts using a magic link/OTP authentication style without passwords.

## Implementation Summary

### Core Features
- **Pure OTP Bypass**: No passwords needed, works with magic link authentication
- **Multiple Test Account Types**: Foodie, Owner, Critic, New User
- **Mock Session Creation**: Lightweight sessions for test accounts
- **Comprehensive Test Data**: Boards, saves, posts, and reviews

## Files Created/Modified

### 1. Authentication Service (`services/authService.ts`)

**Modified sections:**

#### Sign Up Bypass
```typescript
async signUpWithEmail(email: string): Promise<OtpResponse> {
  // Test accounts bypass - multiple test users
  const testAccounts = [
    'test.foodie@troodieapp.com',
    'test.owner@troodieapp.com',
    'test.critic@troodieapp.com',
    'test.newuser@troodieapp.com'
  ]

  if (testAccounts.includes(email.toLowerCase())) {
    console.log('[AuthService] Test account detected:', email)
    return {
      success: true,
      messageId: null,
    }
  }
  // ... rest of normal flow
}
```

#### Sign In Bypass
```typescript
async signInWithEmail(email: string): Promise<OtpResponse> {
  // Test accounts bypass
  const testAccounts = [
    'test.foodie@troodieapp.com',
    'test.owner@troodieapp.com',
    'test.critic@troodieapp.com',
    'test.newuser@troodieapp.com'
  ]

  if (testAccounts.includes(email.toLowerCase())) {
    console.log('[AuthService] Test account detected for sign-in:', email)
    return {
      success: true,
      messageId: null,
    }
  }
  // ... rest of normal flow
}
```

#### OTP Verification with Mock Session
```typescript
async verifyOtp(email: string, token: string): Promise<AuthResponse> {
  const testAccounts = [
    'test.foodie@troodieapp.com',
    'test.owner@troodieapp.com',
    'test.critic@troodieapp.com',
    'test.newuser@troodieapp.com'
  ]

  if (testAccounts.includes(email.toLowerCase()) && token === '000000') {
    console.log('[AuthService] Test account detected, bypassing OTP:', email)

    // Verify test user exists in database
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single()

    if (userError || !userData) {
      return {
        success: false,
        error: 'Test account not found. Please run create-test-accounts.sql first.'
      }
    }

    // Create mock session for test account
    const mockSession = {
      access_token: 'test-token-' + userData.id,
      refresh_token: 'test-refresh-' + userData.id,
      expires_in: 3600,
      token_type: 'bearer',
      user: {
        id: userData.id,
        email: userData.email,
        app_metadata: {},
        user_metadata: { is_test_account: true },
        aud: 'authenticated',
        created_at: userData.created_at
      }
    } as any

    return {
      success: true,
      session: mockSession
    }
  }
  // ... rest of normal OTP verification
}
```

### 2. Database Setup Script (`scripts/create-test-accounts.sql`)

Creates test accounts with different user types and profiles:

```sql
-- Creates 4 test account types:
-- 1. test.foodie@troodieapp.com - Regular foodie user
-- 2. test.owner@troodieapp.com - Restaurant owner (business account)
-- 3. test.critic@troodieapp.com - Verified food critic
-- 4. test.newuser@troodieapp.com - New user (onboarding incomplete)

-- Each account includes:
-- - User profile with appropriate flags (is_business, verified, etc.)
-- - Sample boards
-- - Restaurant saves
-- - Posts
```

### 3. Test Data Generator (`scripts/generate-test-restaurant-data.js`)

Node.js script that generates realistic test data:

```javascript
// Features:
// - Creates restaurant saves with ratings and notes
// - Generates posts with user-type appropriate content
// - Creates themed boards (different for critics vs foodies)
// - Adds board-restaurant relationships
// - Uses realistic Google Place IDs
// - Randomizes dates for natural-looking activity
```

### 4. Bulk Setup Script (`scripts/bulk-create-test-accounts.sh`)

One-command setup for all test accounts:

```bash
#!/bin/bash
# Steps:
# 1. Create test accounts in database
# 2. Generate test data
# 3. Verify setup
```

### 5. Documentation (`docs/TEST_ACCOUNTS.md`)

Comprehensive documentation including:
- Test account credentials
- Setup instructions
- Troubleshooting guide
- Security considerations

## Test Account Credentials

| Email | OTP Code | Role | Description |
|-------|----------|------|-------------|
| `test.foodie@troodieapp.com` | `000000` | Foodie | Regular user with saves and reviews |
| `test.owner@troodieapp.com` | `000000` | Owner | Restaurant business account |
| `test.critic@troodieapp.com` | `000000` | Critic | Verified food critic |
| `test.newuser@troodieapp.com` | `000000` | New User | For testing onboarding |
| `review@troodieapp.com` | `000000` | Reviewer | App Store review account |

## Setup Instructions

### Quick Setup (Recommended)

```bash
# Make script executable
chmod +x scripts/bulk-create-test-accounts.sh

# Run bulk setup
./scripts/bulk-create-test-accounts.sh
```

### Manual Setup

1. **Create test accounts in database:**
```sql
-- In Supabase SQL Editor
-- Run the contents of scripts/create-test-accounts.sql
```

2. **Generate test data:**
```bash
node scripts/generate-test-restaurant-data.js
```

### Verification

Check that accounts were created:
```sql
SELECT email, username, display_name, is_business, verified, onboarding_completed
FROM public.users
WHERE email LIKE 'test.%@troodieapp.com';
```

## How to Test

1. **Open the app**
2. **Tap "Sign In"** (or "Sign Up" for new flow)
3. **Enter test email**: e.g., `test.foodie@troodieapp.com`
4. **Tap "Send Code"** - No actual email will be sent
5. **Enter OTP**: `000000`
6. **Success** - User is logged in with test data

## Test Data Structure

### Foodie Account (`test.foodie@troodieapp.com`)
- **Boards**: 3 themed collections
- **Saves**: 6 restaurants (mix of been/want-to-try)
- **Posts**: 4 casual food posts
- **Profile**: Complete onboarding

### Owner Account (`test.owner@troodieapp.com`)
- **Business Profile**: Enabled
- **Posts**: 2 promotional posts
- **Features**: Business dashboard access
- **Profile**: Business account flag

### Critic Account (`test.critic@troodieapp.com`)
- **Verified Badge**: Yes
- **Boards**: 4 professional collections
- **Saves**: 8 restaurants with detailed reviews
- **Posts**: 5 critical reviews
- **Profile**: Verified status

### New User Account (`test.newuser@troodieapp.com`)
- **Onboarding**: Incomplete
- **Data**: None (clean slate)
- **Use Case**: Testing signup/onboarding flow

## Security Considerations

⚠️ **IMPORTANT**:

1. **Development Only** - Never deploy to production
2. **Mock Sessions** - Not real Supabase auth sessions
3. **Fixed OTP** - Always accepts `000000`
4. **No Email Sent** - Bypasses actual email verification

### Recommended Safeguards

```typescript
// Add environment check in authService.ts
const isDevelopment = process.env.NODE_ENV === 'development'

if (isDevelopment && testAccounts.includes(email.toLowerCase())) {
  // Test account logic
}
```

## Troubleshooting

### Common Issues

**"User not found" error**
- Run `create-test-accounts.sql` to create database records

**"Session creation failed"**
- Verify `authService.ts` has the mock session logic

**No test data showing**
- Run `node scripts/generate-test-restaurant-data.js`

**OTP still being sent**
- Check email is lowercase
- Verify test account bypass is in place

### Debug Commands

```bash
# Check if test accounts exist
supabase db query "SELECT * FROM public.users WHERE email LIKE 'test.%'"

# View test account activity
supabase db query "SELECT * FROM public.posts WHERE user_id IN (SELECT id FROM public.users WHERE email LIKE 'test.%')"
```

## Adding New Test Accounts

1. **Add to authService.ts:**
```typescript
const testAccounts = [
  // existing accounts...
  'test.newtype@troodieapp.com'  // Add new
]
```

2. **Add to create-test-accounts.sql:**
```sql
-- Add new account creation logic
INSERT INTO public.users (email, username, ...)
VALUES ('test.newtype@troodieapp.com', 'test_newtype', ...);
```

3. **Update documentation**

## Removing Test Accounts

```sql
-- Clean up all test data
DELETE FROM public.users
WHERE email IN (
  'test.foodie@troodieapp.com',
  'test.owner@troodieapp.com',
  'test.critic@troodieapp.com',
  'test.newuser@troodieapp.com'
);

-- Also remove from auth.users if needed
DELETE FROM auth.users
WHERE email IN (
  'test.foodie@troodieapp.com',
  'test.owner@troodieapp.com',
  'test.critic@troodieapp.com',
  'test.newuser@troodieapp.com'
);
```

## Implementation Checklist

- [x] Modified `services/authService.ts` for OTP bypass
- [x] Created `scripts/create-test-accounts.sql` for database setup
- [x] Created `scripts/generate-test-restaurant-data.js` for test data
- [x] Created `scripts/bulk-create-test-accounts.sh` for easy setup
- [x] Created `docs/TEST_ACCOUNTS.md` for documentation
- [x] Removed password-based authentication
- [x] Implemented mock session creation
- [x] Added multiple test account types
- [x] Included comprehensive test data

## Notes

- The review account (`review@troodieapp.com`) still uses its existing password-based approach
- Test accounts use mock sessions that may not work with all Supabase features
- Consider using feature flags to enable/disable test accounts
- Remember to exclude test account logic from production builds

---

**Created**: 2025-01-18
**Based on**: Commit b9453544424d657b722cd9101f37972011649ab3
**Authentication Type**: Magic Link/OTP (No Passwords)