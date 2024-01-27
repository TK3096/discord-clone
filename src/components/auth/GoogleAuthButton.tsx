'use client'

import { useRouter } from 'next/navigation'
import { FaGoogle } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'

import { signInWithGoogle } from '@/lib/firebase/auth'

export const GoogleAuthButton = () => {
  const route = useRouter()

  const handleClick = async () => {
    const res = await signInWithGoogle()

    if (res) {
      route.refresh()
    }
  }

  return (
    <Button
      className='w-full flex items-center gap-3 group bg-primary hover:bg-indigo-500 transition-colors focus-visible:ring-offset-0'
      onClick={handleClick}
    >
      <FaGoogle size={24} className='group-hover:text-white' />
      <p className='capitalize font-semibold text-md group-hover:text-white'>
        Sing in with google
      </p>
    </Button>
  )
}
