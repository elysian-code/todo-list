"use client";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { useState } from "react";
import { ITodo } from "@/types";
import { _createTodo } from "@/app/_actions/todo.crud";
import { DatePickerDemo } from "../ui/date-picker";
export default function TodoInputForm({}) {
  const form = useForm<ITodo>({
    defaultValues: {
      task: "",
      completed: false,
      dueDate: null,
      category: {},
    },
  });
  async function saveTodo() {
    const todo = await _createTodo(form.getValues());
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
    </div>
  );
}
