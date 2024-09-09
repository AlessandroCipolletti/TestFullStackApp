import z from 'zod'
import { NextResponse } from 'next/server'
import prisma from 'prisma/init'
import bcrypt from 'bcryptjs'
import CreateUserEndpoint from '@/endpoints/CreateUserEndpoint'
import {
  createUserAccessToken,
  createUserRefreshToken,
  accessTokenExpiry,
  refreshTokenExpiry,
} from './userApiUtils'
import logger from '@/backend/utils/logger'

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
    logger.info({ email }, 'create user attempt with mail already in use')
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

  logger.info({ userId: newUser.id, email: newUser.email }, 'new user created')

  const accessToken = await createUserAccessToken(newUser)
  const refreshToken = await createUserRefreshToken(newUser)

  await prisma.userSession.create({
    data: {
      userId: newUser.id,
      refreshToken,
      duration: refreshTokenExpiry,
      accesses: {
        create: [
          {
            accessToken,
            duration: accessTokenExpiry,
          },
        ],
      },
    },
  })

  const response: z.infer<typeof CreateUserEndpoint.responseSchema> = {
    accessToken,
    refreshToken,
  }

  return NextResponse.json(response, { status: 201 })
}
