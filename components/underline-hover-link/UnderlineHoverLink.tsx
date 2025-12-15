import React from 'react'
import Link from '@/components/custom-link'
import { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'

interface UnderlineHoverLinkProps extends LinkProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  label?: string
  text?: string
  classname?: string
  children?: React.ReactNode
}

const UnderlineHoverLink = ({ href, label, classname, children, rel }: UnderlineHoverLinkProps) => (
  <div className="w-fit text-base leading-6 font-medium">
    <Link
      href={href}
      className={`group w-fit text-gray-500 transition duration-200 hover:text-gray-600 dark:hover:text-gray-200 ${classname}`}
      aria-label={label || (typeof children === 'string' ? children : href)}
      rel={rel}
    >
      {children}
      <span className="bg-primary-500 block h-0.5 max-w-0 py-0.5 transition-all duration-500 group-hover:max-w-full dark:bg-cyan-600"></span>
    </Link>
  </div>
)

export { UnderlineHoverLink }
export default UnderlineHoverLink
