import Image from '@/components/images'
import { BlinkCursor } from '@/components/cursor'
import { AuroraText } from '../text-animation'
import RainbowButton from '@/components/button/rainbow-button/RainbowButton'
import Link from 'next/link'
import { CometCard } from '../comet-card'
import Highlighter from '../highlighter'

const HeroSection = () => {
  return (
    <section className="mb-40">
      <div className="px-6 py-12 text-center md:px-12 lg:my-12 lg:text-left">
        <div className="mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="mt-12 lg:mt-0">
              <h1 className="mb-16 text-xl font-bold tracking-tight md:text-3xl xl:text-3xl">
                <span className="text-primary">
                  👋 Hi, I'm <strong>Nguyễn Tạ Minh Trung</strong>
                </span>
              </h1>
              <div className="mb-16 tracking-tight md:text-lg xl:text-lg">
                <h4 className={'pt-2'}>🚀 Passionate Software Engineer | Tech Enthusiast</h4>
                <h4 className={'pt-2'}>
                  💻 Main Stacks:{' '}
                  <Highlighter action="underline">
                    <AuroraText colors={['#ff6b6b', '#feca57', '#1dd1a1', '#48dbfb', '#5f27cd']}>
                      Java Spring Boot
                    </AuroraText>{' '}
                  </Highlighter>
                  ,{' '}
                  <Highlighter action="underline">
                    <AuroraText colors={['#ff6b6b', '#feca57', '#1dd1a1', '#48dbfb', '#5f27cd']}>
                      React.js
                    </AuroraText>
                  </Highlighter>
                </h4>
                <h4 className={'pt-2'}>
                  🛠️ Also Experienced In:{' '}
                  <AuroraText colors={['#ff6b6b', '#feca57', '#1dd1a1', '#48dbfb', '#5f27cd']}>
                    Node.js
                  </AuroraText>{' '}
                  ,{' '}
                  <AuroraText colors={['#ff6b6b', '#feca57', '#1dd1a1', '#48dbfb', '#5f27cd']}>
                    Angular
                  </AuroraText>{' '}
                  ,{' '}
                  <AuroraText colors={['#ff6b6b', '#feca57', '#1dd1a1', '#48dbfb', '#5f27cd']}>
                    Next.js
                  </AuroraText>
                </h4>
                <h4 className={'pt-2'}>
                  I love building{' '}
                  <AuroraText colors={['#ff6b6b', '#feca57', '#1dd1a1', '#48dbfb', '#5f27cd']}>
                    scalable
                  </AuroraText>
                  ,{' '}
                  <AuroraText colors={['#ff6b6b', '#feca57', '#1dd1a1', '#48dbfb', '#5f27cd']}>
                    efficient
                  </AuroraText>{' '}
                  , and{' '}
                  <AuroraText colors={['#ff6b6b', '#feca57', '#1dd1a1', '#48dbfb', '#5f27cd']}>
                    user-friendly
                  </AuroraText>{' '}
                  applications while exploring new technologies.
                  <BlinkCursor />
                </h4>
              </div>

              <RainbowButton colors={['#ff6b6b', '#feca57', '#1dd1a4ff', '#48c5fbff', '#5f27cd']}>
                <Link
                  href={'/about'}
                  className={
                    'rainbow-button-content bg-gradient-to-r from-[#48dbfb] to-[#48dbac] text-sm font-medium uppercase'
                  }
                >
                  <span className="flex items-center space-x-2 pr-2">About me &rarr;</span>
                </Link>
              </RainbowButton>
            </div>
            <div className="mb-12 lg:mb-0">
              <CometCard rotateDepth={10} translateDepth={5} opacity={0.2}>
                <Image
                  width={440}
                  height={585}
                  preload={true}
                  fetchPriority="high"
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmQ/9k="
                  src="/static/images/pages/hero.jpg"
                  className="w-full rounded-lg shadow-lg dark:shadow-black/20"
                  alt="Nguyen Ta Minh Trung - Software Engineer"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 440px"
                />
              </CometCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
