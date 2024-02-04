'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileIcon, UploadIcon, X } from 'lucide-react'

import { uploadFile } from '@/lib/firebase/storage'

interface FileUploadProps {
  value?: string
  onChange: (url: string) => void
}

export const FileUpload = (props: FileUploadProps) => {
  const { value, onChange } = props

  const [preview, setPreview] = useState<string>(value || '')

  const isImage = preview.indexOf('.pdf') == -1

  const onDrop = useCallback(
    async (acceptFiles: File[]) => {
      const url = await uploadFile(acceptFiles[0])

      setPreview(url!)
      onChange(url!)
    },
    [onChange],
  )

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': [],
    },
    maxFiles: 1,
  })

  const handleClickRemove = () => {
    setPreview('')
    onChange('')
  }

  return (
    <div>
      {!preview && (
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
      )}
      {preview && isImage && (
        <div className='flex justify-center items-center'>
          <div className='relative h-[72px] w-[72px]'>
            <Image src={preview} alt='preview' fill className='rounded-full' />
            <div className='absolute top-0 -right-1 z-50 rounded-full bg-red-500 text-white'>
              <button
                className='flex justify-center items-center'
                onClick={handleClickRemove}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
      {preview && !isImage && (
        <div className='flex justify-center item-center'>
          <div className='relative'>
            <FileIcon className='h-[72px] w-[72px] fill-indigo-200 stroke-indigo-400' />
            <div className='absolute top-0 right-1 z-50 rounded-full bg-red-500 text-white'>
              <button
                className='flex justify-center items-center'
                onClick={handleClickRemove}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
