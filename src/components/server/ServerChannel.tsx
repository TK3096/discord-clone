'use client'

import { Edit, Hash, Lock, Mic, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Channel, ChannelType, RoleMember, Server } from '@prisma/client'

import { ActionTooltip } from '@/components/common/ActionTooltip'

import { cn } from '@/lib/utils'

import { ModalType, useModal } from '@/hooks/useModal'

interface ServerChannelProps {
  channel: Channel
  server: Server
  role?: RoleMember
}

const iconMap = {
  [ChannelType.TEXT]: (
    <Hash className='flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400' />
  ),
  [ChannelType.AUDIO]: (
    <Mic className='flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400' />
  ),
}

export const ServerChannel = (props: ServerChannelProps) => {
  const { channel, server, role } = props

  const params = useParams()
  const router = useRouter()

  const { onOpen } = useModal()

  const handleClick = () => {
    router.push(`/main/servers/${params?.serverId}/channels/${channel.id}`)
  }

  const handleAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation()
    onOpen(action, { channel, server })
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'group px-2 py-2 rouned-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
        params?.channelId === channel.id && 'bg-zinc-700/20 dark:bg-zinc-700',
      )}
    >
      {iconMap[channel.type]}
      <p
        className={cn(
          'line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',
          params?.channelId === channel.id &&
            'text-primary dark:text-zinc-200 dark:group-hover:text-white',
        )}
      >
        {channel.name}
      </p>
      {channel.name.toLowerCase() !== 'general' &&
        role !== RoleMember.GUEST && (
          <div className='ml-auto flex items-center gap-x-2'>
            <ActionTooltip label='Edit'>
              <Edit
                onClick={(e) => handleAction(e, 'editChannel')}
                className='hiddne group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition'
              />
            </ActionTooltip>
            <ActionTooltip label='Delete'>
              <Trash
                onClick={(e) => handleAction(e, 'deleteChannel')}
                className='hiddne group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition'
              />
            </ActionTooltip>
          </div>
        )}
      {channel.name.toLowerCase() === 'general' && (
        <Lock className='ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400' />
      )}
    </button>
  )
}
