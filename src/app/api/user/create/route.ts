import z from 'zod'
import { NextResponse } from 'next/server'
import prisma from 'prisma/init'
import bcrypt from 'bcryptjs'
import CreateUserEndpoint from './CreateUserEndpoint'
import { createUserAccessToken, createUserRefreshToken } from '../utils'

export async function POST(request: Request) {
  const {
    email,
    password,
    firstName,
    lastName,
  }: z.infer<typeof CreateUserEndpoint.requestSchema> = await request.json()

  // Check if the email is already registered
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    },
  })

  const accessToken = await createUserAccessToken(newUser)
  const refreshToken = await createUserRefreshToken(newUser)

  const response: z.infer<typeof CreateUserEndpoint.responseSchema> = {
    accessToken,
    refreshToken,
  }

  return NextResponse.json(response, { status: 201 })
}
