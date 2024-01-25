'use client'

import { FaGoogle } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'

export const GoogleAuthButton = () => {
  const handleClick = () => {}

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
