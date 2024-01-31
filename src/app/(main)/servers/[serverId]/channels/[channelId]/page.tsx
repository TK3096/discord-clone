import { redirect } from 'next/navigation'
import { ChannelType } from '@prisma/client'

import { ChatHeader } from '@/components/chat/ChatHeader'
import { ChatMessages } from '@/components/chat/ChatMessages'
import { ChatInput } from '@/components/chat/ChatInput'

import { getCurrentProfile } from '@/actions/profile'
import { getChannelById } from '@/actions/channel'

interface ChannelIdPageProps {
  params: {
    serverId: string
    channelId: string
  }
}

const ChannelIdPage = async (props: ChannelIdPageProps) => {
  const { params } = props

  const profile = await getCurrentProfile()
  const channel = await getChannelById(params.channelId)

  if (!profile || !channel) {
    redirect('/')
  }

  return (
    <div className='bg-white dark:bg-[#313338] h-full flex flex-col'>
      <ChatHeader
        name={channel.name}
        serverId={params.serverId}
        type='channel'
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages />
          <ChatInput type='channel' name={channel.name} />
        </>
      )}
    </div>
  )
}

export default ChannelIdPage
