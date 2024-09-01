import z from 'zod'
import { makeEndpoint } from '@/utils/makeEndpoint'

// const passwordSchema = z.string()
//   .min(8, { message: "Password must be at least 8 characters long" })
//   .max(32, { message: "Password must be no more than 32 characters long" })
//   .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
//   .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
//   .regex(/[0-9]/, { message: "Password must contain at least one number" })
//   .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" });

const LoginEndpointRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const LoginEndpointResponseSchema = z.object({ token: z.string() })

const LoginEndpoint = makeEndpoint({
  url: () => `/api/login`,
  method: 'POST',
  queryParamsSchema: z.void(),
  requestSchema: LoginEndpointRequestSchema,
  responseSchema: LoginEndpointResponseSchema,
})

export default LoginEndpoint

export type TokenisedUserInfo = {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
}
