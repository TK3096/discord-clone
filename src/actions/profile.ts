'use server'

import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/firebase/config/firebase-admin'

export const getCurrentProfile = async () => {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const profile = await db.profile.findUnique({
    where: {
      uid: user.uid,
    },
  })

  return profile
}

export const getProfileByMemberId = async (memberId: string) => {
  const profile = await db.profile.findFirst({
    where: {
      members: {
        some: {
          id: memberId,
        },
      },
    },
  })

  return profile
}
