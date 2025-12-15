/**
 * Holiday Configuration
 * Central configuration for all holidays and their visual effects
 */

import { HolidayConfig, GlobalHolidaySettings } from '@/utils/holidays/holidayTypes'

/**
 * Global holiday system settings
 */
export const globalHolidaySettings: GlobalHolidaySettings = {
  enabled: true,
  respectMotionPreference: true,
  mobileEffects: 'reduced',
  effectIntensity: 'medium',
  debugMode: process.env.NODE_ENV === 'development', // Enable debug panel in production by adding ?debug=true to URL
}

/**
 * Holiday configurations
 * Define all holidays with their date ranges and effects
 */
export const holidayConfigs: HolidayConfig[] = [
  {
    id: 'christmas',
    name: 'Christmas',
    enabled: true,
    startDate: { month: 12, day: 1 },
    endDate: { month: 12, day: 26 },
    effectConfig: {
      effects: ['snow', 'decorations'],
      colors: ['#ffffff', '#e0f2fe', '#bae6fd', '#7dd3fc'],
      snowDensity: 30,
      customClass: 'christmas-theme',
    },
    description: 'Christmas season with snowfall effect',
  },
  {
    id: 'tet',
    name: 'Vietnamese TET (Lunar New Year)',
    enabled: true,
    lunarDates: {
      month: 1,
      days: [1, 2, 3, 4, 5],
    },
    effectConfig: {
      effects: ['tet-blossoms', 'fireworks', 'decorations'],
      colors: [
        '#ec4899',
        '#f472b6',
        '#fb7185',
        '#fda4af',
        '#fecdd3',
        '#ef4444',
        '#dc2626',
        '#f87171',
        '#fca5a5',
        '#fbbf24',
        '#facc15',
        '#fde047',
      ],
      fireworkFrequency: 3000,
      customClass: 'tet-theme',
    },
    description: 'Vietnamese Lunar New Year with fireworks',
  },
  {
    id: 'new-year',
    name: 'New Year',
    enabled: true,
    startDate: { month: 12, day: 28 },
    endDate: { month: 1, day: 2 },
    effectConfig: {
      effects: ['fireworks', 'confetti'],
      colors: ['#fbbf24', '#f59e0b', '#a855f7', '#ec4899'],
      fireworkFrequency: 2000,
      customClass: 'new-year-theme',
    },
    description: 'New Year celebration',
  },
  {
    id: 'halloween',
    name: 'Halloween',
    enabled: true,
    startDate: { month: 10, day: 25 },
    endDate: { month: 10, day: 31 },
    effectConfig: {
      effects: ['halloween', 'decorations'],
      colors: ['#f97316', '#8b5cf6', '#000000'],
      customClass: 'halloween-theme',
    },
    description: 'Halloween night',
  },
  {
    id: 'mid-autumn',
    name: 'Mid-Autumn Festival',
    enabled: true,
    lunarDates: {
      month: 8,
      days: [15],
    },
    effectConfig: {
      effects: ['sparkles', 'decorations'],
      colors: ['#fbbf24', '#f59e0b', '#fde047'],
      customClass: 'mid-autumn-theme',
    },
    description: 'Mid-Autumn Festival (Moon Festival)',
  },
]

/**
 * Get holiday configuration by ID
 */
export function getHolidayConfig(holidayId: string): HolidayConfig | undefined {
  return holidayConfigs.find((config) => config.id === holidayId && config.enabled)
}

/**
 * Get all enabled holidays
 */
export function getEnabledHolidays(): HolidayConfig[] {
  return holidayConfigs.filter((config) => config.enabled)
}
