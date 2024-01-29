import { NextRequest, NextResponse } from 'next/server'

import { APIResponse } from '@/types'

import { db } from '@/lib/db'
import { getCurrentProfile } from '@/actions/profile'
import { ChannelType, RoleMember, Server } from '@prisma/client'

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { channelId: string } },
) => {
  const { name, type } = (await request.json()) as {
    name: string
    type: ChannelType
  }

  const { searchParams } = new URL(request.url)
  const serverId = searchParams.get('serverId')

  const profile = await getCurrentProfile()

  if (!profile) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Profile not found.',
      },
      { status: 401 },
    )
  }

  if (!serverId) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Server id missing.',
      },
      { status: 400 },
    )
  }

  if (!params.channelId) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Channel id missing.',
      },
      { status: 400 },
    )
  }

  if (name.toLowerCase() === 'general') {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Channel name cannot be general.',
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
        update: {
          where: {
            id: params.channelId,
            NOT: {
              name: 'general',
            },
          },
          data: {
            name,
            type,
          },
        },
      },
    },
  })

  return NextResponse.json<APIResponse<Server>>({
    success: true,
    data: server,
  })
}

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { channelId: string } },
) => {
  const { searchParams } = new URL(request.url)
  const serverId = searchParams.get('serverId')

  const profile = await getCurrentProfile()

  if (!profile) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Profile not found.',
      },
      { status: 401 },
    )
  }

  if (!serverId) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Server id missing.',
      },
      { status: 400 },
    )
  }

  if (!params.channelId) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Channel id missing.',
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
        delete: {
          id: params.channelId,
          name: {
            not: 'general',
          },
        },
      },
    },
  })

  return NextResponse.json<APIResponse<Server>>({
    success: true,
    data: server,
  })
}
