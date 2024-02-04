'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import qs from 'query-string'
import { useRouter } from 'next/navigation'

import { Form, FormField, FormItem, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EmojiPicker } from './EmojiPicker'

const schema = z.object({
  content: z.string().min(1),
})

interface ChatInputProps {
  type: 'channel' | 'conversation'
  name: string
  apiUrl: string
  query: Record<string, any>
}

export const ChatInput = (props: ChatInputProps) => {
  const { type, name, apiUrl, query } = props

  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      content: '',
    },
  })

  const loading = form.formState.isSubmitting

  const handleSubmitForm = async (values: z.infer<typeof schema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      })

      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      form.reset()
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)}>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative p-5 pb-6'>
                  <button
                    type='button'
                    className='absolute top-8 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center'
                  >
                    <Plus className='text-white dark:text-[#313338]' />
                  </button>
                  <Input
                    disabled={loading}
                    className='px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200'
                    placeholder={`Message ${
                      type === 'conversation' ? name : '#' + name
                    }`}
                    {...field}
                  />
                  <div className='absolute top-8 right-8'>
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
