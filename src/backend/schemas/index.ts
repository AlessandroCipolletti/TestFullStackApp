import { z } from 'zod'

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
])

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'email',
  'firstName',
  'lastName',
  'createdAt',
  'updatedAt',
])

export const UserPasswordScalarFieldEnumSchema = z.enum([
  'id',
  'password',
  'active',
  'createdAt',
  'userId',
])

export const SortOrderSchema = z.enum(['asc', 'desc'])

export const QueryModeSchema = z.enum(['default', 'insensitive'])

export const NullsOrderSchema = z.enum(['first', 'last'])
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PASSWORD SCHEMA
/////////////////////////////////////////

export const UserPasswordSchema = z.object({
  id: z.string(),
  password: z.string(),
  active: z.boolean(),
  createdAt: z.coerce.date(),
  userId: z.string(),
})

export type UserPassword = z.infer<typeof UserPasswordSchema>
