// src/app/api/signup/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  const { firstName, lastName, email, password } = await req.json()

  // 1) check for existing user
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 400 }
    )
  }

  // 2) hash and create
  const hashedPassword = await bcrypt.hash(password, 10)
  await prisma.user.create({
    data: { email, hashedPassword, firstName, lastName },
  })

  return NextResponse.json({ ok: true }, { status: 201 })
}
