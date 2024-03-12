"use server";

import { prisma } from "@/db";
import { revalidatePath } from "next/cache";



    export interface IUser {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        
    }

export async function _createUser(userData: IUser) {

	try {
		await prisma.user.create({
							data: {
								...userData,
									createdAt: new Date(),
									updatedAt: new Date(),
							},
					});
					revalidatePath("/[categoryName]");
			}catch (error) {
				console.log(error)
				
			}
		
}

export async function _getUser(email:string) {
	const user = await prisma.user.findFirst({
		where: {
			email: email
		}
	})
	return user
}
// export async function_updateUser() {}
// export async function _getUsers() {
//   const users = await prisma.user.findMany({
//     where: {
//       // email: ''
//       email: {
//         contains: "@gmail.com",
//         // in: []
//         // not: ''
//         // notIn: ""
//       },
//     },
//     include: {
//       posts: {
//         where: {},
//         take: 5,
//         select: {
//           content: true,
//           title: true,
//           id: true,
//           authorId: true,
//         },
//       },
//     },
//   });
//   return users;
// }
// export async function _showUser(id) {}
// export async function _deleteUser(id) {}
