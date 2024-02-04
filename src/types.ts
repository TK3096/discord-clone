import { Member, Message, Profile, Server } from '@prisma/client'
import { Server as NetServer, Socket } from 'net'
import { NextApiResponse } from 'next'
import { Server as SocketIOServer } from 'socket.io'

export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; error: string }

export type ServerWithMemberWithProfiles = Server & {
  members: (Member & { profile: Profile })[]
}

export type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile
  }
}

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}
