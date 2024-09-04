import { z } from 'zod'
import prisma from 'prisma/init'
import RefreshUserTokenEndpoint from './RefreshUserTokenEndpoint'
import { NextResponse } from 'next/server'
import { createUserAccessToken, verifyRequestToken } from '../utils'

export async function POST(request: Request) {
  try {
    const decodedToken = await verifyRequestToken(request)
    if (!decodedToken || typeof decodedToken.userId !== 'string') {
      throw new Error('No valid token provided')
    }

    const userId = decodedToken.userId
    const user = await prisma.user.findUnique({ where: { id: userId } })
    // TODO: in the future, check if the user has been disabled or deleted or blacklisted
    if (!user) {
      throw new Error('No valid token provided')
    }

    const accessToken = await createUserAccessToken(user)

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
