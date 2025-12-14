import { Metadata } from 'next'
import { genPageMetadata } from 'app/seo'
import { getAllSeries } from '@/utils/series'
import { SeriesCard } from '@/components/series/SeriesCard'
import PageTitle from '@/components/PageTitle'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = genPageMetadata({
  title: 'Series',
  description: 'Explore organized series of blog posts covering specific topics in depth',
})

export default function SeriesPage() {
  const allSeries = getAllSeries()

  // Filter out invalid series (empty slug)
  const validSeries = allSeries.filter((series) => series.slug && series.slug.length > 0)

  const totalSeries = validSeries.length
  const completedSeries = validSeries.filter((series) => series.status === 'completed').length
  const ongoingSeries = validSeries.filter((series) => series.status === 'ongoing').length

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <PageTitle>Series</PageTitle>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Explore comprehensive series of blog posts organized by topic. Each series takes you
            through a complete learning journey from fundamentals to advanced concepts.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="series-stats-card rounded-md bg-blue-50 px-3 py-1 dark:bg-blue-900/20">
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {totalSeries} {totalSeries === 1 ? 'Series' : 'Series'} Available
              </span>
            </div>
            {completedSeries > 0 && (
              <div className="series-stats-card rounded-md bg-green-50 px-3 py-1 dark:bg-green-900/20">
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                  {completedSeries} Completed
                </span>
              </div>
            )}
            {ongoingSeries > 0 && (
              <div className="series-stats-card rounded-md bg-yellow-50 px-3 py-1 dark:bg-yellow-900/20">
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  {ongoingSeries} Ongoing
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="container py-12">
          {validSeries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-gray-400 dark:text-gray-600">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                No series yet
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Check back later for organized series of blog posts!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {validSeries.map((series) => (
                <SeriesCard
                  key={series.slug}
                  series={series}
                  showProgress
                  variant="detailed"
                  className="transition-shadow duration-200 hover:shadow-lg"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
