import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { revokeAllSessions } from '@/lib/firebase/config/firebase-admin'
import { SESSION_KEY } from '@/lib/firebase/config/session-key'

import { APIResponse } from '@/types'

export const GET = async () => {
  const sessionCookie = cookies().get(SESSION_KEY)?.value

  if (!sessionCookie) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Session not found.',
      },
      { status: 400 },
    )
  }

  cookies().delete(SESSION_KEY)

  await revokeAllSessions(sessionCookie)

  return NextResponse.json<APIResponse<string>>({
    success: true,
    data: 'Sign out succfully.',
  })
}
