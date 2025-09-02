import { Description, Field, Input, Label } from '@headlessui/react'
import { Controller, useFormContext } from 'react-hook-form'

interface RHFTextFieldProps {
  name: string
  label: string
  className?: string
  placeholder?: string
  defaultValue?: string
  type?: 'text' | 'email' | 'password' | 'url' | 'tel'
  disabled?: boolean
  [key: string]: unknown
}

export function RHFTextField({
  name,
  label = '',
  className = '',
  placeholder,
  defaultValue = '',
  type = 'text',
  ...others
}: RHFTextFieldProps) {
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
            <Input
              {...field}
              name={name}
              type={type}
              invalid={!!error}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm transition-colors ${
                error
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-600'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600'
              } focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-100 ${className}`.trim()}
              placeholder={placeholder}
              {...others}
              data-focus
              data-hover
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
