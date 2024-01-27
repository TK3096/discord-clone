import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { storage } from '@/lib/firebase/config/firebase'

export const uploadFile = async (file: File) => {
  try {
    const path = file.name
    const fileRef = ref(storage, path)

    await uploadBytes(fileRef, file)

    const url = await getDownloadURL(fileRef)

    return url
  } catch (error) {
    console.log('[STORAGE] Fail to upload file -> ', error)
    return null
  }
}
