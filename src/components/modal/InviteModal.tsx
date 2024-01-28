'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Server } from '@prisma/client'

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useModal } from '@/hooks/useModal'
import { useOrigin } from '@/hooks/useOrigin'

import { APIResponse } from '@/types'

export const InviteModal = () => {
  const router = useRouter()

  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  const origin = useOrigin()
  const { onOpen, onClose, open, type, data } = useModal()
  const { server } = data

  const isOpen = open && type === 'invite'
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const handleGenerateNewLink = async () => {
    try {
      setLoading(true)

      const response = await fetch(`/api/servers/${server?.id}/invite-code`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const resBody = (await response.json()) as unknown as APIResponse<Server>

      if (response.ok && resBody.success) {
        router.refresh()
        onOpen('invite', { server: resBody.data })
      } else {
        console.log(resBody)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Invite Peoples
          </DialogTitle>
        </DialogHeader>
        <div className='p-6'>
          <Label className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
            Server invite link
          </Label>
          <div className='flex items-center mt-2 gap-x-2'>
            <Input
              disabled={loading}
              className='bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black'
              readOnly
              value={inviteUrl}
            />
            <Button size='icon' onClick={handleCopy} disabled={loading}>
              {!copied ? (
                <Copy className='w-4 h-4' />
              ) : (
                <Check className='w-4 h-4' />
              )}
            </Button>
          </div>

          <Button
            variant='link'
            size='sm'
            className='text-xs text-zinc-500 mt-4'
            onClick={handleGenerateNewLink}
            disabled={loading}
          >
            Generate a new link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
