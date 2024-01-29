'use client'

import qs from 'query-string'
import * as z from 'zod'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Server, ChannelType } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useModal } from '@/hooks/useModal'

import { APIResponse } from '@/types'

const schema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Channel name is required.',
    })
    .refine((name) => name.toLowerCase() !== 'general', {
      message: "Channel name cannot be 'general'.",
    }),
  type: z.nativeEnum(ChannelType),
})

export const CreateChannelModal = () => {
  const params = useParams()
  const router = useRouter()

  const { onClose, type, open, data } = useModal()
  const { channelType } = data

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      type: channelType || ChannelType.TEXT,
    },
  })

  const isOpen = open && type === 'createChannel'
  const loading = form.formState.isSubmitting

  const handleSubmitForm = async (values: z.infer<typeof schema>) => {
    try {
      const url = qs.stringifyUrl({
        url: '/api/channels',
        query: {
          serverId: params?.serverId,
        },
      })

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const resBody = (await response.json()) as unknown as APIResponse<Server>

      if (response.ok && resBody.success) {
        form.reset()
        onClose()
        router.refresh()
      } else {
        console.log(resBody)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  useEffect(() => {
    if (channelType) {
      form.setValue('type', channelType)
    }
  }, [channelType, form])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Create Channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitForm)}
            className='space-y-8'
          >
            <div className='space-y-8 px-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                      Channel name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        className='bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                        placeholder='Enter channel name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Type</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='bg-zinc-300/50 border-0 focus:ring-0 focus-visible:ring-offset-0 capitalize outline-none'>
                          <SelectValue placeholder='Select a channel type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className='capitalize'
                          >
                            {type.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className='bg-gray-100 px-6 py-4'>
              <Button variant='primary' disabled={loading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
