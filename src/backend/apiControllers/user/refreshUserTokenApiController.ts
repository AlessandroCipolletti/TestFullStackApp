import { z } from 'zod'
import prisma from 'prisma/init'
import RefreshUserTokenEndpoint from '@/endpoints/RefreshUserTokenEndpoint'
import { NextResponse } from 'next/server'
import {
  createUserAccessToken,
  verifyRequestToken,
  accessTokenExpiry,
} from './userApiUtils'

export async function POST(request: Request) {
  try {
    const [decodedToken, refreshToken] = await verifyRequestToken(request)
    if (!decodedToken || typeof decodedToken.userId !== 'string') {
      throw new Error('No valid token provided')
    }

    const userId = decodedToken.userId
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user || user.disabled || user.deleted || user.blacklisted) {
      throw new Error('No valid user found')
    }

    const accessToken = await createUserAccessToken(user)
    const userSession = await prisma.userSession.findFirst({
      where: {
        userId: user.id,
        disabled: false,
        refreshToken: `${refreshToken}`,
      },
      orderBy: { createdAt: 'desc' },
    })

    if (!userSession) {
      throw new Error('No session found')
    }

    await prisma.userSessionAccess.create({
      data: {
        userSessionId: userSession.id,
        accessToken,
        duration: accessTokenExpiry,
      },
    })

    const response = {
      accessToken,
    } as z.infer<typeof RefreshUserTokenEndpoint.responseSchema>

    return NextResponse.json(response)
  } catch (e) {
    return NextResponse.json(
      { message: e instanceof Error ? e.message : 'No valid token provided' },
      { status: 401 }
    )
  }
}
