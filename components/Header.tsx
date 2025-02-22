// 'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import ImageLogo from '@/components/logo'
import { UnderlineHoverLink } from '@/components/UnderlineHoverLink'

const Header = () => {
  return (
    <header
      className={`flex items-center justify-between bg-white py-10 transition-all duration-300 dark:bg-gray-950`}
    >
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <ImageLogo src={'/static/images/logo.png'} />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
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
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
