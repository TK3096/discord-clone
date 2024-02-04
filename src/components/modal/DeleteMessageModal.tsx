'use client'

import qs from 'query-string'
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

export const DeleteMessageModal = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const { onClose, type, open, data } = useModal()
  const { apiUrl, query } = data

  const isOpen = open && type === 'deleteMessage'

  const handleConfirm = async () => {
    try {
      setLoading(true)

      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query,
      })

      const response = await fetch(url, {
        method: 'DELETE',
      })

      if (response.ok) {
        onClose()
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
            Delete Message
            <DialogDescription className='text-center text-zinc-500'>
              Are you sure you want to do this? <br />
              The message will be permanently deleted.
            </DialogDescription>
          </DialogTitle>
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
