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

export const CardImage = ({ post }) => {
  return (
    <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
      {post.imgSrc && (
        <div className="w-full pb-4">
          <img src={post.imgSrc} alt={post.title} className="h-48 w-full rounded-lg object-cover" />
        </div>
      )}
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={post?.datetime} className="text-gray-500">
          {post?.date}
        </time>
        <a
          href={post?.category?.href ?? '#'}
          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          {post.category.title}
        </a>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 dark:text-gray-400">
          <a href={post.href}>
            <span className="absolute inset-0" />
            {post.title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.description}</p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img alt="" src={post.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
        <div className="text-sm/6">
          <p className="font-semibold text-gray-900 dark:text-gray-400">
            <a href={post.author.href}>
              <span className="absolute inset-0" />
              {post.author.name}
            </a>
          </p>
          <p className="text-gray-600">{post.author.role}</p>
        </div>
      </div>
    </article>
  )
}
