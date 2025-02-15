import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import { CSSProperties, ReactElement } from 'react'

interface TimelineElementProps {
  date: string
  title?: string
  subtitle?: string
  description: string[]
  contentStyle?: CSSProperties
  contentArrowStyle?: CSSProperties
  dateClassName?: string
  icon?: ReactElement
  highlight?: boolean
}

const TimelineElement = ({
  date,
  title,
  description,
  contentStyle,
  contentArrowStyle,
  dateClassName = 'timeline-date-black',
  icon,
  highlight = false,
}: TimelineElementProps) => {
  return (
    <VerticalTimelineElement
      contentStyle={contentStyle}
      contentArrowStyle={contentArrowStyle}
      date={date}
      dateClassName={dateClassName}
      icon={icon}
    >
      {highlight ? (
        <h3 className="vertical-timeline-element-title font-bold">{title}</h3>
      ) : (
        <h4 className="vertical-timeline-element-subtitle font-medium text-primary-500">{title}</h4>
      )}

      <ul className="list-outside list-disc space-y-1">
        {description.map((desc, index) => (
          <li key={index}>
            {highlight ? <p>{desc}</p> : <p className={'text-blue-400'}>{desc}</p>}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  )
}

export default TimelineElement
