import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'

import { APIResponse } from '@/types'

import { schema } from '@/components/modal/CreateServerModal'

import { db } from '@/lib/db'
import { getCurrentProfile } from '@/actions/profile'
import { Server } from '@prisma/client'

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { serverId: string } },
) => {
  const resBody = (await request.json()) as z.infer<typeof schema>
  const { name, imageUrl } = resBody
  const profile = await getCurrentProfile()

  if (!profile) {
    return NextResponse.json<APIResponse>(
      { success: false, error: 'Profile not found.' },
      { status: 401 },
    )
  }

  if (!params.serverId) {
    return NextResponse.json<APIResponse>(
      { success: false, error: 'Server id missing.' },
      { status: 400 },
    )
  }

  const server = await db.server.update({
    data: {
      name,
      imageUrl,
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

export const DELETE = async (
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
      { success: false, error: 'Server id missing.' },
      { status: 400 },
    )
  }

  const server = await db.server.delete({
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
