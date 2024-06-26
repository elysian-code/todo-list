"use client";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { ITodo } from "@/types";
import { _createTodo } from "@/app/_actions/todo.crud";
import { DatePickerDemo } from "../ui/date-picker";
import CategoryPicker from "../category-picker";
import { Categories } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Label } from "../ui/label";
import { useFocusValue } from "@/app/toggleContext";
import { useTheme } from "next-themes";
import { _getUser } from "@/app/_actions/users.crud";
import { useEffect, useState } from "react";
import { UserDetail } from "../TodoList";

interface Detail extends UserDetail {
  id?: number;
}

export default function TodoInputForm({categories}:{categories: Categories[]}) {

  const {data: session} = useSession()
  
  const currentUser: Detail = {
    ...session?.user,
  }

  const form = useForm<ITodo>({
    defaultValues: {
      UserId: currentUser?.id,
      task: '',
      category: {
        title:'',
        color:''
      }
    },
  });

  async function saveTodo() {
    let data = form.getValues();
    
    console.log(data.UserId)
    console.log(data);
    const todo = await _createTodo(data);
    
    //    todo.category
  }

  const { theme } = useTheme()
  
  
 const { focus, setFocus } = useFocusValue()

  
  return (
    // <div>
    //   <div>{JSON.stringify(session?.user)}</div>
    <div  onClick={(e)=>{
        e.stopPropagation()
        setFocus(true)
      }} className={`unaffected ${focus && theme === 'dark'? '' : !focus && theme === 'dark'? 'bg-slate-950': 'bg-gray-300'} inp flex cursor-pointer items-center space-x-2 h-12 border-none mt-3 rounded-lg`} >

        {focus? (<div className={`flex ${theme === 'dark'? 'bg-slate-950':' bg-white'} items-center space-x-2 border-none h-12 w-full rounded-lg`}>
          <div className="bg-slate-200 my-1 rounded-md ml-3 ">
            <div className="w-5 h-5"></div>
          </div>
          <Input className="unaffected inp h-8 border-none ml-0 "
        {...form.register("task")}
        placeholder="Create new task"
        
        autoFocus={focus}
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            // console.log("..");
            saveTodo();
            
            e.currentTarget.value = ''
           
          }
        }}
        
        
      />
      <div  className="unaffected flex justify-end px-3">
        <DatePickerDemo form={form} {...form.register("dueDate")}/>
        <CategoryPicker form={form} categories={categories}/>
      </div>
      </div>): (
      <div className={`flex justify-between items-center ${theme === 'dark'? '' : 'text-slate-400' } w-full rounded-md`}>
        
        <Label className="ml-3"> Create new task</Label>
        <div className={` ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'} h-5 w-5 my-auto rounded-md items-center flex justify-center mx-3 text-center`}>E
        </div>
      </div>) }
        
      
    </div>
   
    
  );
}
