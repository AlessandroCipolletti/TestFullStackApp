import { z } from 'zod'
import { NextResponse } from 'next/server'
import prisma from 'prisma/init'
import bcrypt from 'bcryptjs'
import LoginEndpoint from '@/endpoints/LoginEndpoint'
import logger from '@/backend/utils/logger'
import { createNewUserSession } from './userApiUtils'

export async function POST(request: Request) {
  const { email, password }: z.infer<typeof LoginEndpoint.requestSchema> =
    await request.json()

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    logger.info(
      { email, msgCode: '001-001' },
      'Login attempt with unused email'
    )
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
    logger.warn({ email, userId: user.id, msgCode: '001-002' }, 'Login failed')
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    )
  }

  logger.info(
    { email, userId: user.id, msgCode: '001-003' },
    'Login successful'
  )

  const { accessToken, refreshToken } = await createNewUserSession(user)

  const response: z.infer<typeof LoginEndpoint.responseSchema> = {
    accessToken,
    refreshToken,
  }

  return NextResponse.json(response, { status: 201 })
}
