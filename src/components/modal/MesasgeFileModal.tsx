'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import qs from 'query-string'

import { APIResponse } from '@/types'

import { useModal } from '@/hooks/useModal'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { FileUpload } from '@/components/common/FileUpload'

export const schema = z.object({
  fileUrl: z.string().min(1, {
    message: 'Attachment is required.',
  }),
})

export const MessageFileModal = () => {
  const { onClose, open, type, data } = useModal()
  const { apiUrl, query } = data

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fileUrl: '',
    },
  })

  const isOpen = open && type === 'messageFile'
  const loading = form.formState.isSubmitting

  const handleSubmitForm = async (values: z.infer<typeof schema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query: query,
      })

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, content: values.fileUrl }),
      })

      if (response.ok) {
        handleClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Add an attachment
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Send a file as a message.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitForm)}
            className='space-y-8'
          >
            <div className='space-y-8 px-6'>
              <FormField
                control={form.control}
                name='fileUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='bg-gray-100 px-6 py-4'>
              <Button
                variant='primary'
                type='submit'
                disabled={loading || !form.formState.isDirty}
              >
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
