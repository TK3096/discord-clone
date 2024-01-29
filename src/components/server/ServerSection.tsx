'use client'

import { ChannelType, RoleMember } from '@prisma/client'
import { Plus } from 'lucide-react'

import { ServerWithMemberWithProfiles } from '@/types'

import { ActionTooltip } from '@/components/common/ActionTooltip'

import { useModal } from '@/hooks/useModal'

interface ServerSectionProps {
  label: string
  role?: RoleMember
  channelType?: ChannelType
  server?: ServerWithMemberWithProfiles
}

export const ServerSection = (props: ServerSectionProps) => {
  const { label, role, channelType, server } = props

  const { onOpen } = useModal()

  return (
    <div className='flex items-center justify-between py-2'>
      <p className='text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400'>
        {label}
      </p>
      {role !== RoleMember.GUEST && (
        <ActionTooltip label='Create Channel' side='top'>
          <button
            className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition'
            onClick={() => onOpen('createChannel', { channelType })}
          >
            <Plus className='h-4 w-4' />
          </button>
        </ActionTooltip>
      )}
    </div>
  )
}
