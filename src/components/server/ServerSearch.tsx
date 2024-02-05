'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
} from '@/components/ui/command'

interface ServerSearchProps {
  data: {
    label: string
    type: 'channel' | 'member'
    data?: {
      icon: React.ReactNode
      name: string
      id: string
    }[]
  }[]
}

export const SearverSearch = (props: ServerSearchProps) => {
  const { data } = props

  const router = useRouter()
  const params = useParams()

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClickItem = (value: {
    id: string
    type: 'channel' | 'member'
  }) => {
    const { type, id } = value

    setOpen(false)

    if (type === 'member') {
      // router.push(`/main/conversations/${id}`)
    }

    if (type === 'channel') {
      router.push(`/main/servers/${params?.serverId}/channels/${id}`)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <button
        className='group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition'
        onClick={handleClick}
      >
        <Search className='w-4 h-4 text-zinc-500 dark:text-zinc-400' />
        <p className='font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition'>
          Search
        </p>
        <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Search all channels and members' />
        <CommandList>
          <CommandEmpty>No Results Found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) {
              return null
            }

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      key={id}
                      onSelect={() => handleClickItem({ id, type })}
                    >
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
