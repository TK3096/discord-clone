import { redirect } from 'next/navigation'

import { getInitialChannel } from '@/actions/channel'
import { getCurrentProfile } from '@/actions/profile'

interface ServerPageIdPageProps {
  params: { serverId: string }
}

const ServerPageIdPage = async (props: ServerPageIdPageProps) => {
  const { params } = props

  const profile = await getCurrentProfile()

  if (!profile) {
    redirect('/')
  }

  const channel = await getInitialChannel(params.serverId, profile.id)

  if (channel?.name !== 'general') {
    return null
  }

  return redirect(`/main/servers/${params.serverId}/channels/${channel.id}`)
}

export default ServerPageIdPage
