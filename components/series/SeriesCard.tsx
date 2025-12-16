'use client'

import Link from '@/components/custom-link'
import { SeriesCardProps } from './types'
import { SeriesProgress } from './SeriesProgress'
import { cn } from '@/utils/lib/cn'
import { CalendarIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { SERIES_STATUS } from '@/utils/constants'

export function SeriesCard({
  series,
  showProgress = true,
  variant = 'detailed',
  currentPostSlug,
  className,
}: SeriesCardProps) {
  const currentPost = currentPostSlug
    ? series.posts.find((post) => post.slug === currentPostSlug)
    : null
  const currentOrder = currentPost?.order || 1

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'series-container series-card animate-series-fade-in rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800',
          className
        )}
      >
        <div className="flex items-center gap-3">
          <BookOpenIcon className="text-primary-500 h-5 w-5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <Link
              href={`/series/${series.slug}`}
              className="hover:text-primary-500 dark:hover:text-primary-400 font-medium text-gray-900 transition-colors duration-200 dark:text-gray-100"
            >
              {series.name}
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {series.totalPosts} part{series.totalPosts !== 1 ? 's' : ''}
            </p>
          </div>
          {showProgress && currentPostSlug && (
            <SeriesProgress
              currentOrder={currentOrder}
              totalPosts={series.totalPosts}
              variant="numbers"
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'series-container series-card series-card-hover animate-series-fade-in shadow-series rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="bg-primary-100 dark:bg-primary-900 animate-series-scale rounded-lg p-2">
          <BookOpenIcon className="text-primary-600 dark:text-primary-400 h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              <Link
                href={`/series/${series.slug}`}
                className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
              >
                {series.name}
              </Link>
            </h3>
            <span
              className={cn(
                'series-badge inline-flex items-center rounded-full px-2 py-1 text-xs font-medium transition-all duration-200',
                series.status === SERIES_STATUS.COMPLETED
                  ? 'series-completed bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  : 'series-ongoing bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              )}
            >
              {series.status || SERIES_STATUS.ONGOING}
            </span>
          </div>

          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            A {series.totalPosts}-part series exploring key concepts and practical implementations.
          </p>

          {showProgress && currentPostSlug && (
            <div className="mb-4">
              <SeriesProgress
                currentOrder={currentOrder}
                totalPosts={series.totalPosts}
                variant="bar"
              />
            </div>
          )}

          <div className="space-y-2">
            <h4 className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
              Series Contents
            </h4>
            <div className="max-h-48 space-y-1 overflow-y-auto">
              {series.posts.map((post, index) => (
                <div key={post.slug} className="flex items-center gap-3 py-2">
                  <div
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium',
                      currentPostSlug === post.slug
                        ? 'bg-primary-500 text-white'
                        : post.order <= currentOrder
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                    )}
                  >
                    {post.order}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/blog/${post.slug}`}
                      className={cn(
                        'hover:text-primary-500 dark:hover:text-primary-400 block text-sm',
                        currentPostSlug === post.slug
                          ? 'text-primary-600 dark:text-primary-400 font-medium'
                          : 'text-gray-700 dark:text-gray-300'
                      )}
                    >
                      {post.title}
                    </Link>
                    {post.date && (
                      <div className="mt-1 flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
