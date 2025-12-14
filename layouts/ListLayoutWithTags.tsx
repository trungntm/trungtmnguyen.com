'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import Image from '@/components/Image'
import UnderlineHoverLink from '@/components/UnderlineHoverLink'
import { ReadingTime } from '@/components/reading-time'
import { SeriesBadge } from '@/components/series'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname() ?? ''
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <UnderlineHoverLink
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            label={'prev'}
            rel={'prev'}
          >
            Previous
          </UnderlineHoverLink>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <UnderlineHoverLink
            href={`/${basePath}/page/${currentPage + 1}`}
            label={'next'}
            rel={'next'}
          >
            Next
          </UnderlineHoverLink>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname() ?? ''
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pt-6 pb-6">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
            <div className="px-6 py-4">
              {pathname.startsWith('/blog') ? (
                <h3 className="text-primary-500 font-bold uppercase">All Posts</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="hover:text-primary-500 dark:hover:text-primary-500 font-bold text-gray-700 uppercase dark:text-gray-300"
                >
                  All Posts
                </Link>
              )}
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {pathname.split('/tags/')[1] === slug(t) ? (
                        <h3 className="text-primary-500 inline px-3 py-2 text-sm font-bold uppercase">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <>
                          <Tag text={t} />
                          <Link
                            href={`/tags/${slug(t)}`}
                            className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                            aria-label={`View posts tagged ${t}`}
                          >
                            {` (${tagCounts[t]})`}
                          </Link>
                        </>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags, thumbnail = '', readingTime } = post
                return (
                  <li key={path} className="py-5">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <div className="flex flex-col gap-2 md:flex-row md:gap-8">
                        <Link
                          className={
                            'neon-border relative block h-auto shrink-0 border p-0 md:h-48 md:w-48'
                          }
                          href={`/${path}`}
                        >
                          <Image
                            width={0}
                            height={0}
                            key={`${thumbnail}-${slug}`}
                            src={thumbnail}
                            alt={`Thumbnail: ${title}`}
                            sizes={'w-46 h-36 md:w-48 md:h-48'}
                            className={'h-full w-full border'}
                          />
                        </Link>
                        <div className={'pl-2 xl:col-span-3'}>
                          <div className="flex flex-col gap-2">
                            <h2 className="text-2xl leading-8 font-bold tracking-tight">
                              <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                                {title}
                              </Link>
                            </h2>
                            {/* Series Badge */}
                            {post.seriesInfo && (
                              <SeriesBadge
                                seriesSlug={post.seriesInfo.slug}
                                seriesName={post.seriesInfo.name}
                                order={post.seriesInfo.order}
                              />
                            )}
                          </div>
                          <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                              {readingTime && <ReadingTime text={readingTime.text} />}
                            </dd>
                          </dl>
                          <div className="flex flex-wrap py-2">
                            {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                          </div>
                          <div className="prose max-w-none py-2 text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
