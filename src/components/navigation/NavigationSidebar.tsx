import { NavigationDirectMessage } from '@/components/navigation/NavigationDirectMessage'
import { Separator } from '@/components/ui/separator'
import { CreateServerButton } from '@/components/navigation/CreateServerButton'
import { Navigationitem } from '@/components/navigation/NavigationItem'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ModeToggle } from '@/components/common/ModeToggle'
import { UserButton } from '@/components/common/UserButton'

export const NavigationSidebar = () => {
  return (
    <div className='w-full h-full flex flex-col gap-4 items-center bg-[#E3E5E8] dark:bg-[#1E1F22] py-3'>
      <NavigationDirectMessage />
      <Separator className='h-[2px] rounded-md bg-zinc-300 dark:bg-zinc-700 w-10 mx-auto' />
      <CreateServerButton />
      <Separator className='h-[2px] rounded-md bg-zinc-300 dark:bg-zinc-700 w-10 mx-auto' />
      <ScrollArea className='flex-1 w-full'>
        {['test-1', 'test-2', 'test-3', 'test-4', 'test-5', 'test-6'].map(
          (d) => (
            <div key={d} className='mb-4'>
              <Navigationitem
                id={d}
                name={d}
                imageUrl='https://www.matichon.co.th/wp-content/uploads/2023/03/338284396_2204472996406467_3660489073419004986_n-1024x1024.jpg'
              />
            </div>
          ),
        )}
      </ScrollArea>
      <Separator className='h-[2px] rounded-md bg-zinc-300 dark:bg-zinc-700 w-10 mx-auto' />
      <ModeToggle />
      <UserButton />
    </div>
  )
}
