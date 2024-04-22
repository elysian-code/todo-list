"use client"


import Link from "next/link";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import CategoryIcon from "./category-icon";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { IData, _createCategory } from "@/app/_actions/categories.crud";
import { Categories, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useStateValue } from "@/app/toggleContext";
import { _getCount } from "@/app/_actions/todo.crud";
import { useTheme } from "next-themes";
import { Session } from "next-auth";


interface ICategory extends Categories {
  count?: number | undefined;
  _count?: {
    todos: number | undefined;
  }
}

interface Props {
  currentCategory: string;
  defaultCount: {
    home: number | undefined;
    completed: number | undefined;
    today: number | undefined;
  };
  categories: ICategory[];
 
}

interface ExtendedUser {
  id?: number | null | undefined;
}

interface MergedUser extends ExtendedUser {
  name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined; 
}

export default function SideBar({ currentCategory, defaultCount, categories}: Props) {

  const { theme } = useTheme();

  
  
  const { isOpen, setIsOpen } = useStateValue();

  useEffect(()=>{
    const handleOutsideClick = (e: any) => {
      if(isOpen && !e.currentTarget.closest('.nav-bar')){
        setIsOpen(false)
      }
      document.addEventListener('click', handleOutsideClick)
    }
    document.removeEventListener('click', handleOutsideClick)
  },[isOpen])

  const home = { title: "Home", Icon: Icons.home , _count: undefined, count: defaultCount.home }
  const completed = { title: "Completed", Icon: Icons.completed, _count: undefined, count: defaultCount.completed }
  const today = { title: "Today", Icon: Icons.today, _count: undefined, count: defaultCount.today}
  
  const allCategory = [home, completed, today, ...categories]
  // fixed top-0 left-0 w-250 h-full bg-gray-800 text-white z-10 lg:z-2000
  return (
    <div className={`nav-bar ${isOpen? 'block md:z-1000 sm:w-full' : 'hidden'} lg:block  p-3 lg:w-4/12  rounded-md`} onClick={()=> setIsOpen(false)}>
    <aside className={`border-2 rounded-3xl flex flex-col ${theme=== 'dark'? 'bg-slate-950': 'bg-slate-50'} space-y-1 h-full p-8`}>
        
        {allCategory.map((category, index) => (
          <CategoryNavItem
            todoCount={ category._count?.todos || category.count }
            
            currentCategory={currentCategory}
            key={index}
            {...(category as any)}
          />
        ))}
        <NewTodoCategoryForm/>
      </aside>
    </div>
  );
}



function NewTodoCategoryForm({}) {
  const { data: session } = useSession()
  // console.log(`the first console ==> ${typeof(session?.user?.id)}`)
  
  const MergedUser: MergedUser = {
    ...session?.user
  }
  const form = useForm({
    defaultValues: {
      title: "",
      color: "",
      UserId: MergedUser.id
    },
  });
  async function saveCategory() {
    // const data = form.getValues();
    let data = form.getValues();
    // data.UserId = session?.user?.id;
    // console.log(data.UserId)
    // console.log(data);
    await _createCategory(data as IData);
    form.reset({
      color: "yellow-600",
    });
  }
  const color = form.watch("color");
  const [open, setOpen] = useState(false);
  return (
    <div className="inline-flex space-x-2 items-center">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger>
          <div className="flex items-center space-x-2 shadow p-2 rounded-lg">
            <div
              className={cn("w-3 h-3 border-2 rounded", `border-${color}`)}
            ></div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="grid gap-2 grid-cols-8">
            {colors.map((c, i) => (
              <button
                onClick={() => {
                  form.setValue("color", c);
                  setOpen(false);
                }}
                className="p-2 hover:border-gray-400 border-2 rounded-md border-transparent"
                key={i}
              >
                <div className={cn(`bg-${c} w-4 h-4 rounded `)}></div>
              </button>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            // console.log("..");
            saveCategory();
            e.currentTarget.value = ''
          }
        }}
        className="border-none h-6 focus:outline-none focus:border-transparent"
        {...form.register("title")}
        placeholder="Create a new list"
      />
    </div>
  );
}
function CategoryNavItem({
  title,
  color,
  Icon,
  currentCategory,
  todoCount,
  
}: {
  title: string;
  Icon?: any;
  color?: string;
  currentCategory: string;
  todoCount?: number | Promise<number>;
 
}) {
  
  const { theme } = useTheme();
  const { isOpen, setIsOpen } = useStateValue()

  return (
    <Button
      asChild
      variant={
        title?.toLowerCase() == currentCategory?.toLowerCase()
          ? "secondary"
          : "ghost"
      }
      onClick={()=>setIsOpen(false)}
    >
      <Link href={`/${title}`} className="">
        <div className="flex-1 flex items-center space-x-2">
          {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
          {color && <CategoryIcon color={color} />}
          <p className="font-semibold text-muted-foreground">{title}</p>
          
          
        </div>

        <div>
          <span className={`${theme === 'dark'? 'bg-slate-900': 'bg-slate-300'}  w-6 h-6 px-1 rounded-full`}>{todoCount || 0}</span>
        </div>
        
      </Link>
      
    </Button>
  );
}
const colors = [
  "blue-800",
  "blue-600",
  "sky-600",
  "sky-400",
  "green-600",
  "yellow-600",
  "yellow-300",
  "red-400",
  "red-600",
  "red-800",
  "pink-800",
  "pink-300",
  "purple-300",
  "purple-800",
  "gray-300",
  "gray-600",
];

