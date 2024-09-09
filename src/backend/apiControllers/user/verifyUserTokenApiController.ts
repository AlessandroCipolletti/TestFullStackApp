import { z } from 'zod'
import { NextResponse } from 'next/server'
import VerifyUserTokenEndpoint from '@/endpoints/VerifyUserTokenEndpoint'
import { UserSchema } from '@/backend/schemas'
import logger from '@/backend/utils/logger'
import { verifyRequestToken } from './userApiUtils'

export async function POST(request: Request) {
  try {
    const { decodedToken } = await verifyRequestToken(request)

    if (!decodedToken) {
      logger.info({ msgCode: '001-013' }, 'Veryify token attempt failed')
      throw new Error('No token provided')
    }

    const user = UserSchema.parse(decodedToken.user)

    logger.info(
      { userId: user.id, email: user.email, msgCode: '001-014' },
      'User token verified'
    )

    return NextResponse.json({ valid: true, user })
  } catch (error) {
    const response: z.infer<typeof VerifyUserTokenEndpoint.responseSchema> = {
      valid: false,
      error: 'No token provided',
    }
    return NextResponse.json(response, { status: 401 })
  }
}
