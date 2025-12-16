// Series-related TypeScript interfaces and types
import { SERIES_STATUS } from '@/utils/constants'

export interface SeriesPostInfo {
  title: string
  slug: string
  order: number
  date: string
  summary?: string
  readingTime?: {
    text: string
    minutes: number
    time: number
    words: number
  }
  isPublished?: boolean
}

export interface SeriesInfo {
  name: string
  slug: string
  posts: SeriesPostInfo[]
  totalPosts: number
  status?: typeof SERIES_STATUS.ONGOING | typeof SERIES_STATUS.COMPLETED
  description?: string
  thumbnail?: string
}

export interface SeriesNavigationData {
  current: SeriesPostInfo
  previous: SeriesPostInfo | null
  next: SeriesPostInfo | null
  series: SeriesInfo
  progress: {
    current: number
    total: number
    percentage: number
  }
}

export interface SeriesProgressProps {
  currentOrder: number
  totalPosts: number
  variant?: 'bar' | 'dots' | 'numbers'
  className?: string
}

export interface SeriesCardProps {
  series: SeriesInfo
  showProgress?: boolean
  variant?: 'compact' | 'detailed'
  currentPostSlug?: string
  className?: string
}

export interface SeriesNavigationProps {
  series: SeriesInfo
  currentPost: string
  currentOrder: number
  className?: string
}

export interface SeriesBadgeProps {
  seriesSlug: string
  seriesName: string
  order: number
  className?: string
  variant?: 'default' | 'compact'
}
