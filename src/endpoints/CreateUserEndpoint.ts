import z from 'zod'
import { makeEndpoint } from './utils/makeEndpoint'
import { UserSchema } from '@/backend/schemas'

const CreateUserEndpointRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

const CreateUserEndpointResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: UserSchema,
})

const CreateUserEndpoint = makeEndpoint({
  url: () => `/api/user/create`,
  method: 'POST',
  queryParamsSchema: z.void(),
  requestSchema: CreateUserEndpointRequestSchema,
  responseSchema: CreateUserEndpointResponseSchema,
})

export default CreateUserEndpoint
