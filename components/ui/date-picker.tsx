"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ShrinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { UseFormReturn } from "react-hook-form"
import { ITodo } from "@/types"
import { Badge } from "./badge"
interface Props {
  form : UseFormReturn<ITodo, any, undefined>
}
export function DatePickerDemo({form}:Props) {
  const [open, setOpen] = React.useState<boolean>(false)
  const date = form.watch('dueDate')

  function handleRefCheck (this:any) {
    let currentElement = this
    while(currentElement){
      if(currentElement.hasAttribute('ref') && currentElement.getAttribute('ref') === 'focusRef'){
        return(console.log(true))
      }
      currentElement = currentElement.parentNode
    }
    return(console.log(false))
  }

  return (
    <Popover  open={open}  onOpenChange={setOpen}>
      <PopoverTrigger className="unaffected">
        <Button
        
        
          variant={"outline"}
          
          className={cn(
            "unaffected w-8 h-8 border-none p-0 justify-center inline-flex flex-row-reverse text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <Badge className="unaffected w-1 h-1 mt-0" variant={
            date? 'destructive':'secondary'
            }/>
          <CalendarIcon className="unaffected h-4 w-4" />
          {/* {date && date.toDateString()}  */}
          {/* {date ? format(date, "PPP") : <ShrinkIcon/>} */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="unaffected w-auto p-0">
        <Calendar
        className="unaffected"
          mode="single"
          selected={date as any}
          onSelect={(e)=> {
            form.setValue('dueDate', e as any)
            setOpen(false)
        }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
