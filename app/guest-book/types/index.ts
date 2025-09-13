export interface GuestBookEntry {
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
