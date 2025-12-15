import { useTheme } from 'next-themes'
import { calendarThemes } from '../themes'
import CalendarElement from './CalendarElement'

interface GithubLegendLegendProps {
  totalContributions: string
  totalContributionsMessage?: string
  blockSize: number
}

const GithubCalendarLegend = ({
  totalContributions = '0',
  totalContributionsMessage = 'contributions in the last year',
  blockSize = 12,
}: GithubLegendLegendProps) => {
  const { theme } = useTheme()
  const currentTheme = theme === 'dark' ? calendarThemes.dark : calendarThemes.light

  return (
    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span>{totalContributions}</span> {totalContributionsMessage}
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
            backgroundColor={currentTheme.level1}
            borderColor={currentTheme.border}
          />
          <CalendarElement
            blockSize={blockSize}
            backgroundColor={currentTheme.level2}
            borderColor={currentTheme.border}
          />
          <CalendarElement
            blockSize={blockSize}
            backgroundColor={currentTheme.level3}
            borderColor={currentTheme.border}
          />
          <CalendarElement
            blockSize={blockSize}
            backgroundColor={currentTheme.level4}
            borderColor={currentTheme.border}
          />
        </div>
        <span>More</span>
      </div>
    </div>
  )
}

export default GithubCalendarLegend
