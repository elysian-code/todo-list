'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { LogOut, MoreVertical } from "lucide-react"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"
import { signOut } from "next-auth/react"
import { usePopValue } from "@/app/toggleContext"
import { useTheme } from "next-themes"

  
export default function DottedMenu(){


  const { isPop, setIsPop } = usePopValue()
  const { theme } = useTheme()

  return(
      <>
        <Popover open={isPop} onOpenChange={setIsPop}>
          <PopoverTrigger>
            <Button className={`w-10 ${theme? '' : 'bg-gray-300'}  rounded-lg h10 `} variant={"outline"} size={"icon"}>
              <MoreVertical/>
            </Button>
                      
          </PopoverTrigger>
            <PopoverContent className="w-40">
              <Button className="pl-0" variant={"ghost"}>
                <ModeToggle /> 
              </Button>
              <Button className="pl-0" variant={"ghost"}>
                <LogOutPop />
              </Button>
             

              
              
            </PopoverContent>
        </Popover>

        </>
    )

  }

function LogOutPop(){

  const { setIsPop } = usePopValue()


  return(

    <Popover>
          <PopoverTrigger>
            <Button variant={"ghost"} >
              <div className="flex">
                <LogOut className="pl-0"/>
                <p className="pl-3" >Logout</p>
              </div>
            </Button>
                      
          </PopoverTrigger>
            <PopoverContent className="">
              <div className="w-60 ">
                <p className="text-yellow-500 h-28 pt-10 text-center">Logout?</p>
                <div className="flex justify-between">
                  <Button onClick={()=> setIsPop(false)} variant={"ghost"}>No</Button>
                  <Button onClick={() => {
                    setIsPop(false)
                    signOut()
                  }} variant={"ghost"} className="text-red-700">Yes</Button>
                </div>
              </div>
            </PopoverContent>
        </Popover>
    
  )
}