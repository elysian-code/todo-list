"use client";

import { ITodo } from "@/types";
import { UseFormReturn } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CategoryIcon from "./category-icon";
import { Categories } from "@prisma/client";
import { Check, ChevronDown } from "lucide-react";



export default function CategoryPicker({
  form,
  categories,
  
}: {
  form: UseFormReturn<ITodo>;
  categories: Categories[];
  
}) {
  const color = form.watch("category.color");
  const title = form.watch("category.title");
  const Upcat = [...categories, { title: "No list" } as any]


  
  
  return (
    <div className="unaffected">
      <DropdownMenu >
        <DropdownMenuTrigger className="unaffected ">
          <Button className="unaffected h-8 space-x-2" variant={"secondary"}>
            <CategoryIcon color={color||"gray"} />
            <p className="unaffected font-semibold text-muted-foreground">
              {title||"No list"}
            </p>
            <ChevronDown className="unaffected w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {Upcat.map((c) => (
            <DropdownMenuItem
              className="unaffected"
              onClick={() => {
                form.setValue("category.title", c.title);
                form.setValue("category.id", c.id);
                form.setValue("category.color", c.color);

              }}
              key={c.id}
            >
              <div className="unaffected inline-flex space-x-2 items-center">
                <CategoryIcon className='unaffected' color={c.color || "gray"} />
                <span className="unaffected">{c.title}</span>
                {c.title == title && <Check className="unaffected w-4 h-4" />}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
