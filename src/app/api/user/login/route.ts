import { NextResponse } from 'next/server'
import prisma from 'prisma/init'
import bcrypt from 'bcryptjs'
import LoginEndpoint from './LoginEndpoint'
import { createUserAccessToken, createUserRefreshToken } from '../utils'
import { z } from 'zod'

export async function POST(request: Request) {
  const { email, password }: z.infer<typeof LoginEndpoint.requestSchema> =
    await request.json()

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    )
  }

  const accessToken = await createUserAccessToken(user)
  const refreshToken = await createUserRefreshToken(user)

  const response: z.infer<typeof LoginEndpoint.responseSchema> = {
    accessToken,
    refreshToken,
  }

  return NextResponse.json(response, { status: 201 })
}
