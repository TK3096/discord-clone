'use client'

import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { UploadIcon, X } from 'lucide-react'

export const FileUpload = () => {
  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
  })

  return (
    <>
      <div
        {...getRootProps()}
        className='border-dashed border-2 border-zinc-300 rounded-md p-4 flex flex-col justify-center items-center gap-3 text-zinc-400'
      >
        <input {...getInputProps()} />
        <UploadIcon size={32} />
        <p className='text-sm'>
          Drag &apos;n&apos; drop some files here, or click to select file
        </p>
      </div>
    </>
  )
}
