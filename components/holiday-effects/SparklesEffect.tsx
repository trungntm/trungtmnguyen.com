'use client'

/**
 * Sparkles Effect Component
 * Floating lanterns and sparkles for Mid-Autumn Festival
 */

import { useEffect, useRef } from 'react'
import { EffectIntensity } from '@/utils/holidays'

interface Sparkle {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
  twinkleSpeed: number
  twinklePhase: number
  sway: number
  swaySpeed: number
  isLantern: boolean
}

interface SparklesEffectProps {
  density?: number
  intensity?: EffectIntensity
  colors?: string[]
}

export default function SparklesEffect({
  density = 20,
  intensity = 'medium',
  colors = ['#fbbf24', '#f59e0b', '#fde047'],
}: SparklesEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparklesRef = useRef<Sparkle[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)

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

    const intensityConfig = {
      low: { densityMultiplier: 0.5, speedMultiplier: 0.7 },
      medium: { densityMultiplier: 1, speedMultiplier: 1 },
      high: { densityMultiplier: 1.5, speedMultiplier: 1.3 },
    }

    const config = intensityConfig[intensity]
    const adjustedDensity = Math.floor(density * config.densityMultiplier)

    // Initialize sparkles
    const createSparkle = (): Sparkle => {
      const isLantern = Math.random() > 0.7 // 30% chance of lantern
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: isLantern ? 8 + Math.random() * 8 : 2 + Math.random() * 3,
        speed: (0.2 + Math.random() * 0.5) * config.speedMultiplier,
        opacity: 0.3 + Math.random() * 0.7,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: 0.02 + Math.random() * 0.03,
        twinklePhase: Math.random() * Math.PI * 2,
        sway: Math.random() * 40 - 20,
        swaySpeed: 0.01 + Math.random() * 0.02,
        isLantern,
      }
    }

    sparklesRef.current = Array.from({ length: adjustedDensity }, createSparkle)

    const drawLantern = (sparkle: Sparkle) => {
      const { x, y, size, opacity, color } = sparkle

      // Lantern body (rounded rectangle)
      ctx.save()
      ctx.globalAlpha = opacity

      // Glow effect
      ctx.shadowBlur = 20
      ctx.shadowColor = color

      // Main lantern
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.roundRect(x - size / 2, y - size, size, size * 1.5, size / 4)
      ctx.fill()

      // Top cap
      ctx.fillStyle = '#dc2626'
      ctx.beginPath()
      ctx.roundRect(x - size / 2 - 1, y - size - 2, size + 2, 3, 1)
      ctx.fill()

      // Bottom fringe
      ctx.fillStyle = color
      for (let i = 0; i < 3; i++) {
        const fringeX = x - size / 4 + (i * size) / 4
        ctx.beginPath()
        ctx.moveTo(fringeX, y + size / 2)
        ctx.lineTo(fringeX, y + size / 2 + 4)
        ctx.strokeStyle = color
        ctx.lineWidth = 1
        ctx.stroke()
      }

      ctx.shadowBlur = 0
      ctx.restore()
    }

    const drawSparkle = (sparkle: Sparkle) => {
      const { x, y, size, opacity, color } = sparkle

      ctx.save()
      ctx.globalAlpha = opacity

      // Star shape
      ctx.shadowBlur = 10
      ctx.shadowColor = color
      ctx.fillStyle = color

      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2
        const outerRadius = size
        const innerRadius = size / 2

        if (i === 0) {
          ctx.moveTo(x + Math.cos(angle) * outerRadius, y + Math.sin(angle) * outerRadius)
        } else {
          ctx.lineTo(x + Math.cos(angle) * outerRadius, y + Math.sin(angle) * outerRadius)
        }

        const innerAngle = angle + Math.PI / 5
        ctx.lineTo(x + Math.cos(innerAngle) * innerRadius, y + Math.sin(innerAngle) * innerRadius)
      }
      ctx.closePath()
      ctx.fill()

      ctx.shadowBlur = 0
      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparklesRef.current.forEach((sparkle) => {
        // Update twinkle
        sparkle.twinklePhase += sparkle.twinkleSpeed
        sparkle.opacity = 0.3 + Math.sin(sparkle.twinklePhase) * 0.4

        // Update position - floating upward
        sparkle.y -= sparkle.speed

        // Sway left and right
        sparkle.sway += sparkle.swaySpeed
        sparkle.x += Math.sin(sparkle.sway) * 0.5

        // Reset if out of bounds
        if (sparkle.y < -sparkle.size * 2) {
          sparkle.y = canvas.height + sparkle.size
          sparkle.x = Math.random() * canvas.width
        }

        if (sparkle.x < -sparkle.size) {
          sparkle.x = canvas.width + sparkle.size
        } else if (sparkle.x > canvas.width + sparkle.size) {
          sparkle.x = -sparkle.size
        }

        // Draw
        if (sparkle.isLantern) {
          drawLantern(sparkle)
        } else {
          drawSparkle(sparkle)
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [density, intensity, colors])

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50" aria-hidden="true" />
  )
}
