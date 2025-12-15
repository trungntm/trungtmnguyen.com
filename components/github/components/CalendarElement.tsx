import { cn } from '@/utils/lib/cn'

interface CalendarElementProps {
  blockSize: number
  backgroundColor?: string
  borderColor?: string
  styles?: string
}

const CalendarElement = ({
  blockSize,
  backgroundColor,
  borderColor,
  styles,
}: CalendarElementProps) => {
  return (
    <div
      className={cn('rounded-[2px]', styles)}
      style={{
        height: `${blockSize}px`,
        width: `${blockSize}px`,
        backgroundColor: backgroundColor,
        border: `1px solid ${borderColor}`,
      }}
    ></div>
  )
}

export default CalendarElement
