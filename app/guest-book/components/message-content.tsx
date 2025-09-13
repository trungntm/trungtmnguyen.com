import { formatDate } from '@/utils/date-utils'
import { GuestBookEntry } from '../types'
import { Reactions } from './reactions'

interface MessageContentProps {
  entry: GuestBookEntry
}

const MessageContent = ({ entry }: MessageContentProps) => {
  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-center space-x-2">
        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
          {entry.website ? (
            <a
              href={entry.website.startsWith('http') ? entry.website : `https://${entry.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {entry.name}
            </a>
          ) : (
            entry.name
          )}
        </h4>
        {entry.is_anonymous && (
          <span className="mt-3 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
            Anonymous
          </span>
        )}
      </div>
      <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <span>{formatDate(entry.created_at)}</span>
      </div>
      <p className="mt-2 whitespace-pre-wrap text-gray-700 dark:text-gray-300">{entry.message}</p>

      {/* Reactions */}
      <div className="mt-3">
        <Reactions guestbookId={entry.id} />
      </div>
    </div>
  )
}

export { MessageContent }
