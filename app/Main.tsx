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
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="flex flex-col gap-2 md:flex-row md:gap-8">
                    <Link
                      className={
                        'relative block h-auto shrink-0 border pb-3 pl-0 pr-3 pt-0 hover:shadow-lg hover:shadow-gray-400 dark:hover:shadow-cyan-400 md:h-60 md:w-60'
                      }
                      href={`/blog/${slug}`}
                    >
                      <Image
                        width={0}
                        height={0}
                        key={`${thumbnail}-${slug}`}
                        src={thumbnail}
                        alt={`Thumbnail: ${title}`}
                        sizes={'w-46 h-36 md:w-60 md:h-60'}
                        className={'h-full w-full'}
                      />
                    </Link>
                    <div className="space-y-4 md:space-y-6">
                      <div className="space-y-4 md:space-y-6">
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
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
