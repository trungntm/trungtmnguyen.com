import React from 'react'
import './RainbowButton.css'
import { cn } from '@/utils/lib/cn'

interface RainbowButtonProps {
  children: React.ReactNode
  className?: string
  colors?: string[] // New prop for custom gradient colors
  animationDuration?: number // New prop for animation duration
}

const RainbowButton = ({
  children,
  className = '',
  colors = ['#ec4899', '#8b5cf6', '#3b82f6'], // Default rainbow colors (pink, purple, blue)
  animationDuration = 3, // Default 3 seconds
}: RainbowButtonProps) => {
  // Generate CSS gradient string from colors array with animation duration
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationDuration}s`,
  }

  return (
    <div className="rainbow-button-container">
      <div
        className={cn('rainbow-button-glow', className)}
        style={gradientStyle} // Apply dynamic gradient
      ></div>
      {children}
    </div>
  )
}

export default RainbowButton
