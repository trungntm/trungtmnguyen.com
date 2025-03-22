'use client'
import { ReactElement } from 'react'
import { TimelineElement } from '@/components/Timeline/TimelineElement'
import ImageLogo from '@/components/logo'
import useSWR from 'swr'

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

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Timeline() {
  const { data, error } = useSWR('/api/timeline', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="space-y-8 border-l-2 border-gray-200 pl-6 dark:border-gray-500">
        {data.map((item: TimelineItem, index: number) => (
          <div key={index} className="relative rounded-lg p-2 pt-1 pb-0 dark:bg-gray-900">
            <div className="absolute top-4 -left-12 h-12 w-11">
              <ImageLogo src={item.logo} alt={item.company} />
            </div>
            <p className="text-xs dark:text-gray-500">{item.duration}</p>
            <h3 className="mt-2 text-xl font-semibold dark:text-gray-100">{item.company}</h3>
            <p className="text-sm dark:text-gray-400">{item.role}</p>
            <ul className="list-outside list-disc pl-4 dark:text-gray-600">
              {item.description.map((desc, index: number) => (
                <li key={index}>
                  <p className="mt-2 dark:text-gray-300">{desc}</p>
                </li>
              ))}
            </ul>
            {item.projects?.map((project, idx: number) => (
              <TimelineElement key={idx} itemIndex={idx} item={project} />
            ))}
            <div className="mt-2 space-x-2">
              {item.links.map((link, idx: number) => (
                <a key={idx} href={link.href} className="text-blue-400 hover:underline">
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
