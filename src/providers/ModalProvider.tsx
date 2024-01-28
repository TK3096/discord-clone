'use client'

import { useState, useEffect } from 'react'

import { CreateServerModal } from '@/components/modal/CreateServerModal'
import { InviteModal } from '@/components/modal/InviteModal'
import { EditServerModal } from '@/components/modal/EditServerModal'
import { MemberModal } from '@/components/modal/MemberModal'

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MemberModal />
    </>
  )
}
