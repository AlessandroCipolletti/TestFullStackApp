import { NextResponse } from 'next/server'
import prisma from 'prisma/init'
import logger from '@/backend/utils/logger'
import { UserSchema } from '@/backend/schemas'
import { verifyRequestToken } from './userTokenUtils'

export async function POST(request: Request) {
  try {
    const { decodedToken, token: accessToken } =
      await verifyRequestToken(request)

    if (!decodedToken || !accessToken) {
      logger.warn({ msgCode: '001-015' }, 'Logout attempt with invalid token')
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
        { msgCode: '001-016' },
        'Logout attempt but no session found in db'
      )
      return NextResponse.json({ message: 'Logged out' })
    }

    if (userSessionAccess.UserSession.disabled) {
      logger.warn(
        { userId: userSessionAccess.UserSession.userId, msgCode: '001-017' },
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
        msgCode: '001-018',
      },
      'User logged out'
    )

    return NextResponse.json({ message: 'Logged out' })
  } catch (e) {
    return NextResponse.json(
      { message: e instanceof Error ? e.message : 'No valid token provided' },
      { status: 401 }
    )
  }
}
