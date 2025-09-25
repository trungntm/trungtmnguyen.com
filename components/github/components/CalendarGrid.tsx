import { useTheme } from 'next-themes'
import { ContributionDay, Week } from '../types'
import { calendarThemes, getContributionColor } from '../themes'

interface CalendarGridProps {
  blockSize?: number
  blockGap?: number
  weekData?: Week[]
}

const CalendarGrid = ({ weekData = [], blockSize = 12, blockGap = 4 }: CalendarGridProps) => {
  const { theme } = useTheme()
  const currentTheme = theme === 'dark' ? calendarThemes.dark : calendarThemes.light

  return (
    <div className="flex" style={{ gap: `${blockGap}px` }}>
      {weekData.map((week: Week, i: number) => (
        <div key={i} className="flex flex-col" style={{ gap: `${blockGap}px` }}>
          {week.contributionDays.map((day: ContributionDay, j: number) => (
            <div
              key={j}
              title={`${new Date(day.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''}`}
              className="transition-smooth cursor-pointer rounded-[2px] hover:ring-2 hover:ring-blue-500 hover:ring-offset-1"
              style={{
                height: `${blockSize}px`,
                width: `${blockSize}px`,
                backgroundColor: getContributionColor(day.contributionCount, currentTheme),
                border: `1px solid ${currentTheme.border}`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default CalendarGrid
