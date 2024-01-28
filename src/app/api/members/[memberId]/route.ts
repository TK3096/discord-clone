import { NextRequest, NextResponse } from 'next/server'
import { RoleMember, Server } from '@prisma/client'

import { APIResponse } from '@/types'

import { db } from '@/lib/db'
import { getCurrentProfile } from '@/actions/profile'

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { memberId: string } },
) => {
  const reqBody = (await request.json()) as { role: RoleMember }
  const { searchParams } = new URL(request.url)
  const serverId = searchParams.get('serverId')

  const profile = await getCurrentProfile()

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

  if (!params.memberId) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Member id missing',
      },
      { status: 400 },
    )
  }

  const server = await db.server.update({
    where: {
      id: serverId,
      profileId: profile.id,
    },
    data: {
      members: {
        update: {
          where: {
            id: params.memberId,
            profileId: {
              not: profile.id,
            },
          },
          data: {
            role: reqBody.role,
          },
        },
      },
    },
    include: {
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
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
  { params }: { params: { memberId: string } },
) => {
  const { searchParams } = new URL(request.url)
  const serverId = searchParams.get('serverId')

  const profile = await getCurrentProfile()

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

  if (!params.memberId) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Member id missing',
      },
      { status: 400 },
    )
  }

  const server = await db.server.update({
    where: {
      id: serverId,
      profileId: profile.id,
    },
    data: {
      members: {
        deleteMany: {
          id: params.memberId,
          profileId: {
            not: profile.id,
          },
        },
      },
    },
    include: {
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })

  return NextResponse.json<APIResponse<Server>>({
    success: true,
    data: server,
  })
}
