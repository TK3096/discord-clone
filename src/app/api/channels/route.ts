import { NextResponse, NextRequest } from 'next/server'
import { ChannelType, RoleMember, Server } from '@prisma/client'

import { APIResponse } from '@/types'

import { db } from '@/lib/db'

import { getCurrentProfile } from '@/actions/profile'

export const POST = async (request: NextRequest) => {
  const profile = await getCurrentProfile()
  const { name, type } = (await request.json()) as {
    name: string
    type: ChannelType
  }
  const { searchParams } = new URL(request.url)

  const serverId = searchParams.get('serverId')

  if (!profile) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Profile not found',
      },
      { status: 401 },
    )
  }

  if (!serverId) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Server id missing',
      },
      { status: 400 },
    )
  }

  if (name.toLowerCase() === 'general') {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: "Channel name cannot be 'general'",
      },
      { status: 400 },
    )
  }

  const server = await db.server.update({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
          role: {
            in: [RoleMember.ADMIN, RoleMember.MODERATOR],
          },
        },
      },
    },
    data: {
      channels: {
        create: {
          profileId: profile.id,
          name,
          type,
        },
      },
    },
  })

  return NextResponse.json<APIResponse<Server>>({
    success: true,
    data: server,
  })
}
