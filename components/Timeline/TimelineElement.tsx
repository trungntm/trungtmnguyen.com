import { ReactElement, useState } from 'react'

export interface TimelineItem {
  company: string
  project?: string
  role: string
  duration: string
  description: string[]
  links: { text: string; href: string }[]
  projects?: TimelineItem[]
  logo?: ReactElement
  itemIndex?: number
}

interface TimelineElementProps {
  item: TimelineItem
  itemIndex: number
}

export const TimelineElement = ({ item, itemIndex }: TimelineElementProps): ReactElement => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="space-y-8 border-l-2 border-gray-200 pl-4 dark:border-gray-500">
        <div className="mx-auto max-w-3xl pb-2 pl-6 pt-2">
          <div
            className={`relative rounded-lg pl-6 pt-2 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
              openIndex === itemIndex ? 'bg-gray-100 dark:bg-gray-700' : 'dark:bg-gray-800'
            }`}
          >
            <div className="absolute -left-16 top-4 h-12 w-11">{item.logo}</div>
            <p className="text-xs text-gray-500">{item.duration}</p>
            <h3 className="text-sm font-semibold dark:text-white">{item.project}</h3>
            <p className="text-sm text-gray-400">{item.role}</p>
            <button
              onClick={() => setOpenIndex(openIndex === itemIndex ? null : itemIndex)}
              className="text-blue-400 hover:underline"
            >
              <p className={'mt-1 text-xs'}>
                {openIndex === itemIndex ? 'Hide Details' : 'Show Details'}{' '}
              </p>
            </button>
            {openIndex === itemIndex && (
              <ul className="mt-1 list-outside list-disc pb-2 pl-4 dark:text-gray-600">
                {item.description.map((desc, index) => (
                  <li key={index}>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{desc}</p>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-2 space-x-2">
              {item.links.map((link, idx) => (
                <a key={idx} href={link.href} className="text-blue-400 hover:underline">
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
