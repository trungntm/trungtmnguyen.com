'use client'

import { motion, useScroll } from 'framer-motion'

interface ScrollIndicatorProps {
  backgroundColor?: string
}

export const ScrollIndicator = ({ backgroundColor = '#ec4899' }: ScrollIndicatorProps) => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      id="scroll-indicator"
      style={{
        scaleX: scrollYProgress,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 5,
        originX: 0,
        backgroundColor: backgroundColor,
      }}
    />
  )
}
