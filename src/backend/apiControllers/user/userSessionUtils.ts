import prisma from 'prisma/init'
import { User } from '@prisma/client'
import logger from '@/backend/utils/logger'
import {
  createUserRefreshToken,
  createUserAccessToken,
  refreshTokenExpiry,
  accessTokenExpiry,
} from './userTokenUtils'

export const createNewUserSession = async (user: User) => {
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
    {
      email: user.email,
      userId: user.id,
      userSessionId: userSession.id,
      msgCode: '001-004',
    },
    'New user session created'
  )

  return { accessToken, refreshToken }
}
