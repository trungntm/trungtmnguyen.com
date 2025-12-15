'use client'

/**
 * Holiday Provider
 * React context for managing holiday state across the application
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import {
  HolidayType,
  ActiveHolidayInfo,
  HolidayConfig,
  EffectIntensity,
  getActiveHolidayInfo,
  getHolidayFromQuery,
  cacheHolidayDetection,
} from '@/utils/holidays'
import {
  SnowEffect,
  FireworksEffect,
  SparklesEffect,
  HalloweenEffect,
  TetEffect,
  HolidayDebugPanel,
} from '@/components/holiday-effects'

interface HolidayContextValue extends ActiveHolidayInfo {
  setHoliday: (holiday: HolidayType) => void
  isHoliday: (holiday: HolidayType) => boolean
}

const HolidayContext = createContext<HolidayContextValue | undefined>(undefined)

interface HolidayProviderProps {
  children: ReactNode
}

export function HolidayProvider({ children }: HolidayProviderProps) {
  const [holidayInfo, setHolidayInfo] = useState<ActiveHolidayInfo>(() => {
    const queryHoliday = getHolidayFromQuery()
    return getActiveHolidayInfo(queryHoliday)
  })
  const [manualOverride, setManualOverride] = useState<HolidayType | undefined>(() => {
    return getHolidayFromQuery()
  })

  useEffect(() => {
    const info = getActiveHolidayInfo(manualOverride)
    setHolidayInfo(info)

    if (info.config) {
      cacheHolidayDetection({
        holiday: info.holiday,
        config: info.config,
        detectedAt: new Date(),
        isManualOverride: !!manualOverride,
      })
    }
  }, [manualOverride])

  useEffect(() => {
    const handleFocus = () => {
      const info = getActiveHolidayInfo(manualOverride)
      setHolidayInfo(info)
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [manualOverride])

  const value: HolidayContextValue = {
    ...holidayInfo,
    setHoliday: setManualOverride,
    isHoliday: (holiday: HolidayType) => holidayInfo.holiday === holiday,
  }

  return (
    <HolidayContext.Provider value={value}>
      {children}
      {holidayInfo.showEffects && holidayInfo.config && (
        <HolidayEffects config={holidayInfo.config} intensity={holidayInfo.intensity} />
      )}
      <HolidayDebugPanel />
    </HolidayContext.Provider>
  )
}

export function useHoliday(): HolidayContextValue {
  const context = useContext(HolidayContext)
  if (context === undefined) {
    throw new Error('useHoliday must be used within a HolidayProvider')
  }
  return context
}

function HolidayEffects({
  config,
  intensity,
}: {
  config: HolidayConfig
  intensity: EffectIntensity
}) {
  const effects = config.effectConfig.effects

  return (
    <>
      {effects.includes('snow') && (
        <SnowEffect
          density={config.effectConfig.snowDensity}
          intensity={intensity}
          colors={config.effectConfig.colors}
        />
      )}
      {effects.includes('fireworks') && (
        <FireworksEffect
          frequency={config.effectConfig.fireworkFrequency}
          intensity={intensity}
          colors={config.effectConfig.colors}
        />
      )}
      {effects.includes('confetti') && (
        <FireworksEffect
          frequency={config.effectConfig.fireworkFrequency || 2000}
          intensity={intensity}
          colors={config.effectConfig.colors}
          particlesPerExplosion={80}
        />
      )}
      {effects.includes('sparkles') && (
        <SparklesEffect
          density={config.effectConfig.snowDensity || 20}
          intensity={intensity}
          colors={config.effectConfig.colors}
        />
      )}
      {effects.includes('halloween') && (
        <HalloweenEffect density={config.effectConfig.snowDensity || 8} intensity={intensity} />
      )}
      {effects.includes('tet-blossoms') && (
        <TetEffect intensity={intensity} colors={config.effectConfig.colors} />
      )}
    </>
  )
}
