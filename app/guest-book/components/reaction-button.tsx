'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { useSessionId } from '@/hooks/useSessionId'

interface ReactionButtonProps {
  emoji: string
  count: number
  isActive: boolean
  guestbookId: string
  onReactionUpdate: (emoji: string, newCount: number, isActive: boolean) => void
}

export function ReactionButton({
  emoji,
  count,
  isActive,
  guestbookId,
  onReactionUpdate,
}: ReactionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const sessionId = useSessionId()

  const handleClick = async () => {
    if (isLoading || !sessionId) return

    setIsLoading(true)
    const supabase = createClient()

    try {
      if (isActive) {
        // Remove reaction - handle both authenticated and anonymous users
        const deleteQuery = supabase
          .from('guestbook_reactions')
          .delete()
          .eq('guestbook_id', guestbookId)
          .eq('emoji', emoji)

        if (user) {
          deleteQuery.eq('user_id', user.id)
        } else {
          deleteQuery.eq('session_id', sessionId)
        }

        const { error } = await deleteQuery

        if (!error) {
          onReactionUpdate(emoji, count - 1, false)
        }
      } else {
        // Add reaction - handle both authenticated and anonymous users
        const insertData = {
          guestbook_id: guestbookId,
          emoji: emoji,
          ...(user
            ? { user_id: user.id, session_id: null }
            : { user_id: null, session_id: sessionId }),
        }

        const { error } = await supabase.from('guestbook_reactions').insert(insertData)

        if (!error) {
          onReactionUpdate(emoji, count + 1, true)
        }
      }
    } catch (error) {
      console.error('Error updating reaction:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || !sessionId}
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm transition-all ${
        isActive
          ? 'bg-blue-100 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-700'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
      } ${!sessionId ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${isLoading ? 'opacity-50' : ''}`}
      title={!sessionId ? 'Loading...' : isActive ? 'Remove reaction' : 'Add reaction'}
    >
      <span>{emoji}</span>
      {count > 0 && <span className="font-medium">{count}</span>}
    </button>
  )
}
