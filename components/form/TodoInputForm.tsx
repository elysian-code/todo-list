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

export default function TodoInputForm({categories}:{categories: Categories[]}) {

  const {data: session} = useSession()
  // const userId = session?.user?.id
  const form = useForm<ITodo>({
    defaultValues: {
      UserId: session?.user?.id,
      task: '',
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

  const { theme } = useTheme()
  
  // useEffect(()=>{
  //   const handleClick = (e: MouseEvent)=>{
  //     const inp = document.querySelector('.inp')
      
  //     if(e.target.classList.contains('unaffected') || e.target.classList.contains('light')){
        
  //       return(inp? inp.focus(): null)
  //     }
      
  //   }
  //   document.addEventListener('click', handleClick)
  //   return ()=>{
  //     document.removeEventListener('click', handleClick)
  //   }
  // },[])
  
  
  //   const cateDAte  =form.getValues('user.')
  //   cateDAte.
  //  const [title,date] = form.getValues(['title','date'])

const { focus, setFocus } = useFocusValue()

  //   form.setValue('title','')
  //   // form.reset({});
  //   const title = form.watch("title");
  //   form.getValues('')
  //   let _title = "abc";
  return (
    // <div>
    //   <div>{JSON.stringify(session?.user)}</div>
      <div  onClick={(e)=>{
        e.stopPropagation()
        setFocus(true)
      }} className="unaffected inp flex cursor-pointer items-center space-x-2 border-2 h-12 mt-3 rounded-lg" >

        {focus? (<div className={`flex ${theme === 'dark'? 'bg-gray-950':' bg-white'} items-center space-x-2 border-2 h-12 w-full rounded-lg`}>
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
      <div className="flex justify-between items-center text-slate-400 w-full rounded-md">
        
        <Label className="ml-3"> Create new task</Label>
        <div className={`${theme === 'dark'? 'bg-black': 'bg-slate-300'}  h-5 w-5 my-auto rounded-md items-center flex justify-center mx-3 text-center`}>E
        </div>
      </div>) }
        
      
    </div>
    // </div>
    
  );
}
