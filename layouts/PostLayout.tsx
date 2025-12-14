import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { ScrollIndicator } from '@/components/scroll-indicator'
import { ReadingTime } from '@/components/reading-time'
import TOCInline from 'pliny/ui/TOCInline'
import Bleed from 'pliny/ui/Bleed'
import { SeriesNavigation, SeriesCard } from '@/components/series'
import type { SeriesInfo } from '@/components/series/types'
import NavigationLinks from '@/components/NavigationLinks'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  seriesData?: SeriesInfo
  children: ReactNode
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  seriesData,
  children,
}: LayoutProps) {
  const { filePath, path, slug, date, title, tags, readingTime, toc } = content
  const basePath = path.split('/')[0]

  return (
    <>
      <ScrollIndicator />

      <SectionContainer>
        <ScrollTopAndComment />
        <article>
          <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
            <header className="pt-6 xl:pb-6">
              <div className="space-y-1 text-center">
                <dl className="space-y-10">
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                      </time>
                      {readingTime && <ReadingTime text={readingTime.text} />}
                    </dd>
                  </div>
                </dl>
                <div>
                  <PageTitle>{title}</PageTitle>
                </div>
              </div>
            </header>
            {/* Series Card */}
            {content.seriesInfo && seriesData && (
              <div className="px-4 py-6 xl:px-0">
                <SeriesCard
                  series={seriesData}
                  showProgress
                  variant="compact"
                  currentPostSlug={slug}
                />
              </div>
            )}
            <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
              <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
                    {authorDetails.map((author) => (
                      <li className="flex items-center space-x-2" key={author.name}>
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            width={38}
                            height={38}
                            alt="avatar"
                            className="h-10 w-10 rounded-full"
                          />
                        )}
                        <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                          <dt className="sr-only">Name</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                          <dt className="sr-only">Twitter</dt>
                          <dd>
                            {author.twitter && (
                              <Link
                                href={author.twitter}
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                {author.twitter.replace('https://twitter.com/', '@')}
                              </Link>
                            )}
                          </dd>
                        </dl>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>
              <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
                <div className="prose dark:prose-invert max-w-none pt-10 pb-8">
                  <TOCInline
                    fromHeading={1}
                    toHeading={1}
                    toc={toc}
                    asDisclosure
                    liClassName={'text-sm'}
                  />
                  <hr />
                  {children}
                </div>
                {/*<div className="pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">*/}
                {/*  <Link href={discussUrl(path)} rel="nofollow">*/}
                {/*    Discuss on Twitter*/}
                {/*  </Link>*/}
                {/*  {` • `}*/}
                {/*  <Link href={editUrl(filePath)}>View on GitHub</Link>*/}
                {/*</div>*/}
                {siteMetadata.comments && (
                  <div
                    className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
                    id="comment"
                  >
                    <Comments slug={slug} />
                  </div>
                )}
              </div>

              <footer>
                <div className="divide-gray-200 text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2 xl:divide-y dark:divide-gray-700">
                  {tags && (
                    <div className="py-4 xl:py-8">
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Tags
                      </h2>
                      <div className="flex flex-wrap">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Navigation Links */}
                  {content.seriesInfo && seriesData ? (
                    (() => {
                      const currentIndex = seriesData.posts.findIndex(
                        (post) => post.title === title
                      )
                      const previousPost =
                        currentIndex > 0 ? seriesData.posts[currentIndex - 1] : null
                      const nextPost =
                        currentIndex < seriesData.posts.length - 1
                          ? seriesData.posts[currentIndex + 1]
                          : null

                      return (
                        <NavigationLinks
                          prev={
                            previousPost
                              ? { path: `blog/${previousPost.slug}`, title: previousPost.title }
                              : null
                          }
                          next={
                            nextPost
                              ? { path: `blog/${nextPost.slug}`, title: nextPost.title }
                              : null
                          }
                          prevLabel="Previous in Series"
                          nextLabel="Next in Series"
                        />
                      )
                    })()
                  ) : (
                    <NavigationLinks prev={prev} next={next} />
                  )}
                </div>
                <div className="pt-4 xl:pt-8">
                  {content.seriesInfo && seriesData ? (
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <Link
                        href={`/${basePath}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label="Back to the blog"
                      >
                        &larr; Back to the blog
                      </Link>
                      <Link
                        href={`/series/${seriesData.slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label="View all posts in this series"
                      >
                        📚 View series: {seriesData.name}
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href={`/${basePath}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label="Back to the blog"
                    >
                      &larr; Back to the blog
                    </Link>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </article>
      </SectionContainer>
    </>
  )
}
