import { redirect } from 'next/navigation'
import { Hash, Mic, ShieldAlert, ShieldCheck } from 'lucide-react'

import { ServerHeader } from '@/components/server/ServerHeader'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SearverSearch } from '@/components/server/ServerSearch'
import { Separator } from '@/components/ui/separator'
import { ServerSection } from '@/components/server/ServerSection'
import { ServerChannel } from '@/components/server/ServerChannel'

import { getServer } from '@/actions/server'
import { getCurrentProfile } from '@/actions/profile'
import { ChannelType, RoleMember } from '@prisma/client'

interface ServerSidebarProps {
  serverId: string
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className='mr-2 h-4 w-4' />,
  [ChannelType.AUDIO]: <Mic className='mr-2 h-4 w-4' />,
}

const roleIconMap = {
  [RoleMember.GUEST]: null,
  [RoleMember.MODERATOR]: (
    <ShieldCheck className='h-4 w-4 mr-2 text-indigo-500' />
  ),
  [RoleMember.ADMIN]: <ShieldAlert className='h-4 w-4 mr-2 text-rose-500' />,
}

export const ServerSidebar = async (props: ServerSidebarProps) => {
  const { serverId } = props

  const profile = await getCurrentProfile()
  const server = await getServer(serverId)

  if (!server || !profile) {
    redirect('/')
  }

  const role = server.members.find(
    (member) => member.profileId === profile.id,
  )?.role

  const textChannels = server?.channels.filter(
    (ch) => ch.type === ChannelType.TEXT,
  )
  const audioChannels = server?.channels.filter(
    (ch) => ch.type === ChannelType.AUDIO,
  )
  const members = server?.members.filter((mem) => mem.profileId !== profile.id)

  return (
    <div className='flex flex-col h-full w-full text-primary bg-[#F2F3F5] dark:bg-[#2B2D31]'>
      <ServerHeader server={server} role={role} />
      <ScrollArea className='flex-1 px-3'>
        <div className='mt-2'>
          <SearverSearch
            data={[
              {
                label: 'Text Channels',
                type: 'channel',
                data: textChannels.map((ch) => ({
                  id: ch.id,
                  name: ch.name,
                  icon: iconMap[ch.type],
                })),
              },
              {
                label: 'Audio Channels',
                type: 'channel',
                data: audioChannels.map((ch) => ({
                  id: ch.id,
                  name: ch.name,
                  icon: iconMap[ch.type],
                })),
              },
              {
                label: 'Members',
                type: 'member',
                data: members.map((mem) => ({
                  id: mem.id,
                  name: mem.profile.name,
                  icon: roleIconMap[mem.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className='bg-zinc-200 dark:bg-zinc-700 rounded-md my-2' />
        {textChannels.length && (
          <div className='mb-2'>
            <ServerSection
              channelType={ChannelType.TEXT}
              role={role}
              label='Text Channels'
            />
            <div className='space-y-[2px]'>
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {audioChannels.length && (
          <div className='mb-2'>
            <ServerSection
              channelType={ChannelType.AUDIO}
              role={role}
              label='Audio Channels'
            />
            <div className='space-y-[2px]'>
              {audioChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
