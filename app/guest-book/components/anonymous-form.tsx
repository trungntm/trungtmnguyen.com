import { RHFTextField } from '@/components/hook-form'

export const AnonymousForm = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <RHFTextField name="name" label="Name *" placeholder="Your name" />
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
