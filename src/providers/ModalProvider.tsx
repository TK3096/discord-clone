'use client'

import { useState, useEffect } from 'react'

import { CreateServerModal } from '@/components/modal/CreateServerModal'
import { InviteModal } from '@/components/modal/InviteModal'
import { EditServerModal } from '@/components/modal/EditServerModal'
import { MemberModal } from '@/components/modal/MemberModal'
import { LeaveServerModal } from '@/components/modal/LeaveServerModal'
import { DeleteServerModal } from '@/components/modal/DeleteServerModal'

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
      <LeaveServerModal />
      <DeleteServerModal />
    </>
  )
}
