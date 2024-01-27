'use server'

import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/firebase/config/firebase-admin'

export const initialProfile = async () => {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return null
    }

    const profile = await db.profile.findUnique({
      where: {
        uid: user.uid,
      },
      include: {
        servers: {
          take: 1,
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    if (profile) {
      return profile
    }

    const newProfile = await db.profile.create({
      data: {
        uid: user.uid,
        name: user.displayName!,
        imageUrl: user.photoURL!,
      },
      include: {
        servers: true,
      },
    })

    return newProfile
  } catch (error) {
    console.log('[INITIAL_PROFILE] Fail to initial profile -> ', error)
    return null
  }
}
