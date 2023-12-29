"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import { _getCount } from "@/app/_actions/todo.crud";
import CategoryIcon from "./category-icon";
import { useForm } from "react-hook-form";
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { _createCategory } from "@/app/_actions/categories.crud";
import { ICategory, ITodo } from "@/types";
import { Categories } from "@prisma/client";
import { log } from "console";

interface Props {
  currentCategory: string;
  todos:ITodo[]
  count: {
    home: Promise<number>
    completed: Promise<number>
    today: Promise<number>
  }

  categories: Categories[];
 
}
export default function SideBar({ currentCategory, count, categories}: Props) {
  console.log(count.completed);
  
  
  const defaultCategories = [
    { title: "Home", Icon: Icons.home, todoCount: count.home },
    { title: "Completed", Icon: Icons.completed, todoCount: count.completed },
    { title: "Today", Icon: Icons.today, todoCount: count.today },
  ];
  
  return (
    <div className="h-full p-3 w-3/12 rounded-md">
      <aside className="border-2 rounded-3xl flex flex-col bg-slate-50 space-y-1 h-full p-8">
        {defaultCategories.map((props, index) => (
        <CategoryNavItem
            currentCategory={currentCategory}
            
            key={index}
            {...props}
          />
        ))}
        {categories.map((category, index) => (
          <CategoryNavItem
            todoCount={ category._count.todos }
            
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
  const form = useForm({
    defaultValues: {
      title: "",
      color: "",
    },
  });
  async function saveCategory() {
    const data = form.getValues();
    await _createCategory(data);
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
          }
        }}
        className="border-none h-6 w-36 focus:outline-none focus:border-transparent"
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
  // _getTodos()
  return (
    <Button
      asChild
      variant={
        title?.toLowerCase() == currentCategory?.toLowerCase()
          ? "secondary"
          : "ghost"
      }
    >
      <Link href={`/${title}`} className="">
        <div className="flex-1 flex items-center space-x-2">
          {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
          {color && <CategoryIcon color={color} />}
          <p className="font-semibold text-muted-foreground">{title}</p>
          
          {/* <div>{todoCount || 0}</div> */}
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

