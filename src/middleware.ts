import { NextRequest, NextResponse } from 'next/server'

import { SESSION_KEY } from '@/lib/firebase/config/session-key'

export const middleware = async (request: NextRequest) => {
  const session = request.cookies.get(SESSION_KEY)

  if (!session && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
