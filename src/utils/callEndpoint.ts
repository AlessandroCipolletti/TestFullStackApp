import z from 'zod'
import { Endpoint } from '@/types/endpoint'
import { getTokenCookie } from '@/utils/loginToken'

export const callEndpoint = async <
  QueryParams extends z.ZodType,
  RequestSchema extends z.ZodType,
  ResponseSchema extends z.ZodType,
>(
  endpoint: Endpoint<QueryParams, RequestSchema, ResponseSchema>,
  params: QueryParams extends z.ZodVoid
    ? RequestSchema extends z.ZodVoid
      ?
          | {
              headers?: Record<string, string>
            }
          | undefined
      : {
          body: z.infer<RequestSchema>
          headers?: Record<string, string>
        }
    : RequestSchema extends z.ZodVoid
      ? {
          query: z.infer<QueryParams>
          headers?: Record<string, string>
        }
      : {
          query: z.infer<QueryParams>
          body: z.infer<RequestSchema>
          headers?: Record<string, string>
        }
): Promise<z.infer<ResponseSchema>> => {
  const query = params && 'query' in params ? params.query : undefined
  const body = params && 'body' in params ? params.body : undefined
  const headers = params && 'headers' in params ? params.headers : undefined

  // Validate query parameters if schema is provided
  if (endpoint.queryParamsSchema && query) {
    endpoint.queryParamsSchema.parse(query)
  }

  const url = endpoint.url(query)
  const token = getTokenCookie()

  // Set up fetch options with method, headers, and body
  const fetchOptions: RequestInit = {
    method: endpoint.method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  }

  const response = await fetch(url, fetchOptions)

  if (!response.ok) {
    throw new Error(`Api Error: URL:${url} status:${response.status}`)
  }

  const responseData = await response.json()

  // Validate api response if schema is provided
  if (endpoint.responseSchema) {
    return endpoint.responseSchema.parse(responseData)
  }
}
