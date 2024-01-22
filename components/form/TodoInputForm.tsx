"use client";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { useState } from "react";
import { ICategory, ITodo } from "@/types";
import { _createTodo } from "@/app/_actions/todo.crud";
import { DatePickerDemo } from "../ui/date-picker";
import CategoryPicker from "../category-picker";
import { Categories } from "@prisma/client";
import { useSession } from "next-auth/react";
export default function TodoInputForm({categories}:{categories: Categories[]}) {

  const {data: session} = useSession()
  // const userId = session?.user?.id
  const form = useForm<ITodo>({
    defaultValues: {
      UserId: session?.user?.id,
      task: "",
      category: {
        title:'',
        color:''
      }

      
    },
  });
  async function saveTodo() {
    let data = form.getValues();
    data.UserId = session?.user?.id;
    console.log(data.UserId)
    console.log(data);
    const todo = await _createTodo(data);
    //    todo.category
  }
  //   const cateDAte  =form.getValues('user.')
  //   cateDAte.
  //  const [title,date] = form.getValues(['title','date'])

  //   form.setValue('title','')
  //   // form.reset({});
  //   const title = form.watch("title");
  //   form.getValues('')
  //   let _title = "abc";
  return (
    // <div>
    //   <div>{JSON.stringify(session?.user)}</div>
      <div className="flex  items-center space-x-2 border-2 mt-3 rounded-md" >
        
      <Input className="h-8 border-none focus:border-none"
        {...form.register("task")}
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            // console.log("..");
            saveTodo();
          }
        }}
      />
      <DatePickerDemo form={form} {...form.register("dueDate")}/>
      <CategoryPicker form={form} categories={categories}/>
    </div>
    // </div>
    
  );
}
