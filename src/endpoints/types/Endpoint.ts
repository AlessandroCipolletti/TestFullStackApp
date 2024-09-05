import z from 'zod'

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type Endpoint<
  QueryParams extends z.ZodType,
  RequestSchema extends z.ZodType,
  ResponseSchema extends z.ZodType,
> = {
  url: (queryParams?: z.infer<QueryParams>) => string
  method: Method
  queryParamsSchema: QueryParams
  requestSchema: RequestSchema
  responseSchema: ResponseSchema
}

export default Endpoint
