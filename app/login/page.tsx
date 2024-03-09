'use client';

import React from 'react'
import Link from 'next/link'
import { signIn, useSession } from "next-auth/react";
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { redirect } from 'next/navigation';
import { _getUser } from '../_actions/users.crud';
import { toast } from 'react-toastify'
import {  useTheme } from 'next-themes';

const login = () => {
    

    const { control, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
          email: '',
          password: '',
        },
    });

  const { data } = useSession()

  if(data){
    redirect('./home')
  }

  const onSubmit =async (info: {email: string, password: string}) => {
    const { email, password } = info
    
    try {
        const res = await signIn('credentials',
        { 
            email: email,
            password: password,
            redirect: false,
            callbackUrl: '/home',
            
        }
        
    )
        if (res?.error) return toast.error(String(res.error))
    } catch (error) {
        toast.error('something went wrong')
    }
    

  

    toast.success('Login succcessful')
    
  }

  const { theme } = useTheme()
  
  return (
    <div className={` w-full max-w-sm mx-auto rounded-md border-2 md: my-[4rem]`}>
        <h2 className="text-2xl text-border text-center p-10 ">Sign In Below</h2>
        <form className={` rounded px-8 py-8 mb-4`} onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" >Email:</label>
                <Controller
                name="email"
                control={control}
                rules={{ required: 'Email is required' }}
                render={({ field }) => <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" {...field} />}
                />
                {errors.email && <p className="text-red-500 text-xs italic pt-2" >{errors.email.message}</p>}
            </div>

            <div className="mb-4 ">
                <label className="block text-gray-700 text-sm font-bold mb-2" >Password:</label>
                <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required' }}
                render={({ field }) => <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" {...field} />}
                />
                {errors.password && <p className="text-red-500 text-xs italic pt-2" >{errors.password.message}</p>}
            </div>
            
            <Button variant={theme === 'dark' ? 'secondary': 'default'} className="w-full" type="submit">Submit</Button>
            
        </form>
            <p className='text-center p-4' >click here to <Link className='text-center align-bottom italic text-blue-600' href='/signup'>create account</Link></p>
        
        
    </div>
  )
}

export default login