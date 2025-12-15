import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import { sanitizeUrl } from '@/utils/sanitize-url'

const CustomLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const sanitizedHref = sanitizeUrl(href as string)
  const isInternalLink = sanitizedHref && sanitizedHref.startsWith('/')
  const isAnchorLink = sanitizedHref && sanitizedHref.startsWith('#')

  if (isInternalLink) {
    return <Link href={sanitizedHref} {...rest} />
  }

  if (isAnchorLink) {
    return <a href={sanitizedHref} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={sanitizedHref} {...rest} />
}

export default CustomLink
