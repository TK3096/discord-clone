'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog'

import { useModal } from '@/hooks/use-modal'

export const CreateServerModal = () => {
  const { isOpen, type, onClose } = useModal()

  const isModalOpen = isOpen && type === 'createServer'

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent hideX>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <button>Close Me</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
