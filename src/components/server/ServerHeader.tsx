'use client'

import { RoleMember, Server } from '@prisma/client'
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

import { useModal } from '@/hooks/useModal'

interface ServerHeaderProps {
  server: Server
  role?: RoleMember
}

export const ServerHeader = (props: ServerHeaderProps) => {
  const { server, role } = props

  const { onOpen } = useModal()

  const isAdmin = role === RoleMember.ADMIN
  const isModerator = isAdmin || role === RoleMember.MODERATOR

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='focus:outline-none'>
        <button className='w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition'>
          {server.name}
          <ChevronDown className='h-5 w-5 ml-auto' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]'>
        {isModerator && (
          <DropdownMenuItem
            className='text-indigo-600 dark:text-indigo-400 dark:hover:text-primary px-3 py-2 text-sm cursor-pointer'
            onClick={() => onOpen('invite', { server })}
          >
            Invite People
            <UserPlus className='h-5 w-5 ml-auto' />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className='px-3 py-2 text-sm cursor-pointer'
            onClick={() => onOpen('editServer', { server })}
          >
            Server Settings
            <Settings className='h-5 w-5 ml-auto' />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className='px-3 py-2 text-sm cursor-pointer'
            onClick={() => onOpen('members', { server })}
          >
            Manage Members
            <Users className='h-5 w-5 ml-auto' />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            className='px-3 py-2 text-sm cursor-pointer'
            onClick={() => onOpen('createChannel')}
          >
            Create Channel
            <PlusCircle className='h-5 w-5 ml-auto' />
          </DropdownMenuItem>
        )}

        {isModerator && <DropdownMenuSeparator />}

        {isAdmin && (
          <DropdownMenuItem
            className='text-rose-500 px-3 py-2 text-sm cursor-pointer'
            onClick={() => onOpen('deleteServer', { server })}
          >
            Delete Server
            <Trash className='h-5 w-5 ml-auto' />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            className='text-rose-500 px-3 py-2 text-sm cursor-pointer'
            onClick={() => onOpen('leaveServer', { server })}
          >
            Leave Server
            <LogOut className='h-5 w-5 ml-auto' />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
