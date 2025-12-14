// Navigation utility functions for series

import { SeriesInfo, SeriesNavigationData, SeriesPostInfo } from '@/components/series/types'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'
import { getSeriesData } from './series'

/**
 * Breadcrumb data interface
 */
export interface BreadcrumbData {
  href: string
  label: string
  isActive?: boolean
}

/**
 * Get series navigation data for a specific post
 * Enhanced version with better error handling
 */
export function getSeriesNavigation(post: CoreContent<Blog>): SeriesNavigationData | null {
  if (!post.seriesInfo) return null

  const seriesData = getSeriesData(post.seriesInfo.slug)
  if (!seriesData) return null

  // Sort posts by order to ensure correct navigation
  const sortedPosts = [...seriesData.posts].sort((a, b) => a.order - b.order)

  const currentPost: SeriesPostInfo = {
    title: post.title,
    slug: post.slug,
    order: post.seriesInfo.order,
    date: post.date,
    summary: post.summary,
    readingTime: post.readingTime,
  }

  const currentIndex = sortedPosts.findIndex((p) => p.order === post.seriesInfo.order)
  const previous = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null
  const next = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null

  return {
    current: currentPost,
    previous,
    next,
    series: seriesData,
    progress: {
      current: post.seriesInfo.order,
      total: seriesData.totalPosts,
      percentage: Math.round((post.seriesInfo.order / seriesData.totalPosts) * 100),
    },
  }
}

/**
 * Build breadcrumbs for series navigation
 */
export function buildSeriesBreadcrumbs(series: SeriesInfo, currentPost?: string): BreadcrumbData[] {
  const breadcrumbs: BreadcrumbData[] = [
    {
      href: '/series',
      label: 'Series',
    },
    {
      href: `/series/${series.slug}`,
      label: series.name,
      isActive: !currentPost,
    },
  ]

  if (currentPost) {
    breadcrumbs.push({
      href: '',
      label: currentPost,
      isActive: true,
    })
  }

  return breadcrumbs
}

/**
 * Build breadcrumbs for blog post in series
 */
export function buildPostBreadcrumbs(post: CoreContent<Blog>): BreadcrumbData[] | null {
  if (!post.seriesInfo) return null

  const seriesData = getSeriesData(post.seriesInfo.slug)
  if (!seriesData) return null

  return buildSeriesBreadcrumbs(seriesData, post.title)
}

/**
 * Get reading progress through series
 */
export function getReadingProgress(
  seriesSlug: string,
  currentOrder: number
): {
  completed: number
  remaining: number
  percentComplete: number
  isFirstPost: boolean
  isLastPost: boolean
} {
  const seriesData = getSeriesData(seriesSlug)
  if (!seriesData) {
    return {
      completed: 1,
      remaining: 0,
      percentComplete: 100,
      isFirstPost: true,
      isLastPost: true,
    }
  }

  const completed = currentOrder
  const remaining = seriesData.totalPosts - currentOrder
  const percentComplete = Math.round((currentOrder / seriesData.totalPosts) * 100)

  return {
    completed,
    remaining,
    percentComplete,
    isFirstPost: currentOrder === 1,
    isLastPost: currentOrder === seriesData.totalPosts,
  }
}

/**
 * Get navigation URLs for series post
 */
export function getSeriesNavigationUrls(post: CoreContent<Blog>): {
  seriesHome: string
  previousPost: string | null
  nextPost: string | null
  currentPost: string
} | null {
  if (!post.seriesInfo) return null

  const navigation = getSeriesNavigation(post)
  if (!navigation) return null

  return {
    seriesHome: `/series/${post.seriesInfo.slug}`,
    previousPost: navigation.previous ? `/blog/${navigation.previous.slug}` : null,
    nextPost: navigation.next ? `/blog/${navigation.next.slug}` : null,
    currentPost: `/blog/${post.slug}`,
  }
}

/**
 * Get estimated reading time for entire series
 */
export function getSeriesReadingTime(seriesSlug: string): {
  totalMinutes: number
  formattedTime: string
  averagePostTime: number
} {
  const seriesData = getSeriesData(seriesSlug)
  if (!seriesData) {
    return {
      totalMinutes: 0,
      formattedTime: '0 min',
      averagePostTime: 0,
    }
  }

  const totalMinutes = seriesData.posts.reduce((total, post) => {
    return total + (post.readingTime?.minutes || 0)
  }, 0)

  const hours = Math.floor(totalMinutes / 60)
  const minutes = Math.round(totalMinutes % 60)

  let formattedTime = ''
  if (hours > 0) {
    formattedTime = `${hours}h ${minutes}m`
  } else {
    formattedTime = `${minutes} min`
  }

  return {
    totalMinutes: Math.round(totalMinutes),
    formattedTime,
    averagePostTime: Math.round(totalMinutes / seriesData.posts.length),
  }
}

/**
 * Check if user can navigate to specific post in series
 */
export function canNavigateToPost(
  seriesSlug: string,
  targetOrder: number,
  currentOrder?: number
): boolean {
  const seriesData = getSeriesData(seriesSlug)
  if (!seriesData) return false

  // Always allow navigation if no current order specified
  if (currentOrder === undefined) return true

  // For completed series, allow any navigation
  if (seriesData.status === 'completed') return true

  // For ongoing series, only allow forward navigation one post at a time
  return targetOrder <= currentOrder + 1
}
