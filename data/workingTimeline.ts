interface TimeLine {
  company: string
  project?: string
  role: string
  duration: string
  description: string[]
  links: { text: string; href: string }[]
  projects?: TimeLine[]
  logo?: string
  itemIndex?: number
}

const workingTimelineData: TimeLine[] = [
  {
    company: 'KMS Technology',
    role: 'Senior Software Engineer',
    duration: 'Jun 2019 - Present',
    description: [
      'Joining KMS as a Software Engineer at Jun 2019.',
      'Becoming a Senior Software Engineer at Jan 2022.',
    ],
    links: [],
    logo: '/static/logo/kms.png',
    projects: [
      {
        company: 'KMS Technology',
        project: 'LNI - ILAAM',
        role: 'Senior Software Engineer',
        duration: 'Dec 2024 - Present',
        description: [
          'Being in-charged of Insurance context service - the important service to return insurance context for others services in eco-system, from new features, bug fixing.',
          'Onboarding new product profiles to system to ensuring the insurance context is returned correctly.',
          'Brainstorming ideas, architect structures to enhance Insurance context service. Develop caching strategy by using memcache & redis to reduce the response time.',
          'Exposing the libraries to other teams to use - which help them to interact with Insurance context service easily.',
          'Being in-charged of performance issues of all services - investigating, detecting the root cause and improve performance of systems.',
          'Using github-actions, helm chart to deploy the services to the AKS.',
          'Mentoring junior members and help them catch-up the systems.',
          'Skill set utilized: Java, Spring Boot, Azure, micro-service architecture.',
          'Team size: 10',
        ],
        links: [],
        logo: '/static/logo/LNI.png',
      },
      {
        company: 'KMS Technology',
        project: 'LNI - CPP',
        role: 'Senior Software Engineer',
        duration: 'Jul 2024 - Dec 2024',
        description: [
          'Developing new features for files processing system.',
          'Being in-charged of performance issues, ensure the large files can be processed without any performance issues.',
          'Developing Time Estimator service to provide the estimated time for the files to be processed.',
          'Using github-actions, helm chart to deploy the services to the AKS.',
          'Building Datatable component for the frontend using ReactJs, this help developers reduce a lot of code when rendering the table.',
          'Providing technical approaches/refactor the frontend source code by apply MUI theme, react hooks, building component reusable',
          'Mentoring junior members and help them catch-up the systems.',
          'Skill set utilized: Java, Spring Boot, Azure, micro-service architecture, ReactJs.',
          'Team size: 10',
        ],
        links: [],
        logo: '/static/logo/LNI.png',
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
        logo: '/static/logo/GoFan.png',
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
        logo: '/static/logo/PingIdentity.png',
      },
      {
        company: 'KMS Technology',
        project: 'Kibo Commerce',
        role: 'Software Engineer / Senior Software Engineer',
        duration: 'Jun 2019 – Oct 2022',
        description: [
          'Developing & Maintaining the E-commerce platform using Java, Spring framework, Apache tiles.',
          `Developing new features for <a target="_blank" href="https://francescas.com/">francescas.com</a>, <a target="_blank" href="https://www.ghbass.com/">ghbass.com</a>, <a target="_blank" href="https://www.donnakaran.com/">donnakaran.com</a>, <a target="_blank" href="https://www.andrewmarc.com/">andrewmarc.com</a>, <a target="_blank" href="https://www.karllagerfeldparis.com/">karllagerfeldparis.com</a>`,
          'Implement Affirm checkout for AMR (<a target="_blank" href="https://www.ghbass.com/">ghbass.com</a>, <a target="_blank" href="https://www.donnakaran.com/">donnakaran.com</a>, <a target="_blank" href="https://www.andrewmarc.com/">andrewmarc.com</a>, <a target="_blank" href="https://www.karllagerfeldparis.com/">karllagerfeldparis.com</a>)',
          'Collaborating with on-shore teams to create the highest quality values for the clients.',
          'Be in-charge of performance during PEAK season, ensure the system is stable, high throughput and can handle the high traffic.',
          'Being Technical lead - heads up all technical issues.',
          'Being Technical focal point to communicate with on-shore team.',
          'Skill set utilized: Java, Spring framework, Apache tiles',
          'Team size: 8 members',
        ],
        links: [],
        logo: '/static/logo/Kibo.png',
      },
    ],
  },
]

export default workingTimelineData
