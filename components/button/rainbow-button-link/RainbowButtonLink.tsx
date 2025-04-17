import React from 'react'
import Link from 'next/link'
import './RainbowButtonLink.css'

interface RainbowButtonLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  colors?: string[] // New prop for custom gradient colors
  animationDuration?: number // New prop for animation duration
}

const RainbowButtonLink = ({
  href,
  children,
  className = '',
  colors = ['#ec4899', '#8b5cf6', '#3b82f6'], // Default rainbow colors (pink, purple, blue)
  animationDuration = 3, // Default 3 seconds
}: RainbowButtonLinkProps) => {
  // Generate CSS gradient string from colors array with animation duration
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationDuration}s`,
  }

  return (
    <div className="rainbow-button-container">
      <div
        className={`rainbow-button-glow ${className}`}
        style={gradientStyle} // Apply dynamic gradient
      ></div>
      <Link href={href} className={`rainbow-button-content ${className}`}>
        <span className="flex items-center space-x-2 pr-2">{children}</span>
      </Link>
    </div>
  )
}

export default RainbowButtonLink
