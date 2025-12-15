'use client'

/**
 * Fireworks Effect Component
 * Particle-based fireworks animation for TET and New Year
 */

import { useEffect, useRef } from 'react'
import { EffectIntensity } from '@/utils/holidays'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  color: string
  size: number
  gravity: number
  life: number
  maxLife: number
}

interface Firework {
  x: number
  y: number
  targetY: number
  speed: number
  exploded: boolean
  particles: Particle[]
  color: string
}

interface FireworksEffectProps {
  frequency?: number
  intensity?: EffectIntensity
  colors?: string[]
  particlesPerExplosion?: number
}

export default function FireworksEffect({
  frequency = 3000,
  intensity = 'medium',
  colors = ['#dc2626', '#fbbf24', '#f59e0b', '#ef4444'],
  particlesPerExplosion = 50,
}: FireworksEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fireworksRef = useRef<Firework[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const lastLaunchRef = useRef<number>(0)

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
      low: { freqMultiplier: 1.5, particleMultiplier: 0.5 },
      medium: { freqMultiplier: 1.2, particleMultiplier: 0.7 },
      high: { freqMultiplier: 1, particleMultiplier: 1 },
    }

    const config = intensityConfig[intensity]
    const adjustedFrequency = frequency * config.freqMultiplier
    const adjustedParticles = Math.floor(particlesPerExplosion * config.particleMultiplier)

    const createFirework = (): Firework => {
      // Launch from edges only (left 20% or right 20% of screen)
      const fromLeft = Math.random() > 0.5
      const x = fromLeft
        ? Math.random() * canvas.width * 0.2
        : canvas.width * 0.8 + Math.random() * canvas.width * 0.2

      // Explode in top 30% of screen only
      const targetY = Math.random() * (canvas.height * 0.25) + canvas.height * 0.05
      const color = colors[Math.floor(Math.random() * colors.length)]

      return {
        x,
        y: canvas.height,
        targetY,
        speed: 5 + Math.random() * 3,
        exploded: false,
        particles: [],
        color,
      }
    }

    const createExplosion = (firework: Firework) => {
      const particles: Particle[] = []
      const particleCount = adjustedParticles

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount
        const velocity = 1.5 + Math.random() * 2.5 // Smaller explosions
        const life = 45 + Math.random() * 30 // Shorter life

        particles.push({
          x: firework.x,
          y: firework.y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1,
          color: firework.color,
          size: 1.5 + Math.random() * 1.5, // Smaller particles
          gravity: 0.05 + Math.random() * 0.05,
          life,
          maxLife: life,
        })
      }

      const sparkleCount = Math.floor(particleCount * 0.2)
      for (let i = 0; i < sparkleCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const velocity = 0.8 + Math.random() * 1.5
        const life = 30 + Math.random() * 25

        particles.push({
          x: firework.x,
          y: firework.y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1,
          color: '#fbbf24',
          size: 1 + Math.random() * 0.5,
          gravity: 0.02,
          life,
          maxLife: life,
        })
      }

      return particles
    }

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (timestamp - lastLaunchRef.current > adjustedFrequency) {
        fireworksRef.current.push(createFirework())
        lastLaunchRef.current = timestamp
      }

      fireworksRef.current = fireworksRef.current.filter((firework) => {
        if (!firework.exploded) {
          firework.y -= firework.speed

          if (firework.y <= firework.targetY) {
            firework.exploded = true
            firework.particles = createExplosion(firework)
          }

          ctx.beginPath()
          ctx.arc(firework.x, firework.y, 2, 0, Math.PI * 2)
          ctx.fillStyle = firework.color
          ctx.fill()
          ctx.shadowBlur = 10
          ctx.shadowColor = firework.color
          ctx.shadowBlur = 0

          return true
        } else {
          firework.particles = firework.particles.filter((particle) => {
            particle.x += particle.vx
            particle.y += particle.vy
            particle.vy += particle.gravity
            particle.life--
            particle.alpha = particle.life / particle.maxLife

            if (particle.life > 0) {
              ctx.beginPath()
              ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
              ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255)
                .toString(16)
                .padStart(2, '0')}`
              ctx.fill()

              ctx.shadowBlur = 5
              ctx.shadowColor = particle.color
              ctx.shadowBlur = 0

              return true
            }
            return false
          })

          return firework.particles.length > 0
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
  }, [frequency, intensity, colors, particlesPerExplosion])

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50" aria-hidden="true" />
  )
}
