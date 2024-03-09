'use client'

import { useFocusValue } from '@/app/toggleContext'
import { useTheme } from 'next-themes'
import React from 'react'

export default function Container({children}: any) {

  
  const { theme } = useTheme()

  return (
    <div className={`h-screen ${theme === 'dark'? '': 'bg-gradient-to-b from-gray-200'}`}>
        {children}
    </div>
  )
}
