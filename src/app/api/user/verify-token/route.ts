import { z } from 'zod'
import VerifyUserTokenEndpoint from './VerifyUserTokenEndpoint'
import { NextResponse } from 'next/server'
import { decryptUserToken, TokenisedUserInfo } from '../utils'

export async function POST(request: Request) {
  const handleError = () => {
    const response: z.infer<typeof VerifyUserTokenEndpoint.responseSchema> = {
      valid: false,
      error: 'No token provided',
    }
    return NextResponse.json(response, { status: 401 })
  }

  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return handleError()
    }

    const token = authHeader.split(' ')[1] // `Bearer ${token}`

    if (!token) {
      return handleError()
    }

    const decoded = decryptUserToken(token)

    if (!decoded) {
      return handleError()
    }

    const user: z.infer<typeof TokenisedUserInfo> | null = decoded.user

    return NextResponse.json({ valid: true, user })
  } catch (error) {
    return handleError()
  }
}
