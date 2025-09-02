import { Description, Field, Label, Textarea } from '@headlessui/react'
import { Controller, useFormContext } from 'react-hook-form'

interface RHFTextAreaProps {
  name: string
  label: string
  className?: string
  placeholder?: string
  defaultValue?: string
  required?: boolean
  disabled?: boolean
  rows?: number
  [key: string]: unknown
}

export function RHFTextArea({
  name,
  label,
  className = '',
  placeholder,
  defaultValue = '',
  rows = 4,
  ...others
}: RHFTextAreaProps) {
  const { control } = useFormContext()

  return (
    <div className="space-y-1">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Label>{label}</Label>
            <Textarea
              {...field}
              invalid={!!error}
              rows={rows}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm transition-colors ${
                error
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-600'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600'
              } resize-vertical focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-100 ${className}`.trim()}
              placeholder={placeholder}
              {...others}
            />
            {error && (
              <Description className="text-sm text-red-600 dark:text-red-400">
                {error.message}
              </Description>
            )}
          </Field>
        )}
      />
    </div>
  )
}
