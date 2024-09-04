import z from 'zod'
import { makeEndpoint } from '@/utils/makeEndpoint'

const RefreshUserTokenEndpointRequestSchema = z.void()

const RefreshUserTokenEndpointResponseSchema = z.object({
  accessToken: z.string(),
})

const RefreshUserTokenEndpoint = makeEndpoint({
  url: () => `/api/user/refresh-token`,
  method: 'POST',
  queryParamsSchema: z.void(),
  requestSchema: RefreshUserTokenEndpointRequestSchema,
  responseSchema: RefreshUserTokenEndpointResponseSchema,
})

export default RefreshUserTokenEndpoint
