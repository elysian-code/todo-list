"use server";

import { prisma } from "@/db";
import { revalidatePath } from "next/cache";
import { _getCount } from "./todo.crud";

interface IData{
  title: string;
  color:string;
}
export async function _createCategory(data: IData) {
  await prisma.categories.create({
    data: {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  revalidatePath("/[categoryName]");
}

