import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function for conditionally combining class names with Tailwind CSS merge
 *
 * This function combines the power of clsx for conditional class names
 * with tailwind-merge to handle Tailwind CSS class conflicts intelligently.
 *
 * @param inputs - Class values to be processed
 * @returns Merged and deduplicated class string
 *
 * @example
 * ```tsx
 * // Basic usage
 * cn('px-2 py-1', 'text-white bg-blue-500')
 * // -> 'px-2 py-1 text-white bg-blue-500'
 *
 * // Conditional classes
 * cn('base-class', {
 *   'active-class': isActive,
 *   'disabled-class': isDisabled
 * })
 *
 * // Tailwind conflict resolution
 * cn('px-2 py-1', 'px-4') // -> 'py-1 px-4' (px-2 is overridden)
 * cn('text-red-500', 'text-blue-500') // -> 'text-blue-500' (last wins)
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
