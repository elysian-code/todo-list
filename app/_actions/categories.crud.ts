"use server";

import { prisma } from "@/db";
import { revalidatePath } from "next/cache";


interface IData{
  title: string;
  color:string;
  UserId: number
}
export async function _createCategory(data: IData) {
  await prisma.categories.create({
    data: {
      title: data.title,
      color: data.color,
      User:{
        connect: {
          id: data.UserId
        },
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  revalidatePath("/[categoryName]");
}

