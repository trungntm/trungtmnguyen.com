'use client'

/**
 * Holiday Debug Panel
 * Admin panel for testing and debugging holiday effects
 */

import { useState, useEffect } from 'react'
import { useHoliday } from '../../app/holiday-provider'
import { HolidayType, getUpcomingHolidays, getHolidayDisplayName } from '@/utils/holidays'
import { globalHolidaySettings } from '@/config/holidays'

export default function HolidayDebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDebug, setShowDebug] = useState(false)
  const [fps, setFps] = useState(0)
  const holiday = useHoliday()

  useEffect(() => {
    const isDebugMode =
      globalHolidaySettings.debugMode ||
      (typeof window !== 'undefined' &&
        (window.location.search.includes('debug=true') || window.location.hostname === 'localhost'))

    setShowDebug(isDebugMode)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    let frameCount = 0
    let lastTime = performance.now()
    let animationFrameId: number

    const countFrames = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)))
        frameCount = 0
        lastTime = currentTime
      }

      animationFrameId = requestAnimationFrame(countFrames)
    }

    animationFrameId = requestAnimationFrame(countFrames)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isOpen])

  if (!showDebug) return null

  const holidays: HolidayType[] = [
    'none',
    'christmas',
    'tet',
    'new-year',
    'halloween',
    'mid-autumn',
  ]
  const upcoming = getUpcomingHolidays(60)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-4 z-[100] rounded-full bg-purple-600 p-3 text-white shadow-lg transition-colors hover:bg-purple-700"
        title="Holiday Debug Panel"
      >
        {isOpen ? '✕' : '🎄'}
      </button>

      {isOpen && (
        <div className="fixed right-4 bottom-20 z-[100] max-h-[80vh] w-80 overflow-y-auto rounded-lg border border-gray-300 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-gray-100">
            🎄 Holiday Debug Panel
          </h3>

          <div className="mb-4 rounded-md bg-gray-100 p-3 dark:bg-gray-700">
            <div className="text-sm">
              <div className="mb-1">
                <span className="font-semibold">Active Holiday:</span>{' '}
                <span className="text-purple-600 dark:text-purple-400">
                  {getHolidayDisplayName(holiday.holiday)}
                </span>
              </div>
              <div className="mb-1">
                <span className="font-semibold">Effects:</span>{' '}
                <span className={holiday.showEffects ? 'text-green-600' : 'text-red-600'}>
                  {holiday.showEffects ? 'ON' : 'OFF'}
                </span>
              </div>
              <div className="mb-1">
                <span className="font-semibold">Intensity:</span> {holiday.intensity}
              </div>
              <div className="mb-1">
                <span className="font-semibold">Mobile:</span> {holiday.isMobile ? 'Yes' : 'No'}
              </div>
              <div>
                <span className="font-semibold">FPS:</span>{' '}
                <span
                  className={
                    fps >= 50 ? 'text-green-600' : fps >= 30 ? 'text-yellow-600' : 'text-red-600'
                  }
                >
                  {fps}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-semibold text-gray-900 dark:text-gray-100">
              Test Holiday:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {holidays.map((h) => (
                <button
                  key={h}
                  onClick={() => {
                    const url = new URL(window.location.href)
                    if (h === 'none') {
                      url.searchParams.delete('holiday')
                    } else {
                      url.searchParams.set('holiday', h)
                    }
                    window.location.href = url.toString()
                  }}
                  className={`rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                    holiday.holiday === h
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'
                  }`}
                >
                  {h === 'none' ? 'None' : h.charAt(0).toUpperCase() + h.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {holiday.config && (
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                Effect Configuration:
              </h4>
              <div className="rounded-md bg-gray-100 p-2 text-xs dark:bg-gray-700">
                <div className="mb-1">
                  <span className="font-medium">Effects:</span>{' '}
                  {holiday.config.effectConfig.effects.join(', ')}
                </div>
                <div className="mb-1">
                  <span className="font-medium">Colors:</span>{' '}
                  <div className="mt-1 flex gap-1">
                    {holiday.config.effectConfig.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="h-4 w-4 rounded border border-gray-300"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                {holiday.config.effectConfig.snowDensity && (
                  <div className="mb-1">
                    <span className="font-medium">Snow Density:</span>{' '}
                    {holiday.config.effectConfig.snowDensity}
                  </div>
                )}
                {holiday.config.effectConfig.fireworkFrequency && (
                  <div>
                    <span className="font-medium">Firework Freq:</span>{' '}
                    {holiday.config.effectConfig.fireworkFrequency}ms
                  </div>
                )}
              </div>
            </div>
          )}

          {upcoming.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                Upcoming (Next 60 days):
              </h4>
              <div className="space-y-1 text-xs">
                {upcoming.map((h) => (
                  <div key={h.id} className="rounded-md bg-gray-100 p-2 dark:bg-gray-700">
                    <div className="font-medium">{h.name}</div>
                    {h.startDate && h.endDate && (
                      <div className="text-gray-600 dark:text-gray-400">
                        {h.startDate.month}/{h.startDate.day} - {h.endDate.month}/{h.endDate.day}
                      </div>
                    )}
                    {h.lunarDates && (
                      <div className="text-gray-600 dark:text-gray-400">
                        Lunar {h.lunarDates.month}/{h.lunarDates.days.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-300 pt-3 dark:border-gray-600">
            <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Quick Actions:
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  sessionStorage.clear()
                  window.location.reload()
                }}
                className="w-full rounded-md bg-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
              >
                Clear Cache & Reload
              </button>
              <button
                onClick={() => {
                  const url = new URL(window.location.href)
                  url.searchParams.delete('holiday')
                  window.location.href = url.toString()
                }}
                className="w-full rounded-md bg-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
              >
                Reset to Auto-Detect
              </button>
            </div>
          </div>

          {fps < 30 && (
            <div className="mt-3 rounded-md bg-yellow-100 p-2 text-xs text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              ⚠️ Low FPS detected. Try reducing effect intensity in config.
            </div>
          )}
        </div>
      )}
    </>
  )
}
