import { Hash } from 'lucide-react'

import { MobileToggle } from '@/components/common/MobileToggle'
import { SocketIndicator } from '@/components/common/SocketIndicator'

interface ChatHeaderProps {
  type: 'channel' | 'conversation'
  name: string
  serverId: string
}

export const ChatHeader = (props: ChatHeaderProps) => {
  const { type, name, serverId } = props

  return (
    <div className='text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2'>
      <MobileToggle serverId={serverId} />
      {type === 'channel' && (
        <Hash className='w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2' />
      )}
      <p className='text-black dark:text-white'>{name}</p>
      <div className='ml-auto flex items-center'>
        <SocketIndicator />
      </div>
    </div>
  )
}
