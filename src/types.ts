import { Member, Profile, Server } from '@prisma/client'

export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; error: string }

export type ServerWithMemberWithProfiles = Server & {
  members: (Member & { profile: Profile })[]
}
