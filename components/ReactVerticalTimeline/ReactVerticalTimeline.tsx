'use client'

import { VerticalTimeline } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import './vertical-timeline.css'
import TimelineElement from './TimelineElement'
import KMSLogo from '@/components/logo/kms'

const ReactVerticalTimeline = () => {
  return (
    <>
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h2 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          Work experiences
        </h2>
      </div>
      <VerticalTimeline lineColor={'grey'}>
        <TimelineElement
          date="Jun 2019 - present"
          title="KMS Technology"
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          description={[
            'Jun 2019 - Jan 2022: Software Engineer',
            'Jan 2022 - present: Senior Software Engineer',
          ]}
          icon={<KMSLogo />}
          highlight={true}
        />
        <TimelineElement
          date="2019 - Oct 2022"
          title="Kibo Commerce - KMS Technology"
          subtitle="Kibo Commerce - KMS Technology"
          description={[
            'An E-Commerce platform which is provided B2C and B2B commerce business',
            'Developing & Maintaining the E-commerce platform using Java, Spring framework, Apache tiles',
            'Collaborating with on-shore teams to create the highest quality values',
            'Being Technical lead - heads up all technical issues, technical focal point to communicate with on-shore team',
            'Team size: 8',
          ]}
          icon={<KMSLogo />}
        />
        <TimelineElement
          date="Jun 2021 - Apr 2022"
          title="PingIdentity - KMS Technology"
          subtitle="PingIdentity - KMS Technology"
          description={[
            'Spending extra effort for another project of company',
            'Identity security platform provided Single Sign-On service and access management.',
            'Skill set utilized: Java, Spring framework, ReactJs',
            'Team size: 8',
            'Collaborating with on-shore team and providing the solution on new features/enhancements',
          ]}
          icon={<KMSLogo />}
        />
        <TimelineElement
          date="Jan 01 2022"
          title="Becoming a Senior Software Engineer"
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          description={[]}
          icon={<KMSLogo />}
          highlight={true}
        />
        <TimelineElement
          date="Oct 2022 - 07 2024"
          title="GoFan - KMS Technology"
          subtitle="GoFan - KMS Technology"
          description={[
            'An ticket-box system of sports competitors at American university',
            'Skill set utilized: Spring Boot, RESTFul API, ReactJs, Micro-service architect, AWS',
            'Implementing new features & bugs fixing that relevant of FAN experience',
            'Team size: 50',
          ]}
          icon={<KMSLogo />}
        />
        <TimelineElement
          date="07 2024 - present"
          title="LNI-CPP - KMS Technology"
          subtitle="LNI-CPP - KMS Technology"
          description={[
            'Skill set utilized: Micro-services Architect, Spring Boot, Maven, ReactJS, Azure',
            'Be in-charged of new features implementation, performance issues and enhance the logics',
            'Team size: 10',
          ]}
          icon={<KMSLogo />}
        />
      </VerticalTimeline>
    </>
  )
}

export default ReactVerticalTimeline
