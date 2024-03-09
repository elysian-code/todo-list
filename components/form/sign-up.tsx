
'use client';


import { User } from "@prisma/client"
import { Controller, useForm } from "react-hook-form"
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { _createUser, _getUser } from "@/app/_actions/users.crud";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link'
import { useTheme } from "next-themes";



export default function SignUpForm() {

interface IData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  password2: string;
}
    
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      password2: '',
    },
  });

  const onSubmit = async (data: IData) => {
    
    if (data.password !== data.password2) {
      return toast.error('invalid password confirmation')
    }
    const user = await _getUser(data.email)
     
    if (user) return toast.error('user with this email already exist')  // Handle form submission logic here
    const details = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    }
      await _createUser(details)
      
      await signIn('credentials',
        { email: data.email, password: data.password, callbackUrl: '/home' }
      )
    return toast.success('Account creation successful')
  };
  const {theme} = useTheme()
  return (
    <div className="w-full max-w-sm mx-auto rounded-md border-2 md: my-[4rem]">
      <h2 className="text-2xl text-bolder text-center p-10 ">sign up</h2>
        <form className=" rounded px-8  pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
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
                <label className="block text-gray-700 text-sm font-bold mb-2" >First Name:</label>
                <Controller
                name="firstName"
                control={control}
                rules={{ required: 'First Name is required' }}
                render={({ field }) => <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" {...field} />}
                />
                {errors.firstName && <p className="text-red-500 text-xs italic pt-2" >{errors.firstName.message}</p>}
            </div>

            <div className="mb-4 ">
                <label className="block text-gray-700 text-sm font-bold mb-2" >Last Name:</label>
                <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last Name is required' }}
                render={({ field }) => <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" {...field} />}
                />
                {errors.lastName && <p className="text-red-500 text-xs italic pt-2" >{errors.lastName.message}</p>}
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
            <div className="mb-4 ">
                <label className="block text-gray-700 text-sm font-bold mb-2" >Confirm Password:</label>
                <Controller
                name="password2"
                control={control}
                rules={{ required: 'Password Confirmation is required' }}
                render={({ field }) => <Input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" {...field} />}
                />
                {errors.password2 && <p className="text-red-500 text-xs italic pt-2" >{errors.password2.message}</p>}
            </div>

            <Button variant={ theme === 'dark' ? 'secondary': 'default'} className="w-full" type="submit">Submit</Button>
            
        </form>
        <p className="text-center p-4 italic">Already have an account? <Link className="text-sky-600" href={'/login'}>click here to login</Link></p>
        
    </div>
    
  );

}