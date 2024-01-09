import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

import { ModeToggle } from '@/components/common/mode-toggle'

import { AddServerBtn } from '@/components/navigation/add-server-btn'
import { NavigationItem } from '@/components/navigation/navigation-item'
import { ConversationBtn } from '@/components/navigation/conversation-btn'

import { ServerItems } from '@/lib/mock'

export const NavigationSidebar = () => {
  return (
    <div className='space-y-4 py-3 h-full w-full flex flex-col items-center bg-slate-100 dark:bg-zinc-900'>
      <ConversationBtn />
      <Separator className='h-[2px] w-10 bg-zinc-300 dark:bg-zinc-700 rounded-md' />
      <ScrollArea className='flex-1 w-full'>
        {ServerItems.map((item) => (
          <div key={item.id} className='mb-4'>
            <NavigationItem
              id={item.id}
              name={item.name}
              imageUrl={item.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>

      <Separator className='h-[2px] w-10 bg-zinc-300 dark:bg-zinc-700 rounded-md' />
      <AddServerBtn />
      <div className='pb-3 mt-auto flex items-center flex-col gap-y-4'>
        <ModeToggle />
      </div>
    </div>
  )
}
