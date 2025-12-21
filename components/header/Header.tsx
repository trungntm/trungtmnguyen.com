'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from '@/components/custom-link'
import MobileNav from '@/components/nav'
import ThemeSwitch from '@/components/switch'
import SearchButton from '@/components/search-button'
import ImageLogo from '@/components/logo'
import DownloadCV from '@/components/download-cv'
import { useEffect } from 'react'
import UnderlineHoverLink from '@/components/underline-hover-link'

const Header = () => {
  useEffect(() => {
    const header = document.getElementById('nav')
    const handleScroll = () => {
      if (window.scrollY > 120) {
        header?.classList.add('py-4')
        header?.classList.remove('py-10')
      } else {
        header?.classList.add('py-10')
        header?.classList.remove('py-4')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div className={'mx-auto max-w-3xl sm:px-6 xl:max-w-5xl xl:px-0'}>
      <header
        className={`fixed z-50 w-full max-w-3xl bg-white px-4 sm:pr-16 sm:pl-6 md:px-8 xl:max-w-5xl xl:px-0 dark:bg-gray-900`}
      >
        <div
          id={'nav'}
          className={'flex items-center justify-between py-10 transition-all duration-300'}
        >
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <ImageLogo src={'/static/images/logo.png'} />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-between space-x-2.5 sm:space-x-4 sm:rounded-[40px] sm:border sm:border-gray-200 sm:pb-2 sm:pl-6 lg:space-x-2 dark:border-gray-700 dark:sm:border-gray-600">
            <div
              className={'mt-3 flex items-center space-x-4 pr-2 sm:space-x-6 lg:space-x-4 lg:pr-8'}
            >
              {headerNavLinks
                .filter((link) => link.href !== '/' && link.active)
                .map((link) => (
                  <UnderlineHoverLink
                    key={link.title}
                    href={link.href}
                    label={link.title}
                    classname={'hidden font-medium text-gray-900 dark:text-gray-100 sm:block'}
                  >
                    {link.title}
                  </UnderlineHoverLink>
                ))}
            </div>
            <div className={'mt-2 flex items-center space-x-4 pr-2 sm:space-x-6 lg:space-x-4'}>
              <SearchButton />
              <ThemeSwitch />
              <DownloadCV />
              <MobileNav />
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
