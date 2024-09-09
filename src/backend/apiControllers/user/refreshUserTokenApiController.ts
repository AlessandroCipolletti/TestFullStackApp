import { z } from 'zod'
import prisma from 'prisma/init'
import { NextResponse } from 'next/server'
import RefreshUserTokenEndpoint from '@/endpoints/RefreshUserTokenEndpoint'
import logger from '@/backend/utils/logger'
import {
  createUserAccessToken,
  verifyRequestToken,
  accessTokenExpiry,
} from './userApiUtils'

export async function POST(request: Request) {
  try {
    const { decodedToken, token: refreshToken } =
      await verifyRequestToken(request)

    if (!decodedToken || typeof decodedToken.userId !== 'string') {
      if (refreshToken) {
        logger.info({ msgCode: '001-007' }, 'Refresh token expired')
      } else {
        logger.warn(
          { msgCode: '001-008' },
          'No valid token provided for token refresh'
        )
      }
      throw new Error('No valid token provided')
    }

    const userId = decodedToken.userId
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user || user.disabled || user.deleted || user.blacklisted) {
      if (user) {
        logger.warn(
          { userId, email: user.email, msgCode: '001-009' },
          'Refresh token attempt for a disabled user'
        )
      } else {
        logger.warn(
          { userId, msgCode: '001-010' },
          'Refresh token attempt for a non found user'
        )
      }

      throw new Error('No valid user found')
    }

    const userSession = await prisma.userSession.findFirst({
      where: {
        userId: user.id,
        // disabled: false,
        refreshToken: `${refreshToken}`,
      },
      orderBy: { createdAt: 'desc' },
    })

    if (!userSession) {
      logger.warn(
        { userId, email: user.email, msgCode: '001-011' },
        'Refresh token attempt for a non found session'
      )
      throw new Error('No session found')
    } else if (userSession.disabled) {
      logger.warn(
        {
          userId,
          email: user.email,
          userSessionId: userSession.id,
          msgCode: '001-012',
        },
        'Refresh token attempt for disabled session'
      )
      throw new Error('Session is disabled')
    }

    const accessToken = await createUserAccessToken(user)
    const userSessionAccess = await prisma.userSessionAccess.create({
      data: {
        userSessionId: userSession.id,
        accessToken,
        duration: accessTokenExpiry,
      },
    })
    logger.info(
      {
        userId,
        email: user.email,
        userSessionId: userSession.id,
        userSessionAccessId: userSessionAccess.id,
        msgCode: '001-013',
      },
      'User session refreshed'
    )

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
