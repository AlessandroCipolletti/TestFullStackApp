import { z } from 'zod'
import prisma from 'prisma/init'
import { NextResponse } from 'next/server'
import RefreshUserTokenEndpoint from '@/endpoints/RefreshUserTokenEndpoint'
import { UserSchema } from '@/backend/schemas'
import logger from '@/backend/utils/logger'
import {
  createUserAccessToken,
  verifyRequestToken,
  accessTokenExpiry,
} from './userTokenUtils'

export async function POST(request: Request) {
  try {
    const { decodedToken, token: refreshToken } =
      await verifyRequestToken(request)

    if (!decodedToken) {
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

    const tokenUser = UserSchema.parse(decodedToken.user)

    const userSession = await prisma.userSession.findFirst({
      where: {
        userId: tokenUser.id,
        // disabled: false,
        refreshToken: `${refreshToken}`,
      },
      orderBy: { createdAt: 'desc' },
      include: { User: true },
    })

    if (!userSession) {
      logger.warn(
        { userId: tokenUser.id, email: tokenUser.email, msgCode: '001-011' },
        'Refresh token attempt for a non found session'
      )
      throw new Error('No session found')
    }
    if (userSession.disabled) {
      logger.warn(
        {
          userId: tokenUser.id,
          email: tokenUser.email,
          userSessionId: userSession.id,
          msgCode: '001-012',
        },
        'Refresh token attempt for disabled session'
      )
      throw new Error('Session is disabled')
    }
    if (
      !userSession.User ||
      userSession.User.disabled ||
      userSession.User.deleted ||
      userSession.User.blacklisted
    ) {
      if (userSession.User) {
        logger.warn(
          {
            userId: tokenUser.id,
            email: userSession.User.email,
            msgCode: '001-009',
          },
          'Refresh token attempt for a disabled user'
        )
      } else {
        logger.warn(
          { userId: tokenUser.id, msgCode: '001-010' },
          'Refresh token attempt for a non found user'
        )
      }

      throw new Error('No valid user found')
    }

    const accessToken = await createUserAccessToken(userSession.User)
    const userSessionAccess = await prisma.userSessionAccess.create({
      data: {
        userSessionId: userSession.id,
        accessToken,
        duration: accessTokenExpiry,
      },
    })
    logger.info(
      {
        userId: userSession.User,
        email: userSession.User.email,
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
