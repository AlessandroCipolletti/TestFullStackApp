import z from 'zod'
import { UserSchema } from '@/backend/schemas'
import { makeEndpoint } from './utils/makeEndpoint'

const VerifyUserTokenEndpointRequestSchema = z.void()

const VerifyUserTokenEndpointResponseSchema = z.object({
  valid: z.boolean(),
  user: UserSchema.optional(),
  error: z.string().optional(),
})

const VerifyUserTokenEndpoint = makeEndpoint({
  url: () => `/api/user/verify-token`,
  method: 'POST',
  queryParamsSchema: z.void(),
  requestSchema: VerifyUserTokenEndpointRequestSchema,
  responseSchema: VerifyUserTokenEndpointResponseSchema,
})

export default VerifyUserTokenEndpoint
