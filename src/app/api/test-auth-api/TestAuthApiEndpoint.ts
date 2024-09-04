import z from 'zod'
import { makeEndpoint } from '@/utils/makeEndpoint'

const TestAuthApiEndpointRequestSchema = z.void()

const TestAuthApiEndpointResponseSchema = z.object({})

const TestAuthApiEndpoint = makeEndpoint({
  url: () => `/api/test-auth-api`,
  method: 'POST',
  queryParamsSchema: z.void(),
  requestSchema: TestAuthApiEndpointRequestSchema,
  responseSchema: TestAuthApiEndpointResponseSchema,
})

export default TestAuthApiEndpoint
