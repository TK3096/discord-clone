import { ScrollArea } from '@/components/ui/scroll-area'
import { UserAvatar } from '@/components/common/UserAvatar'

export const ConversationSidebar = () => {
  return (
    <div className='flex flex-col h-full w-full text-primary bg-[#F2F3F5] dark:bg-[#2B2D31]'>
      <ScrollArea className='flex-1 px-3'>
        <div className='mt-2'></div>
      </ScrollArea>
    </div>
  )
}
