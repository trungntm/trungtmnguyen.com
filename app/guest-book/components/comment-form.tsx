import { RHFTextArea, RHFTextField } from '@/components/hook-form'

export const CommentForm = () => {
  return (
    <>
      <RHFTextArea
        name="message"
        label="Comment *"
        required
        placeholder="Your comment"
        className={'w-full'}
      />
    </>
  )
}
