import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { SeriesProgress } from '@/components/series/SeriesProgress'
import { SeriesNavigation } from '@/components/series/SeriesNavigation'
import { getSeriesData, getAllSeries } from '@/utils/series'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
import { CalendarIcon, ClockIcon, BookOpenIcon } from '@heroicons/react/24/outline'

interface SeriesPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: SeriesPageProps): Promise<Metadata | undefined> {
  const params = await props.params
  const { slug } = params
  const seriesData = getSeriesData(slug)

  if (!seriesData) {
    return
  }

  const title = `${seriesData.name} Series`
  const description =
    seriesData.description ||
    `A comprehensive series covering ${seriesData.name}. ${seriesData.totalPosts} posts in total.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${siteMetadata.siteUrl}/series/${slug}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export async function generateStaticParams() {
  const allSeries = getAllSeries()

  return allSeries
    .filter((series) => series.slug && series.slug.length > 0)
    .map((series) => ({
      slug: series.slug,
    }))
}

export default async function SeriesPage(props: SeriesPageProps) {
  const params = await props.params
  const { slug } = params
  const seriesData = getSeriesData(slug)

  if (!seriesData || !slug) {
    notFound()
  }

  // Sort posts by order
  const sortedPosts = [...seriesData.posts].sort((a, b) => a.order - b.order)

  // Calculate total reading time
  const totalReadingTime = sortedPosts.reduce((total, post) => {
    return total + (post.readingTime?.minutes || 0)
  }, 0)

  const statusConfig = {
    completed: {
      color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20',
      label: 'Completed Series',
    },
    ongoing: {
      color: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20',
      label: 'Ongoing Series',
    },
  }

  const status = seriesData.status || 'ongoing'
  const statusStyle = statusConfig[status]

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Series Header */}
        <div className="space-y-6 pt-6 pb-8">
          <div>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link
                    href="/series"
                    className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                  >
                    Series
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-gray-300 dark:text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-4 text-gray-500 dark:text-gray-400">{seriesData.name}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <PageTitle>{seriesData.name}</PageTitle>

          {seriesData.description && (
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {seriesData.description}
            </p>
          )}

          {/* Series Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <BookOpenIcon className="h-4 w-4" />
              <span>
                {seriesData.totalPosts} {seriesData.totalPosts === 1 ? 'post' : 'posts'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4" />
              <span>~{Math.ceil(totalReadingTime)} min total read</span>
            </div>
            <div
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle.color}`}
            >
              {statusStyle.label}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Series Progress
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {seriesData.totalPosts}/{seriesData.totalPosts}
              </span>
            </div>
            <SeriesProgress
              currentOrder={seriesData.totalPosts}
              totalPosts={seriesData.totalPosts}
              variant="bar"
            />
          </div>
        </div>

        {/* Posts List */}
        <div className="py-12">
          <h2 className="mb-8 text-2xl leading-8 font-bold tracking-tight text-gray-900 dark:text-gray-100">
            All Posts in This Series
          </h2>

          <div className="space-y-6">
            {sortedPosts.map((post, index) => (
              <article key={post.slug} className="group relative">
                <div className="flex gap-4">
                  {/* Order Number */}
                  <div className="flex-shrink-0">
                    <div className="bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold">
                      {post.order}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-lg font-semibold text-gray-900 dark:text-gray-100">
                          <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true" />
                            {post.title}
                          </Link>
                        </h3>

                        {post.summary && (
                          <p className="mt-2 line-clamp-2 text-gray-500 dark:text-gray-400">
                            {post.summary}
                          </p>
                        )}

                        <div className="mt-3 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" />
                            <time dateTime={post.date}>
                              {formatDate(post.date, siteMetadata.locale)}
                            </time>
                          </div>
                          {post.readingTime && (
                            <div className="flex items-center gap-1">
                              <ClockIcon className="h-4 w-4" />
                              <span>{post.readingTime.text}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connecting Line */}
                {index < sortedPosts.length - 1 && (
                  <div className="absolute top-10 bottom-0 left-5 h-[calc(100%-15px)] w-px bg-gray-200 dark:bg-gray-700" />
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Series Navigation */}
        <div className="py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/series"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-2 text-sm font-medium"
            >
              ← Back to All Series
            </Link>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              Want to start reading? Begin with{' '}
              <Link
                href={`/blog/${sortedPosts[0]?.slug}`}
                className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
              >
                {sortedPosts[0]?.title}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
