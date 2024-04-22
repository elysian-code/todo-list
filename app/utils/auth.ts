import { prisma } from "@/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import { User } from "@prisma/client"; 
import { DefaultSession } from "next-auth";



declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT  {
      user: Iuser;
     
  }
}

interface Iuser {
  id?: number;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  name: string;
  password?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    error: undefined,
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRETE,
    maxAge: 1 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt: async ({ token, user }) => {
      // token.user = user;
      console.log("===>", user);
      if (user) token.user = user as any;
      
      // {...token,...user}
      // token.usr = user;
      return token;
    },
    async session({ session, token}) {
      if (token.user) session.user = token.user;

      // session.user = user;// token.user as any;
      return session;
    },
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET_ID as string,
    }),
    CredentialsProvider({
      name: "sign in",
      type: "credentials",

      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
       async authorize(credentials){
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email) {
          throw new Error("Email is required");
        }

        if (!password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user) {
          throw new Error("No user with this email");
        }

        const validPassword = password === user.password;

        if (!validPassword) {
          throw new Error("invalid password");
        }

        return user;
      },
    }),
  ],
};
