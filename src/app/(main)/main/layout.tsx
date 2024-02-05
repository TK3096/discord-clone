import { NavigationSidebar } from '@/components/navigation/NavigationSidebar'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props

  return (
    <div className='h-full'>
      <div className='hidden md:block h-full w-[72px] fixed inset-y-0 z-30'>
        <NavigationSidebar />
      </div>
      <main className='md:pl-[72px] h-full'>{children}</main>
    </div>
  )
}

export default MainLayout
