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
    loading...
    </>
}

// console.log(data)
    return <>
    {children}
    </>
}