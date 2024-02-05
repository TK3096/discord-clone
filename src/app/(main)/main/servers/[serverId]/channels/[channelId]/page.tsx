import { redirect } from 'next/navigation'
import { ChannelType } from '@prisma/client'

import { ChatHeader } from '@/components/chat/ChatHeader'
import { ChatMessages } from '@/components/chat/ChatMessages'
import { ChatInput } from '@/components/chat/ChatInput'

import { getCurrentProfile } from '@/actions/profile'
import { getChannelById } from '@/actions/channel'
import { getMemberByServerId } from '@/actions/member'

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

  const member = await getMemberByServerId(params.serverId, profile.id)

  if (!member) {
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
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type='channel'
            apiUrl='/api/messages'
            socketUrl='/api/socket/messages'
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey='channelId'
            paramValue={channel.id}
          />
          <ChatInput
            type='channel'
            name={channel.name}
            apiUrl='/api/socket/messages'
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
          />
        </>
      )}
    </div>
  )
}

export default ChannelIdPage
