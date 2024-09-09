import { NextResponse } from 'next/server'
import { verifyRequestToken } from '@/backend/apiControllers/user/userTokenUtils'

const WHITE_LISTED_API = [
  '/api/user/login',
  '/api/user/create',
  '/api/user/verify-token',
]

export async function middleware(request: Request) {
  if (WHITE_LISTED_API.some((path) => request.url.includes(path))) {
    return NextResponse.next()
  }

  const { decodedToken } = await verifyRequestToken(request)
  if (decodedToken) {
    return NextResponse.next()
  }
  return new NextResponse('Token expired or invalid', { status: 401 })
}

export const config = {
  matcher: '/api/:path*', // NOTE: we could white list the paths here
}
