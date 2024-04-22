import { User } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";

declare module 'next-auth' {
    interface session {
        user: {
            id: number;
            email: string;
            firstName: string;
            lastName: string;
            password: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            deletedAt: Date | null;
        } & DefaultSession['user']
    }

    interface User {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        deletedAt: Date | null;
    } 
}

