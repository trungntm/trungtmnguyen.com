import { FieldValues, FormProvider as Form, UseFormReturn } from 'react-hook-form'

interface FormProviderProps {
  children: React.ReactNode
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: UseFormReturn<any>
}

export default function FormProvider({ children, onSubmit, methods }: FormProviderProps) {
  return (
    <Form {...methods}>
      <form className="space-y-4" onSubmit={onSubmit}>
        {children}
      </form>
    </Form>
  )
}
