import { Server } from '@prisma/client'
import { create } from 'zustand'

export type ModalType =
  | 'createServer'
  | 'invite'
  | 'editServer'
  | 'members'
  | 'leaveServer'
  | 'deleteServer'

interface ModalData {
  server?: Server
}

interface ModalStore {
  type: ModalType | null
  open: boolean
  data: ModalData
  onOpen: (type: ModalType | null, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  open: false,
  data: {},
  onOpen: (type: ModalType | null, data = {}) =>
    set({ open: true, type, data }),
  onClose: () => set({ open: false, type: null }),
}))
