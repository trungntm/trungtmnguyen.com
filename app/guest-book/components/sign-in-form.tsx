import { GitHubSignInButton } from '@/components/auth/GitHubSignInButton'

export const SignInForm = () => {
  return (
    <div className="space-y-4">
      <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Sign In Required
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              <p>
                Please sign in with your preferred authentication method to leave a message. This
                helps us maintain the quality of our guest book.
              </p>
            </div>
            <div className="mt-4 space-y-2">
              <GitHubSignInButton redirectTo="/guest-book" />
              <button
                type="button"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                disabled
              >
                Sign In with Google (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
