'use client'

import Link from '@/components/Link'
import { BookOpenIcon } from '@heroicons/react/24/outline'
import { cn } from '@/utils/lib/cn'

export interface SeriesBadgeProps {
  seriesSlug: string
  seriesName: string
  order: number
  className?: string
  variant?: 'default' | 'compact'
}

export function SeriesBadge({
  seriesSlug,
  seriesName,
  order,
  className,
  variant = 'default',
}: SeriesBadgeProps) {
  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className="bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs">
          <BookOpenIcon className="text-primary-600 dark:text-primary-400 h-3 w-3" />
          <Link
            href={`/series/${seriesSlug}`}
            className="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-200 font-medium"
          >
            {seriesName}
          </Link>
          <span className="text-primary-600 dark:text-primary-400">·</span>
          <span className="text-primary-600 dark:text-primary-400 font-medium">Part {order}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm">
        <BookOpenIcon className="text-primary-600 dark:text-primary-400 h-3.5 w-3.5" />
        <Link
          href={`/series/${seriesSlug}`}
          className="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-200 font-medium"
        >
          {seriesName}
        </Link>
        <span className="text-primary-600 dark:text-primary-400">·</span>
        <span className="text-primary-600 dark:text-primary-400 font-medium">Part {order}</span>
      </div>
    </div>
  )
}
