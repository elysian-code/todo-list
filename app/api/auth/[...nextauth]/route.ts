import { authOption } from "@/app/utils/auth";
import nextAuth from "next-auth/next";

const handler = nextAuth(authOption)

export {handler as GET, handler as POST}