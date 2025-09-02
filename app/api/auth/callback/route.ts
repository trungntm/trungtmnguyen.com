import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/guest-book'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Successful authentication - redirect to the intended page
      const redirectUrl = next.startsWith('/') ? next : '/guest-book'
      return NextResponse.redirect(new URL(redirectUrl, requestUrl.origin))
    }
  }

  // Authentication failed - redirect to guest book with error
  return NextResponse.redirect(new URL('/guest-book?error=auth_failed', requestUrl.origin))
}
