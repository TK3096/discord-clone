import { useState, useEffect } from 'react'
import { User } from 'firebase/auth'

import { onAuthStateChanged } from '@/lib/firebase/auth'

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((u) => {
      setUser(u)
    })

    return () => unsubscribe()
  }, [])

  return user
}
