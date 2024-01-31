'use server'

import { db } from '@/lib/db'

export const getInitialChannel = async (
  serverId: string,
  profileId: string,
) => {
  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: 'general',
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  return server?.channels[0]
}

export const getChannelById = async (id: string) => {
  const channel = await db.channel.findFirst({
    where: {
      id,
    },
  })

  return channel
}
