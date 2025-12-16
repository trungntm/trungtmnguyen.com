'use client'

/**
 * Holiday Decorations Component
 * Adds themed decorations to header/footer based on active holiday
 */

import { HolidayType } from '@/utils/holidays'

interface HolidayDecorationsProps {
  holiday: HolidayType
  position?: 'header' | 'footer'
}

export default function HolidayDecorations({
  holiday,
  position = 'header',
}: HolidayDecorationsProps) {
  if (holiday === 'none') return null

  const decorations = {
    christmas: {
      header: (
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-around">
          <span className="animate-pulse text-2xl">🎄</span>
          <span className="animate-pulse text-2xl delay-100">⭐</span>
          <span className="animate-pulse text-2xl delay-200">🎁</span>
          <span className="animate-pulse text-2xl delay-300">❄️</span>
          <span className="animate-pulse text-2xl delay-100">🎄</span>
        </div>
      ),
      footer: (
        <div className="pointer-events-none flex justify-center gap-4 py-2">
          <span className="text-xl">🎅</span>
          <span className="text-xl">⛄</span>
          <span className="text-xl">🦌</span>
        </div>
      ),
    },
    tet: {
      header: (
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-around">
          <span className="animate-bounce text-2xl">🎆</span>
          <span className="animate-bounce text-2xl delay-100">🧧</span>
          <span className="animate-bounce text-2xl delay-200">🎊</span>
          <span className="animate-bounce text-2xl delay-300">🏮</span>
          <span className="animate-bounce text-2xl delay-100">🎆</span>
        </div>
      ),
      footer: (
        <div className="pointer-events-none flex justify-center gap-4 py-2">
          <span className="text-xl">🐉</span>
          <span className="text-xl">🧧</span>
          <span className="text-xl">🏮</span>
        </div>
      ),
    },
    'new-year': {
      header: (
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-around">
          <span className="animate-pulse text-2xl">🎉</span>
          <span className="animate-pulse text-2xl delay-100">🎊</span>
          <span className="animate-pulse text-2xl delay-200">🥂</span>
          <span className="animate-pulse text-2xl delay-300">🎆</span>
          <span className="animate-pulse text-2xl delay-100">🎉</span>
        </div>
      ),
      footer: (
        <div className="pointer-events-none flex justify-center gap-4 py-2">
          <span className="text-xl">🎆</span>
          <span className="text-xl">🍾</span>
          <span className="text-xl">🎊</span>
        </div>
      ),
    },
    halloween: {
      header: (
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-around">
          <span className="animate-bounce text-2xl">🎃</span>
          <span className="animate-bounce text-2xl delay-100">👻</span>
          <span className="animate-bounce text-2xl delay-200">🦇</span>
          <span className="animate-bounce text-2xl delay-300">🕷️</span>
          <span className="animate-bounce text-2xl delay-100">🎃</span>
        </div>
      ),
      footer: (
        <div className="pointer-events-none flex justify-center gap-4 py-2">
          <span className="text-xl">🎃</span>
          <span className="text-xl">👻</span>
          <span className="text-xl">🦇</span>
        </div>
      ),
    },
    'mid-autumn': {
      header: (
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-around">
          <span className="animate-pulse text-2xl">🌕</span>
          <span className="animate-pulse text-2xl delay-100">🥮</span>
          <span className="animate-pulse text-2xl delay-200">🏮</span>
          <span className="animate-pulse text-2xl delay-300">⭐</span>
          <span className="animate-pulse text-2xl delay-100">🌕</span>
        </div>
      ),
      footer: (
        <div className="pointer-events-none flex justify-center gap-4 py-2">
          <span className="text-xl">🌕</span>
          <span className="text-xl">🥮</span>
          <span className="text-xl">🏮</span>
        </div>
      ),
    },
  }

  const decoration = decorations[holiday]?.[position]

  if (!decoration) return null

  return <div className="holiday-decorations">{decoration}</div>
}
