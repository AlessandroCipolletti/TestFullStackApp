import { z } from 'zod'
import { SignJWT, jwtVerify } from 'jose'
import { User } from '@prisma/client'
import TokenisedUserInfo from '@/endpoints/types/TokenisedUserInfo'
const accessTokenExpiry = '1h'
const refreshTokenExpiry = '7d'

export const createUserAccessToken = async (user: User) => {
  const userPublicInfo: z.infer<typeof TokenisedUserInfo> = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  }

  const token = await new SignJWT({ user: userPublicInfo })
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

export const verifyRequestToken = async (request: Request) => {
  try {
    const authHeader =
      request.headers.get('Authorization') ||
      request.headers.get('authorization')
    if (!authHeader) {
      return false
    }

    const token = authHeader.split(' ')[1] // `Bearer ${token}`
    if (!token) {
      return false
    }

    const encoder = new TextEncoder()
    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_SECRET!)
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
