import z from 'zod'
import { makeEndpoint } from './utils/makeEndpoint'
import { UserSchema } from '@/backend/schemas'

const LoginEndpointRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const LoginEndpointResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: UserSchema,
})

const LoginEndpoint = makeEndpoint({
  url: () => `/api/user/login`,
  method: 'POST',
  queryParamsSchema: z.void(),
  requestSchema: LoginEndpointRequestSchema,
  responseSchema: LoginEndpointResponseSchema,
})

export default LoginEndpoint
