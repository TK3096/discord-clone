import { redirect } from 'next/navigation'

import { ServerHeader } from '@/components/server/ServerHeader'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SearverSearch } from '@/components/server/ServerSearch'

import { getServer } from '@/actions/server'
import { getCurrentProfile } from '@/actions/profile'

interface ServerSidebarProps {
  serverId: string
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

  return (
    <div className='flex flex-col h-full w-full text-primary bg-[#F2F3F5] dark:bg-[#2B2D31]'>
      <ServerHeader server={server} role={role} />
      <ScrollArea className='flex-1 px-3'>
        <div className='mt-2'>
          <SearverSearch />
        </div>
      </ScrollArea>
    </div>
  )
}
