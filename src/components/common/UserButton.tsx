'use client'

import Image from 'next/image'
import { UserRound, LogOut } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useUser } from '@/hooks/useUser'

export const UserButton = () => {
  const user = useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='group'>
          {user && (
            <div className='relative h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden'>
              <Image fill src={user.photoURL!} alt='user' />
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
        <DropdownMenuItem className='cursor-pointer' asChild>
          <div className='flex items-center text-rose-500'>
            <p className='capitalize font-semibold text-sm'>sign out</p>
            <LogOut size={15} className='ml-auto' />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
