import Link from 'next/link'
import Image from '@/components/Image'
import { BlinkCursor } from '@/components/cursor'
import { AuroraText } from './text-animation'
import RainbowButtonLink from './button/rainbow-button-link/RainbowButtonLink'

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
                  <AuroraText colors={['#ff6b6b', '#feca57', '#1dd1a1', '#48dbfb', '#5f27cd']}>
                    Java Spring Boot
                  </AuroraText>{' '}
                  |{' '}
                  <AuroraText colors={['#ff6b6b', '#feca57', '#1dd1a1', '#48dbfb', '#5f27cd']}>
                    React.js
                  </AuroraText>
                </h4>
                <h4 className={'pt-2'}>
                  🛠️ Also Experienced In:{' '}
                  <AuroraText colors={['#ff6b6b', '#feca57', '#1dd1a1', '#48dbfb', '#5f27cd']}>
                    Node.js
                  </AuroraText>{' '}
                  |{' '}
                  <AuroraText colors={['#ff6b6b', '#feca57', '#1dd1a1', '#48dbfb', '#5f27cd']}>
                    Angular
                  </AuroraText>{' '}
                  |{' '}
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

              <RainbowButtonLink
                href="/about"
                className="text-sm font-medium uppercase"
                colors={['#ff6b6b', '#feca57', '#1dd1a1', '#48dbfb', '#5f27cd']}
              >
                About me &rarr;
              </RainbowButtonLink>
            </div>
            <div className="mb-12 lg:mb-0">
              <Image
                width={440}
                height={660}
                priority={true}
                src="/static/images/pages/hero.jpg"
                className="w-full rounded-lg shadow-lg dark:shadow-black/20"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
