import { useTheme } from 'next-themes'
import { ContributionDay, Week } from '../types'
import { CalendarThemeColors, calendarThemes } from '../themes'
import ContributionBlock from './ContributionBlock'

interface CalendarGridProps {
  blockSize?: number
  blockGap?: number
  weekData?: Week[]
}

const CalendarGrid = ({ weekData = [], blockSize = 12, blockGap = 4 }: CalendarGridProps) => {
  const { theme } = useTheme()
  const currentTheme: CalendarThemeColors =
    theme === 'dark' ? calendarThemes.dark : calendarThemes.light

  return (
    <div className="flex" style={{ gap: `${blockGap}px` }}>
      {weekData.map((week: Week, i: number) => (
        <div key={i} className="flex flex-col" style={{ gap: `${blockGap}px` }}>
          {week.contributionDays.map((day: ContributionDay, j: number) => (
            <ContributionBlock
              key={j}
              blockSize={blockSize}
              day={day}
              currentTheme={currentTheme}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default CalendarGrid
