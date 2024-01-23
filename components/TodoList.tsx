'use client'

import { ITodo } from "@/types";
import TodoInputForm from "./form/TodoInputForm";
import { Button } from "./ui/button";
import { _delete, _updateTodo, upDateCompleted } from "@/app/_actions/todo.crud";
import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Categories } from "@prisma/client";
import CategoryIcon from "./category-icon";
import { signOut }from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useStateValue } from "@/app/toggleContext";
import { Edit2Icon, Menu, MoreVertical, Trash2Icon } from "lucide-react"; 
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "next-themes";
import DottedMenu from "./dotted-menu";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";







interface Props {
  todos: ITodo[];
  categories: Categories[]
}
export default function TodoList({ todos, categories }: Props) {

  

  
  const { isOpen, setIsOpen } = useStateValue()
  const [greetings, setGreetings] = useState('')

  // console.log(JSON.stringify(isOpen))

  useEffect(() =>{
    const currentTime = new Date().getHours();

    if(currentTime >=0 && currentTime < 12){
      setGreetings('Good morning')
    }else if(currentTime >= 12 && currentTime < 17){
      setGreetings('Good afternoon')
    }else{
      setGreetings('Good evening')
    }
  })

  function toggle () {
    
    setIsOpen(true)
    

    
  }

  const { theme } =  useTheme()
  const {data: session} = useSession()

  let userDetails = session?.user
  return (
    <main className={`flex-col px-8  mx-auto }`} >
      <div>
        <div className={`flex justify-between lg:hidden ${isOpen? 'hidden' : 'block'} mt-4`}>
        
          <button onClick={()=>{
            toggle();
            console.log(isOpen)
          }}>
            <Menu className="sm:w-8 sm:h-8 md:w-10 md:h-10 mt-2" />
          </button>
        </div>
        <span className="float-right mt-4">
          <DottedMenu />
        </span>
      </div>
      
        
      <div className="h-20 text-xl  pt-6">{ `${greetings} ${userDetails?.firstName} ${userDetails?.lastName}` }</div>

      <TodoInputForm categories={categories} />
      <ul className="flex flex-col mt-2 space-y-1">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
          
        ))}
      </ul>
      
    </main>
    
  );

  function TodoItem({ todo }: { todo: ITodo }) {
    const [check, setCheck] = useState(todo.completed || false)
    const [ edit, setEdit ] = useState(false)
    const [ task, setTask ] = useState(todo.task)

    function updateValue(){

      _updateTodo(todo.id, task)
    }


    return (
      <li key={todo.id} className={`inline-flex items-center p-2 ${theme === 'dark'? 'bg-slate-950': 'bg-slate-50'}  rounded-md`}>
        <div className="inline-flex flex-1 justify-between items-center p-2">
          
            <div className="flex">
              <Checkbox 
                className="my-auto"
                checked={check}
                onCheckedChange={async(e)=> {
                  setCheck(e as any)
                  setTimeout(async () => {
                    await upDateCompleted(todo.id, e as any)
                  },1000)
                }}
                id="terms"
                
                />{edit? (<Input autoFocus={setEdit as any} onBlur={() => setEdit(false)}
                 value={task} 
                 onInput={(e)=>{
                  
                  setTask(e.currentTarget.value as any)
                  
                 }}

                 onKeyDown={(e) => {
                  if (e.code == "Enter") {
                    // console.log("..");
                    updateValue()
                    setEdit(false)
                  }
                }}
                 
                 className="ml-2 font-semibold
                  leading-none peer-disabled:opacity-70 h-8"/>): (<label 
                htmlFor="terms"
                className={`${theme === 'dark'? 'text-gray-300': 'text-gray-600'}
                 ml-2 font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
              >
                {todo.task}
              </label>)  }
                
            </div>
            
            <div className="flex justify-center text-center">
            
              <EditTodoIcon />
            
              {todo.categoryId && <CategoryIcon className='my-auto' color={todo.category?.color} />}
            </div>

        </div>
        
      </li>
    )

    
    function EditTodoIcon(){

      return(

        <Popover>
          <PopoverTrigger>
            <Button variant={"ghost"} size={"sm"} className="h-5 p-2 mr-2" >
              
              <MoreVertical className="w-5 h-5"/>
                
            </Button>
                      
          </PopoverTrigger>
            <PopoverContent className="flex-col w-32">

              <Button variant={'ghost'} onClick={()=> {
                setEdit(true)
              }} className="w-full">
                <Edit2Icon className="w-3 ml-0"/>
                <p className="pl-2 ml-2">Edit</p>
              </Button>
              <Button onClick={()=> {
                _delete(todo.id)
              }} variant={'ghost'} className="w-full">
                <Trash2Icon />
                <p className="pl-2">Delete</p>
                </Button>
              
            </PopoverContent>
        </Popover>
      )


    }
  }



}
