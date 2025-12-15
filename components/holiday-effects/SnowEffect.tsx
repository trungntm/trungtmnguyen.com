'use client'

/**
 * Snow Effect Component
 * Canvas-based snowfall animation for Christmas
 */

import { useEffect, useRef } from 'react'
import { EffectIntensity } from '@/utils/holidays'

interface Snowflake {
  x: number
  y: number
  radius: number
  speed: number
  drift: number
  opacity: number
}

interface SnowEffectProps {
  density?: number
  intensity?: EffectIntensity
  colors?: string[]
  windEffect?: boolean
}

export default function SnowEffect({
  density = 30,
  intensity = 'medium',
  colors = ['#ffffff', '#e0f2fe', '#bae6fd'],
  windEffect = true,
}: SnowEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const snowflakesRef = useRef<Snowflake[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const windOffsetRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const intensityMultiplier = {
      low: 0.5,
      medium: 1,
      high: 1.5,
    }
    const adjustedDensity = Math.floor(density * intensityMultiplier[intensity])

    const createSnowflake = (fromTop = false): Snowflake => {
      return {
        x: Math.random() * canvas.width,
        y: fromTop ? -10 : Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        drift: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.6 + 0.4,
      }
    }

    snowflakesRef.current = Array.from({ length: adjustedDensity }, () => createSnowflake())

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (windEffect) {
        windOffsetRef.current += 0.01
      }

      snowflakesRef.current.forEach((snowflake, index) => {
        snowflake.y += snowflake.speed

        if (windEffect) {
          snowflake.x += snowflake.drift + Math.sin(windOffsetRef.current) * 0.3
        } else {
          snowflake.x += snowflake.drift
        }

        if (snowflake.x > canvas.width + 10) {
          snowflake.x = -10
        } else if (snowflake.x < -10) {
          snowflake.x = canvas.width + 10
        }

        if (snowflake.y > canvas.height + 10) {
          snowflakesRef.current[index] = createSnowflake(true)
        }

        ctx.beginPath()
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2)

        const colorIndex = Math.floor(snowflake.opacity * colors.length) % colors.length
        const color = colors[colorIndex]

        ctx.fillStyle = `${color}${Math.floor(snowflake.opacity * 255)
          .toString(16)
          .padStart(2, '0')}`
        ctx.fill()

        ctx.shadowBlur = 3
        ctx.shadowColor = color
        ctx.shadowBlur = 0
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [density, intensity, colors, windEffect])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  )
}
