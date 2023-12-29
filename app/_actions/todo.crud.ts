"use server";

import { prisma } from "@/db";
import { ITodo } from "@/types";
import { Prisma, Todos } from "@prisma/client";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";

export async function _getCount() {
  
 let count = {
  home: 1 as any,
  completed: 1 as any,
  today: 1 as any
 }

  count.home = await prisma.todos.count({
    where:{
      OR: [{completed: false}, {completed: null}]
    }
  })
  
  count.completed = await prisma.todos.count({
    where: {
      completed: true
    }
  })

  count.today = await prisma.todos.count({
    where: {
      dueDate: {
        gt: dayjs().subtract(1, "day").toISOString(),
        lt: dayjs().add(1, "day").toISOString()
      }
    }
  })
  //Home, Completed, Today
  // const where: Prisma.TodosWhereInput = {
  //   deletedAt: null,
  // };
  // switch (categoryName) {
  //   case "Home":
  //     where.OR = [{ completed: false }, { completed: null }];

  //     //   {
  //     //     not: true,
  //     //   };
      
      
  //     break;
  //   case "Completed":
  //     where.completed = true;
  //     break;
  //   case "Today":
  //     where.dueDate = {
        
  //       gt: dayjs().subtract(1, "day").toISOString(),
  //       lt: dayjs().add(1, "day").toISOString()
  //     };
  //     break;
  //   default:
  //     where.category = {
  //       title: categoryName,
  //     };
  // }
  
  // const todos = await prisma.todos.count({
  //   where: {
  //     category: {
  //       title: categoryName
  //     }
  //   },
  // });
  // return todos;
  return count
}
export async function _getTodos(categoryName: string) {
  
  //Home, Completed, Today
  const where: Prisma.TodosWhereInput = {
    deletedAt: null,
  };
  switch (categoryName) {
    case "Home":
      where.OR = [{ completed: false }, { completed: null }];

      //   {
      //     not: true,
      //   };
      
      
      break;
    case "Completed":
      where.completed = true;
      break;
    case "Today":
      where.dueDate = {
        
        gt: dayjs().subtract(1, "day").toISOString(),
        lt: dayjs().add(1, "day").toISOString()
      };
      break;
    default:
      where.category = {
        title: categoryName,
      };
  }
  
  const todos = await prisma.todos.findMany({
    where,
    include: {
      category: true,
    },
  });
  return todos;
}
export async function _createTodo(todo: ITodo) {
  // todo.
  // todo.category.
  const newTodo = await prisma.todos.create({
    data: {
      task: todo.task,
      // dueDate: new Date(),
      dueDate: todo.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      category: todo.category.title
        ? {
            connectOrCreate: {
              where: {
                title: todo.category.title,
              },
              create: {
                title: todo.category.title,
                createdAt: new Date(),
                updatedAt: new Date(),
                
              },
            },
          }
        : undefined,
    },
    include: {
      category: true,
    },
  });
  revalidatePath("/[categoryName]");
  
  return newTodo;
}


export async function upDateCompleted(id:number,check:boolean) {
  const uCom = await prisma.todos.update({
    where: {
      id: id
    },
    data:{
      completed: check
    }
  })
  revalidatePath("/[categoryName]")
  return uCom
}

export async function _todoRecycleBin() {
  const todos = await prisma.todos.findMany({
    where: {
      deletedAt: {
        not: null,
      },
    },
  });
}
