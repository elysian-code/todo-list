'use client'

import { useSession } from 'next-auth/react'
import {redirect} from "next/navigation"
export default function LoggedInLayout({children})
{


const {data} = useSession({
    required: true,
onUnauthenticated() {
    redirect('/login')
},
})

if(!data?.user){
    return<>
      
        <div className="flex items-center gap-4 justify-center h-screen"><p>please wait...</p>
          <div className="border-x-4 border-blue-500 border-solid animate-spin rounded-full h-4 w-4"></div>
        </div>

      
    </>
}

// console.log(data)
    return <>
    {children}
    </>
}