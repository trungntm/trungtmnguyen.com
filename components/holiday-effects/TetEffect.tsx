'use client'

/**
 * TET Effect Component
 * Plum blossom branches from corners with falling petals for Vietnamese Lunar New Year
 */

import { useEffect, useRef } from 'react'
import { EffectIntensity } from '@/utils/holidays'

interface Petal {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  speed: number
  sway: number
  swaySpeed: number
  color: string
  opacity: number
}

interface RedEnvelope {
  x: number
  y: number
  width: number
  height: number
  rotation: number
  rotationSpeed: number
  speed: number
  sway: number
  swaySpeed: number
  opacity: number
}

interface GoldCoin {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  speed: number
  sway: number
  swaySpeed: number
  opacity: number
  spin: number
}

interface TetEffectProps {
  intensity?: EffectIntensity
  colors?: string[]
}

export default function TetEffect({
  intensity = 'medium',
  colors = [
    '#ec4899',
    '#f472b6',
    '#fb7185',
    '#fda4af',
    '#fecdd3',
    '#ef4444',
    '#dc2626',
    '#f87171',
    '#fca5a5',
  ],
}: TetEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const petalsRef = useRef<Petal[]>([])
  const envelopesRef = useRef<RedEnvelope[]>([])
  const coinsRef = useRef<GoldCoin[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const branchSwayRef = useRef<number>(0)

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
      low: { petalCount: 10, envelopeCount: 3, coinCount: 4, branchSize: 0.8 },
      medium: { petalCount: 15, envelopeCount: 5, coinCount: 6, branchSize: 1 },
      high: { petalCount: 25, envelopeCount: 8, coinCount: 10, branchSize: 1.2 },
    }

    const config = intensityConfig[intensity]

    // Initialize petals
    petalsRef.current = Array.from({ length: config.petalCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: 5 + Math.random() * 6,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      speed: 0.3 + Math.random() * 0.8,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.01 + Math.random() * 0.015,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.7 + Math.random() * 0.3,
    }))

    // Initialize red envelopes
    envelopesRef.current = Array.from({ length: config.envelopeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      width: 15 + Math.random() * 10,
      height: 22 + Math.random() * 13,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      speed: 0.4 + Math.random() * 0.6,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.008 + Math.random() * 0.012,
      opacity: 0.8 + Math.random() * 0.2,
    }))

    // Initialize gold coins
    coinsRef.current = Array.from({ length: config.coinCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: 10 + Math.random() * 6,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      speed: 0.5 + Math.random() * 0.7,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.01 + Math.random() * 0.015,
      opacity: 0.9 + Math.random() * 0.1,
      spin: Math.random() * Math.PI * 2,
    }))

    const drawBranch = (
      x: number,
      y: number,
      length: number,
      angle: number,
      depth: number,
      sway: number,
      blossomType: 'plum' | 'peach' = 'plum'
    ) => {
      if (depth === 0 || length < 2) return

      const swayEffect = Math.sin(sway + depth * 0.5) * 0.008
      const adjustedAngle = angle + swayEffect

      const endX = x + length * Math.cos(adjustedAngle)
      const endY = y + length * Math.sin(adjustedAngle)

      // Draw branch
      ctx.strokeStyle = '#4a2511'
      ctx.lineWidth = Math.max(1, depth)
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(endX, endY)
      ctx.stroke()

      // Draw blossoms on branch
      if (depth <= 2 && Math.random() > 0.4) {
        const blossomX = x + length * 0.6 * Math.cos(adjustedAngle)
        const blossomY = y + length * 0.6 * Math.sin(adjustedAngle)
        const blossomColor = blossomType === 'plum' ? colors[0] : '#fda4af' // yellow for plum, pink for peach
        drawBlossom(blossomX, blossomY, 5 + Math.random() * 4, blossomColor, blossomType)
      }

      // Recursive branches
      const newLength = length * (0.65 + Math.random() * 0.1)
      const angleVariation = 0.3 + Math.random() * 0.4

      drawBranch(
        endX,
        endY,
        newLength,
        adjustedAngle - angleVariation,
        depth - 1,
        sway,
        blossomType
      )
      drawBranch(
        endX,
        endY,
        newLength,
        adjustedAngle + angleVariation,
        depth - 1,
        sway,
        blossomType
      )
    }

    const drawBlossom = (
      x: number,
      y: number,
      size: number,
      color: string,
      type: 'plum' | 'peach' = 'plum'
    ) => {
      ctx.save()
      ctx.translate(x, y)

      // Draw petals
      const petalCount = type === 'plum' ? 5 : 5
      for (let i = 0; i < petalCount; i++) {
        const angle = (Math.PI * 2 * i) / petalCount - Math.PI / 2
        ctx.save()
        ctx.rotate(angle)

        // Petal
        ctx.fillStyle = color
        ctx.beginPath()
        if (type === 'peach') {
          // Peach petals are more rounded and pink
          ctx.ellipse(size * 0.5, 0, size * 0.65, size * 0.5, 0, 0, Math.PI * 2)
        } else {
          // Plum petals are more elongated and yellow
          ctx.ellipse(size * 0.6, 0, size * 0.7, size * 0.45, 0, 0, Math.PI * 2)
        }
        ctx.fill()

        // Petal edge highlight
        ctx.strokeStyle = type === 'peach' ? '#fda4af' : '#facc15'
        ctx.lineWidth = 0.5
        ctx.stroke()

        ctx.restore()
      }

      // Blossom center with stamens
      ctx.fillStyle = type === 'peach' ? '#fecdd3' : '#eab308'
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2)
      ctx.fill()

      // Small stamens
      ctx.strokeStyle = type === 'peach' ? '#fb7185' : '#ca8a04'
      ctx.lineWidth = 1
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(Math.cos(angle) * size * 0.2, Math.sin(angle) * size * 0.2)
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawPetal = (petal: Petal) => {
      ctx.save()
      ctx.translate(petal.x, petal.y)
      ctx.rotate(petal.rotation)
      ctx.globalAlpha = petal.opacity

      // Petal shape
      ctx.fillStyle = petal.color
      ctx.beginPath()
      ctx.ellipse(0, 0, petal.size, petal.size * 0.6, 0, 0, Math.PI * 3)
      ctx.fill()

      // Petal vein
      ctx.strokeStyle = 'rgba(220, 38, 38, 0.3)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(0, -petal.size * 0.6)
      ctx.lineTo(0, petal.size * 0.6)
      ctx.stroke()

      ctx.restore()
    }

    const drawRedEnvelope = (envelope: RedEnvelope) => {
      ctx.save()
      ctx.translate(envelope.x, envelope.y)
      ctx.rotate(envelope.rotation)
      ctx.globalAlpha = envelope.opacity

      // Main envelope body
      ctx.fillStyle = '#dc2626'
      ctx.fillRect(-envelope.width / 2, -envelope.height / 2, envelope.width, envelope.height)

      // Gold border
      ctx.strokeStyle = '#fbbf24'
      ctx.lineWidth = 2
      ctx.strokeRect(-envelope.width / 2, -envelope.height / 2, envelope.width, envelope.height)

      // Gold decorative pattern
      ctx.fillStyle = '#fbbf24'
      const patternSize = envelope.width * 0.4
      ctx.beginPath()
      ctx.arc(0, 0, patternSize / 2, 0, Math.PI * 2)
      ctx.fill()

      // Chinese character "福" (luck) or decoration
      ctx.fillStyle = '#dc2626'
      ctx.font = `bold ${patternSize * 0.7}px serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('福', 0, 0)

      // Top flap shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.beginPath()
      ctx.moveTo(-envelope.width / 2, -envelope.height / 2)
      ctx.lineTo(0, -envelope.height / 2 + envelope.height * 0.2)
      ctx.lineTo(envelope.width / 2, -envelope.height / 2)
      ctx.closePath()
      ctx.fill()

      ctx.restore()
    }

    const drawGoldCoin = (coin: GoldCoin) => {
      ctx.save()
      ctx.translate(coin.x, coin.y)
      ctx.rotate(coin.rotation)
      ctx.globalAlpha = coin.opacity

      // Create 3D coin effect with perspective
      const perspective = Math.abs(Math.sin(coin.spin))
      const coinWidth = coin.size * (0.3 + perspective * 0.7)

      // Outer gold circle
      ctx.fillStyle = '#fbbf24'
      ctx.beginPath()
      ctx.ellipse(0, 0, coinWidth, coin.size, 0, 0, Math.PI * 2)
      ctx.fill()

      // Inner circle border
      ctx.strokeStyle = '#f59e0b'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.ellipse(0, 0, coinWidth * 0.8, coin.size * 0.8, 0, 0, Math.PI * 2)
      ctx.stroke()

      // Center symbol or pattern
      if (perspective > 0.3) {
        ctx.fillStyle = '#d97706'
        ctx.font = `bold ${coin.size * 0.8}px serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.scale(perspective, 1)
        ctx.fillText('$', 0, 0)
      }

      // Shine effect
      const gradient = ctx.createRadialGradient(
        -coinWidth * 0.3,
        -coin.size * 0.3,
        0,
        0,
        0,
        coin.size
      )
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)')
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.ellipse(0, 0, coinWidth, coin.size, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      branchSwayRef.current += 0

      // Animate petals
      petalsRef.current.forEach((petal) => {
        // Fall down
        petal.y += petal.speed
        petal.rotation += petal.rotationSpeed

        // Sway side to side
        petal.sway += petal.swaySpeed
        petal.x += Math.sin(petal.sway) * 0.5

        // Reset if out of bounds
        if (petal.y > canvas.height + petal.size) {
          petal.y = -petal.size
          petal.x = Math.random() * canvas.width
          petal.color = colors[Math.floor(Math.random() * colors.length)]
        }

        drawPetal(petal)
      })

      // Animate red envelopes
      envelopesRef.current.forEach((envelope) => {
        // Fall down
        envelope.y += envelope.speed
        envelope.rotation += envelope.rotationSpeed

        // Sway side to side
        envelope.sway += envelope.swaySpeed
        envelope.x += Math.sin(envelope.sway) * 0.8

        // Reset if out of bounds
        if (envelope.y > canvas.height + envelope.height) {
          envelope.y = -envelope.height
          envelope.x = Math.random() * canvas.width
          envelope.width = 15 + Math.random() * 10
          envelope.height = 22 + Math.random() * 13
        }

        drawRedEnvelope(envelope)
      })

      // Animate gold coins
      coinsRef.current.forEach((coin) => {
        // Fall down
        coin.y += coin.speed
        coin.rotation += coin.rotationSpeed
        coin.spin += 0.05 // Spinning effect for 3D appearance

        // Sway side to side
        coin.sway += coin.swaySpeed
        coin.x += Math.sin(coin.sway) * 0.7

        // Reset if out of bounds
        if (coin.y > canvas.height + coin.size) {
          coin.y = -coin.size
          coin.x = Math.random() * canvas.width
          coin.size = 10 + Math.random() * 6
          coin.spin = Math.random() * Math.PI * 2
        }

        drawGoldCoin(coin)
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
  }, [intensity, colors])

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50" aria-hidden="true" />
  )
}
