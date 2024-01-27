import { create } from 'zustand'

export type ModalType = 'createServer'

interface ModalStore {
  type: ModalType | null
  open: boolean
  onOpen: (type: ModalType | null) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  open: false,
  onOpen: (type: ModalType | null) => set({ open: true, type }),
  onClose: () => set({ open: false, type: null }),
}))
