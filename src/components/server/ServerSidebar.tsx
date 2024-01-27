import { ServerHeader } from '@/components/server/ServerHeader'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SearverSearch } from '@/components/server/ServerSearch'

interface ServerSidebarProps {
  serverId: string
}

export const ServerSidebar = (props: ServerSidebarProps) => {
  const { serverId } = props

  return (
    <div className='flex flex-col h-full w-full text-primary bg-[#F2F3F5] dark:bg-[#2B2D31]'>
      <ServerHeader />
      <ScrollArea className='flex-1 px-3'>
        <div className='mt-2'>
          <SearverSearch />
        </div>
      </ScrollArea>
    </div>
  )
}
