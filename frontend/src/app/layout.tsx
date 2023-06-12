"use client";
import './globals.css'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export const metadata = {
  title: 'Epic Organizer',
  description: 'Organize your life by tasks',
}

export default function RootLayout({children }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
