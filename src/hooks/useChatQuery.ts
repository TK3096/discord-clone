import qs from 'query-string'
import { useInfiniteQuery } from '@tanstack/react-query'

import { useSocket } from '@/providers/SocketProvider'

interface ChatQueryProps {
  queryKey: string
  apiUrl: string
  paramKey: 'channelId' | 'conversationId'
  paramValue: string
}

export const useChatQuery = (props: ChatQueryProps) => {
  const { queryKey, apiUrl, paramKey, paramValue } = props

  const { isConnected } = useSocket()

  const fetchMessages = async ({ pageParam }: { pageParam: any }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
        },
      },
      { skipNull: true },
    )

    const response = await fetch(url)

    return response.json()
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      initialPageParam: undefined,
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 1000,
    })

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  }
}
