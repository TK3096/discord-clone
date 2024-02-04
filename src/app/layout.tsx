import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

import { ThemeProvider } from '@/providers/ThemeProvider'

import { cn } from '@/lib/utils'

import { ModalProvider } from '@/providers/ModalProvider'
import { SocketProvider } from '@/providers/SocketProvider'

import './globals.css'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discord Clone',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(font.className, 'bg-white dark:bg-[#313338]')}>
        <SocketProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            storageKey='discord-clone'
          >
            <ModalProvider />
            {children}
          </ThemeProvider>
        </SocketProvider>
      </body>
    </html>
  )
}
