import 'server-only'

import { cookies } from 'next/headers'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth, SessionCookieOptions } from 'firebase-admin/auth'

import { SESSION_KEY } from '@/lib/firebase/config/session-key'

const config = {
  credential: cert(
    process.cwd() + '/' + process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PATH,
  ),
}

export const app = !getApps().length
  ? initializeApp(config, 'discord-clone')
  : getApps()[0]

export const auth = getAuth(app)

const getSession = async () => {
  try {
    return cookies().get(SESSION_KEY)?.value
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export const isUserAuthenticated = async (
  session: string | undefined = undefined,
) => {
  const _session = session ?? (await getSession())

  if (!_session) {
    return false
  }

  try {
    const isRevoked = !(await auth.verifySessionCookie(_session, true))
    return !isRevoked
  } catch (error) {
    console.log('[FIREBASE_ADMIN] Fail to check is authenticated ->', error)
    return false
  }
}

export const getCurrentUser = async () => {
  const session = await getSession()

  if (!(await isUserAuthenticated(session))) {
    return null
  }

  const decodedIdToken = await auth.verifySessionCookie(session!)
  const currentUser = await auth.getUser(decodedIdToken.uid)

  return currentUser
}

export const createSessionCookie = async (
  idToke: string,
  sessionCookieOptions: SessionCookieOptions,
) => {
  return auth.createSessionCookie(idToke, sessionCookieOptions)
}

export const revokeAllSessions = async (session: string) => {
  const decodedIdToken = await auth.verifySessionCookie(session)

  return await auth.revokeRefreshTokens(decodedIdToken.uid)
}

export const getCurrentUserPages = async (
  cookies: Partial<{ [key: string]: string }>,
) => {
  const session = cookies[SESSION_KEY]

  if (!(await isUserAuthenticated(session))) {
    return null
  }

  const decodedIdToken = await auth.verifySessionCookie(session!)
  const currentUser = await auth.getUser(decodedIdToken.uid)

  return currentUser
}
