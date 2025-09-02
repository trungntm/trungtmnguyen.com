import { RHFTextField } from '@/components/hook-form'

export const AnonymousForm = () => {
  return (
    <>
      <div className="mb-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💫 <strong>Anonymous Mode:</strong> Leave a message without signing in. Just provide your
          display name and message!
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <RHFTextField name="name" label="Display Name *" placeholder="How should we call you?" />
        <RHFTextField name="email" label="Email (optional)" placeholder="your@email.com" />
      </div>
      <RHFTextField
        name="website"
        label="Website (optional)"
        placeholder="https://yourwebsite.com"
        className={'w-full'}
      />
    </>
  )
}
