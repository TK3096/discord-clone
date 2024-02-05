import { ConversationSidebar } from '@/components/conversations/ConversationSidebar'

interface ConversationsLayoutProps {
  children: React.ReactNode
}

const ConversationsLayout = (props: ConversationsLayoutProps) => {
  const { children } = props

  return (
    <div className='h-full'>
      <div className='hidden md:block w-60 fixed z-20 inset-y-0'>
        <ConversationSidebar />
      </div>
      <main className='h-full md:pl-60'>{children}</main>
    </div>
  )
}

export default ConversationsLayout
