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
  const token = await new SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(refreshTokenExpiry)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

  return token
}

export const verifyRequestToken = async (
  request: Request
): Promise<[false | JWTPayload, string]> => {
  try {
    const authHeader =
      request.headers.get('Authorization') ||
      request.headers.get('authorization')
    if (!authHeader) {
      return [false, '']
    }

    const token = authHeader.split(' ')[1] // `Bearer ${token}`
    if (!token) {
      return [false, '']
    }

    const encoder = new TextEncoder()
    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_SECRET!)
    )
    if (typeof payload !== 'object') {
      return [false, '']
    }

    return [payload, token]
  } catch (e) {
    return [false, '']
  }
}

// const passwordSchema = z.string()
//   .min(8, { message: "Password must be at least 8 characters long" })
//   .max(32, { message: "Password must be no more than 32 characters long" })
//   .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
//   .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
//   .regex(/[0-9]/, { message: "Password must contain at least one number" })
//   .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" });
