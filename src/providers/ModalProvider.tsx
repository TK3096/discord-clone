'use client'

import { useState, useEffect } from 'react'

import { CreateServerModal } from '@/components/modal/CreateServerModal'

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <CreateServerModal />
    </>
  )
}
