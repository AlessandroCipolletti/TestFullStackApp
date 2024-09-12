import { z } from 'zod'
import { NextRequest, NextResponse } from 'next/server'
import VerifyUserTokenEndpoint from '@/endpoints/VerifyUserTokenEndpoint'
import { UserSchema } from '@/backend/schemas'
import logger from '@/backend/utils/logger'
import { verifyApiRequestToken } from './userTokenUtils'

export async function POST(request: NextRequest) {
  try {
    const { decodedToken } = await verifyApiRequestToken(request)

    if (!decodedToken) {
      logger.info({ msgCode: '001-014' }, 'Veryify token attempt failed')
      throw new Error('No token provided')
    }

    const tokenUser = UserSchema.parse(decodedToken.user)

    logger.info(
      { userId: tokenUser.id, email: tokenUser.email, msgCode: '001-015' },
      'User token verified'
    )

    return NextResponse.json({ valid: true, user: tokenUser })
  } catch (error) {
    const response: z.infer<typeof VerifyUserTokenEndpoint.responseSchema> = {
      valid: false,
      error: 'No token provided',
    }
    return NextResponse.json(response, { status: 401 })
  }
}
