'use client'

/**
 * Halloween Effect Component
 * Falling pumpkins, flying bats, and swinging spiders for Halloween
 */

import { useEffect, useRef } from 'react'
import { EffectIntensity } from '@/utils/holidays'

interface Pumpkin {
  x: number
  y: number
  size: number
  speed: number
  rotation: number
  rotationSpeed: number
  sway: number
  swaySpeed: number
}

interface Bat {
  x: number
  y: number
  size: number
  speed: number
  wingFlap: number
  flapSpeed: number
  amplitude: number
  direction: number
}

interface Spider {
  x: number
  stringLength: number
  maxStringLength: number
  bobSpeed: number
  bobPhase: number
  size: number
  descending: boolean
}

interface HalloweenEffectProps {
  density?: number
  intensity?: EffectIntensity
}

export default function HalloweenEffect({
  density = 8,
  intensity = 'medium',
}: HalloweenEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pumpkinsRef = useRef<Pumpkin[]>([])
  const batsRef = useRef<Bat[]>([])
  const spidersRef = useRef<Spider[]>([])
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

    // Initialize pumpkins (70% of elements)
    const pumpkinCount = Math.floor(adjustedDensity * 0.7)
    pumpkinsRef.current = Array.from({ length: pumpkinCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: 10 + Math.random() * 10,
      speed: (0.5 + Math.random() * 1) * config.speedMultiplier,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.02 + Math.random() * 0.02,
    }))

    // Initialize bats (30% of elements)
    const batCount = Math.floor(adjustedDensity * 0.3)
    batsRef.current = Array.from({ length: batCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 20 + Math.random() * 15,
      speed: (1 + Math.random() * 2) * config.speedMultiplier,
      wingFlap: 0,
      flapSpeed: 0.15 + Math.random() * 0.1,
      amplitude: 30 + Math.random() * 20,
      direction: Math.random() > 0.5 ? 1 : -1,
    }))

    // Initialize spiders (4 total - 2 per corner)
    const cornerOffset = 50
    spidersRef.current = [
      // Top left corner
      {
        x: cornerOffset,
        stringLength: 0,
        maxStringLength: 100 + Math.random() * 100,
        bobSpeed: 0.5 + Math.random() * 0.5,
        bobPhase: 0,
        size: 8 + Math.random() * 6,
        descending: true,
      },
      {
        x: cornerOffset + 80,
        stringLength: 0,
        maxStringLength: 80 + Math.random() * 120,
        bobSpeed: 0.4 + Math.random() * 0.6,
        bobPhase: Math.PI,
        size: 8 + Math.random() * 6,
        descending: true,
      },
      // Top right corner
      {
        x: canvas.width - cornerOffset,
        stringLength: 0,
        maxStringLength: 100 + Math.random() * 100,
        bobSpeed: 0.5 + Math.random() * 0.5,
        bobPhase: Math.PI / 2,
        size: 8 + Math.random() * 6,
        descending: true,
      },
      {
        x: canvas.width - cornerOffset - 80,
        stringLength: 0,
        maxStringLength: 80 + Math.random() * 120,
        bobSpeed: 0.4 + Math.random() * 0.6,
        bobPhase: Math.PI * 1.5,
        size: 8 + Math.random() * 6,
        descending: true,
      },
    ]

    const drawPumpkin = (pumpkin: Pumpkin) => {
      const { x, y, size, rotation } = pumpkin

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Pumpkin body
      ctx.fillStyle = '#f97316'
      ctx.beginPath()
      ctx.ellipse(0, 0, size, size * 0.9, 0, 0, Math.PI * 2)
      ctx.fill()

      // Segments
      ctx.strokeStyle = '#ea580c'
      ctx.lineWidth = 2
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath()
        ctx.moveTo(i * (size / 3), -size * 0.9)
        ctx.lineTo(i * (size / 3), size * 0.9)
        ctx.stroke()
      }

      // Stem
      ctx.fillStyle = '#15803d'
      ctx.fillRect(-size * 0.15, -size * 1.1, size * 0.3, size * 0.3)

      // Face (simple jack-o-lantern)
      ctx.fillStyle = '#000000'

      // Eyes
      ctx.beginPath()
      ctx.moveTo(-size * 0.4, -size * 0.3)
      ctx.lineTo(-size * 0.2, -size * 0.1)
      ctx.lineTo(-size * 0.3, -size * 0.1)
      ctx.closePath()
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(size * 0.4, -size * 0.3)
      ctx.lineTo(size * 0.2, -size * 0.1)
      ctx.lineTo(size * 0.3, -size * 0.1)
      ctx.closePath()
      ctx.fill()

      // Mouth
      ctx.beginPath()
      ctx.moveTo(-size * 0.4, size * 0.2)
      for (let i = -3; i <= 3; i++) {
        const px = (i * size) / 6
        const py = size * 0.2 + (i % 2 === 0 ? size * 0.15 : 0)
        ctx.lineTo(px, py)
      }
      ctx.lineTo(-size * 0.4, size * 0.2)
      ctx.fill()

      ctx.restore()
    }

    const drawBat = (bat: Bat) => {
      const { x, y, size, wingFlap } = bat
      const wingAngle = Math.sin(wingFlap) * 0.5

      ctx.save()
      ctx.translate(x, y)
      ctx.fillStyle = '#000000'

      // Body
      ctx.beginPath()
      ctx.ellipse(0, 0, size * 0.3, size * 0.4, 0, 0, Math.PI * 2)
      ctx.fill()

      // Left wing
      ctx.save()
      ctx.rotate(wingAngle)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.quadraticCurveTo(-size * 0.8, -size * 0.3, -size, -size * 0.1)
      ctx.quadraticCurveTo(-size * 0.9, size * 0.2, -size * 0.5, size * 0.3)
      ctx.closePath()
      ctx.fill()
      ctx.restore()

      // Right wing
      ctx.save()
      ctx.rotate(-wingAngle)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.quadraticCurveTo(size * 0.8, -size * 0.3, size, -size * 0.1)
      ctx.quadraticCurveTo(size * 0.9, size * 0.2, size * 0.5, size * 0.3)
      ctx.closePath()
      ctx.fill()
      ctx.restore()

      // Head
      ctx.beginPath()
      ctx.arc(0, -size * 0.3, size * 0.2, 0, Math.PI * 2)
      ctx.fill()

      // Ears
      ctx.beginPath()
      ctx.moveTo(-size * 0.15, -size * 0.4)
      ctx.lineTo(-size * 0.1, -size * 0.6)
      ctx.lineTo(-size * 0.05, -size * 0.4)
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(size * 0.15, -size * 0.4)
      ctx.lineTo(size * 0.1, -size * 0.6)
      ctx.lineTo(size * 0.05, -size * 0.4)
      ctx.fill()

      ctx.restore()
    }

    const drawSpider = (spider: Spider) => {
      const { x, stringLength, size } = spider
      const y = stringLength

      // Draw web string
      ctx.strokeStyle = '#666666'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, y)
      ctx.stroke()

      // Draw spider body
      ctx.save()
      ctx.translate(x, y)
      ctx.fillStyle = '#000000'

      // Abdomen (larger back part)
      ctx.beginPath()
      ctx.ellipse(0, size * 0.3, size * 0.6, size * 0.8, 0, 0, Math.PI * 2)
      ctx.fill()

      // Head (smaller front part)
      ctx.beginPath()
      ctx.ellipse(0, -size * 0.3, size * 0.4, size * 0.5, 0, 0, Math.PI * 2)
      ctx.fill()

      // Legs (4 pairs)
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 1.5
      for (let i = 0; i < 4; i++) {
        const legY = -size * 0.2 + i * (size * 0.3)
        const legLength = size * 1.2
        const legCurve = size * 0.5

        // Left leg
        ctx.beginPath()
        ctx.moveTo(0, legY)
        ctx.quadraticCurveTo(-legCurve, legY - legCurve * 0.5, -legLength, legY + legCurve)
        ctx.stroke()

        // Right leg
        ctx.beginPath()
        ctx.moveTo(0, legY)
        ctx.quadraticCurveTo(legCurve, legY - legCurve * 0.5, legLength, legY + legCurve)
        ctx.stroke()
      }

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Animate pumpkins
      pumpkinsRef.current.forEach((pumpkin) => {
        // Fall down
        pumpkin.y += pumpkin.speed
        pumpkin.rotation += pumpkin.rotationSpeed

        // Sway
        pumpkin.sway += pumpkin.swaySpeed
        pumpkin.x += Math.sin(pumpkin.sway) * 0.5

        // Reset if out of bounds
        if (pumpkin.y > canvas.height + pumpkin.size) {
          pumpkin.y = -pumpkin.size
          pumpkin.x = Math.random() * canvas.width
        }

        drawPumpkin(pumpkin)
      })

      // Animate bats
      batsRef.current.forEach((bat) => {
        // Move horizontally
        bat.x += bat.speed * bat.direction

        // Wave motion
        bat.wingFlap += bat.flapSpeed
        bat.y += Math.sin(bat.wingFlap * 0.5) * 0.5

        // Reset if out of bounds
        if (bat.direction > 0 && bat.x > canvas.width + bat.size * 2) {
          bat.x = -bat.size * 2
          bat.y = Math.random() * canvas.height * 0.7
        } else if (bat.direction < 0 && bat.x < -bat.size * 2) {
          bat.x = canvas.width + bat.size * 2
          bat.y = Math.random() * canvas.height * 0.7
        }

        drawBat(bat)
      })

      // Animate spiders
      spidersRef.current.forEach((spider) => {
        spider.bobPhase += spider.bobSpeed * 0.02

        // Descend and ascend
        if (spider.descending) {
          spider.stringLength += spider.bobSpeed
          if (spider.stringLength >= spider.maxStringLength) {
            spider.descending = false
          }
        } else {
          spider.stringLength -= spider.bobSpeed * 0.5
          if (spider.stringLength <= 0) {
            spider.descending = true
            spider.stringLength = 0
          }
        }

        drawSpider(spider)
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
  }, [density, intensity])

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50" aria-hidden="true" />
  )
}
