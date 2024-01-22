'use client'

import React, { createContext, useContext, useState } from "react"

interface contextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const StateContext = createContext<contextProps | undefined>( undefined );

export const StateProvider = ({ children }: any) => {

  const [ isOpen, setIsOpen ] = useState(false)

  return (

    <StateContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </StateContext.Provider>
    
  )
}

export const useStateValue = () =>{
  const context = useContext(StateContext)
  if(!context){
    throw new Error('useStateValue must be use inside the StateProvider ')
  }
  return context
} 