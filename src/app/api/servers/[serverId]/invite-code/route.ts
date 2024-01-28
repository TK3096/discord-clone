import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { Server } from '@prisma/client'

import { APIResponse } from '@/types'

import { db } from '@/lib/db'
import { getCurrentProfile } from '@/actions/profile'

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { serverId: string } },
) => {
  const profile = await getCurrentProfile()

  if (!profile) {
    return NextResponse.json<APIResponse>(
      { success: false, error: 'Profile not found.' },
      { status: 401 },
    )
  }

  if (!params.serverId) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Server id missing.',
      },
      { status: 400 },
    )
  }

  const server = await db.server.update({
    data: {
      inviteCode: uuidv4(),
    },
    where: {
      id: params.serverId,
      profileId: profile.id,
    },
  })

  return NextResponse.json<APIResponse<Server>>({
    success: true,
    data: server,
  })
}
