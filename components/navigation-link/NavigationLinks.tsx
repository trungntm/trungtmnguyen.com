import Link from '@/components/custom-link'

interface NavigationItem {
  path: string
  title: string
}

interface NavigationLinksProps {
  prev?: NavigationItem | null
  next?: NavigationItem | null
  prevLabel?: string
  nextLabel?: string
}

export default function NavigationLinks({
  prev,
  next,
  prevLabel = 'Previous Article',
  nextLabel = 'Next Article',
}: NavigationLinksProps) {
  if (!prev && !next) return null

  return (
    <div className="flex justify-between gap-4 py-4 xl:block xl:space-y-8 xl:py-8">
      {prev && (
        <div className="w-full sm:w-[48%] xl:w-auto">
          <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
            {prevLabel}
          </h2>
          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
            <Link href={`/${prev.path}`}>{prev.title}</Link>
          </div>
        </div>
      )}
      {next && (
        <div className="w-full sm:w-[48%] xl:w-auto">
          <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
            {nextLabel}
          </h2>
          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
            <Link href={`/${next.path}`}>{next.title}</Link>
          </div>
        </div>
      )}
    </div>
  )
}
