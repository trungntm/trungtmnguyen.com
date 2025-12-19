import { Inter } from 'next/font/google'
import SectionContainer from '../container'
import Footer from '../footer'
import { ReactNode } from 'react'
import Header from '../header'

interface Props {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'optional',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
})

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className={`${inter.className} flex h-screen flex-col justify-between font-sans`}>
        <Header />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
