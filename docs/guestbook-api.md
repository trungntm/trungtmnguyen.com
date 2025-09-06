# Guest Book API Reference

## Overview

This document provides detailed API reference for the Guest Book feature, including database operations, component props, and utility functions.

## Database Operations

### Guest Book Entries

#### Insert New Entry

```typescript
interface GuestBookEntry {
  name: string
  message: string
  email?: string
  website?: string
  user_id?: string
  is_anonymous?: boolean
  avatar_url?: string
}

// Insert entry
const { data, error } = await supabase.from('guestbook').insert(newEntry)
```

#### Fetch Entries

```typescript
// Get all entries (with pagination)
const { data, error } = await supabase
  .from('guestbook')
  .select('*')
  .order('created_at', { ascending: false })
  .range(0, 9) // First 10 entries

// Get specific entry
const { data, error } = await supabase.from('guestbook').select('*').eq('id', entryId).single()
```

#### Real-time Subscription

```typescript
const channel = supabase
  .channel('guestbook-channel')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'guestbook' }, (payload) => {
    // Handle new entry
    setEntries((prev) => [payload.new, ...prev])
  })
  .subscribe()

// Cleanup
return () => supabase.removeChannel(channel)
```

### Reactions

#### Add Reaction

```typescript
// For authenticated users
const { error } = await supabase.from('guestbook_reactions').insert({
  guestbook_id: messageId,
  user_id: userId,
  emoji: '👍',
})

// For anonymous users
const { error } = await supabase.from('guestbook_reactions').insert({
  guestbook_id: messageId,
  session_id: sessionId,
  emoji: '👍',
})
```

#### Remove Reaction

```typescript
// For authenticated users
const { error } = await supabase
  .from('guestbook_reactions')
  .delete()
  .eq('guestbook_id', messageId)
  .eq('user_id', userId)
  .eq('emoji', emoji)

// For anonymous users
const { error } = await supabase
  .from('guestbook_reactions')
  .delete()
  .eq('guestbook_id', messageId)
  .eq('session_id', sessionId)
  .eq('emoji', emoji)
```

#### Fetch Reactions

```typescript
const { data, error } = await supabase
  .from('guestbook_reactions')
  .select('*')
  .eq('guestbook_id', messageId)
```

## Component API

### Main Guest Book Component

```typescript
interface GuestBookProps {
  // No props - self-contained component
}

export default function GuestBook(): JSX.Element
```

### Authentication Forms

#### AnonymousForm

```typescript
interface AnonymousFormProps {
  // Uses React Hook Form context
  // No direct props
}

export const AnonymousForm: React.FC<AnonymousFormProps>
```

#### SignInForm

```typescript
interface SignInFormProps {
  // Uses React Hook Form context
  // No direct props
}

export const SignInForm: React.FC<SignInFormProps>
```

#### CommentForm

```typescript
interface CommentFormProps {
  // Uses React Hook Form context
  // No direct props
}

export const CommentForm: React.FC<CommentFormProps>
```

### Reaction Components

#### ReactionButton

```typescript
interface ReactionButtonProps {
  emoji: string // The emoji character
  count: number // Current reaction count
  isActive: boolean // Whether current user reacted
  guestbookId: string // ID of the guest book entry
  onReactionUpdate: (emoji: string, newCount: number, isActive: boolean) => void
}

export function ReactionButton(props: ReactionButtonProps): JSX.Element
```

#### Reactions Container

```typescript
interface ReactionsProps {
  guestbookId: string // ID of the guest book entry
}

export function Reactions(props: ReactionsProps): JSX.Element
```

## Hooks

### useAuth

```typescript
interface UseAuthReturn {
  user: User | null
  isAuthenticated: boolean
  activeAuthMode: 'anonymous' | 'signin'
  setActiveAuthMode: (mode: 'anonymous' | 'signin') => void
  signOut: () => Promise<void>
}

export function useAuth(): UseAuthReturn
```

