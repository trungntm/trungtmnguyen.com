'use client'

import { useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import GeneralLayout from '@/layouts/GeneralLayout'
import { SparklesText } from '@/components/text-animation/sparkles-text'
import { AnonymousForm } from './components/anonymous-form'
import { CommentForm } from './components/comment-form'
import { TabSwitch } from '@/components/TabSwitch'
import { FormProvider } from '@/components/hook-form'
import { SignInForm } from './components/sign-in-form'
import { LoadingButton } from '@/components/button/LoadingButton'
import { createClient } from '@/utils/supabase/client'
import dayjs from 'dayjs'

interface GuestBookEntry {
  id?: string
  name: string
  message: string
  created_at?: Date
  email?: string
  user_id?: string
  website?: string
  is_anonymous?: boolean
}

interface StoredEntry {
  id: string
  name: string
  message: string
  created_at?: string
  email?: string
  website?: string
}

export default function GuestBook() {
  const guestBookSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').optional(),
        website: Yup.string().url('Invalid URL').optional(),
        message: Yup.string().min(2, 'Message is too short').required('Message is required'),
      }),
    []
  )

  const defaultValues = {
    name: '',
    email: '',
    website: '',
    message: '',
  }

  const methods = useForm({
    resolver: yupResolver(guestBookSchema),
    defaultValues,
    mode: 'onChange', // This will validate on change
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const [entries, setEntries] = useState<GuestBookEntry[]>([])
  const [activeAuthMode, setActiveAuthMode] = useState<'signin' | 'anonymous'>('anonymous')

  // Load entries from localStorage on component mount
  useEffect(() => {
    const supabase = createClient()
    async function getComments() {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching comments:', error)
        return []
      }

      return data as GuestBookEntry[]
    }

    getComments().then((data) => {
      if (data && data.length > 0) {
        try {
          setEntries(
            data.map((entry: GuestBookEntry) => ({
              ...entry,
              created_at: entry.created_at ? new Date(entry.created_at) : new Date(),
            }))
          )
        } catch (error) {
          console.error('Error loading guestbook entries:', error)
        }
      }
    })

    // subscribe to realtime inserts
    const channel = supabase
      .channel('guestbook-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'guestbook' },
        (payload) => {
          setEntries((prev) => [
            {
              ...payload.new,
              created_at: payload.new.created_at ? new Date(payload.new.created_at) : new Date(),
            } as GuestBookEntry,
            ...prev,
          ])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const onHandleSubmit = async (formData) => {
    if (!formData.name?.trim() || !formData.message?.trim()) {
      return
    }

    const supabase = await createClient()
    let user

    if (activeAuthMode === 'anonymous') {
      const { data, error } = await supabase.auth.signInAnonymously({
        options: {
          data: {
            email: formData.email?.trim() || undefined,
            name: formData.name.trim(),
          },
        },
      })

      user = data?.user
    }

    const newEntry: GuestBookEntry = {
      name: formData.name.trim(),
      message: formData.message.trim(),
      email: formData.email?.trim() || undefined,
      website: formData.website?.trim() || undefined,
      user_id: user?.id || undefined,
      is_anonymous: activeAuthMode === 'anonymous',
    }

    await supabase.from('guestbook').insert(newEntry)

    methods.reset()
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) {
      date = new Date()
    }
    return dayjs(date).format('MMMM D, YYYY h:mm A')
  }

  return (
    <GeneralLayout
      title="Guest Book"
      description="Leave a message and share your thoughts. I'd love to hear from you!"
      maxWidth="default"
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 p-6 dark:from-blue-900/20 dark:to-indigo-900/20">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100">
            <SparklesText>Welcome to my Guest Book!</SparklesText>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Thank you for visiting! I'd love to hear your thoughts, feedback, or just say hello.
            Your message will be displayed below for others to see.
          </p>
        </div>

        {/* Guest Book Form */}
        <FormProvider methods={methods} onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Leave a Message
              </h3>
              <TabSwitch defaultTab="anonymous" onTabChange={setActiveAuthMode} className="ml-4" />
            </div>

            {activeAuthMode === 'anonymous' ? <AnonymousForm /> : <SignInForm />}
            <CommentForm />

            <div className="mt-6">
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                loadingText="Submitting..."
                fullWidth
                size="md"
                onClick={() => console.log('Button clicked!')}
              >
                Sign Guest Book
              </LoadingButton>
            </div>
          </div>
        </FormProvider>
        {/* Guest Book Entries */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Messages ({entries.length})
          </h3>

          {entries.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
              <p className="text-gray-500 dark:text-gray-400">
                No messages yet. Be the first to sign the guest book!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                          {entry.website ? (
                            <a
                              href={
                                entry.website.startsWith('http')
                                  ? entry.website
                                  : `https://${entry.website}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              {entry.name}
                            </a>
                          ) : (
                            entry.name
                          )}
                        </h4>
                        <span className="pt-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(entry.created_at)}
                        </span>
                      </div>
                      <p className="mt-2 whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                        {entry.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </GeneralLayout>
  )
}
