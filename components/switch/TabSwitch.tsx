'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface TabSwitchProps {
  defaultTab?: 'signin' | 'anonymous'
  onTabChange?: (tab: 'signin' | 'anonymous') => void
  className?: string
}

export function TabSwitch({ defaultTab = 'signin', onTabChange, className = '' }: TabSwitchProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'anonymous'>(defaultTab)

  const handleTabChange = (tab: 'signin' | 'anonymous') => {
    setActiveTab(tab)
    onTabChange?.(tab)
  }

  const tabs = [
    { id: 'signin', label: 'Sign In' },
    { id: 'anonymous', label: 'Anonymous' },
  ] as const

  return (
    <div className={`relative ${className}`}>
      <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`relative z-10 flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-gray-700"
                style={{ zIndex: -1 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export type { TabSwitchProps }
