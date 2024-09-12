import { NextRequest, NextResponse } from 'next/server'
import prisma from 'prisma/init'
import logger from '@/backend/utils/logger'
import { UserSchema } from '@/backend/schemas'
import { verifyApiRequestToken } from './userTokenUtils'

export async function POST(request: NextRequest) {
  try {
    const { decodedToken, token: accessToken } =
      await verifyApiRequestToken(request)

    if (!decodedToken || !accessToken) {
      logger.warn({ msgCode: '001-016' }, 'Logout attempt with invalid token')
      return NextResponse.json({ message: 'Logged out' })
    }

    const userSessionAccess = await prisma.userSessionAccess.findFirst({
      where: { accessToken },
      include: {
        UserSession: true,
      },
    })

    if (!userSessionAccess) {
      logger.warn(
        { msgCode: '001-017' },
        'Logout attempt but no session found in db'
      )
      return NextResponse.json({ message: 'Logged out' })
    }

    if (userSessionAccess.UserSession.disabled) {
      logger.warn(
        { userId: userSessionAccess.UserSession.userId, msgCode: '001-018' },
        'Logout attempt for a disabled user session'
      )
      return NextResponse.json({ message: 'Logged out' })
    }

    await prisma.userSession.update({
      where: { id: userSessionAccess.UserSession.id },
      data: { disabled: true },
    })

    const tokenUser = UserSchema.parse(decodedToken.user)
    logger.info(
      {
        userId: tokenUser.id,
        email: tokenUser.email,
        userSessionAccessId: userSessionAccess.id,
        userSessionId: userSessionAccess.UserSession.id,
        msgCode: '001-019',
      },
      'Logout successful'
    )

    return NextResponse.json({ message: 'Logged out' })
  } catch (e) {
    return NextResponse.json(
      { message: e instanceof Error ? e.message : 'No valid token provided' },
      { status: 401 }
    )
  }
}
