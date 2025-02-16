'use client'
import { ReactElement, useState } from 'react'
import { TimelineElement } from '@/components/Timeline/TimelineElement'
import ImageLogo from '@/components/logo'

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

const timelineData: TimelineItem[] = [
  {
    company: 'KMS Technology',
    role: 'Senior Software Engineer',
    duration: 'Jun 2019 – Present',
    description: [
      'Joining KMS as a Software Engineer at Jun 2019.',
      'Becoming a Senior Software Engineer at Jan 2022.',
    ],
    links: [],
    logo: <ImageLogo src={'/static/logo/kms.png'} alt={'KMS logo'} />,
    projects: [
      {
        company: 'KMS Technology',
        project: 'Kibo Commerce',
        role: 'Software Engineer / Senior Software Engineer',
        duration: 'Jun 2019 – Oct 2022',
        description: [
          'Developing & Maintaining the E-commerce platform using Java, Spring framework, Apache tiles.',
          'Developing new features for https://francescas.com/, https://www.ghbass.com/, https://www.donnakaran.com/',
          'Implement Affirm checkout for AMR (https://www.ghbass.com/, https://www.donnakaran.com/, https://www.andrewmarc.com/)',
          'Collaborating with on-shore teams to create the highest quality values for the clients.',
          'Be in-charge of performance during PEAK season, ensure the system is stable, high throughput and can handle the high traffic.',
          'Being Technical lead - heads up all technical issues.',
          'Being Technical focal point to communicate with on-shore team.',
          'Skill set utilized: Java, Spring framework, Apache tiles',
          'Team size: 8 members',
        ],
        links: [],
        logo: <ImageLogo src={'/static/logo/Kibo.png'} alt={'Kibo logo'} />,
      },
      {
        company: 'KMS Technology',
        project: 'Ping Identity',
        role: 'Software Engineer / Senior Software Engineer',
        duration: 'Jun 2021 - Apr 2022',
        description: [
          'Extra-hour project at company.',
          'Collaborating with on-shore on requirement, technical discussion.',
          'As sub-lead role, providing the technical approaches for new enhancements/issues, support team members on problem solving.',
          'Skill set utilized: Java, Spring framework, Apache Wicket, ReactJs.',
          'Team size: 8 members.',
        ],
        links: [],
        logo: <ImageLogo src={'/static/logo/PingIdentity.png'} alt={'PingIdentity logo'} />,
      },
      {
        company: 'KMS Technology',
        project: 'GoFan',
        role: 'Senior Software Engineer',
        duration: 'Oct 2022 - 07 2024',
        description: [
          'Delivery the features for the Ticket-box platform, focus on FAN experiences.',
          'Implementing the Payment validation during checkout flow using Spring Boot, ',
          'Building/Enhance the Event Reminders email flow for mobile-pass ticket, Post-game email for event tickets and mobile-pass using Spring boot, AWS Lambda',
          'Providing the solutions, technical approaches for the new requirements, bugs.',
          'Support team members on their technical issues.',
          'Skill set utilized: Java, Spring Boot, AWS, micro-service architecture.',
          'Team size: 10',
        ],
        links: [],
        logo: <ImageLogo src={'/static/logo/GoFan.png'} alt={'GoFan logo'} />,
      },
      {
        company: 'KMS Technology',
        project: 'LNI - CPP',
        role: 'Senior Software Engineer',
        duration: 'Jul 2024 - Dec 2024',
        description: [
          'Developing new features for files processing system.',
          'Be in-charged of performance issues, ensure the large files can be processed without any performance issues.',
          'Developing Time Estimator service to provide the estimated time for the files to be processed.',
          'Using github-actions, helm chart to deploy the services to the AKS.',
          'Building Datatable component for the frontend using ReactJs, this help developers reduce a lot of code when rendering the table.',
          'Providing technical approaches/refactor the frontend source code by apply MUI theme, react hooks, building component reusable',
          'Skill set utilized: Java, Spring Boot, Azure, micro-service architecture, ReactJs.',
          'Team size: 10',
        ],
        links: [],
        logo: <ImageLogo src={'/static/logo/LNI.png'} alt={'LNIKibo.png logo'} />,
      },
    ],
  },
]

export default function Timeline() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="space-y-8 border-l-2 border-gray-200 pl-6 dark:border-gray-500">
        {timelineData.map((item, index) => (
          <div key={index} className="relative rounded-lg p-6 pb-0 pt-1 dark:bg-gray-900">
            <div className="absolute -left-12 top-4 h-12 w-11">{item.logo}</div>
            <p className="text-xs dark:text-gray-500">{item.duration}</p>
            <h3 className="mt-2 text-xl font-semibold dark:text-gray-100">{item.company}</h3>
            <p className="text-sm dark:text-gray-400">{item.role}</p>
            <ul className="list-outside list-disc pl-4 dark:text-gray-600">
              {item.description.map((desc, index) => (
                <li key={index}>
                  <p className="mt-2 dark:text-gray-300">{desc}</p>
                </li>
              ))}
            </ul>
            {item.projects?.map((project, idx) => (
              <TimelineElement key={idx} itemIndex={idx} item={project} />
            ))}
            <div className="mt-2 space-x-2">
              {item.links.map((link, idx) => (
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
