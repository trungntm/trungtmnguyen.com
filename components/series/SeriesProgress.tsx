'use client'

import { SeriesProgressProps } from './types'
import { cn } from '@/utils/lib/cn'

export function SeriesProgress({
  currentOrder,
  totalPosts,
  variant = 'bar',
  className,
}: SeriesProgressProps) {
  const percentage = Math.round((currentOrder / totalPosts) * 100)

  if (variant === 'bar') {
    return (
      <div className={cn('series-progress-container w-full', className)}>
        <div className="mb-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Progress</span>
          <span>
            {currentOrder} of {totalPosts} ({percentage}%)
          </span>
        </div>
        <div className="series-progress-bar h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="series-progress-fill bg-primary-500 animate-series-progress h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%`, transformOrigin: 'left' }}
          />
        </div>
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={cn('series-progress-dots flex items-center gap-2', className)}>
        <span className="mr-2 text-sm text-gray-600 dark:text-gray-400">
          {currentOrder}/{totalPosts}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalPosts }, (_, i) => (
            <div
              key={i}
              className={cn(
                'series-progress-dot h-2 w-2 rounded-full transition-all duration-200',
                i < currentOrder - 1
                  ? 'completed bg-primary-500'
                  : i === currentOrder - 1
                    ? 'current bg-primary-400 ring-primary-200 dark:ring-primary-800 animate-series-pulse ring-2 ring-offset-1'
                    : 'upcoming bg-gray-200 dark:bg-gray-700'
              )}
            />
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'numbers') {
    return (
      <div className={cn('inline-flex items-center gap-2', className)}>
        <div className="flex items-center gap-1">
          <span className="text-primary-500 text-lg font-bold">{currentOrder}</span>
          <span className="text-gray-400">/</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{totalPosts}</span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500">({percentage}%)</div>
      </div>
    )
  }

  return null
}
