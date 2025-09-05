'use client'

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeAuthMode, setActiveAuthMode] = useState<'signin' | 'anonymous'>('signin')
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)

      // Automatically update activeAuthMode when user signs in
      if (session?.user) {
        setActiveAuthMode('signin')
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const signOut = async () => {
    await supabase.auth.signOut()
    // Reset to anonymous mode when signing out
    setActiveAuthMode('anonymous')
  }

  return {
    user,
    loading,
    signOut,
    isAuthenticated: !!user,
    activeAuthMode,
    setActiveAuthMode,
  }
}
