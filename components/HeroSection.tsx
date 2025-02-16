import Link from 'next/link'
import Image from '@/components/Image'

const HeroSection = () => {
  return (
    <section className="mb-40">
      <div className="px-6 py-12 text-center md:px-12 lg:my-12 lg:text-left">
        <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="mt-12 lg:mt-0">
              <h1 className="mb-16 text-xl font-bold tracking-tight md:text-3xl xl:text-3xl">
                <span className="text-primary">
                  👋 Hi, I'm <strong>Nguyễn Tạ Minh Trung</strong>
                </span>
              </h1>
              <div className="mb-16 tracking-tight md:text-lg xl:text-lg">
                <h4 className={'pt-2'}>🚀 Passionate Software Developer | Tech Enthusiast</h4>
                <h4 className={'pt-2'}>
                  💻 Main Stacks: <strong>Java Spring Boot</strong> | <strong>React.js</strong>
                </h4>
                <h4 className={'pt-2'}>
                  🛠️ Also Experienced In: <strong>Node.js</strong> | <strong>Angular</strong> |{' '}
                  <strong>Next.js</strong>
                </h4>
                <h4 className={'pt-2'}>
                  I love building{' '}
                  <strong>scalable, efficient, and user-friendly applications</strong> while
                  exploring new technologies.
                </h4>
              </div>
              <Link
                className="text-primary inline-block rounded px-12 pb-3.5 pt-4 text-sm font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:hover:bg-neutral-700 dark:hover:bg-opacity-60"
                data-te-ripple-color="light"
                href="/about"
                role="button"
              >
                About me &rarr;
              </Link>
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
