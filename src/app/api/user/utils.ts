import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const tokenExpiry = '1h'

export const TokenisedUserInfo = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
})

export const createUserToken = (user: User) => {
  const userPublicInfo: z.infer<typeof TokenisedUserInfo> = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  }

  const token = jwt.sign({ user: userPublicInfo }, process.env.JWT_SECRET!, {
    expiresIn: tokenExpiry,
  })

  return token
}

export const decryptUserToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!)

  if (typeof decoded !== 'object') {
    return null
  }

  return decoded
}

// const passwordSchema = z.string()
//   .min(8, { message: "Password must be at least 8 characters long" })
//   .max(32, { message: "Password must be no more than 32 characters long" })
//   .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
//   .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
//   .regex(/[0-9]/, { message: "Password must contain at least one number" })
//   .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" });
