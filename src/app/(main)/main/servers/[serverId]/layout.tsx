import { ServerSidebar } from '@/components/server/ServerSidebar'

interface ServerIdLayoutProps {
  children: React.ReactNode
  params: {
    serverId: string
  }
}

const ServerIdLayout = (props: ServerIdLayoutProps) => {
  const { children, params } = props

  return (
    <div className='h-full'>
      <div className='hidden md:block w-60 fixed z-20 inset-y-0'>
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className='h-full md:pl-60'>{children}</main>
    </div>
  )
}

export default ServerIdLayout
