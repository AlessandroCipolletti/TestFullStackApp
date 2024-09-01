import z from 'zod'

export type IMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type Endpoint<
  QueryParams extends z.ZodType,
  RequestSchema extends z.ZodType,
  ResponseSchema extends z.ZodType,
> = {
  url: (queryParams?: z.infer<QueryParams>) => string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  queryParamsSchema: QueryParams
  requestSchema: RequestSchema
  responseSchema: ResponseSchema
  // callableParams?: QueryParams extends z.ZodType
  //   ? RequestSchema extends z.ZodType
  //     ? { headers?: Record<string, string> } | undefined
  //     : { body: z.infer<RequestSchema>; headers: Record<string, string> }
  //   : RequestSchema extends z.ZodType
  //     ? { query: z.infer<QueryParams>; headers: Record<string, string> }
  //     : {
  //         query: z.infer<QueryParams>
  //         body: z.infer<RequestSchema>
  //         headers: Record<string, string>
  //       }
}
