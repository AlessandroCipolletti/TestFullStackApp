import z from 'zod'
import { makeEndpoint } from '@/utils/makeEndpoint'
import { TokenisedUserInfo } from '../utils'

const VerifyUserTokenEndpointRequestSchema = z.void()

const VerifyUserTokenEndpointResponseSchema = z.object({
  valid: z.boolean(),
  user: TokenisedUserInfo.optional(),
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
