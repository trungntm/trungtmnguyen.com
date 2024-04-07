'use client'

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

const ReactVerticalTimeline = () => {
  return (
    <>
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h2 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          Work experience
        </h2>
      </div>
      <VerticalTimeline lineColor={'grey'}>
        <VerticalTimelineElement
          visible={true}
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          iconStyle={{ background: '#fff', color: '#fff' }}
          date="Jun 2019 - present"
          dateClassName="timeline-date-black"
          icon={null}
        >
          <h3 className="vertical-timeline-element-title text-">KMS Technology</h3>
          <ul>
            <li>Jun 2019 - Jan 2022: Software Engineer</li>
            <li>Jan 2022 - present: Senior Software Engineer</li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          visible={true}
          className="vertical-timeline-element--work"
          date="2019 - Oct 2022"
          iconStyle={{ background: '#fff', color: '#fff' }}
        >
          <h3 className="vertical-timeline-element-title py-1">Software Engineer</h3>
          <h4 className="vertical-timeline-element-subtitle py-1">
            Kibo Commerce - KMS Technology
          </h4>
          <ul>
            <li>An E-Commerce platform which is provided B2C and B2B commerce business</li>
            <li>
              Developing & Maintaining the E-commerce platform using Java, Spring framework, Apache
              tiles
            </li>
            <li>Collaborating with on-shore teams to create the highest quality values</li>
            <li>
              Technical lead - heads up all technical issues, technical focal point to communicate
              with on-shore team
            </li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          visible={true}
          className="vertical-timeline-element--work"
          date="Jun 2021 - Apr 2022"
          iconStyle={{ background: '#fff', color: '#fff' }}
        >
          <h3 className="vertical-timeline-element-title py-1">Software Engineer</h3>
          <h4 className="vertical-timeline-element-subtitle py-1">PingIdentity - KMS Technology</h4>
          <ul>
            <li>
              Identity security platform provided Single Sign-On service and access management.
            </li>
            <li>Developing & maintaining the platform using Java, Spring framework, ReactJs</li>
            <li>
              Collaborating with on-shore team and providing the solution on new
              features/enhancements
            </li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          visible={true}
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          iconStyle={{ background: '#fff', color: '#fff' }}
          date="Jan 01 2022"
          dateClassName="timeline-date-black"
        >
          <h3>Becoming a Senior Software Engineer</h3>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          visible={true}
          className="vertical-timeline-element--work"
          date="Oct 2022 - present"
          iconStyle={{ background: '#fff', color: '#fff' }}
        >
          <h3 className="vertical-timeline-element-title py-1">Senior Software Engineer</h3>
          <h4 className="vertical-timeline-element-subtitle py-1">GoFan - KMS Technology, Inc</h4>
          <ul>
            <li>
              An E-Commerce system with main products are tickets of sports competitors at American
              university
            </li>
            <li>
              Skill set utilized: Spring framework, RESTFul API, ReactJs, Micro-service system
            </li>
            <li>Implementing new features & bugs fixing that relevant of FAN experience</li>
          </ul>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </>
  )
}

export default ReactVerticalTimeline
