'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { useSessionId } from '@/hooks/useSessionId'
import { ReactionButton } from './reaction-button'

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

interface ReactionsProps {
  guestbookId: string
}

const AVAILABLE_EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🎉']

export function Reactions({ guestbookId }: ReactionsProps) {
  const [reactions, setReactions] = useState<ReactionCount[]>([])
  const [showAll, setShowAll] = useState(false)
  const { user } = useAuth()
  const sessionId = useSessionId()

  useEffect(() => {
    if (!guestbookId || !sessionId) return

    const supabase = createClient()

    async function fetchReactions() {
      const { data, error } = await supabase
        .from('guestbook_reactions')
        .select('*')
        .eq('guestbook_id', guestbookId)

      if (error) {
        console.error('Error fetching reactions:', error)
        return
      }

      // Process reactions to get counts and user reactions
      const reactionCounts: { [emoji: string]: ReactionCount } = {}

      data.forEach((reaction: GuestBookReaction) => {
        if (!reactionCounts[reaction.emoji]) {
          reactionCounts[reaction.emoji] = {
            emoji: reaction.emoji,
            count: 0,
            userReacted: false,
          }
        }
        reactionCounts[reaction.emoji].count++

        // Check if current user/session reacted
        const isCurrentUserReaction = user
          ? reaction.user_id === user.id
          : reaction.session_id === sessionId

        if (isCurrentUserReaction) {
          reactionCounts[reaction.emoji].userReacted = true
        }
      })

      setReactions(Object.values(reactionCounts))
    }

    fetchReactions()
  }, [guestbookId, user, sessionId])

  const handleReactionUpdate = (emoji: string, newCount: number, isActive: boolean) => {
    setReactions((prev) => {
      const updated = prev.map((reaction) =>
        reaction.emoji === emoji
          ? { ...reaction, count: newCount, userReacted: isActive }
          : reaction
      )

      // If reaction doesn't exist and count > 0, add it
      if (newCount > 0 && !prev.find((r) => r.emoji === emoji)) {
        updated.push({ emoji, count: newCount, userReacted: isActive })
      }

      // Remove reactions with count 0
      return updated.filter((reaction) => reaction.count > 0)
    })
  }

  const displayedReactions = showAll ? reactions : reactions.slice(0, 5)
  const availableEmojis = AVAILABLE_EMOJIS.filter(
    (emoji) => !reactions.find((r) => r.emoji === emoji)
  )

  return (
    <div className="space-y-2">
      {/* Existing reactions */}
      {displayedReactions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {displayedReactions.map((reaction) => (
            <ReactionButton
              key={reaction.emoji}
              emoji={reaction.emoji}
              count={reaction.count}
              isActive={reaction.userReacted}
              guestbookId={guestbookId}
              onReactionUpdate={handleReactionUpdate}
            />
          ))}
          {reactions.length > 5 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              +{reactions.length - 5} more
            </button>
          )}
        </div>
      )}

      {/* Add reaction button */}
      {sessionId && availableEmojis.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {availableEmojis.slice(0, showAll ? availableEmojis.length : 3).map((emoji) => (
            <ReactionButton
              key={emoji}
              emoji={emoji}
              count={0}
              isActive={false}
              guestbookId={guestbookId}
              onReactionUpdate={handleReactionUpdate}
            />
          ))}
          {!showAll && availableEmojis.length > 3 && (
            <button
              onClick={() => setShowAll(true)}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
            >
              +{availableEmojis.length - 3} more
            </button>
          )}
        </div>
      )}

      {!sessionId && reactions.length === 0 && (
        <p className="text-xs text-gray-400 dark:text-gray-500">Loading reactions...</p>
      )}
    </div>
  )
}
