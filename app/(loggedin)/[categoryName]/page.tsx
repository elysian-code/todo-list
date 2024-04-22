import SideBar from "@/components/SideBar";
import TodoList from "@/components/TodoList";
import { Metadata } from "next";
import { _getCount, _getTodos } from "../../_actions/todo.crud";
import { prisma } from "@/db";
import { getServerSession } from "next-auth/next"
import { authOption } from "../../utils/auth";
import Container from "@/components/container";
import { _getUser } from "@/app/_actions/users.crud";
import { revalidatePath } from "next/cache";


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

  interface SessionUser {
    id: number;
  }

  const userId = (session?.user as SessionUser)?.id;

 

  const todos = await _getTodos(categoryName, session?.user?.email as string);

  const home = await _getCount("home", userId);
  const completed = await _getCount("completed", userId);
  const today = await _getCount("today", userId);

  const counts = { home: home, completed: completed, today: today };

  const categories = await prisma.categories.findMany({
    where: {
      UserId: userId,
    },
    include: {
      _count: {
        select: {
          todos: {
            where: {
              OR: [{ completed: false }, { completed: null }],
              User: {
                email: session?.user?.email as string,
              },
              deletedAt: null,
            },
          },
        },
      },
    },
  });

  

  return (
    <Container>
      <div className={` flex justify-between h-screen overflow-hidden`}>
        <SideBar
          currentCategory={categoryName}
          defaultCount={counts}
          categories={categories}
        />
        <div className='w-full mx-auto'>{JSON.stringify(userId)}
          <TodoList todos={todos as any} categories={categories} />
        </div>
      </div>
    </Container>
  );
}
