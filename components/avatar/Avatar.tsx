'use client'

import { useState } from 'react'
import Image from 'next/image'

interface AvatarProps {
  /** User's GitHub avatar URL */
  avatarUrl?: string
  /** User's full name for fallback display */
  fullName?: string
  /** Whether the user is anonymous */
  isAnonymous?: boolean
  /** Size of the avatar in pixels */
  size?: number
  /** Additional CSS classes */
  className?: string
}

export function Avatar({
  avatarUrl,
  fullName = 'Anonymous',
  isAnonymous = false,
  size = 40,
  className = '',
}: AvatarProps) {
  const [imageError, setImageError] = useState(false)

  // Get the first letter of the full name for fallback
  const getInitials = (name: string) => {
    if (!name || name.trim() === '') return 'A'
    return name.trim().charAt(0).toUpperCase()
  }

  // Generate a consistent color based on the name
  const getAvatarColor = (name: string) => {
    if (!name) return 'bg-gray-500'

    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-amber-500',
      'bg-yellow-500',
      'bg-lime-500',
      'bg-green-500',
      'bg-emerald-500',
      'bg-teal-500',
      'bg-cyan-500',
      'bg-sky-500',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-violet-500',
      'bg-purple-500',
      'bg-fuchsia-500',
      'bg-pink-500',
    ]

    // Simple hash function to get consistent color
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    return colors[Math.abs(hash) % colors.length]
  }

  const showInitials = isAnonymous || !avatarUrl || imageError

  return (
    <div
      className={`relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      {showInitials ? (
        // Show initials for anonymous users or when image fails to load
        <div
          className={`flex h-full w-full items-center justify-center font-semibold text-white ${getAvatarColor(fullName)}`}
          style={{ fontSize: size * 0.4 }}
        >
          {getInitials(fullName)}
        </div>
      ) : (
        // Show GitHub profile image for authenticated users
        <Image
          src={avatarUrl}
          alt={`${fullName}'s avatar`}
          width={size}
          height={size}
          className="rounded-full object-cover"
          onError={() => setImageError(true)}
          unoptimized // GitHub avatars are already optimized
        />
      )}
    </div>
  )
}
