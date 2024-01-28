import { redirect } from 'next/navigation'

import { NavigationDirectMessage } from '@/components/navigation/NavigationDirectMessage'
import { Separator } from '@/components/ui/separator'
import { CreateServerButton } from '@/components/navigation/CreateServerButton'
import { Navigationitem } from '@/components/navigation/NavigationItem'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ModeToggle } from '@/components/common/ModeToggle'
import { UserButton } from '@/components/common/UserButton'

import { getCurrentProfile } from '@/actions/profile'
import { getServers } from '@/actions/server'

export const NavigationSidebar = async () => {
  const profile = await getCurrentProfile()

  if (!profile) {
    redirect('/')
  }

  const servers = await getServers(profile.id)

  return (
    <div className='w-full h-full flex flex-col gap-4 items-center bg-[#E3E5E8] dark:bg-[#1E1F22] py-3'>
      <NavigationDirectMessage />
      <Separator className='h-[2px] rounded-md bg-zinc-300 dark:bg-zinc-700 w-10 mx-auto' />
      <CreateServerButton />
      <Separator className='h-[2px] rounded-md bg-zinc-300 dark:bg-zinc-700 w-10 mx-auto' />
      <ScrollArea className='flex-1 w-full'>
        {servers.map((server) => (
          <div key={server.id} className='mb-4'>
            <Navigationitem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <Separator className='h-[2px] rounded-md bg-zinc-300 dark:bg-zinc-700 w-10 mx-auto' />
      <ModeToggle />
      <UserButton />
    </div>
  )
}
