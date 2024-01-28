import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { RoleMember, Server } from '@prisma/client'

import { APIResponse } from '@/types'

import { schema } from '@/components/modal/CreateServerModal'

import { getCurrentUser } from '@/lib/firebase/config/firebase-admin'
import { db } from '@/lib/db'

export const POST = async (request: NextRequest) => {
  const reqBody = (await request.json()) as z.infer<typeof schema>
  const user = await getCurrentUser()

  if (!user) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Unauthorize.',
      },
      { status: 401 },
    )
  }

  const profile = await db.profile.findUnique({
    where: {
      uid: user.uid,
    },
  })

  if (!profile) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Profile not found.',
      },
      { status: 401 },
    )
  }

  const server = await db.server.create({
    data: {
      name: reqBody.name,
      imageUrl: reqBody.imageUrl,
      profileId: profile.id,
      inviteCode: uuidv4(),
      channels: {
        create: [{ name: 'general', profileId: profile.id }],
      },
      members: {
        create: [{ profileId: profile.id, role: RoleMember.ADMIN }],
      },
    },
  })

  return NextResponse.json<APIResponse<Server>>({
    success: true,
    data: server,
  })
}
