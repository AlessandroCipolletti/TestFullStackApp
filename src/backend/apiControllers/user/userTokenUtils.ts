import { NextRequest } from 'next/server'
import { SignJWT, jwtVerify, JWTPayload } from 'jose'
import { User } from '@prisma/client'

export const accessTokenExpiry = '1h'
export const refreshTokenExpiry = '7d'

export const createUserAccessToken = async (user: User) => {
  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(accessTokenExpiry)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

  return token
}

export const createUserRefreshToken = async (user: User) => {
  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(refreshTokenExpiry)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

  return token
}

export const verifyApiRequestToken = async (
  request: NextRequest
): Promise<{ decodedToken: JWTPayload | false; token: string }> => {
  try {
    const authHeader =
      request.headers.get('Authorization') ||
      request.headers.get('authorization')
    if (!authHeader) {
      return { decodedToken: false, token: '' }
    }

    const token = authHeader.split(' ')[1] // `Bearer ${token}`
    if (!token) {
      return { decodedToken: false, token: '' }
    }

    const encoder = new TextEncoder()
    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_SECRET!)
    )
    if (typeof payload !== 'object') {
      return { decodedToken: false, token }
    }

    return { decodedToken: payload, token }
  } catch (e) {
    return { decodedToken: false, token: '' }
  }
}

export const verifyPageRequestToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get('refresh_token')
    if (!token) {
      return false
    }

    const { payload } = await jwtVerify(
      token.value,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    )

    if (typeof payload !== 'object') {
      return false
    }

    return payload
  } catch (e) {
    return false
  }
}

// const passwordSchema = z.string()
//   .min(8, { message: "Password must be at least 8 characters long" })
//   .max(32, { message: "Password must be no more than 32 characters long" })
//   .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
//   .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
//   .regex(/[0-9]/, { message: "Password must contain at least one number" })
//   .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" });
