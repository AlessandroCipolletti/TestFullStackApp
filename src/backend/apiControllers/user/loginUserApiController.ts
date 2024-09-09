import { z } from 'zod'
import { NextResponse } from 'next/server'
import prisma from 'prisma/init'
import bcrypt from 'bcryptjs'
import LoginEndpoint from '@/endpoints/LoginEndpoint'
import {
  createUserAccessToken,
  createUserRefreshToken,
  accessTokenExpiry,
  refreshTokenExpiry,
} from './userApiUtils'
import logger from '@/backend/utils/logger'

export async function POST(request: Request) {
  const { email, password }: z.infer<typeof LoginEndpoint.requestSchema> =
    await request.json()

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    logger.info({ email }, 'login attempt with unused email')
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    )
  }

  const userPassword = await prisma.userPassword.findFirst({
    where: { userId: user.id, active: true },
    // orderBy: { createdAt: 'desc' },
  })

  if (
    !userPassword ||
    !(await bcrypt.compare(password, userPassword.password))
  ) {
    logger.info({ email, userId: user.id }, 'login failed')
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    )
  }

  logger.info({ email, userId: user.id }, 'login successful')
  const accessToken = await createUserAccessToken(user)
  const refreshToken = await createUserRefreshToken(user)

  const userSession = await prisma.userSession.create({
    data: {
      userId: user.id,
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
  logger.info(
    { email, userId: user.id, sessionId: userSession.id },
    'new user session created'
  )

  const response: z.infer<typeof LoginEndpoint.responseSchema> = {
    accessToken,
    refreshToken,
  }

  return NextResponse.json(response, { status: 201 })
}
