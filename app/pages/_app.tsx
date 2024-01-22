'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'

interface Props {
    children: any
    // pageProps: any
}

const Provider = ({children}: Props) => {
  return (
    <SessionProvider>
   {children}
    </SessionProvider>  
  )
}

export default Provider