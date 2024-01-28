'use server'

import { db } from '@/lib/db'

export const getServers = async (profileId: string) => {
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profileId,
        },
      },
    },
  })

  return servers
}

export const getServer = async (id: string) => {
  const server = await db.server.findUnique({
    where: {
      id,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })

  return server
}
