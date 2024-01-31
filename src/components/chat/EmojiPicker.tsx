'use client'

import { Smile } from 'lucide-react'
import { useTheme } from 'next-themes'

import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface EmojiPickerProps {
  onChange: (emoji: string) => void
}

export const EmojiPicker = (props: EmojiPickerProps) => {
  const { onChange } = props

  const { resolvedTheme } = useTheme()

  return (
    <Popover>
      <PopoverTrigger>
        <Smile className='text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition' />
      </PopoverTrigger>
      <PopoverContent
        side='right'
        sideOffset={40}
        className='bg-transparent border-none show-none drop-shadow-none mb-16'
      >
        <Picker
          themes={resolvedTheme}
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  )
}
