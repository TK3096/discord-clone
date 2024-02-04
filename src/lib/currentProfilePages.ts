import { db } from '@/lib/db'
import { getCurrentUserPages } from '@/lib/firebase/config/firebase-admin'
import { NextApiRequest } from 'next'

export const getCurrentProfilePages = async (req: NextApiRequest) => {
  const user = await getCurrentUserPages(req.cookies)

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
