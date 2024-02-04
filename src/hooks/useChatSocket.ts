import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { useSocket } from '@/providers/SocketProvider'

import { MessageWithMemberWithProfile } from '@/types'

type ChatSocketProps = {
  addKey: string
  updateKey: string
  queryKey: string
}

export const useChatSocket = (props: ChatSocketProps) => {
  const { addKey, updateKey, queryKey } = props

  const { socket } = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) {
      return
    }

    socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            data: page.data.map((item: MessageWithMemberWithProfile) => {
              if (item.id === message.id) {
                return message
              }

              return item
            }),
          }
        })

        return {
          ...oldData,
          pages: newData,
        }
      })
    })

    socket.on(addKey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                data: [message],
              },
            ],
          }
        }

        const newData = [...oldData.pages]

        newData[0] = {
          ...newData[0],
          data: [message, ...newData[0].data],
        }

        return {
          ...oldData,
          pages: newData,
        }
      })
    })

    return () => {
      socket.off(updateKey)
      socket.off(addKey)
    }
  }, [addKey, updateKey, socket, queryClient, queryKey])
}
