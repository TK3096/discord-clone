'use server'

import { db } from '@/lib/db'

export const getMemberByServerId = async (
  serverId: string,
  profileId: string,
) => {
  const member = await db.member.findFirst({
    where: {
      serverId,
      profileId,
    },
  })

  return member
}
