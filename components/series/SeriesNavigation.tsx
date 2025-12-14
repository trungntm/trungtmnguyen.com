'use client'

import Link from '@/components/Link'
import { SeriesNavigationProps } from './types'
import { SeriesProgress } from './SeriesProgress'
import { cn } from '@/utils/lib/cn'
import { ChevronLeftIcon, ChevronRightIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { SERIES_STATUS } from '@/utils/constants'

export function SeriesNavigation({
  series,
  currentPost,
  currentOrder,
  className,
}: SeriesNavigationProps) {
  const currentIndex = series.posts.findIndex((post) => post.title === currentPost)
  const previousPost = currentIndex > 0 ? series.posts[currentIndex - 1] : null
  const nextPost = currentIndex < series.posts.length - 1 ? series.posts[currentIndex + 1] : null

  return (
    <div className={cn('space-y-6', className)}>
      {/* Series Overview */}
      <div className="from-primary-50 border-primary-200 rounded-lg border bg-gradient-to-r to-blue-50 p-6 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-primary-500 rounded-lg p-2">
            <BookOpenIcon className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Part of:
              <Link
                href={`/series/${series.slug}`}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 ml-1"
              >
                {series.name}
              </Link>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You're reading part {currentOrder} of {series.totalPosts}
            </p>
          </div>
        </div>

        <SeriesProgress currentOrder={currentOrder} totalPosts={series.totalPosts} variant="bar" />
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Previous Post */}
        <div className="flex-1">
          {previousPost ? (
            <Link
              href={`/blog/${previousPost.slug}`}
              className="group hover:border-primary-300 dark:hover:border-primary-600 flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="group-hover:bg-primary-100 dark:group-hover:bg-primary-900 rounded-lg bg-gray-100 p-2 transition-colors dark:bg-gray-800">
                <ChevronLeftIcon className="group-hover:text-primary-600 dark:group-hover:text-primary-400 h-4 w-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Previous
                </p>
                <p className="group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate font-medium text-gray-900 dark:text-gray-100">
                  {previousPost.title}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Part {previousPost.order}
                </p>
              </div>
            </Link>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 opacity-50 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                This is the first post in the series
              </p>
            </div>
          )}
        </div>

        {/* Next Post */}
        <div className="flex-1">
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group hover:border-primary-300 dark:hover:border-primary-600 flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="min-w-0 flex-1 text-right">
                <p className="mb-1 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Next
                </p>
                <p className="group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate font-medium text-gray-900 dark:text-gray-100">
                  {nextPost.title}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Part {nextPost.order}
                </p>
              </div>
              <div className="group-hover:bg-primary-100 dark:group-hover:bg-primary-900 rounded-lg bg-gray-100 p-2 transition-colors dark:bg-gray-800">
                <ChevronRightIcon className="group-hover:text-primary-600 dark:group-hover:text-primary-400 h-4 w-4 text-gray-600 dark:text-gray-400" />
              </div>
            </Link>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 opacity-50 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                {series.status === SERIES_STATUS.COMPLETED
                  ? 'This is the final post in the series'
                  : 'More posts coming soon!'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Series Overview Link */}
      <div className="text-center">
        <Link
          href={`/series/${series.slug}`}
          className="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 inline-flex items-center gap-2 text-sm font-medium"
        >
          <BookOpenIcon className="h-4 w-4" />
          View all posts in this series
        </Link>
      </div>
    </div>
  )
}
