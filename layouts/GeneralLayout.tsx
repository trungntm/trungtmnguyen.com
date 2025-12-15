import { ReactNode } from 'react'
import SectionContainer from '@/components/container'
import PageTitle from '@/components/title/'
import ScrollTopAndComment from '@/components/scroll-to-top'

interface GeneralLayoutProps {
  children: ReactNode
  title?: string
  description?: string
  className?: string
  showTitle?: boolean
  showScrollTop?: boolean
  maxWidth?: 'default' | 'wide' | 'narrow'
}

export default function GeneralLayout({
  children,
  title,
  description,
  className = '',
  showTitle = true,
  showScrollTop = true,
  maxWidth = 'default',
}: GeneralLayoutProps) {
  const maxWidthClasses = {
    default: 'max-w-3xl xl:max-w-5xl',
    wide: 'max-w-5xl xl:max-w-7xl',
    narrow: 'max-w-2xl xl:max-w-3xl',
  }

  return (
    <SectionContainer>
      {showScrollTop && <ScrollTopAndComment />}

      <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${className}`}>
        {showTitle && title && (
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <PageTitle>{title}</PageTitle>
            {description && (
              <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{description}</p>
            )}
          </div>
        )}

        <div className="prose prose-slate dark:prose-invert max-w-none xl:col-span-2">
          {children}
        </div>
      </div>
    </SectionContainer>
  )
}
