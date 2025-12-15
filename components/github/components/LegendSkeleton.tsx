import { useTheme } from 'next-themes'
import { calendarThemes } from '../themes'
import CalendarElement from './CalendarElement'

interface LegendSkeletonProps {
  blockSize?: number
}

const LegendSkeleton = ({ blockSize = 12 }: LegendSkeletonProps) => {
  const { theme } = useTheme()
  const currentTheme = theme === 'dark' ? calendarThemes.dark : calendarThemes.light

  return (
    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="animate-pulse rounded bg-gray-300 px-2 py-1 dark:bg-gray-600">
            Loading...
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span>Less</span>
        <div className="flex items-center gap-1">
          <CalendarElement
            blockSize={blockSize}
            backgroundColor={currentTheme.empty}
            borderColor={currentTheme.border}
          />
          <CalendarElement
            blockSize={blockSize}
            backgroundColor={currentTheme.empty}
            borderColor={currentTheme.border}
          />
          <CalendarElement
            blockSize={blockSize}
            backgroundColor={currentTheme.empty}
            borderColor={currentTheme.border}
          />
          <CalendarElement
            blockSize={blockSize}
            backgroundColor={currentTheme.empty}
            borderColor={currentTheme.border}
          />
          <CalendarElement
            blockSize={blockSize}
            backgroundColor={currentTheme.empty}
            borderColor={currentTheme.border}
          />
        </div>
        <span>More</span>
      </div>
    </div>
  )
}

export default LegendSkeleton
