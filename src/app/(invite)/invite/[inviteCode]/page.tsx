import { redirect } from 'next/navigation'
import { FaDiscord } from 'react-icons/fa6'

import { getCurrentProfile } from '@/actions/profile'
import { existingOnServer, joinServer } from '@/actions/invite'

interface InvitePageProps {
  params: {
    inviteCode: string
  }
}

const InvitePage = async (props: InvitePageProps) => {
  const { params } = props

  const profile = await getCurrentProfile()

  if (!profile || !params.inviteCode) {
    redirect('/')
  }

  const existingServer = await existingOnServer(params.inviteCode, profile.id)

  if (existingServer) {
    redirect(`/main/servers/${existingServer.id}`)
  }

  const server = await joinServer(params.inviteCode, profile.id)

  if (server) {
    redirect(`/main/servers/${server.id}`)
  }

  return (
    <div className='h-full'>
      <div className='flex flex-col justify-center items-center h-full gap-4'>
        <FaDiscord size={72} />
        <h4 className='capitalize font-bold text-2xl'>Invalid Invite Code</h4>
      </div>
    </div>
  )
}

export default InvitePage
