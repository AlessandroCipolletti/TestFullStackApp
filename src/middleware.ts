import { NextRequest, NextResponse } from 'next/server'
import {
  verifyApiRequestToken,
  verifyPageRequestToken,
} from '@/backend/apiControllers/user/userTokenUtils'

const WHITELISTED_APIS = [
  '/api/user/login',
  '/api/user/create',
  '/api/user/verify-token',
]
const PAGES_RESTRICTED_TO_GUESTS = ['/dashboard']
const PAGES_RESTRICTED_TO_USERS = ['/login', '/register']
const DEFAULT_PAGE_FOR_LOGGED_USERS = '/dashboard'
const DEFAULT_PAGE_FOR_GUESTS = '/login'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl

  if (url.pathname.startsWith('/api')) {
    if (WHITELISTED_APIS.some((path) => request.url.includes(path))) {
      return NextResponse.next()
    }

    const { decodedToken } = await verifyApiRequestToken(request)
    if (decodedToken) {
      return NextResponse.next()
    }

    return new NextResponse('Token expired or invalid', { status: 401 })
  }

  const token = await verifyPageRequestToken(request)

  if (
    !!token &&
    PAGES_RESTRICTED_TO_USERS.some((path) => request.url.includes(path))
  ) {
    return NextResponse.redirect(
      new URL(DEFAULT_PAGE_FOR_LOGGED_USERS, request.url)
    )
  }

  if (
    !token &&
    PAGES_RESTRICTED_TO_GUESTS.some((path) => request.url.includes(path))
  ) {
    return NextResponse.redirect(new URL(DEFAULT_PAGE_FOR_GUESTS, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
