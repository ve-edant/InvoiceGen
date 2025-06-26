import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";
import {compare} from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label:"email",placeholder:"email"},
        password: {label:"password",placeholder:"password"},
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (
          !user ||
          !credentials?.password ||
          !user.password ||
          !(await compare(credentials.password, user.password))
        ) {
          throw new Error('Invalid credentials');
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // redirect here on unauth
    signOut: "/",
    error:"/auth/login"
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
