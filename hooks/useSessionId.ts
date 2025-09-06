'use client'

import { useState, useEffect } from 'react'

// Generate a unique session ID for anonymous users
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function useSessionId() {
  const [sessionId, setSessionId] = useState<string>('')

  useEffect(() => {
    // Check if we already have a session ID in localStorage
    let storedSessionId = localStorage.getItem('guestbook_session_id')

    if (!storedSessionId) {
      // Generate new session ID for anonymous users
      storedSessionId = generateSessionId()
      localStorage.setItem('guestbook_session_id', storedSessionId)
    }

    setSessionId(storedSessionId)
  }, [])

  return sessionId
}
