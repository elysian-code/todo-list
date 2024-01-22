
'use client';


import { User } from "@prisma/client"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { _createUser } from "@/app/_actions/users.crud";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";



export default function SignUpForm() {
    const form = useForm({
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            
        },
    })
    async function saveUser() {
        const user = await _createUser(form.getValues());
        
    }

    return (
        <div className="flex flex-col gap-4 w-1/3 mx-auto mt-6">
            <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...form.register("firstName")} />
            </div>
            <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...form.register("lastName")} />
            </div>
            <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...form.register("email")} />
            </div>
            <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" {...form.register("password")} />
            </div>
            <Button onClick={()=>{
                saveUser()
                return signIn()
                }}>Sign Up</Button>
        </div>
    )
}