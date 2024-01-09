'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import { ActionTooltip } from '@/components/common/action-tooltip'

import { cn } from '@/lib/utils'

interface NavigationItemProps {
  id: string
  name: string
  imageUrl?: string
}

export const NavigationItem = (props: NavigationItemProps) => {
  const { id, name, imageUrl } = props

  const params = useParams()
  const router = useRouter()

  const onClick = () => {
    router.push(`/servers/${id}`)
  }

  return (
    <div>
      <ActionTooltip label={name} side='right' align='center'>
        <button className='group relative flex items-center' onClick={onClick}>
          <div
            className={cn(
              'absolute left-0 bg-primary w-[4px] rounded-r-full h-0 transition-all',
              params.serverId === id && 'h-[38px]',
              params.serverId !== id && 'group-hover:h-[20px]',
            )}
          />
          <div className='relative overflow-hidden flex justify-center items-center mx-3 h-[48px] w-[48px] rounded-[24px] bg-background dark:bg-neutral-700 group-hover:bg-indigo-300 group-hover:dark:bg-indigo-500 group-hover:rounded-[16px] transition-all'>
            {imageUrl && <Image src={imageUrl} fill alt={name} sizes='48px' />}
            {!imageUrl && (
              <p className='text-primary dark:text-slate-200 group-hover:text-white'>
                {name.charAt(0).toUpperCase()}
              </p>
            )}
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}
