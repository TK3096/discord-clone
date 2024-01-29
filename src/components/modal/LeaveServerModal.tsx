'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { useModal } from '@/hooks/useModal'
import { APIResponse } from '@/types'
import { Server } from '@prisma/client'

export const LeaveServerModal = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const { onClose, type, data, open } = useModal()
  const { server } = data

  const isOpen = open && type === 'leaveServer'

  const handleConfirm = async () => {
    try {
      setLoading(true)

      const response = await fetch(`/api/servers/${server?.id}/leave`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const resBody = (await response.json()) as unknown as APIResponse<Server>

      if (response.ok && resBody.success) {
        onClose()
        router.refresh()
        router.push('/')
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
        <DialogHeader className='pt-6 px-6'>
          <DialogTitle className='font-bold text-2xl text-center'>
            Leave Server
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Are you sure want to leave{' '}
            <span className='font-semibold text-indigo-500'>
              {server?.name}
            </span>{' '}
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='bg-gray-100 px-6 py-4'>
          <div className='flex items-center justify-between w-full'>
            <Button variant='ghost' disabled={loading} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant='primary'
              disabled={loading}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
