/**
 * Holiday Detector
 * Main logic for detecting active holidays and managing holiday state
 */

import {
  HolidayType,
  HolidayConfig,
  HolidayDetectionResult,
  ActiveHolidayInfo,
  EffectIntensity,
} from './holidayTypes'
import { getEnabledHolidays, globalHolidaySettings } from '@/config/holidays'
import { isDateInRange, isLunarDateMatch, getToday } from './dateHelpers'

const STORAGE_KEY = 'holiday-detection-cache'
const CACHE_DURATION = 1000 * 60 * 60

export function detectCurrentHoliday(
  currentDate: Date = getToday(),
  manualOverride?: HolidayType
): HolidayDetectionResult {
  if (manualOverride && manualOverride !== 'none') {
    const config = getEnabledHolidays().find((h) => h.id === manualOverride)
    if (config) {
      return {
        holiday: manualOverride,
        config,
        detectedAt: new Date(),
        isManualOverride: true,
      }
    }
  }

  const enabledHolidays = getEnabledHolidays()

  for (const holidayConfig of enabledHolidays) {
    if (isHolidayActive(holidayConfig, currentDate)) {
      return {
        holiday: holidayConfig.id,
        config: holidayConfig,
        detectedAt: new Date(),
        isManualOverride: false,
      }
    }
  }

  return {
    holiday: 'none',
    config: null,
    detectedAt: new Date(),
    isManualOverride: false,
  }
}

export function isHolidayActive(config: HolidayConfig, date: Date = getToday()): boolean {
  if (!config.enabled) return false

  if (config.lunarDates) {
    return isLunarDateMatch(date, config.lunarDates)
  }

  if (config.startDate && config.endDate) {
    return isDateInRange(date, config.startDate, config.endDate)
  }

  return false
}

export function getActiveHolidayInfo(manualOverride?: HolidayType): ActiveHolidayInfo {
  const detection = detectCurrentHoliday(getToday(), manualOverride)
  const isMobile = checkIfMobile()
  const prefersReducedMotion = checkPrefersReducedMotion()

  const showEffects =
    globalHolidaySettings.enabled &&
    detection.holiday !== 'none' &&
    (!prefersReducedMotion || !globalHolidaySettings.respectMotionPreference) &&
    (globalHolidaySettings.mobileEffects !== 'none' || !isMobile)

  let intensity = globalHolidaySettings.effectIntensity
  if (isMobile && globalHolidaySettings.mobileEffects === 'reduced') {
    intensity = 'low'
  }

  return {
    holiday: detection.holiday,
    config: detection.config,
    showEffects,
    intensity,
    isMobile,
  }
}

function checkIfMobile(): boolean {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function checkPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function cacheHolidayDetection(result: HolidayDetectionResult): void {
  if (typeof window === 'undefined') return

  try {
    const cacheData = {
      result,
      timestamp: Date.now(),
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cacheData))
  } catch (error) {
    console.warn('Failed to cache holiday detection:', error)
  }
}

export function getCachedHolidayDetection(): HolidayDetectionResult | null {
  if (typeof window === 'undefined') return null

  try {
    const cached = sessionStorage.getItem(STORAGE_KEY)
    if (!cached) return null

    const cacheData = JSON.parse(cached)
    const age = Date.now() - cacheData.timestamp

    if (age < CACHE_DURATION) {
      return {
        ...cacheData.result,
        detectedAt: new Date(cacheData.result.detectedAt),
      }
    }
  } catch (error) {
    console.warn('Failed to read cached holiday detection:', error)
  }

  return null
}

export function clearHolidayCache(): void {
  if (typeof window === 'undefined') return

  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.warn('Failed to clear holiday cache:', error)
  }
}

export function getHolidayFromQuery(): HolidayType | undefined {
  if (typeof window === 'undefined') return undefined

  const params = new URLSearchParams(window.location.search)
  const holiday = params.get('holiday') as HolidayType

  if (
    holiday &&
    ['christmas', 'tet', 'new-year', 'halloween', 'mid-autumn', 'none'].includes(holiday)
  ) {
    return holiday
  }

  return undefined
}

export function getUpcomingHolidays(days: number = 30): HolidayConfig[] {
  const today = getToday()
  const upcoming: HolidayConfig[] = []
  const enabledHolidays = getEnabledHolidays()

  for (let i = 0; i <= days; i++) {
    const checkDate = new Date(today)
    checkDate.setDate(today.getDate() + i)

    for (const config of enabledHolidays) {
      if (isHolidayActive(config, checkDate) && !upcoming.includes(config)) {
        upcoming.push(config)
      }
    }
  }

  return upcoming
}

export function getHolidayDisplayName(holiday: HolidayType): string {
  if (holiday === 'none') return 'No Holiday'

  const config = getEnabledHolidays().find((h) => h.id === holiday)
  return config?.name ?? holiday
}

export function isHolidaySeason(): boolean {
  const detection = detectCurrentHoliday()
  return detection.holiday !== 'none'
}
