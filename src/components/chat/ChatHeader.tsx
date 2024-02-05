import { Hash } from 'lucide-react'

import { MobileToggle } from '@/components/common/MobileToggle'
import { SocketIndicator } from '@/components/common/SocketIndicator'
import { UserAvatar } from '@/components/common/UserAvatar'

interface ChatHeaderProps {
  type: 'channel' | 'conversation'
  name: string
  serverId?: string
  imageUrl?: string
}

export const ChatHeader = (props: ChatHeaderProps) => {
  const { type, name, serverId, imageUrl } = props

  return (
    <div className='text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2'>
      {serverId && <MobileToggle serverId={serverId} />}
      {type === 'channel' && (
        <Hash className='w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2' />
      )}
      {type === 'conversation' && (
        <UserAvatar src={imageUrl} className='h-8 w-8 md:h-8 md:w-8 mr-2' />
      )}
      <p className='text-black dark:text-white'>{name}</p>
      <div className='ml-auto flex items-center'>
        <SocketIndicator />
      </div>
    </div>
  )
}
