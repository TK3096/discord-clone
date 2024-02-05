'use client'

import { useEffect, useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { Member, Profile, RoleMember } from '@prisma/client'
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from 'lucide-react'
import qs from 'query-string'
import { useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { UserAvatar } from '@/components/common/UserAvatar'
import { ActionTooltip } from '@/components/common/ActionTooltip'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useModal } from '@/hooks/useModal'

import { cn } from '@/lib/utils'

interface ChatItemProps {
  id: string
  content: string
  member: Member & {
    profile: Profile
  }
  timestamp: string
  fileUrl: string | null
  deleted: boolean
  currentMember: Member
  isUpdated: boolean
  socketUrl: string
  socketQuery: Record<string, string>
}

const roleIconMap = {
  [RoleMember.GUEST]: null,
  [RoleMember.MODERATOR]: (
    <ShieldCheck className='h-4 w-4 ml-2 text-indigo-500' />
  ),
  [RoleMember.ADMIN]: <ShieldAlert className='h-4 w-4 ml-2 text-rose-500' />,
}

const schema = z.object({
  content: z.string().min(1, {
    message: 'Content is required.',
  }),
})

export const ChatItem = (props: ChatItemProps) => {
  const {
    id,
    content,
    member,
    timestamp,
    fileUrl,
    deleted,
    currentMember,
    isUpdated,
    socketQuery,
    socketUrl,
  } = props

  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)

  const { onOpen } = useModal()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      content: '',
    },
  })

  const loading = form.formState.isSubmitting

  const isAdmin = currentMember.role === RoleMember.ADMIN
  const isModerator = currentMember.role === RoleMember.MODERATOR
  const isOwner = currentMember.id === member.id
  const canDeletedMessage = !deleted && (isAdmin || isModerator || isOwner)
  const canEditMessage = !deleted && isOwner && !fileUrl
  const isPdf = fileUrl?.indexOf('.pdf') !== -1 && fileUrl
  const isImage = !isPdf && fileUrl

  const handleMemberClick = () => {
    if (member.id === currentMember.id) {
      return
    }

    router.push(`/main/conversations/${member.id}`)
  }

  const handleSubmitEdit = async (values: z.infer<typeof schema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      })

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        form.reset()
        setIsEditing(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = () => {
    onOpen('deleteMessage', {
      apiUrl: `${socketUrl}/${id}`,
      query: socketQuery,
    })
  }

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEditing(false)
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  useEffect(() => {
    form.reset({
      content,
    })
  }, [content, form])

  return (
    <div className='relative group flex items-center hover:bg-black/5 p-4 transition w-full'>
      <div className='group flex gap-x-2 items-start w-full'>
        <div
          className='cursor-pointer hover:drop-shadow-md transition'
          onClick={handleMemberClick}
        >
          <UserAvatar src={member.profile.imageUrl} />
        </div>
        <div className='flex flex-col w-full'>
          <div className='flex items-center gap-x-2'>
            <div className='flex items-center'>
              <p
                className='font-semibold text-sm hover:underline cursor-pointer'
                onClick={handleMemberClick}
              >
                {member.profile.name}
              </p>
              <ActionTooltip label={member.role}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className='text-xs text-zinc-500 dark:text-zinc-400'>
              {timestamp}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-49 2-48'
            >
              <Image src={isImage} fill alt={content} />
            </a>
          )}
          {isPdf && (
            <div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10'>
              <FileIcon className='h-10 w-10 fill-indigo-200 stroke-indigo-400' />
              <a
                href={fileUrl}
                target='_blank'
                rel='noopner noreferrer'
                className='ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline'
              >
                PDF File
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={cn(
                'text-sm text-zinc-600 dark:text-zinc-300',
                deleted &&
                  'italic text-zinc-500 dark:text-zinc-400 text-xs mt-1',
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span className='text-[10px] mx-2 text-zinc-500 dark:text-zinc-400'>
                  (edited)
                </span>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                className='flex items-center w-full gap-x-2 pt-2'
                onSubmit={form.handleSubmit(handleSubmitEdit)}
              >
                <FormField
                  control={form.control}
                  name='content'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormControl>
                        <div className='relative w-full'>
                          <Input
                            disabled={loading}
                            className='p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200'
                            placeholder='Edited message'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  size='sm'
                  variant='primary'
                  disabled={loading}
                >
                  Save
                </Button>
              </form>
              <span className='text-[10px] mt-1 text-zinc-400'>
                Press escape to cancel, enter to save
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDeletedMessage && (
        <div className='hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm'>
          {canEditMessage && (
            <ActionTooltip label='Edit'>
              <Edit
                className='cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition'
                onClick={() => setIsEditing(true)}
              />
            </ActionTooltip>
          )}
          <ActionTooltip label='Delete'>
            <Trash
              className='cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition'
              onClick={handleDelete}
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  )
}
