# DB schemas, types,  and migrations with Prisma
<img src="https://cdn.worldvectorlogo.com/logos/prisma-2.svg" alt="drawing" width="400" style="margin-bottom: 30px;" />


I chose [Prisma](https://www.prisma.io/docs) to handle db schemas, migrations and type definitions.

It's easy to use, and it integrates perfectly with Typescript and Zod.

But it handles migration only in one direction (not possible to rollback automatically).

My database of choice is [PostgreSQL](https://www.postgresql.org).


## Types and migrations

I use it to:
 
- Generate Typescript types (`import {...} from '@prisma/client'`)
- Zod definitions (`import {...} from '@/backend/schemas'`, thanks to `zod-prisma-types`)
- Generate sql migrations scripts

You can create / edit schemas in `prisma/schema.prisma`, and then:

- To just update types and zod definitions (if you need to edit some more typescript code before actually edit the database), run:  
  `npx prisma generate`

- To generate type/zod definition + migrations files, without actually edit the database (if you need to add ), run:
  `npx prisma migrate dev --name {migration_name} --create-only`

- To do everything (types, sql script, and edit the db), run:
  `npx prisma migrate dev --name {migration_name}`


## Queries

```typescript
import prisma from 'prisma/init'

const myVar = await prisma.MySchema.create({
  data: { ... },
})
```

MySchema.count() .create() .createMany .aggregate() .delete() .deleteMany() .find() .findFirst() .findUnique() .update() .updateMany() .groupBy()


