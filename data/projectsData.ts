interface ProjectCategory {
  title: string
  href: string
}

interface ProjectAuthor {
  name: string
  role: string
  href: string
  imageUrl: string
}

interface Project {
  id: number
  title: string
  description: string
  href?: string
  date?: string
  datetime: string
  category?: ProjectCategory
  imgSrc?: string
  author: ProjectAuthor
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Express-boot',
    href: '#',
    description: 'Speed ​​up Express app development through auto-configuration.',
    date: 'Apr 04, 2025',
    datetime: '2025-04-04',
    category: { title: 'development', href: '#' },
    imgSrc:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    author: {
      name: 'Nguyen Ta Minh Trung',
      role: '',
      href: '#',
      imageUrl: '/static/images/pages/avatar.jpg',
    },
  },
]

export default projectsData
