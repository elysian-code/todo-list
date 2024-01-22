'use client'

import { ITodo } from "@/types";
import TodoInputForm from "./form/TodoInputForm";
import { Button } from "./ui/button";
import { upDateCompleted } from "@/app/_actions/todo.crud";
import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Categories } from "@prisma/client";
import CategoryIcon from "./category-icon";
import { signOut }from 'next-auth/react'
import { useSession } from 'next-auth/react'



interface Props {
  todos: ITodo[];
  categories: Categories[]
}
export default function TodoList({ todos, categories }: Props) {
  const [check, setCheck] = useState<boolean>()

  const [greetings, setGreetings] = useState('')

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

  const {data: session} = useSession()

  let userDetails = session?.user
  return (
    <main className="flex-col ml-24 w-3/6">
      <div className="h-20 pt-10">{ `${greetings} ${userDetails?.firstName} ${userDetails?.lastName}` }</div>

      <TodoInputForm categories={categories} />
      <ul className="flex flex-col mt-2 space-y-1">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
          
        ))}
      </ul>
      <div>
        <Button onClick={()=>signOut()}>logout</Button>
      </div>
    </main>
    
  );

  function TodoItem({ todo }: { todo: ITodo }) {
    const [check, setCheck] = useState(todo.completed || false)

    return (
      <li key={todo.id} className="inline-flex items-center space-x-2 rounded-md border-2">
        <div className="inline-flex flex-1 justify-between items-center p-2">
          
            <div className="flex">
              <Checkbox 
              
                checked={check}
                onCheckedChange={async(e)=> {
                  setCheck(e as any)
                  setTimeout(async () => {
                    await upDateCompleted(todo.id, e as any)
                  },1000)
                }}
                id="terms"
                
                />
                <label 
                htmlFor="terms"
                className="text-gray-600 ml-2 font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {todo.task}
              </label>
            </div>
            <div className="ml">
              {todo.categoryId && <CategoryIcon color={todo.category?.color} />}
            </div>

        </div>
        
      </li>
    )
  }
}
