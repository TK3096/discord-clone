import { NextResponse, NextRequest } from 'next/server'

import { APIResponse } from '@/types'

import { db } from '@/lib/db'
import { getCurrentProfile } from '@/actions/profile'
import { Server } from '@prisma/client'

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { serverId: string } },
) => {
  const profile = await getCurrentProfile()

  if (!profile) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Profile not found.',
      },
      {
        status: 401,
      },
    )
  }

  if (!params.serverId) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Server id missing.',
      },
      {
        status: 400,
      },
    )
  }

  const server = await db.server.update({
    where: {
      id: params.serverId,
      profileId: {
        not: profile.id,
      },
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    data: {
      members: {
        deleteMany: {
          profileId: profile.id,
        },
      },
    },
  })

  return NextResponse.json<APIResponse<Server>>({
    success: true,
    data: server,
  })
}
