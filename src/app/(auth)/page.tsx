import { redirect } from 'next/navigation'

import { AuthBox } from '@/components/auth/AuthBox'

import { isUserAuthenticated } from '@/lib/firebase/config/firebase-admin'

import { initialProfile } from '@/actions/auth'
import { InitialModal } from '@/components/modal/InitialModal'

const HomePage = async () => {
  const isAuthenticated = await isUserAuthenticated()
  const profile = await initialProfile()

  if (isAuthenticated && profile?.servers.length === 0) {
    return <InitialModal />
  }

  if (isAuthenticated && profile) {
    redirect(`/main/servers/${profile.servers[0].id}`)
  }

  return (
    <main className='h-full flex justify-center items-center'>
      <AuthBox />
    </main>
  )
}

export default HomePage
