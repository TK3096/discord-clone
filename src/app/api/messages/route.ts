import { NextRequest, NextResponse } from 'next/server'
import { Message } from '@prisma/client'

import { APIResponse } from '@/types'

import { db } from '@/lib/db'

import { getCurrentProfile } from '@/actions/profile'

const MESSAGE_LIMIT = 10

export const GET = async (request: NextRequest) => {
  const profile = await getCurrentProfile()
  const { searchParams } = new URL(request.url)

  const cursor = searchParams.get('cursor')
  const channelId = searchParams.get('channelId')

  if (!profile) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Unauthorize.',
      },
      { status: 401 },
    )
  }

  if (!channelId) {
    return NextResponse.json<APIResponse>(
      {
        success: false,
        error: 'Channel id missing',
      },
      { status: 400 },
    )
  }

  let messages: Message[] = []

  if (cursor) {
    messages = await db.message.findMany({
      where: {
        channelId,
      },
      take: MESSAGE_LIMIT,
      skip: 1,
      cursor: {
        id: cursor,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  } else {
    messages = await db.message.findMany({
      where: {
        channelId,
      },
      take: MESSAGE_LIMIT,
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  let nextCursor = null

  if (messages.length === MESSAGE_LIMIT) {
    nextCursor = messages[MESSAGE_LIMIT - 1].id
  }

  return NextResponse.json<APIResponse<Message[]>>({
    success: true,
    data: messages,
  })
}
