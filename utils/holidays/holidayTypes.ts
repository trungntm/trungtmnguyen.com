/**
 * Holiday Types and Interfaces
 * Defines all TypeScript types for the holiday system
 */

export type HolidayType = 'christmas' | 'tet' | 'new-year' | 'halloween' | 'mid-autumn' | 'none'

export type EffectType =
  | 'snow'
  | 'fireworks'
  | 'confetti'
  | 'decorations'
  | 'sparkles'
  | 'halloween'
  | 'tet-blossoms'

export type EffectIntensity = 'low' | 'medium' | 'high'

export type MobileEffectMode = 'full' | 'reduced' | 'none'

export interface DateRange {
  /** Month (1-12) */
  month: number
  /** Day of month */
  day: number
}

export interface LunarDate {
  /** Lunar month (1-12) */
  month: number
  /** Lunar days array */
  days: number[]
  /** Year offset for lunar calculation (optional) */
  yearOffset?: number
}

export interface HolidayEffectConfig {
  /** Effect types to enable */
  effects: EffectType[]
  /** Primary colors for the holiday */
  colors: string[]
  /** Snow density (for snow effect) */
  snowDensity?: number
  /** Firework frequency (for fireworks effect) */
  fireworkFrequency?: number
  /** Custom CSS class to apply */
  customClass?: string
}

export interface HolidayConfig {
  /** Holiday identifier */
  id: HolidayType
  /** Display name */
  name: string
  /** Whether this holiday is enabled */
  enabled: boolean
  /** Start date (for fixed calendar holidays) */
  startDate?: DateRange
  /** End date (for fixed calendar holidays) */
  endDate?: DateRange
  /** Lunar calendar dates (for lunar holidays like TET) */
  lunarDates?: LunarDate
  /** Visual effects configuration */
  effectConfig: HolidayEffectConfig
  /** Description */
  description?: string
}

export interface GlobalHolidaySettings {
  /** Master enable/disable switch */
  enabled: boolean
  /** Respect user's motion preferences */
  respectMotionPreference: boolean
  /** Mobile device effect mode */
  mobileEffects: MobileEffectMode
  /** Overall effect intensity */
  effectIntensity: EffectIntensity
  /** Enable debug mode */
  debugMode: boolean
}

export interface ActiveHolidayInfo {
  /** Current active holiday (or 'none') */
  holiday: HolidayType
  /** Holiday configuration */
  config: HolidayConfig | null
  /** Whether effects should be shown */
  showEffects: boolean
  /** Calculated effect intensity */
  intensity: EffectIntensity
  /** Whether on mobile device */
  isMobile: boolean
}

export interface HolidayDetectionResult {
  /** Detected holiday */
  holiday: HolidayType
  /** Holiday configuration */
  config: HolidayConfig | null
  /** Detection timestamp */
  detectedAt: Date
  /** Whether this was a manual override */
  isManualOverride: boolean
}
