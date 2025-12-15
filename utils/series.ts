// Series utility functions

import { SeriesInfo, SeriesPostInfo } from '@/components/series/types'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import seriesDataJson from '@/app/series-data.json'

// Constants
export const SERIES_STATUS = {
  COMPLETED: 'completed',
  ONGOING: 'ongoing',
} as const

export const SERIES_CONSTANTS = {
  DEFAULT_CURRENT: 1,
  DEFAULT_TOTAL: 1,
  FULL_PERCENTAGE: 100,
  PERCENTAGE_MULTIPLIER: 100,
  MIN_ORDER: 1,
  MIN_SLUG_LENGTH: 0,
  ORDER_INCREMENT: 1,
  ORDER_DECREMENT: 1,
} as const

export const SERIES_MESSAGES = {
  DATA_NOT_FOUND: 'Series data not found:',
  LOAD_ERROR: 'Could not load series data file',
} as const

/**
 * Get series data from the series index file
 */
export function getSeriesData(seriesSlug: string): SeriesInfo | null {
  try {
    const seriesData = seriesDataJson as Record<string, SeriesInfo>
    const data = seriesData[seriesSlug]
    if (!data) return null

    // Ensure the data has the required name field
    return {
      ...data,
      name: data.name || data.slug || 'Untitled Series',
    } as SeriesInfo
  } catch (error) {
    console.warn(SERIES_MESSAGES.DATA_NOT_FOUND, error)
    return null
  }
}

/**
 * Get all available series
 */
export function getAllSeries(): SeriesInfo[] {
  try {
    const seriesData = seriesDataJson as Record<string, SeriesInfo>
    return Object.values(seriesData).map(
      (data: SeriesInfo) =>
        ({
          ...data,
          name: data.name || data.slug || 'Untitled Series',
        }) as SeriesInfo
    )
  } catch (error) {
    console.warn(SERIES_MESSAGES.DATA_NOT_FOUND, error)
    return []
  }
}

/**
 * Get posts by series slug
 */
export function getPostsBySeries(seriesSlug: string): SeriesPostInfo[] {
  const seriesData = getSeriesData(seriesSlug)
  return seriesData?.posts || []
}

/**
 * Get next post in series
 */
export function getNextInSeries(seriesSlug: string, currentOrder: number): SeriesPostInfo | null {
  const posts = getPostsBySeries(seriesSlug)
  return (
    posts.find((post) => post.order === currentOrder + SERIES_CONSTANTS.ORDER_INCREMENT) || null
  )
}

/**
 * Get previous post in series
 */
export function getPrevInSeries(seriesSlug: string, currentOrder: number): SeriesPostInfo | null {
  const posts = getPostsBySeries(seriesSlug)
  return (
    posts.find((post) => post.order === currentOrder - SERIES_CONSTANTS.ORDER_DECREMENT) || null
  )
}

/**
 * Check if a post is part of a series
 */
export function isPartOfSeries(post: CoreContent<Blog>): boolean {
  return !!(post.seriesInfo || post.isPartOfSeries)
}

/**
 * Get series progress for a post
 */
export function getSeriesProgress(
  seriesSlug: string,
  currentOrder: number
): { current: number; total: number; percentage: number } {
  const seriesData = getSeriesData(seriesSlug)
  if (!seriesData) {
    return {
      current: SERIES_CONSTANTS.DEFAULT_CURRENT,
      total: SERIES_CONSTANTS.DEFAULT_TOTAL,
      percentage: SERIES_CONSTANTS.FULL_PERCENTAGE,
    }
  }

  return {
    current: currentOrder,
    total: seriesData.totalPosts,
    percentage: Math.round(
      (currentOrder / seriesData.totalPosts) * SERIES_CONSTANTS.PERCENTAGE_MULTIPLIER
    ),
  }
}

/**
 * Get all series slugs
 */
export function getAllSeriesSlugs(): string[] {
  try {
    const seriesData = seriesDataJson as Record<string, SeriesInfo>
    return Object.keys(seriesData).filter(
      (slug) => slug && slug.length > SERIES_CONSTANTS.MIN_SLUG_LENGTH
    )
  } catch (error) {
    console.warn(SERIES_MESSAGES.DATA_NOT_FOUND, error)
    return []
  }
}

/**
 * Get series by status (ongoing, completed)
 */
export function getSeriesByStatus(
  status: typeof SERIES_STATUS.ONGOING | typeof SERIES_STATUS.COMPLETED
): SeriesInfo[] {
  const allSeries = getAllSeries()
  return allSeries.filter((series) => series.status === status)
}

/**
 * Check if series exists
 */
export function seriesExists(seriesSlug: string): boolean {
  return getSeriesData(seriesSlug) !== null
}

/**
 * Get series completion percentage
 */
export function getSeriesCompletionPercentage(seriesSlug: string): number {
  const seriesData = getSeriesData(seriesSlug)
  if (!seriesData) return SERIES_CONSTANTS.MIN_SLUG_LENGTH

  return seriesData.status === SERIES_STATUS.COMPLETED
    ? SERIES_CONSTANTS.FULL_PERCENTAGE
    : Math.round(
        (seriesData.posts.length / seriesData.totalPosts) * SERIES_CONSTANTS.PERCENTAGE_MULTIPLIER
      )
}

/**
 * Get series metadata for SEO
 */
export function getSeriesMetadata(seriesSlug: string): {
  title: string
  description: string
  totalPosts: number
  status: string
} | null {
  const seriesData = getSeriesData(seriesSlug)
  if (!seriesData) return null

  return {
    title: seriesData.name,
    description:
      seriesData.description ||
      `A comprehensive series covering ${seriesData.name}. ${seriesData.totalPosts} posts in total.`,
    totalPosts: seriesData.totalPosts,
    status: seriesData.status || SERIES_STATUS.ONGOING,
  }
}
