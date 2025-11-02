/**
 * Sanitize a URL to prevent XSS attacks
 * @param url - The URL to sanitize
 * @returns The sanitized URL or '#' if invalid
 */
export function sanitizeUrl(url: string | undefined): string {
  if (!url) return '#'

  const trimmedUrl = url.trim()

  // Check for javascript: protocol and other dangerous protocols
  const dangerousProtocols = /^(javascript|data|vbscript|file|about):/i
  if (dangerousProtocols.test(trimmedUrl)) {
    console.warn(`Blocked potentially dangerous URL: ${trimmedUrl}`)
    return '#'
  }

  // Allow relative URLs, hash links, and safe protocols
  const safeUrlPattern = /^(https?:\/\/|mailto:|tel:|sms:|\/|#)/i
  if (!safeUrlPattern.test(trimmedUrl)) {
    // If it doesn't start with a safe protocol or relative path, treat as relative
    return trimmedUrl.startsWith('/') ? trimmedUrl : `/${trimmedUrl}`
  }

  return trimmedUrl
}

/**
 * Check if a URL is safe to use
 * @param url - The URL to check
 * @returns true if the URL is safe, false otherwise
 */
export function isSafeUrl(url: string | undefined): boolean {
  if (!url) return false

  const trimmedUrl = url.trim()
  const dangerousProtocols = /^(javascript|data|vbscript|file|about):/i

  return !dangerousProtocols.test(trimmedUrl)
}
