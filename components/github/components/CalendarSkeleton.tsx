import { useTheme } from 'next-themes'
import { calendarThemes } from '../themes'

interface CalendarSkeletonProps {
  blockSize?: number
  blockGap?: number
}

const CalendarSkeleton = ({ blockSize = 12, blockGap = 4 }: CalendarSkeletonProps) => {
  const { theme } = useTheme()
  const currentTheme = theme === 'dark' ? calendarThemes.dark : calendarThemes.light

  // Generate 53 weeks (standard GitHub calendar)
  const weeks = Array.from({ length: 53 }, (_, weekIndex) => {
    // Generate 7 days per week
    const days = Array.from({ length: 7 }, (_, dayIndex) => ({
      key: `${weekIndex}-${dayIndex}`,
    }))
    return { days }
  })

  return (
    <div className="animate-pulse">
      <div className="flex" style={{ gap: `${blockGap}px` }}>
        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col" style={{ gap: `${blockGap}px` }}>
            {week.days.map((day, j) => (
              <div
                key={day.key}
                className="rounded-[2px]"
                style={{
                  height: `${blockSize}px`,
                  width: `${blockSize}px`,
                  backgroundColor: currentTheme.empty,
                  border: `1px solid ${currentTheme.border}`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalendarSkeleton
