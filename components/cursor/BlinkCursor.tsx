'use client'

import { motion } from 'framer-motion'

export const BlinkCursor = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 0.8, repeat: Infinity }}
    className="ml-2 inline-block w-[8px] bg-gray-500 text-transparent"
  >
    |
  </motion.span>
)
