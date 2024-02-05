'use client'

import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'

import { ActionTooltip } from '@/components/common/ActionTooltip'

import { cn } from '@/lib/utils'

interface NavigationItemProps {
  imageUrl: string
  id: string
  name: string
}

export const Navigationitem = (props: NavigationItemProps) => {
  const { id, imageUrl, name } = props

  const router = useRouter()
  const params = useParams()

  const handleClick = () => {
    router.push(`/main/servers/${id}`)
  }

  return (
    <ActionTooltip side='right' align='center' label={name}>
      <button
        className='group relative flex items-center'
        onClick={handleClick}
      >
        <div
          className={cn(
            'absolute left-0 rounded-r-md bg-primary w-[4px] h-0 transition-all',
            params?.serverId === id && 'h-[35px]',
            params?.serverId !== id && 'group-hover:h-[20px]',
          )}
        />
        <div className='relative flex justify-center items-center mx-3 w-[48px] h-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden'>
          <Image src={imageUrl} alt={name} fill />
        </div>
      </button>
    </ActionTooltip>
  )
}
