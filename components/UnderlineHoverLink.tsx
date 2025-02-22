import Link from '@/components/Link'
import { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'

interface UnderlineHoverLinkProps extends LinkProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  label: string
  text?: string
  classname?: string
  children?: React.ReactNode
}

export const UnderlineHoverLink = ({
  href,
  label,
  classname,
  children,
  rel,
}: UnderlineHoverLinkProps) => (
  <div className="w-fit text-base font-medium leading-6">
    <Link
      href={href}
      className={`group w-fit text-gray-500 transition duration-200 hover:text-gray-600 dark:hover:text-gray-200 ${classname}`}
      aria-label={`"${label}"`}
      rel={rel}
    >
      {children}
      <span className="block h-0.5 max-w-0 bg-primary-500 py-0.5 transition-all duration-500 group-hover:max-w-full dark:bg-cyan-600"></span>
    </Link>
  </div>
)
