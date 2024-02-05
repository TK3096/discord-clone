import { redirect } from 'next/navigation'

import { ChatHeader } from '@/components/chat/ChatHeader'
import { ChatMessages } from '@/components/chat/ChatMessages'
import { ChatInput } from '@/components/chat/ChatInput'

import { getProfileByMemberId } from '@/actions/profile'

interface MemberIdPageProps {
  params: {
    memberId: string
  }
}

const MemberIdPage = async (props: MemberIdPageProps) => {
  const { params } = props

  const anotherProfile = await getProfileByMemberId(params.memberId)

  if (!anotherProfile) {
    redirect('/main/conversations')
  }

  return (
    <div className='bg-white dark:bg-[#313338] h-full flex flex-col'>
      {/* <ChatHeader
        type='conversation'
        name={anotherProfile.name}
        imageUrl={anotherProfile.imageUrl}
      /> */}
    </div>
  )
}

export default MemberIdPage
