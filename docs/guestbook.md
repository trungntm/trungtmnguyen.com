# Guest Book Documentation

## Overview

The Guest Book is a interactive feature that allows visitors to leave messages on the website. It supports multiple authentication modes, real-time updates, and emoji reactions. The system is built with Next.js, Supabase, and TypeScript.

## Features

### 🔐 **Multiple Authentication Modes**

- **Anonymous Mode**: Leave messages without signing in (requires display name)
- **OAuth Sign-in**: Sign in with GitHub or Google for authenticated comments
- **Authenticated Users**: Automatic name/avatar population from profile

### 💬 **Message Management**

- Real-time message updates using Supabase subscriptions
- Message validation and form handling with React Hook Form + Yup
- Support for optional email and website fields
- Automatic avatar display for authenticated users

### 😊 **Emoji Reactions**

- 6 emoji types: 👍 ❤️ 😂 😮 😢 🎉
- Anonymous reaction support (session-based tracking)
- Real-time reaction updates
- One reaction per emoji per user/session

### 🎨 **UI/UX**

- Responsive design with Tailwind CSS
- Dark mode support
- Loading states and error handling
- Animated sparkle text for titles
- Tab switching between authentication modes

## Architecture

### File Structure

```
app/guest-book/
├── page.tsx                    # Main guest book page
├── components/
│   ├── anonymous-form.tsx      # Form for anonymous users
│   ├── comment-form.tsx        # Common comment input
│   ├── sign-in-form.tsx        # OAuth sign-in buttons
│   ├── reaction-button.tsx     # Individual reaction button
│   └── reactions.tsx           # Reactions container
```

### Key Components

#### 1. **Main Guest Book Page (`page.tsx`)**

- Manages authentication state and form handling
- Renders different forms based on auth mode
- Handles message submission to Supabase
- Displays existing messages with avatars and reactions

#### 2. **Authentication Forms**

- **AnonymousForm**: Collects name, email (optional), website (optional)
- **SignInForm**: OAuth buttons for GitHub/Google sign-in
- **CommentForm**: Message input field (shared across modes)

#### 3. **Reactions System**

- **ReactionButton**: Individual emoji button with count and active state
- **Reactions**: Container managing all reactions for a message
- Session-based tracking for anonymous users

### Database Schema

#### Guest Book Entries

```sql
TABLE guestbook (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  email TEXT,
  website TEXT,
  user_id UUID REFERENCES auth.users(id),
  is_anonymous BOOLEAN DEFAULT false,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
```

#### Reactions

```sql
TABLE guestbook_reactions (
  id UUID PRIMARY KEY,
  guestbook_id UUID REFERENCES guestbook(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id), -- For authenticated users
  session_id TEXT,                        -- For anonymous users
  emoji TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(guestbook_id, user_id, emoji),     -- Authenticated constraint
  UNIQUE(guestbook_id, session_id, emoji)   -- Anonymous constraint
)
```

## Implementation Details

### Authentication Flow

1. **Page Load**: Check user authentication status
2. **Mode Selection**: User chooses between anonymous or sign-in
3. **Form Validation**: Different schemas based on auth mode
4. **Message Submission**:
   - Anonymous: Create temporary session, collect name/email
   - Authenticated: Use existing user profile data

### Real-time Updates

```typescript
// Supabase subscription for new messages
const channel = supabase
  .channel('guestbook-channel')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'guestbook' }, (payload) => {
    setEntries((prev) => [payload.new, ...prev])
  })
  .subscribe()
```

### Session Management for Anonymous Users

```typescript
// Generate persistent session ID for anonymous reactions
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Store in localStorage for persistence
localStorage.setItem('guestbook_session_id', sessionId)
```

### Form Validation

```typescript
const guestBookSchema = Yup.object().shape({
  name: isAuthenticated
    ? Yup.string() // Optional for authenticated users
    : activeAuthMode === 'anonymous'
      ? Yup.string().required('Display name is required')
      : Yup.string(),
  email: Yup.string().email('Invalid email').optional(),
  website: Yup.string().url('Invalid URL').optional(),
  message: Yup.string().min(2, 'Too short').required('Required'),
})
```

## Setup Instructions

### 1. Database Setup

Run the SQL migrations in your Supabase dashboard:

```sql
-- Create guestbook table
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

-- Create reactions table (see supabase/migrations/create_guestbook_reactions.sql)
```

### 2. Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. OAuth Configuration

Configure OAuth providers in Supabase dashboard:

- GitHub OAuth
- Google OAuth

### 4. Row Level Security (RLS)

Enable RLS policies for:

- Public read access to guestbook entries
- Authenticated users can insert entries
- Reaction policies for both auth and anonymous users

## Usage Examples

### Basic Message Submission

```typescript
const newEntry = {
  name: user?.user_metadata?.full_name || formData.name,
  message: formData.message.trim(),
  email: user?.email || formData.email,
  website: formData.website,
  user_id: user?.id,
  is_anonymous: !isAuthenticated,
  avatar_url: user?.user_metadata?.avatar_url,
}

await supabase.from('guestbook').insert(newEntry)
```

### Adding Reactions

```typescript
const insertData = {
  guestbook_id: messageId,
  emoji: '👍',
  ...(user ? { user_id: user.id, session_id: null } : { user_id: null, session_id: sessionId }),
}

await supabase.from('guestbook_reactions').insert(insertData)
```

## Security Considerations

### Row Level Security Policies

```sql
-- Guest book entries
CREATE POLICY "Anyone can view entries" ON guestbook FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert" ON guestbook FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL OR is_anonymous = true);

-- Reactions
CREATE POLICY "Anyone can view reactions" ON guestbook_reactions FOR SELECT USING (true);
CREATE POLICY "Anyone can insert reactions" ON guestbook_reactions FOR INSERT
  WITH CHECK (
    (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL)
  );
```

### Data Validation

- Server-side validation through Supabase constraints
- Client-side validation with Yup schemas
- Input sanitization for XSS prevention
- Rate limiting through Supabase's built-in limits

## Customization Options

### Styling

- Update Tailwind classes in components
- Modify dark mode styles
- Customize emoji set in reactions

### Features

- Add more OAuth providers
- Implement message moderation
- Add message categories/tags
- Extend reaction types

### Database

- Add message threading/replies
- Implement message likes/upvotes
- Add user reputation system

## Troubleshooting

### Common Issues

1. **Messages not appearing**: Check RLS policies and network tab
2. **Authentication not working**: Verify OAuth configuration in Supabase
3. **Reactions not updating**: Check session ID generation and storage
4. **Form validation errors**: Review Yup schema definitions

### Debug Tools

```typescript
// Enable debug mode
const supabase = createClient()
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth event:', event, session)
})
```

## Performance Considerations

- Real-time subscriptions are cleaned up on component unmount
- Reactions are fetched once and updated via subscriptions
- Form validation runs on change for immediate feedback
- Images and avatars are optimized through Next.js Image component

## Future Enhancements

- [ ] Message search and filtering
- [ ] Export guest book as PDF
- [ ] Email notifications for new messages
- [ ] Message moderation dashboard
- [ ] Spam detection and prevention
- [ ] Message translation support
