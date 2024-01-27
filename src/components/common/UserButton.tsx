'use cleint'

import Image from 'next/image'
import { UserRound } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const UserButton = () => {
  const user = null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='group'>
          {user && (
            <div className='relative h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden'>
              <Image
                fill
                src='https://www.matichon.co.th/wp-content/uploads/2023/03/338284396_2204472996406467_3660489073419004986_n-1024x1024.jpg'
                alt='user'
              />
            </div>
          )}
          {!user && (
            <div className='h-[48px] w-[48px] flex items-center justify-center rounded-[24px] group-hover:rounded-[16px] transition-all bg-background dark:bg-neutral-700 group-hover:bg-indigo-500'>
              <UserRound
                size={25}
                className='text-zinc-400 group-hover:text-white transition-all'
              />
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='right' align='center'>
        <DropdownMenuItem className='cursor-pointer'>
          <p className='capitalize font-semibold text-sm'>sign out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
