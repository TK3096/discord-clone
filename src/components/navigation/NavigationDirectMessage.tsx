'use client'

import { FaDiscord } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'

import { ActionTooltip } from '@/components/common/ActionTooltip'

export const NavigationDirectMessage = () => {
  const router = useRouter()

  const handleClick = () => {
    // router.push('/main/conversations')
  }

  return (
    <ActionTooltip side='right' align='center' label='direct messages'>
      <button className='group ' onClick={handleClick}>
        <div className='w-[48px] h-[48px] bg-background dark:bg-neutral-700 group-hover:bg-indigo-500 transition-all overflow-hidden rounded-[24px] group-hover:rounded-[16px] flex justify-center items-center mx-3'>
          <FaDiscord
            size={25}
            className='text-zinc-400 group-hover:text-white transition-all'
          />
        </div>
      </button>
    </ActionTooltip>
  )
}
