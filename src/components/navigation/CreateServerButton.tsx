'use client'

import { Plus } from 'lucide-react'

import { useModal } from '@/hooks/useModal'

import { ActionTooltip } from '@/components/common/ActionTooltip'

export const CreateServerButton = () => {
  const { onOpen } = useModal()

  const handleClick = () => {
    onOpen('createServer')
  }

  return (
    <ActionTooltip side='right' align='center' label='create a server'>
      <button className='group' onClick={handleClick}>
        <div className='w-[48px] h-[48px] bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 transition-all overflow-hidden rounded-[24px] group-hover:rounded-[16px] flex justify-center items-center mx-3'>
          <Plus
            size={25}
            className='text-emerald-500 group-hover:text-white transition-all'
          />
        </div>
      </button>
    </ActionTooltip>
  )
}
