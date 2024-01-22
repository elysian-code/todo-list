import { prisma } from "@/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"







export const authOption: NextAuthOptions = {

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",

  },
  
  jwt: {
    secret: process.env.NEXTAUTH_SECRETE,
    maxAge: 15 * 24 * 30 * 60,
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt: async ({ token, user }) => {
      // token.user = user;
      console.log("===>",user)
      if(user)token.user =user;// {...token,...user}
      // token.usr = user;
      return token;
    },
    async session({ session, token, user }) {
      if(token.user)
      session.user = token.user
    
      // session.user = user;// token.user as any;
      return session;
    },
  },
  
  providers: [
    GithubProvider ({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET_ID as string,
    }),
    CredentialsProvider({
      name: "sign in",
      type: "credentials",
  
      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials ) {

        const {email, password} = credentials as {email: string; password: string}; 
        if(!email) {
          throw new Error("Email is required");
          return
        }

        if(!password) {
          
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: email
          }
        });

        if (!user) {
          return null
        }

        const validPassword = password === user.password;

        if(!validPassword) {
          
          return null
        }
       
        return user;
      }
    }) 
  ]
  
} 