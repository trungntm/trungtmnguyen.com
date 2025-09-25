// components/GithubCalendar.tsx
'use client'
import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
import GithubCalendarLegend from './components/Legend'
import LegendSkeleton from './components/LegendSkeleton'
import { ContributionData } from './types'
import CalendarGrid from './components/CalendarGrid'
import CalendarSkeleton from './components/CalendarSkeleton'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import GithubCalendarSkeleton from './components/GithubCalendarSkeleton'

interface GithubCalendarProps {
  user: string
  legend?: boolean
  verticalLabel?: boolean
  horizontalLabel?: boolean
  blockSize?: number
  blockGap?: number
}

export default function GithubCalendar({
  user,
  legend = true,
  verticalLabel = true,
  horizontalLabel = true,
  blockSize = 12,
  blockGap = 4,
}: GithubCalendarProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const theme = useTheme()

  const { data, error, isLoading } = useSWR(`/api/github/contributions?user=${user}`, fetcher)

  if (!mounted) {
    return null
  }

  // Show skeleton for loading or error states
  if (error || isLoading || !data) {
    if (error) {
      console.error('GitHub Calendar Error:', error)
    }

    return (
      <GithubCalendarSkeleton
        blockSize={blockSize}
        blockGap={blockGap}
        verticalLabel={verticalLabel}
        horizontalLabel={horizontalLabel}
        legend={legend}
      />
    )
  }

  const contributionData = data as ContributionData

  // Add defensive check for required data
  if (!contributionData.weeks) {
    console.error('Missing weeks data:', contributionData)
    return <div className="text-gray-500">Invalid data structure - missing weeks data</div>
  }

  // Generate month labels if missing from API response
  const monthLabels = contributionData.monthLabels || []

  return (
    <div className="flex items-center space-y-4">
      {/* Calendar container */}
      <div className="overflow-x-auto rounded-lg">
        <div className="min-w-max space-y-2 pb-2">
          {/* Month labels */}
          {horizontalLabel && (
            <div className="relative">
              <div className="flex">
                {/* Spacer to align with the day labels */}
                {verticalLabel ? (
                  <div
                    className="min-h-4"
                    style={{
                      width: `${blockSize}px`,
                      marginRight: `${6 * blockGap}px`,
                    }}
                  ></div>
                ) : (
                  <div className="min-h-4"></div>
                )}
                {/* Month labels positioned relative to the calendar grid */}
                <div className="relative flex" style={{ gap: `${blockGap}px` }}>
                  {monthLabels.map((label, index) => (
                    <div
                      key={index}
                      className="absolute text-xs text-gray-500 dark:text-gray-400"
                      style={{
                        left: `${label.weekIndex * blockSize + label.weekIndex * blockGap}px`,
                      }}
                    >
                      {label.month}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Days of week labels + Calendar grid */}
          <div className="flex" style={{ gap: `${blockGap}px` }}>
            {verticalLabel && (
              <div className="mr-1 flex flex-col" style={{ gap: `${blockGap}px` }}>
                <div style={{ height: `${blockSize}px`, width: `${blockSize}px` }} />{' '}
                {/* Spacer for month row */}
                <div
                  className="flex items-center text-xs text-gray-500 dark:text-gray-400"
                  style={{ height: `${blockSize}px` }}
                >
                  Mon
                </div>
                <div style={{ height: `${blockSize}px`, width: `${blockSize}px` }} />{' '}
                {/* Tue - hidden for space */}
                <div
                  className="flex items-center text-xs text-gray-500 dark:text-gray-400"
                  style={{ height: `${blockSize}px` }}
                >
                  Wed
                </div>
                <div style={{ height: `${blockSize}px`, width: `${blockSize}px` }} />{' '}
                {/* Thu - hidden for space */}
                <div
                  className="flex items-center text-xs text-gray-500 dark:text-gray-400"
                  style={{ height: `${blockSize}px` }}
                >
                  Fri
                </div>
                <div style={{ height: `${blockSize}px`, width: `${blockSize}px` }} />{' '}
                {/* Sat - hidden for space */}
              </div>
            )}

            {/* Contribution grid */}
            <CalendarGrid
              weekData={contributionData.weeks}
              blockSize={blockSize}
              blockGap={blockGap}
            />
          </div>

          {legend && (
            <GithubCalendarLegend
              blockSize={blockSize}
              totalContributions={contributionData.totalContributions.toLocaleString()}
            />
          )}
        </div>
      </div>
    </div>
  )
}
