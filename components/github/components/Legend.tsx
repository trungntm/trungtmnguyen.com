import { useTheme } from 'next-themes'
import { calendarThemes } from '../themes'

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
          <div
            className="rounded-[2px]"
            style={{
              height: `${blockSize}px`,
              width: `${blockSize}px`,
              backgroundColor: currentTheme.empty,
              border: `1px solid ${currentTheme.border}`,
            }}
          ></div>
          <div
            className="rounded-[2px]"
            style={{
              height: `${blockSize}px`,
              width: `${blockSize}px`,
              backgroundColor: currentTheme.level1,
              border: `1px solid ${currentTheme.border}`,
            }}
          ></div>
          <div
            className="rounded-[2px]"
            style={{
              height: `${blockSize}px`,
              width: `${blockSize}px`,
              backgroundColor: currentTheme.level2,
              border: `1px solid ${currentTheme.border}`,
            }}
          ></div>
          <div
            className="rounded-[2px]"
            style={{
              height: `${blockSize}px`,
              width: `${blockSize}px`,
              backgroundColor: currentTheme.level3,
              border: `1px solid ${currentTheme.border}`,
            }}
          ></div>
          <div
            className="rounded-[2px]"
            style={{
              height: `${blockSize}px`,
              width: `${blockSize}px`,
              backgroundColor: currentTheme.level4,
              border: `1px solid ${currentTheme.border}`,
            }}
          ></div>
        </div>
        <span>More</span>
      </div>
    </div>
  )
}

export default GithubCalendarLegend
