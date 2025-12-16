// Utility functions index - Series related exports

export * from './series'
export * from './navigation'
export * from './validation'
import { getAllSeries } from './series'
import type { SeriesInfo } from '@/components/series/types'
import { SERIES_STATUS, DEFAULT_VALUES } from './constants'

// Additional utility types
export interface SeriesStats {
  totalSeries: number
  completedSeries: number
  ongoingSeries: number
  totalPosts: number
  avgPostsPerSeries: number
}

// Additional helper functions
export function getSeriesStats(): SeriesStats {
  const allSeries = getAllSeries()

  const totalSeries = allSeries.length
  const completedSeries = allSeries.filter(
    (series: SeriesInfo) => series.status === SERIES_STATUS.COMPLETED
  ).length
  const ongoingSeries = allSeries.filter(
    (series: SeriesInfo) => series.status === SERIES_STATUS.ONGOING
  ).length
  const totalPosts = allSeries.reduce(
    (total: number, series: SeriesInfo) => total + series.totalPosts,
    DEFAULT_VALUES.ZERO
  )
  const avgPostsPerSeries =
    totalSeries > DEFAULT_VALUES.ZERO ? Math.round(totalPosts / totalSeries) : DEFAULT_VALUES.ZERO

  return {
    totalSeries,
    completedSeries,
    ongoingSeries,
    totalPosts,
    avgPostsPerSeries,
  }
}
