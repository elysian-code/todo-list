'use client';

import React from 'react'
import { signIn, useSession } from "next-auth/react";
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const login = () => {

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    })
const s = useSession()
  return (
    <div className='pt-10'>
{JSON.stringify(s)}
        <form onSubmit={async (e) => {
            e.preventDefault()
            const res = await signIn('credentials', 
                {email: form.getValues("email"), password: form.getValues("password"), callbackUrl:'/home'}
                )
                console.log(res)

        }} className='flex flex-col gap-4 w-1/3 mx-auto mt-10 border-gray-200 border-2 p-4 rounded-md'>
            <div>
                <label htmlFor="email">Email</label>
                <Input type="text" placeholder="email" id='email' { ...form.register("email")} />
            </div>
            <div>
                <label htmlFor="password">Password</label><br />
                <Input type="password" placeholder="password" id='password' {...form.register("password")} />
            </div> 
            <Button type="submit">Login</Button>

        </form>
    </div>
  )
}

export default login