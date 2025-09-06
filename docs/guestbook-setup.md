# Guest Book Quick Setup Guide

## Prerequisites

- Next.js 15+ project
- Supabase account and project
- OAuth providers configured (GitHub/Google)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr
npm install react-hook-form @hookform/resolvers yup
npm install dayjs
```

### 2. Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Database Setup

#### Create Tables

```sql
-- 1. Create guestbook table
CREATE TABLE guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  email TEXT,
  website TEXT,
  user_id UUID REFERENCES auth.users(id),
  is_anonymous BOOLEAN DEFAULT false,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Run the reactions migration
-- Copy and paste from: supabase/migrations/create_guestbook_reactions.sql
```

#### Enable RLS

```sql
-- Enable Row Level Security
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view entries" ON guestbook
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert entries" ON guestbook
  FOR INSERT WITH CHECK (true);
```

### 4. OAuth Configuration

In Supabase Dashboard → Authentication → Providers:

1. **GitHub**:

   - Enable GitHub provider
   - Add Client ID and Secret
   - Set redirect URL: `https://your-domain.com/auth/callback`

2. **Google**:
   - Enable Google provider
   - Add Client ID and Secret
   - Set redirect URL: `https://your-domain.com/auth/callback`

### 5. File Structure

Create the following files in your project:

```
app/guest-book/
├── page.tsx                    # Main page (copy from repo)
├── components/
│   ├── anonymous-form.tsx      # Anonymous user form
│   ├── comment-form.tsx        # Message input
│   ├── sign-in-form.tsx       # OAuth buttons
│   ├── reaction-button.tsx     # Individual reaction
│   └── reactions.tsx          # Reactions container

hooks/
└── useSessionId.ts            # Session management

utils/supabase/
└── client.ts                  # Supabase client
```

### 6. Core Components Setup

#### Supabase Client (`utils/supabase/client.ts`)

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const createClient = () => createClient(supabaseUrl, supabaseKey)
```

#### Auth Hook (`hooks/useAuth.ts`)

```typescript
import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeAuthMode, setActiveAuthMode] = useState<'anonymous' | 'signin'>('anonymous')

  // Implementation details...

  return {
    user,
    isAuthenticated,
    activeAuthMode,
    setActiveAuthMode,
    signOut: () => supabase.auth.signOut(),
  }
}
```

### 7. Required Components

Make sure you have these supporting components:

- `LoadingButton` - Button with loading state
- `Avatar` - User avatar display
- `TabSwitch` - Switch between auth modes
- `FormProvider` - React Hook Form context
- `RHFTextField`, `RHFTextArea` - Form fields
- `SparklesText` - Animated text component

### 8. Test the Implementation

1. **Anonymous Mode**: Try leaving a message without signing in
2. **OAuth Sign-in**: Test GitHub/Google authentication
3. **Reactions**: Add emoji reactions to messages
4. **Real-time**: Open multiple browser tabs to test live updates

### 9. Deployment Checklist

- [ ] Environment variables set in production
- [ ] OAuth redirect URLs updated for production domain
- [ ] Database policies tested in production
- [ ] CORS settings configured in Supabase

## Troubleshooting

### Common Issues

**"Row Level Security" errors**:

```sql
-- Make sure policies allow public access
CREATE POLICY "Public read access" ON guestbook FOR SELECT USING (true);
```

**OAuth not working**:

- Check redirect URLs in provider settings
- Verify client ID/secret are correct
- Ensure HTTPS in production

**Reactions not persisting**:

- Check browser localStorage for session ID
- Verify reactions table constraints
- Test RLS policies for anonymous users

### Debug Commands

```typescript
// Check authentication state
console.log(await supabase.auth.getSession())

// Test database connection
console.log(await supabase.from('guestbook').select('count'))

// Monitor real-time subscriptions
supabase.channel('debug').subscribe(console.log)
```

## Next Steps

After basic setup:

1. Customize styling to match your design system
2. Add moderation features if needed
3. Implement email notifications
4. Add analytics tracking
5. Consider adding message search/filtering

For detailed implementation, see the full documentation at `docs/guestbook.md`.
