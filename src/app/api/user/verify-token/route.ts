import { z } from 'zod'
import VerifyUserTokenEndpoint from './VerifyUserTokenEndpoint'
import { NextResponse } from 'next/server'
import { TokenisedUserInfo, verifyRequestToken } from '../utils'

export async function POST(request: Request) {
  try {
    const decodedToken = verifyRequestToken(request)

    const user: z.infer<typeof TokenisedUserInfo> | null = decodedToken.user

    return NextResponse.json({ valid: true, user })
  } catch (error) {
    const response: z.infer<typeof VerifyUserTokenEndpoint.responseSchema> = {
      valid: false,
      error: 'No token provided',
    }
    return NextResponse.json(response, { status: 401 })
  }
}
