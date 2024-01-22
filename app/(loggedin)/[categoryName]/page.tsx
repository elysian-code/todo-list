import SideBar from "@/components/SideBar";
import TodoList from "@/components/TodoList";
import { Metadata } from "next";
import { _getTodos } from "../../_actions/todo.crud";
import { prisma } from "@/db";
import { getServerSession } from "next-auth/next"
import { authOption } from "../../utils/auth";
import { redirect } from "next/dist/server/api-utils";
import { Link } from "lucide-react";
import { Button } from "react-day-picker";
import LandingPage from "@/components/landing-page";


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
    // const { categoryId } = searchParams;

  const session = await getServerSession(authOption);
  
  

  
  
  console.log(`the current session is ${session}`);
  const userId = session?.user?.id

  const todos = await _getTodos(categoryName, userId);
  console.log(todos);
  const categories = await prisma.categories.findMany({
    where: {
      UserId: userId
    },
    include: {
      _count: {
        select: {
          todos: {
            where: {
              OR: [{ completed: false }, { completed: null }],
              User: {
                id: userId
              }

            },
          },
        },
      },
    },
  });
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <SideBar currentCategory={categoryName}  categories={categories}/>
      
      <TodoList todos={todos as any} categories={categories}/>
    </div>
  );
}
