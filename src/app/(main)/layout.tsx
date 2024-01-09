import { NavigationSidebar } from '@/components/navigation/navigation-sidebar'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props

  return (
    <div>
      <div className='h-full w-[72px] fixed inset-y-0 z-30'>
        <NavigationSidebar />
      </div>
      <main className='pl-[72px]'>{children}</main>
    </div>
  )
}

export default MainLayout
