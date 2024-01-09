'use client'

import { useRouter, usePathname } from 'next/navigation'

import { MessagesSquareIcon } from 'lucide-react'

import { ActionTooltip } from '@/components/common/action-tooltip'

import { cn } from '@/lib/utils'

const path = '/conversations'

export const ConversationBtn = () => {
  const router = useRouter()
  const pathname = usePathname()

  const onClick = () => {
    router.push(`${path}`)
  }

  return (
    <div>
      <ActionTooltip label='direct messages' side='right' align='center'>
        <button className='group relative flex items-center' onClick={onClick}>
          <div
            className={cn(
              'absolute left-0 bg-primary w-[4px] rounded-r-full h-0 transition-all',
              pathname === path && 'h-[38px]',
              pathname !== path && 'group-hover:h-[20px]',
            )}
          />
          <div className='relative overflow-hidden flex justify-center items-center mx-3 h-[48px] w-[48px] rounded-[24px] bg-background dark:bg-neutral-700 group-hover:bg-indigo-300 group-hover:dark:bg-indigo-500 group-hover:rounded-[16px] transition-all'>
            <MessagesSquareIcon
              size={24}
              className='text-primary dark:text-slate-200 group-hover:text-white'
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}
