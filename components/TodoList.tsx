'use client'

import { ITodo } from "@/types";
import TodoInputForm from "./form/TodoInputForm";
import { Button } from "./ui/button";
import { upDateCompleted } from "@/app/_actions/todo.crud";
import { useState } from "react";


interface Props {
  todos: ITodo[];
}
export default function TodoList({ todos }: Props) {
  const [check, setCheck] = useState<boolean>()
  return (
    <main className="w-3/6">
      <TodoInputForm />
      <ul>
        {todos.map((todo) => (
          
          <li key={todo.id} className="bg-gray-400 m-2 "  >
            <div className="flex" >
              <input type="checkbox" checked={!!todo.completed} onChange={()=>{
                check? setCheck(false) : setCheck(true)
                upDateCompleted(todo.id,(check||false))}
                } className="mr-5 m-1 w-5 h-5" />
              <p>{todo.task}</p>
            </div>
            
           
            </li>
        ))}
      </ul>
    </main>
  );
}
