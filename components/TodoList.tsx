'use client'

import { ITodo } from "@/types";
import TodoInputForm from "./form/TodoInputForm";
import { Button } from "./ui/button";
import { upD, upD2, upDateCompleted } from "@/app/_actions/todo.crud";
import { useEffect, useState } from "react";
import { revalidatePath } from "next/cache";


interface Props {
  todos: ITodo[];
}
export default function TodoList({ todos }: Props) {
  const [check, setCheck] = useState<boolean>()
  useEffect (()=>{
    check
  },[check])
  return (
    <main className="w-3/6">
      <TodoInputForm />
      <ul>
        {todos.map((todo) => (
          
          <li key={todo.id} className="bg-gray-400 m-2 "  >
            <div className="flex" >
              <input type="checkbox" checked={!!todo.completed} onChange={(e)=>{
                // setCheck(e.currentTarget.checked)
                if (e.currentTarget.checked){
                  upD(todo.id, (check||false))
                } else{
                  upD2(todo.id, (check||false))
                  
                } 
              }
                } className="mr-5 m-1 w-5 h-5" />
              <p>{todo.task}</p>
            </div>
            
           
            </li>
        ))}
      </ul>
    </main>
  );
}
