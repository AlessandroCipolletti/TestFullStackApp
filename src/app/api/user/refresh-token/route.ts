import { z } from 'zod'
import prisma from 'prisma/init'
import RefreshUserTokenEndpoint from './RefreshUserTokenEndpoint'
import { NextResponse } from 'next/server'
import { createUserAccessToken, verifyRequestToken } from '../utils'

export async function POST(request: Request) {
  const decodedToken = verifyRequestToken(request)
  if (!decodedToken) {
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    )
  }

  const userId: string = decodedToken.userId

  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) {
    return NextResponse.json(
      { message: 'To valid token found' },
      { status: 401 }
    )
  }

  const accessToken = createUserAccessToken(user)

  const response = {
    accessToken,
  } as z.infer<typeof RefreshUserTokenEndpoint.responseSchema>

  return NextResponse.json(response)
}
