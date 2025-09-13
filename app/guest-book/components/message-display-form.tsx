import { GuestBookEntry } from '../types'
import { Avatar } from '@/components/avatar'
import { MessageContent } from './message-content'

interface MessageDisplayFormProps {
  entries: GuestBookEntry[]
}

const MessageDisplayForm = ({ entries }: MessageDisplayFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Messages ({entries.length})
      </h3>

      {entries.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">
            No messages yet. Be the first to sign the guest book!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <Avatar
                  avatarUrl={entry.is_anonymous ? undefined : entry.avatar_url}
                  fullName={entry.name || 'Anonymous'}
                  isAnonymous={entry.is_anonymous}
                  size={40}
                  className="mt-4"
                />

                {/* Content */}
                <MessageContent entry={entry} key={entry.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { MessageDisplayForm }
