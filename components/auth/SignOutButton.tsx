'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { LoadingButton } from '@/components/button/LoadingButton'

interface SignOutButtonProps {
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}

export function SignOutButton({
  className = '',
  variant = 'ghost',
  size = 'sm',
  children = 'Sign Out',
}: SignOutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LoadingButton
      onClick={handleSignOut}
      loading={isLoading}
      loadingText="Signing out..."
      className={className}
      variant={variant}
      size={size}
    >
      {children}
    </LoadingButton>
  )
}
