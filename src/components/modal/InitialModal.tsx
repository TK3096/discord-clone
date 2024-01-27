'use client'

import { useEffect, useState } from 'react'

import { CreateServerModal } from '@/components/modal/CreateServerModal'

export const InitialModal = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <CreateServerModal init />
}
