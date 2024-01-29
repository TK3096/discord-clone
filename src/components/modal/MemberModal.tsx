'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from 'lucide-react'
import { RoleMember, Server } from '@prisma/client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserAvatar } from '@/components/common/UserAvatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useModal } from '@/hooks/useModal'

import { APIResponse, ServerWithMemberWithProfiles } from '@/types'

const roleIconMap = {
  [RoleMember.GUEST]: null,
  [RoleMember.MODERATOR]: (
    <ShieldCheck className='h-4 w-4 ml-2 text-indigo-500' />
  ),
  [RoleMember.ADMIN]: <ShieldAlert className='h-4 w-4 ml-2 text-rose-500' />,
}

export const MemberModal = () => {
  const router = useRouter()
  const [selectId, setSelectId] = useState('')

  const { onClose, type, open, data, onOpen } = useModal()
  const { server } = data as { server: ServerWithMemberWithProfiles }

  const isOpen = open && type === 'members'

  const handleRoleChange = async (memberId: string, role: RoleMember) => {
    try {
      setSelectId(memberId)

      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id,
        },
      })
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      })

      const reqBody = (await response.json()) as unknown as APIResponse<Server>

      if (response.ok && reqBody.success) {
        router.refresh()
        onOpen('members', { server: reqBody.data })
      } else {
        console.log(reqBody)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSelectId('')
    }
  }

  const handleKick = async (memberId: string) => {
    try {
      setSelectId(memberId)

      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id,
        },
      })

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const resBody = (await response.json()) as unknown as APIResponse<Server>

      if (response.ok && resBody.success) {
        router.refresh()
        onOpen('members', { server: resBody.data })
      } else {
        console.log(resBody)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSelectId('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Manage Members
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className='mt-8 max-h-[420px] pr-6'>
          {server?.members?.map((member) => (
            <div key={member.id} className='flex items-center gap-x-2 mb-6'>
              <UserAvatar src={member.profile.imageUrl} />
              <div className='flex flex-col gap-y-1'>
                <div className='text-xs font-semibold flex items-center gap-x-1'>
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
              </div>
              {server.profileId !== member.profileId &&
                selectId !== member.id && (
                  <div className='ml-auto'>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className='h-4 w-4 text-zinc-500' />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className='flex items-center'>
                            <ShieldQuestion className='w-4 h-4 mr-2' />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleChange(member.id, RoleMember.GUEST)
                                }
                              >
                                <Shield className='h-4 w-4 mr-2' />
                                <span>Guest</span>
                                {member.role === RoleMember.GUEST && (
                                  <Check className='h-4 w-4 ml-auto' />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleChange(
                                    member.id,
                                    RoleMember.MODERATOR,
                                  )
                                }
                              >
                                <ShieldCheck className='h-4 w-4 mr-2' />
                                <span>Moderator</span>
                                {member.role === RoleMember.MODERATOR && (
                                  <Check className='h-4 w-4 ml-auto' />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleKick(member.id)}>
                          <Gavel className='h-4 w-4 mr-2' />
                          <span>Kick</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {selectId === member.id && (
                <Loader2 className='animate-spin text-zinc-500 ml-auto w-4 h-4' />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
