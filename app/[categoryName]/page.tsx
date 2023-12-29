import SideBar from "@/components/SideBar";
import TodoList from "@/components/TodoList";
import { Metadata } from "next";
import { _getCount, _getTodos } from "../_actions/todo.crud";
import { prisma } from "@/db";

export const metadata: Metadata = {
  title: "Home",
};
interface Props {
  searchParams: any;
  params: any;
}
export default async function TodoPage({
  searchParams,
  params: { categoryName },
}: Props) {
  //   console.log(searchParams);
  //   const { categoryId } = searchParams;
  const count = _getCount()
  
  
  const todos = await _getTodos(categoryName);
  console.log(todos);
  const categories = await prisma.categories.findMany({
    include: {
      _count: {
        select: {
          todos: {
            where: {
              OR: [{ completed: false }, { completed: null }],
            },
          },
        },
      },
    },
  });
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <SideBar currentCategory={categoryName} count={count} categories={categories}/>
      <TodoList todos={todos as any} categories={categories}/>
    </div>
  );
}
