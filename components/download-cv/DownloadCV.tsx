'use client'

import siteMetadata from '@/data/siteMetadata'

const DownloadCV = () => {
  if (!siteMetadata.resume?.url || !siteMetadata.resume?.filename) {
    return null
  }

  return (
    <a
      href={siteMetadata.resume.url}
      download={siteMetadata.resume.filename}
      aria-label="Download CV"
      title="Download my cv"
      className="flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-6 w-6 text-gray-900 dark:text-gray-100"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    </a>
  )
}

export default DownloadCV
