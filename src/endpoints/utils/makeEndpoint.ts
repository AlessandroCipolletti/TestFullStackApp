import z from 'zod'
import Endpoint from '../types/Endpoint'

export const makeEndpoint = <
  QueryParams extends z.ZodType,
  RequestSchema extends z.ZodType,
  ResponseSchema extends z.ZodType,
>({
  url,
  method,
  queryParamsSchema,
  requestSchema,
  responseSchema,
}: {
  url: (queryParams: z.infer<QueryParams>) => string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  queryParamsSchema: QueryParams
  requestSchema: RequestSchema
  responseSchema: ResponseSchema
}): Endpoint<QueryParams, RequestSchema, ResponseSchema> => ({
  url,
  method,
  queryParamsSchema,
  requestSchema,
  responseSchema,
})
