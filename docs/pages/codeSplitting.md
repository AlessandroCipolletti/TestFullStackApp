[< Home](index.md)

# App routing and Code splitting

Usually with the NextJs app routing, ll your code is organized inside the `app` folder.

That's great to handle apis and pages routing, but the downside is that all your cose is inside files with the same name (`route.ts` for apis, and `page.tsx` fro frontend pages).

I'm really used to navigate my code remembering file names, so I decided to split the code in different folders.

```
/src
  /app
    /api
    /myDashboard
    ...
  /backend
    /apiControllers
    /schemas
  /endpoints
    ...
  /frontend
    /components
    /pages
    /store
```

This code organization also allows me to define explicitly what is the meeting point between fronend and backend, and what typing is shared between them. See `Endpoints` section later.

## /app
Here there are all the files and subfolders required to handle the app routing.

But all files here consist in just a few lines of code, that import the real code from the `@/backend/` folder.

### /app/api
```typescript
// file /app/api/getSomething.ts

export * from '@/backend/apiControllers/getSomethingApiController'
```

### /app/myDashboard
```typescript 
// file /app/myDashboard/page.tsx

export { default } from '@/frontend/pages/myDashboardPage'
export * from '@/frontend/pages/myDashboardPage'
```

## Endpoints
```typescript
// file src/endpoints/myEndpoint.ts
const MyEndpoint = makeEndpoint({
  url: (queryParams) => `/api/myApiUrl/${queryParams.myKey}`,
  method: 'POST',
  queryParamsSchema: z.object({ ... }),
  requestSchema: z.object({ ... }),
  responseSchema: z.object({ ... }),
})

// somewhere in the frontend
const [result, error] = await callEndpoint(MyEndpoint, {
  query: { ... }, // endpoint.queryParamsSchema
  body: { ... }, // endpoint.requestSchema
  headers?: { ... },
})
// result is typed as z.infer<typeof MyEndpoint.responseSchema> | false
```
Endpoints and the "callEndpoint" function are strictly typed and validated with Zod. So the `body` and `query` inputs are typed based on the selected endpoint, and if the api returns something different from what is defined in the endpoint.responseSchema, you'll get a runtime error.

I conceived the `Endpoint` entity as the only meeting point between frontend and backend, so if the frontend needs the `User` informations after login, instead of importing the `User` type from Prisma, it must infer it fromt the `LoginEndpoint.responseSchema`.

This way any change in the apis will be immediately reflected in the frontend.

DB <--> Backend <--> Endpoints <--> Frontend

## Backend
`/apiControllers` for apis, and `/schemas` for zod objects.

When you need typescript types for db entities --> `import from 'prisma/client'`
When you need zod validation for a db entity --> `import from '@/backend/schemas'`

## Frontend
`/components` for reusable components.

`/pages` for the app pages.

`/store`
For each branch of the frontend store, there is a folder with the following structure:
```
/store
  /myBranch
    myBranchActions.ts
    myBranchReducers.ts
    myBranchSelectors.ts
```

