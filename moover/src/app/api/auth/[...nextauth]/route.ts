// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        // 1️⃣ Find the user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        if (!user) return null

        // 2️⃣ Verify the password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )
        if (!isValid) return null

        // 3️⃣ Return a minimal user object
        return { id: user.id.toString(), email: user.email }
      },
    }),
  ],

  // Secret for signing your JWTs
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  // Point NextAuth to your custom login page
  pages: {
    signIn: "/login",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
