import { Channel, ChannelType, Server } from '@prisma/client'
import { create } from 'zustand'

export type ModalType =
  | 'createServer'
  | 'invite'
  | 'editServer'
  | 'members'
  | 'leaveServer'
  | 'deleteServer'
  | 'createChannel'
  | 'editChannel'
  | 'deleteChannel'
  | 'messageFile'
  | 'deleteMessage'

interface ModalData {
  server?: Server
  channelType?: ChannelType
  channel?: Channel
  apiUrl?: string
  query?: Record<string, any>
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
