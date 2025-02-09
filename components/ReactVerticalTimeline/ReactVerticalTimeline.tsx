'use client'

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import './vertical-timeline.css'
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
        <VerticalTimelineElement
          visible={true}
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          date="Jun 2019 - present"
          dateClassName="timeline-date-black"
          icon={<KMSLogo />}
        >
          <h3 className="vertical-timeline-element-title font-bold">KMS Technology</h3>
          <ul className="list-outside list-disc space-y-1">
            <li>Jun 2019 - Jan 2022: Software Engineer</li>
            <li>Jan 2022 - present: Senior Software Engineer</li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          visible={true}
          className="vertical-timeline-element--work"
          date="2019 - Oct 2022"
          icon={<KMSLogo />}
        >
          <h4 className="vertical-timeline-element-subtitle font-medium text-primary-500">
            Kibo Commerce - KMS Technology
          </h4>
          <ul className="list-outside list-disc space-y-1">
            <li>
              <p className={'text-blue-400'}>
                An E-Commerce platform which is provided B2C and B2B commerce business
              </p>
            </li>
            <li>
              <p className={'text-blue-400'}>
                Developing & Maintaining the E-commerce platform using Java, Spring framework,
                Apache tiles
              </p>
            </li>
            <li>
              <p className={'text-blue-400'}>
                Collaborating with on-shore teams to create the highest quality values
              </p>
            </li>
            <li>
              <p className={'text-blue-400'}>
                Being Technical lead - heads up all technical issues, technical focal point to
                communicate with on-shore team
              </p>
            </li>
            <li>
              <p className={'text-blue-400'}>Team size: 8</p>
            </li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          visible={true}
          className="vertical-timeline-element--work"
          date="Jun 2021 - Apr 2022"
          icon={<KMSLogo />}
        >
          <h4 className="vertical-timeline-element-subtitle font-medium text-primary-500">
            PingIdentity - KMS Technology
          </h4>
          <ul className="list-outside list-disc space-y-1">
            <li>
              <p className={'text-blue-400'}>
                Spending extra effort for another project of company
              </p>
            </li>
            <li>
              <p className={'text-blue-400'}>
                Identity security platform provided Single Sign-On service and access management.
              </p>
            </li>
            <li>
              <p className={'text-blue-400'}>Skill set utilized: Java, Spring framework, ReactJs</p>
            </li>
            <li>
              <p className={'text-blue-400'}>Team size: 8</p>
            </li>
            <li>
              <p className={'text-blue-400'}>
                Collaborating with on-shore team and providing the solution on new
                features/enhancements
              </p>
            </li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          visible={true}
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          date="Jan 01 2022"
          dateClassName="timeline-date-black"
          icon={<KMSLogo />}
        >
          <h3 className={'font-bold'}>Becoming a Senior Software Engineer</h3>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          visible={true}
          className="vertical-timeline-element--work"
          date="Oct 2022 - 07 2024"
          icon={<KMSLogo />}
        >
          <h4 className="vertical-timeline-element-subtitle font-medium text-primary-500">
            GoFan - KMS Technology
          </h4>
          <ul className="list-outside list-disc space-y-1">
            <li>
              <p className={'text-blue-400'}>
                An ticket-box system of sports competitors at American university
              </p>
            </li>
            <li>
              <p className={'text-blue-400'}>
                Skill set utilized: Spring Boot, RESTFul API, ReactJs, Micro-service architect, AWS
              </p>
            </li>
            <li>
              <p className={'text-blue-400'}>
                Implementing new features & bugs fixing that relevant of FAN experience
              </p>
            </li>
            <li>
              <p className={'text-blue-400'}>Team size: 50</p>
            </li>
          </ul>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          visible={true}
          className="vertical-timeline-element--work"
          dateClassName="timeline-date-black"
          date="07 2024 - present"
          icon={<KMSLogo />}
        >
          <h4 className="vertical-timeline-element-subtitle font-medium text-primary-500">
            LNI-CPP - KMS Technology
          </h4>
          <ul className="list-outside list-disc space-y-1">
            <li>
              <p className={'text-blue-400'}>
                Skill set utilized: Micro-services Architect, Spring Boot, Maven, ReactJS, Azure
              </p>
            </li>
            <li>
              <p className={'text-blue-400'}>
                Be in-charged of new features implementation, performance issues and enhance the
                logics
              </p>
            </li>
            <li>
              <p className={'text-blue-400'}>Team size: 10</p>
            </li>
          </ul>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </>
  )
}

export default ReactVerticalTimeline
