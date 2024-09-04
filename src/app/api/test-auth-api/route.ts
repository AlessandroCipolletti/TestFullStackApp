import { NextResponse } from 'next/server'
import { verifyRequestToken } from '../user/utils'

export async function POST(request: Request) {
  const decodedToken = verifyRequestToken(request)
  if (!decodedToken) {
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    )
  }

  return NextResponse.json({})
}
