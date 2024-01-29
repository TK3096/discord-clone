'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

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

export const DeleteServerModal = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { onClose, type, open, data } = useModal()
  const { server } = data

  const isOpen = open && type === 'deleteServer'

  const handleConfirm = async () => {
    try {
      setLoading(true)

      const response = await fetch(`/api/servers/${server?.id}`, {
        method: 'DELETE',
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
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Delete Server
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Are you sure you want to do this? <br />
            <span className='text-indigo-500 font-semibold'>
              {server?.name}
            </span>{' '}
            will be permanetly deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='bg-gray-100 px-6 py-4'>
          <div className='flex items-center justify-between w-full'>
            <Button disabled={loading} variant='ghost' onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant='primary'
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
