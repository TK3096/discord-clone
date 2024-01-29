'use client'

import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
import { Input } from '@/components/ui/input'
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { FileUpload } from '@/components/common/FileUpload'

export const schema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image is required.',
  }),
})

interface CreateServerModalProps {
  init?: boolean
}

export const CreateServerModal = (props: CreateServerModalProps) => {
  const { init } = props

  const router = useRouter()

  const { onClose, open, type } = useModal()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  const isOpen = (open && type === 'createServer') || init
  const loading = form.formState.isSubmitting

  const handleSubmitForm = async (values: z.infer<typeof schema>) => {
    try {
      const response = await fetch('/api/servers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const resBody = (await response.json()) as unknown as APIResponse<string>

      if (response.ok && resBody.success) {
        router.refresh()
        handleClose()
      } else {
        console.log(resBody)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    if (!init) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Customize your server
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className='text-center text-zinc-500'>
          Give your server a personality with a name and an image. You can
          always change it later.
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitForm)}
            className='space-y-8'
          >
            <div className='space-y-8 px-6'>
              <FormField
                control={form.control}
                name='imageUrl'
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

              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70'>
                      Server name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        className='bg-zinc-300/50 border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                        placeholder='Enter server name'
                        {...field}
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
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
