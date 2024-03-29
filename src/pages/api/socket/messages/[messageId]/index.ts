import { NextApiRequest } from 'next'
import { RoleMember } from '@prisma/client'

import { NextApiResponseServerIO } from '@/types'

import { db } from '@/lib/db'
import { getCurrentProfilePages } from '@/lib/currentProfilePages'

const handler = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method !== 'DELETE' && req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method is not allowed.' })
  }

  try {
    const profile = await getCurrentProfilePages(req)
    const { messageId, serverId, channelId } = req.query
    const { content } = req.body

    if (!profile) {
      return res.status(401).json({ error: 'Unauthorized.' })
    }

    if (!serverId) {
      return res.status(400).json({ error: 'Server ID missing.' })
    }

    if (!channelId) {
      return res.status(400).json({ error: 'Channel ID missing.' })
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    })

    if (!server) {
      return res.status(404).json({ error: 'Server not found.' })
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    })

    if (!channel) {
      return res.status(404).json({ error: 'Channel not found.' })
    }

    const member = server.members.find((m) => m.profileId === profile.id)

    if (!member) {
      return res.status(404).json({ error: 'Member not found.' })
    }

    let message = await db.message.findFirst({
      where: {
        id: messageId as string,
        channelId: channelId as string,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    })

    if (!message || message.deleted) {
      return res.status(404).json({ error: 'Message not found.' })
    }

    const isAdmin = member.role === RoleMember.ADMIN
    const isModerator = member.role === RoleMember.MODERATOR
    const isOwner = message.memberId === member.id
    const canModify = isModerator || isAdmin || isOwner

    if (!canModify) {
      return res.status(401).json({ error: 'Unauthorized.' })
    }

    if (req.method === 'PATCH') {
      if (!isOwner) {
        return res.status(401).json({ error: 'Unauthorized.' })
      }

      message = await db.message.update({
        data: {
          content,
        },
        where: {
          id: messageId as string,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      })
    }

    if (req.method === 'DELETE') {
      message = await db.message.update({
        data: {
          fileUrl: null,
          content: 'This message has been deleted.',
          deleted: true,
        },
        where: {
          id: messageId as string,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      })
    }

    const updateKey = `chat:${channelId}:message:update`

    res?.socket?.server?.io?.emit(updateKey, message)

    return res.status(200).json(message)
  } catch (error) {
    console.log('[MESSAGE_ID] ', error)
    return res.status(500).json({ error: 'Internal Error' })
  }
}

export default handler