### useSessionId

```typescript
export function useSessionId(): string
```

## Type Definitions

### Guest Book Entry

```typescript
interface GuestBookEntry {
  id: string
  name: string
  message: string
  created_at?: Date
  email?: string
  user_id?: string
  website?: string
  is_anonymous?: boolean
  avatar_url?: string
}
```

### Reaction

```typescript
interface GuestBookReaction {
  id: string
  guestbook_id: string
  user_id: string | null
  session_id: string | null
  emoji: string
  created_at: string
}

interface ReactionCount {
  emoji: string
  count: number
  userReacted: boolean
}
```

### Form Data

```typescript
interface GuestBookFormData {
  name?: string
  email?: string
  website?: string
  message: string
}
```

## Validation Schemas

### Yup Schema

```typescript
const guestBookSchema = Yup.object().shape({
  name: isAuthenticated
    ? Yup.string()
    : activeAuthMode === 'anonymous'
      ? Yup.string().required('Display name is required for anonymous comments')
      : Yup.string(),
  email: Yup.string().email('Invalid email').optional(),
  website: Yup.string().url('Invalid URL').optional(),
  message: Yup.string().min(2, 'Message is too short').required('Message is required'),
})
```

## Constants

### Available Emojis

```typescript
const AVAILABLE_EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🎉']
```

### Authentication Modes

```typescript
type AuthMode = 'anonymous' | 'signin'
```

## Utility Functions

### Date Formatting

```typescript
const formatDate = (date: Date | undefined): string => {
  if (!date) date = new Date()
  return dayjs(date).format('MMMM D, YYYY h:mm A')
}
```

### Session ID Generation

```typescript
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
```

### Avatar URL Processing

```typescript
const getAvatarUrl = (user: User | null): string | undefined => {
  return user?.user_metadata?.avatar_url || user?.user_metadata?.picture
}
```

## Error Handling

### Common Error Types

```typescript
interface SupabaseError {
  message: string
  details: string
  hint: string
  code: string
}

// Usage
const { data, error } = await supabase.from('guestbook').insert(entry)
if (error) {
  console.error('Database error:', error.message)
  // Handle error appropriately
}
```

### Form Validation Errors

```typescript
interface ValidationError {
  name?: string
  email?: string
  website?: string
  message?: string
}

// Access via React Hook Form
const {
  formState: { errors },
} = useForm()
```

## Performance Considerations

### Subscription Management

```typescript
useEffect(() => {
  const channel = supabase.channel('guestbook')
  // ... subscription setup

  // Always cleanup
  return () => supabase.removeChannel(channel)
}, [dependency])
```

### Debounced Operations

```typescript
import { useMemo } from 'react'
import { debounce } from 'lodash'

const debouncedUpdate = useMemo(() => debounce(handleReactionUpdate, 300), [])
```

## Security Notes

### Input Sanitization

- All user inputs are validated with Yup schemas
- Database constraints prevent invalid data
- RLS policies control access

### Rate Limiting

- Supabase provides built-in rate limiting
- Consider implementing client-side debouncing
- Monitor for spam patterns

### Session Security

- Session IDs are not cryptographically secure
- Use for anonymous tracking only
- Don't store sensitive data in sessions

## Testing

### Unit Tests

```typescript
// Test reaction functionality
describe('ReactionButton', () => {
  it('should add reaction when clicked', async () => {
    // Test implementation
  })

  it('should remove reaction when clicked again', async () => {
    // Test implementation
  })
})
```

### Integration Tests

```typescript
// Test database operations
describe('Guest Book API', () => {
  it('should insert new entry', async () => {
    // Test database insertion
  })

  it('should fetch entries with pagination', async () => {
    // Test database queries
  })
})
```

For implementation examples and setup instructions, see:

- `docs/guestbook.md` - Full documentation
- `docs/guestbook-setup.md` - Quick setup guide
