import z from 'zod'
import { makeEndpoint } from './utils/makeEndpoint'

const LogoutEndpointRequestSchema = z.void()

const LogoutEndpointResponseSchema = z.void()

const LogoutEndpoint = makeEndpoint({
  url: () => `/api/user/logout`,
  method: 'POST',
  queryParamsSchema: z.void(),
  requestSchema: LogoutEndpointRequestSchema,
  responseSchema: LogoutEndpointResponseSchema,
})

export default LogoutEndpoint
