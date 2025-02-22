import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import HeroSection from '@/components/HeroSection'
import { UnderlineHoverLink } from '@/components/UnderlineHoverLink'
import Image from '@/components/Image'
const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-1 md:space-y-5">
          <HeroSection />
        </div>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post, index) => {
            const { slug, date, title, summary, tags, thumbnail = '' } = post
            console.log(thumbnail)
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0">
                    <Link
                      className={
                        'm-2 rounded-lg border border-gray-200 bg-white hover:shadow-lg hover:shadow-gray-400 dark:hover:shadow-cyan-400'
                      }
                      href={`/blog/${slug}`}
                    >
                      <Image
                        width={0}
                        height={0}
                        key={`${thumbnail}-${slug}`}
                        src={thumbnail}
                        alt={`Thumbnail: ${title}`}
                        sizes={'auto'}
                        className={'h-full w-full object-contain'}
                      />
                    </Link>
                    <div className="space-y-5 pl-1 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <dl>
                            <dl>
                              <dt className="sr-only">Published on</dt>
                              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                              </dd>
                            </dl>
                          </dl>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <UnderlineHoverLink
                        key={`${slug}-${index}`}
                        href={`/blog/${slug}`}
                        label={`Read more: ${title}`}
                      >
                        Read more &rarr;
                      </UnderlineHoverLink>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <UnderlineHoverLink href={'/blog'} label={'All posts'}>
            All Posts &rarr;
          </UnderlineHoverLink>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
