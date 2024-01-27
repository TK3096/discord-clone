'use client'

import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

export const ServerHeader = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='focus:outline-none'>
        <button className='w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition'>
          server name
          <ChevronDown className='h-5 w-5 ml-auto' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]'>
        <DropdownMenuItem className='text-indigo-600 dark:text-indigo-400 dark:hover:text-primary px-3 py-2 text-sm cursor-pointer'>
          Invite People
          <UserPlus className='h-5 w-5 ml-auto' />
        </DropdownMenuItem>
        <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer'>
          Server Settings
          <Settings className='h-5 w-5 ml-auto' />
        </DropdownMenuItem>
        <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer'>
          Manage Members
          <Users className='h-5 w-5 ml-auto' />
        </DropdownMenuItem>
        <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer'>
          Create Channel
          <PlusCircle className='h-5 w-5 ml-auto' />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className='text-rose-500 px-3 py-2 text-sm cursor-pointer'>
          Delete Server
          <Trash className='h-5 w-5 ml-auto' />
        </DropdownMenuItem>
        <DropdownMenuItem className='text-rose-500 px-3 py-2 text-sm cursor-pointer'>
          Leave Server
          <LogOut className='h-5 w-5 ml-auto' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
