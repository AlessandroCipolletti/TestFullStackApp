import { z } from 'zod'
import VerifyUserTokenEndpoint from '@/endpoints/VerifyUserTokenEndpoint'
import { NextResponse } from 'next/server'
import { UserSchema } from '@/backend/schemas'
import { verifyRequestToken } from './userApiUtils'

export async function POST(request: Request) {
  try {
    const [decodedToken] = await verifyRequestToken(request)
    if (!decodedToken) {
      throw new Error('No token provided')
    }

    const user = UserSchema.parse(decodedToken.user)

    return NextResponse.json({ valid: true, user })
  } catch (error) {
    const response: z.infer<typeof VerifyUserTokenEndpoint.responseSchema> = {
      valid: false,
      error: 'No token provided',
    }
    return NextResponse.json(response, { status: 401 })
  }
}
