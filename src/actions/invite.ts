'use server'

import { db } from '@/lib/db'

export const existingOnServer = async (code: string, profileId: string) => {
  const server = await db.server.findFirst({
    where: {
      inviteCode: code,
      members: {
        some: {
          profileId,
        },
      },
    },
  })

  return server
}

export const joinServer = async (code: string, profileId: string) => {
  const server = await db.server.update({
    data: {
      members: {
        create: [
          {
            profileId,
          },
        ],
      },
    },
    where: {
      inviteCode: code,
    },
  })

  return server
}
