import Link from "next/link";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import { _getTodos } from "@/app/_actions/todo.crud";

interface Props {
  currentCategory: string;
 
}
export default function SideBar({ currentCategory }: Props) {
  const defaultCategories = [
    { title: "Home", Icon: Icons.home },
    { title: "Completed", Icon: Icons.completed },
    { title: "Today", Icon: Icons.today },
  ];
  
  return (
    <div className="h-full p-3 w-96 rounded-md">
      <aside className="border-2 rounded-3xl flex flex-col bg-slate-50 space-y-1 h-full p-8">
        {defaultCategories.map((props, index) => (
        <CategoryNavItem
            currentCategory={currentCategory}
            
            key={index}
            {...props}
          />
        ))}
      </aside>
    </div>
  );
}
async function CategoryNavItem({
  title,
  Icon,
  currentCategory,
  
}: {
  title: string;
  Icon?: any;
  currentCategory: string;
 
}) {

  // const items = await _getTodos(currentCategory)
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
          <Icon className="w-4 h-4 text-muted-foreground" />
          <p className="font-semibold text-muted-foreground">{title}</p>
          <span className="p-2 bg-slate-300 border-solid flex-end">{}</span>
        </div>
      </Link>
    </Button>
  );
}
