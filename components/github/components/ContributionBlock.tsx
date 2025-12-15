import { CalendarThemeColors, getContributionColor } from '../themes'

interface ContributionBlockProps {
  blockSize: number
  day: {
    date: string
    contributionCount: number
  }
  currentTheme: CalendarThemeColors
}

const ContributionBlock = ({ blockSize, day, currentTheme }: ContributionBlockProps) => {
  return (
    <div
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
  )
}

export default ContributionBlock
