// Series validation utilities

import { SeriesInfo, SeriesPostInfo } from '@/components/series/types'
import seriesDataJson from '@/app/series-data.json'

// Constants
export const VALIDATION_CONSTANTS = {
  MIN_STRING_LENGTH: 0,
  MIN_POSTS_COUNT: 1,
  FIRST_POST_ORDER: 1,
  POST_INDEX_OFFSET: 1,
  ARRAY_LENGTH_MISMATCH: 0,
} as const

export const VALIDATION_PATTERNS = {
  SLUG_PATTERN: /^[a-z0-9-]+$/,
  POST_SLUG_PATTERN: /^[a-z0-9-/]+$/,
} as const

export const VALIDATION_MESSAGES = {
  SERIES_NAME_REQUIRED: 'Series name is required',
  SERIES_SLUG_REQUIRED: 'Series slug is required',
  SERIES_POSTS_ARRAY: 'Series posts must be an array',
  TOTAL_POSTS_POSITIVE: 'Total posts must be a positive number',
  SLUG_PATTERN_ERROR: 'Series slug must only contain lowercase letters, numbers, and hyphens',
  DUPLICATE_ORDERS: 'Duplicate post orders found in series',
  NON_SEQUENTIAL_ORDERS: 'Post orders are not sequential (expected 1, 2, 3, ...)',
  INVALID_STATUS: 'Series status must be either "ongoing" or "completed"',
  TITLE_REQUIRED: 'title is required',
  SLUG_REQUIRED: 'slug is required',
  ORDER_POSITIVE: 'order must be a positive number',
  DATE_REQUIRED: 'date is required',
  POST_SLUG_PATTERN_ERROR:
    'slug should only contain lowercase letters, numbers, hyphens, and slashes',
  INVALID_DATE: 'invalid date format',
  READING_TIME_NUMBER: 'reading time should be a number',
  DATA_MUST_BE_OBJECT: 'Series data must be an object',
  EMPTY_SLUGS_FOUND: 'Found series with empty or missing slugs',
  SKIPPING_EMPTY_SLUG: 'Skipping series with empty slug',
  SLUG_MISMATCH: "doesn't match series.slug",
  LOAD_ERROR: 'Could not load series data file',
} as const

export const VALIDATION_STATUS = {
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
} as const

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

/**
 * Validate series data structure
 */
export function validateSeriesData(series: SeriesInfo): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Required fields validation
  if (!series.name || series.name.trim().length === VALIDATION_CONSTANTS.MIN_STRING_LENGTH) {
    errors.push(VALIDATION_MESSAGES.SERIES_NAME_REQUIRED)
  }

  if (!series.slug || series.slug.trim().length === VALIDATION_CONSTANTS.MIN_STRING_LENGTH) {
    errors.push(VALIDATION_MESSAGES.SERIES_SLUG_REQUIRED)
  }

  if (!series.posts || !Array.isArray(series.posts)) {
    errors.push(VALIDATION_MESSAGES.SERIES_POSTS_ARRAY)
  }

  if (
    typeof series.totalPosts !== 'number' ||
    series.totalPosts < VALIDATION_CONSTANTS.MIN_POSTS_COUNT
  ) {
    errors.push(VALIDATION_MESSAGES.TOTAL_POSTS_POSITIVE)
  }

  // Slug validation
  if (series.slug && !VALIDATION_PATTERNS.SLUG_PATTERN.test(series.slug)) {
    errors.push(VALIDATION_MESSAGES.SLUG_PATTERN_ERROR)
  }

  // Posts validation
  if (series.posts && Array.isArray(series.posts)) {
    if (series.posts.length !== series.totalPosts) {
      warnings.push(
        `Posts count (${series.posts.length}) doesn't match totalPosts (${series.totalPosts})`
      )
    }

    // Check for duplicate orders
    const orders = series.posts.map((post) => post.order)
    const uniqueOrders = [...new Set(orders)]
    if (orders.length !== uniqueOrders.length) {
      errors.push(VALIDATION_MESSAGES.DUPLICATE_ORDERS)
    }

    // Check for sequential ordering
    const sortedOrders = [...orders].sort((a, b) => a - b)
    const expectedOrders = Array.from(
      { length: orders.length },
      (_, i) => i + VALIDATION_CONSTANTS.FIRST_POST_ORDER
    )
    if (JSON.stringify(sortedOrders) !== JSON.stringify(expectedOrders)) {
      warnings.push(VALIDATION_MESSAGES.NON_SEQUENTIAL_ORDERS)
    }

    // Validate individual posts
    series.posts.forEach((post, index) => {
      const postErrors = validateSeriesPost(post, index)
      errors.push(...postErrors.errors)
      warnings.push(...postErrors.warnings)
    })
  }

  // Status validation
  if (
    series.status &&
    ![VALIDATION_STATUS.ONGOING, VALIDATION_STATUS.COMPLETED].includes(
      series.status as 'ongoing' | 'completed'
    )
  ) {
    errors.push(VALIDATION_MESSAGES.INVALID_STATUS)
  }

  return {
    isValid: errors.length === VALIDATION_CONSTANTS.ARRAY_LENGTH_MISMATCH,
    errors,
    warnings,
  }
}

/**
 * Validate individual series post
 */
export function validateSeriesPost(post: SeriesPostInfo, index?: number): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  const postRef =
    index !== undefined ? `Post ${index + VALIDATION_CONSTANTS.POST_INDEX_OFFSET}` : 'Post'

  // Required fields
  if (!post.title || post.title.trim().length === VALIDATION_CONSTANTS.MIN_STRING_LENGTH) {
    errors.push(`${postRef}: ${VALIDATION_MESSAGES.TITLE_REQUIRED}`)
  }

  if (!post.slug || post.slug.trim().length === VALIDATION_CONSTANTS.MIN_STRING_LENGTH) {
    errors.push(`${postRef}: ${VALIDATION_MESSAGES.SLUG_REQUIRED}`)
  }

  if (typeof post.order !== 'number' || post.order < VALIDATION_CONSTANTS.MIN_POSTS_COUNT) {
    errors.push(`${postRef}: ${VALIDATION_MESSAGES.ORDER_POSITIVE}`)
  }

  if (!post.date) {
    errors.push(`${postRef}: ${VALIDATION_MESSAGES.DATE_REQUIRED}`)
  }

  // Slug validation
  if (post.slug && !VALIDATION_PATTERNS.POST_SLUG_PATTERN.test(post.slug)) {
    warnings.push(`${postRef}: ${VALIDATION_MESSAGES.POST_SLUG_PATTERN_ERROR}`)
  }

  // Date validation
  if (post.date) {
    const date = new Date(post.date)
    if (isNaN(date.getTime())) {
      errors.push(`${postRef}: ${VALIDATION_MESSAGES.INVALID_DATE}`)
    }
  }

  // Reading time validation
  if (post.readingTime && typeof post.readingTime.minutes !== 'number') {
    warnings.push(`${postRef}: ${VALIDATION_MESSAGES.READING_TIME_NUMBER}`)
  }

  return {
    isValid: errors.length === VALIDATION_CONSTANTS.ARRAY_LENGTH_MISMATCH,
    errors,
    warnings,
  }
}

/**
 * Validate complete series data file
 */
export function validateSeriesDataFile(data: Record<string, SeriesInfo>): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (!data || typeof data !== 'object') {
    errors.push(VALIDATION_MESSAGES.DATA_MUST_BE_OBJECT)
    return { isValid: false, errors, warnings }
  }

  const seriesSlugs = Object.keys(data)
  const validSlugs = seriesSlugs.filter(
    (slug) => slug && slug.length > VALIDATION_CONSTANTS.MIN_STRING_LENGTH
  )

  if (validSlugs.length !== seriesSlugs.length) {
    warnings.push(VALIDATION_MESSAGES.EMPTY_SLUGS_FOUND)
  }

  // Validate each series
  Object.entries(data).forEach(([slug, series]) => {
    if (!slug || slug.length === VALIDATION_CONSTANTS.MIN_STRING_LENGTH) {
      warnings.push(VALIDATION_MESSAGES.SKIPPING_EMPTY_SLUG)
      return
    }

    if (slug !== series.slug) {
      warnings.push(`Series key "${slug}" ${VALIDATION_MESSAGES.SLUG_MISMATCH} "${series.slug}"`)
    }

    const seriesValidation = validateSeriesData(series)
    if (!seriesValidation.isValid) {
      errors.push(...seriesValidation.errors.map((error) => `Series "${slug}": ${error}`))
    }
    warnings.push(...seriesValidation.warnings.map((warning) => `Series "${slug}": ${warning}`))
  })

  return {
    isValid: errors.length === VALIDATION_CONSTANTS.ARRAY_LENGTH_MISMATCH,
    errors,
    warnings,
  }
}

/**
 * Generate series data validation report
 */
export function generateValidationReport(): ValidationResult {
  try {
    const seriesData = seriesDataJson as Record<string, SeriesInfo>
    return validateSeriesDataFile(seriesData)
  } catch (error) {
    return {
      isValid: false,
      errors: [VALIDATION_MESSAGES.LOAD_ERROR],
      warnings: [],
    }
  }
}
