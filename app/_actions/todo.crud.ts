"use server";

import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/db";
import { ITodo } from "@/types";





export async function _getTodos(categoryName: string, UserId: number) {
 
  //Home, Completed, Today
  const where: Prisma.TodosWhereInput = {
    deletedAt: null,
    User: {
      id: UserId,
    }
  };

  switch (categoryName.toLowerCase()) {
    case "home":
      where.OR = [{ completed: false }, { completed: null }];
      
      break;
    case "completed":
      where.completed = true;

      break;
    case "today":
      where.dueDate = {
        
        gt: dayjs().subtract(1, "day").toISOString(),
        lt: dayjs().add(1, "day").toISOString()
      },
      where.OR = [ { completed: null }, { completed: false } ]

      break;
    default:
      // where.category = {
      //   title: categoryName,
      // };

      where.AND = [{
        category: {
          title: categoryName
        }
      }, 
      {
        OR:[{
          completed: null
        }, {
          completed: false
        }]
      }]
  }
  
  try {
    const todos = await prisma.todos.findMany({
        where,
        include: {
          category: true,
          
        }
      });
      return todos;
  } catch (error) {
    console.log(error);
  }

  
}

export async function _getCount(categoryName: string, UserId: number) {
  
  try {
    switch (categoryName) {
        case "home":
          var todoCount = await prisma.todos.count({
            where:{
              OR: [{completed: null}, {completed: false}],
              User: {
                id: UserId
              },
              deletedAt: null
            }
          })
          
          
          break;
        case "completed":
          todoCount = await prisma.todos.count({
            where: {
              completed: true,
              User: {
                id: UserId
              },
              deletedAt: null
            }
          })
          break;
        case "today":

          todoCount = await prisma.todos.count({
            where: {
              dueDate: {
                gt: dayjs().subtract(1, "day").toISOString(),
                lt: dayjs().add(1, "day").toISOString()
              },
              User: {
                id: UserId
              },
              deletedAt: null,
              OR: [ { completed: null }, { completed: false } ]
            },
            
          })
          
          break;
        default:
          todoCount = await prisma.todos.count({
            where: {
              category: {
                title: categoryName
              },
              User: {
                id: UserId
              },
              updatedAt: null
            }
          })
          
      }
      
      
      
      return todoCount;
  } catch (error) {
    console.log(error);
  }
 
}

export async function _createTodo(todo: ITodo) {
  // todo.
  // todo.category.
      
  try {
    const newTodo = await prisma.todos.create({
        data: {
          task: todo.task,
          // dueDate: new Date(),
          dueDate: todo.dueDate,
          createdAt: new Date(),
          updatedAt: new Date(),
          category: todo.category.title? {
            connectOrCreate: {
              where: {
                title: todo.category.title,
              },
              create: {
                title: todo.category.title,
                color: todo.category.color,
                createdAt: new Date(),
                updatedAt: new Date(),
                User: {
                  connect: {
                    id: todo.UserId,
                  }
                }
                
              },
            },
          }: undefined,
          User: {
            connect: {
              id: todo.UserId,
            }
          }
        },
        include: {
          category: true,
        },

      });
      revalidatePath("/[categoryName]");
      
     return !newTodo? null : newTodo;
  } catch (error) {
    console.log(error);
  }
  
}

export async function upDateCompleted(id:number,check:boolean) {

  try {
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
  } catch (error) {
    console.log(error);
  }

  
}

export async function _updateTodo(id: number, task: string){

  try {
    await prisma.todos.update({
        where: {
          id: id
        },
        data: {
          task: task,
          updatedAt: new Date()

        }
      })
      revalidatePath('/')
  } catch (error) {
    console.log(error);
  }

}

export async function _delete(id: number) {

  try {
    await prisma.todos.update({
        where: {
          id: id
        },
        data: {
          deletedAt: new Date()
        }
        
      })
      revalidatePath("/")
  } catch (error) {
    console.log(error);
  }

  
}

export async function _todoRecycleBin() {

  try {
    const todos = await prisma.todos.findMany({
        where: {
          deletedAt: {
            not: null,
          },
        },
      })
  } catch (error) {
    console.log(error);
  }

}
