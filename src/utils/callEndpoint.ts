import z, { ZodVoid } from 'zod'
import Endpoint from '@/endpoints/types/Endpoint'
import {
  getAccessTokenCookie,
  getRefreshTokenCookie,
  setAccessTokenCookie,
} from '@/utils/loginToken'
import RefreshUserTokenEndpoint from '@/endpoints/RefreshUserTokenEndpoint'

export const callEndpoint = async <
  QueryParams extends z.ZodType,
  RequestSchema extends z.ZodType,
  ResponseSchema extends z.ZodType,
>(
  endpoint: Endpoint<QueryParams, RequestSchema, ResponseSchema>,
  params: (QueryParams extends z.ZodVoid
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
        }) & {
    callingToRefreshAccessToken?: boolean
  }
): Promise<[z.infer<ResponseSchema> | false, Error | undefined]> => {
  const query = params && 'query' in params ? params.query : undefined
  const body = params && 'body' in params ? params.body : undefined
  const headers = params && 'headers' in params ? params.headers : undefined
  const callingToRefreshAccessToken =
    params.callingToRefreshAccessToken ?? false

  try {
    // Validate query parameters if schema is provided
    if (
      endpoint.queryParamsSchema &&
      !(endpoint.queryParamsSchema instanceof ZodVoid) &&
      query
    ) {
      endpoint.queryParamsSchema.parse(query)
    }

    // Validate request body if schema is provided
    if (
      endpoint.requestSchema &&
      !(endpoint.requestSchema instanceof ZodVoid)
    ) {
      endpoint.requestSchema.parse(body)
    }

    const url = endpoint.url(query)
    const token = callingToRefreshAccessToken
      ? getRefreshTokenCookie()
      : getAccessTokenCookie()

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
    if (response.status === 401 && !callingToRefreshAccessToken) {
      await refreshAccessToken()
      return callEndpoint(endpoint, {
        ...params,
        callingToRefreshAccessToken: true,
      })
    }
    if (!response.ok) {
      throw new Error(`Api Error: URL:${url} status:${response.status}`)
    }

    // Return true if no response schema is provided
    if (
      !endpoint.responseSchema ||
      endpoint.responseSchema instanceof ZodVoid
    ) {
      return [true, undefined]
    }

    // Validate response body if schema is provided
    const responseJson: z.infer<ResponseSchema> = endpoint.responseSchema.parse(
      await response.json()
    )

    return [responseJson, undefined]
  } catch (error) {
    return [
      false,
      error instanceof Error ? error : new Error(`${error}` || 'Unknown error'),
    ]
  }
}

const refreshAccessToken = async () => {
  const [result] = await callEndpoint(RefreshUserTokenEndpoint, {
    callingToRefreshAccessToken: true,
  })

  if (result) {
    setAccessTokenCookie(result.accessToken)
  } else {
    document.location.href = '/login?redirect=' + document.location.pathname
  }
}
