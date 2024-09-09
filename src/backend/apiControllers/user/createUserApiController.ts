import z from 'zod'
import { NextResponse } from 'next/server'
import prisma from 'prisma/init'
import bcrypt from 'bcryptjs'
import logger from '@/backend/utils/logger'
import CreateUserEndpoint from '@/endpoints/CreateUserEndpoint'
import { createNewUserSession } from './userSessionUtils'

export async function POST(request: Request) {
  const {
    email,
    password,
    firstName,
    lastName,
  }: z.infer<typeof CreateUserEndpoint.requestSchema> = await request.json()

  // Check if the email is already in use
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    logger.warn(
      { userId: existingUser.id, email, msgCode: '001-005' },
      'Create user attempt with mail already in use'
    )
    return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      passwords: {
        create: [{ password: hashedPassword }],
      },
    },
  })
  const { accessToken, refreshToken } = await createNewUserSession(newUser)

  logger.info(
    { userId: newUser.id, email: newUser.email, msgCode: '001-006' },
    'New user created'
  )

  const response: z.infer<typeof CreateUserEndpoint.responseSchema> = {
    accessToken,
    refreshToken,
  }

  return NextResponse.json(response, { status: 201 })
}
