'use client'

import { useSession } from 'next-auth/react'
import {redirect} from "next/navigation"
export default function LoggedInLayout({children}:{children: React.ReactNode})
{


const {data} = useSession({
    required: true,
onUnauthenticated() {
    redirect('/login')
},
})

if(!data?.user){
    return<>
      
        <div className="flex items-center gap-4 justify-center h-screen"><p className='animate-pulse'>please wait...</p>
          <div className="border-x-4 border-blue-500 border-solid animate-spin rounded-full h-4 w-4"></div>
        </div>

      
    </>
}


    return <>
    {children}
    </>
}