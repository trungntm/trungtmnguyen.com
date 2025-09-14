'use client'

import GitHubCalendar from 'react-github-calendar'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const GitHubContribWrapper = () => {
  const [mounted, setMounted] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={'rounded-2xl bg-white shadow dark:bg-gray-900'}>
      <GitHubCalendar
        username={'trungntm'}
        colorScheme={theme.theme === 'dark' ? 'dark' : 'light'}
        blockSize={8}
        loading={false}
        theme={{
          light: ['#eff2f5', '#aceebb', '#4ac26b', '#2da44e', '#116329'],
          dark: ['#151b23', '#033a16', '#196c2e', '#2ea043', '#56d364'],
        }}
      />
    </div>
  )
}

export default GitHubContribWrapper
