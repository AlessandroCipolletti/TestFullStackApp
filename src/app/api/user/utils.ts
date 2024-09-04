import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const accessTokenExpiry = '30s'
const sessionTokenExpiry = '1m'

export const TokenisedUserInfo = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
})

export const createUserAccessToken = (user: User) => {
  const userPublicInfo: z.infer<typeof TokenisedUserInfo> = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  }

  const token = jwt.sign({ user: userPublicInfo }, process.env.JWT_SECRET!, {
    expiresIn: accessTokenExpiry,
  })

  return token
}

export const createUserRefreshToken = (user: User) => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: sessionTokenExpiry,
  })

  return token
}

export const verifyRequestToken = (request: Request) => {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return false
    }

    const token = authHeader.split(' ')[1] // `Bearer ${token}`
    if (!token) {
      return false
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    if (typeof decoded !== 'object') {
      return false
    }

    return decoded
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
