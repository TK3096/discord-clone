import {
  signInWithPopup,
  GoogleAuthProvider,
  User,
  onAuthStateChanged as _onAuthStateChange,
} from 'firebase/auth'

import { auth } from '@/lib/firebase/config/firebase'

import { APIResponse } from '@/types'

export const onAuthStateChanged = (cb: (user: User | null) => void) => {
  return _onAuthStateChange(auth, cb)
}

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()

  try {
    const userCreds = await signInWithPopup(auth, provider)
    const idToken = await userCreds.user.getIdToken()

    const response = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    })

    const resBody = (await response.json()) as unknown as APIResponse<string>

    return response.ok && resBody.success
  } catch (error) {
    console.log('[FIREBASE_AUTH] Fail to sign in with google ->', error)
    return false
  }
}

export const signOut = async () => {
  try {
    await auth.signOut()

    const response = await fetch('/api/auth/sign-out', {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const resBody = (await response.json()) as unknown as APIResponse<string>

    return response.ok && resBody.success
  } catch (error) {
    console.log('[FIREBASE_AUTH] Fail to sign out ->', error)
    return false
  }
}
