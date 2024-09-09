import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','firstName','lastName','disabled','deleted','blacklisted','createdAt','updatedAt']);

export const UserPasswordScalarFieldEnumSchema = z.enum(['id','password','active','createdAt','userId']);

export const UserSessionScalarFieldEnumSchema = z.enum(['id','refreshToken','duration','disabled','createdAt','userId']);

export const UserSessionAccessScalarFieldEnumSchema = z.enum(['id','duration','createdAt','userSessionId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
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
  disabled: z.boolean(),
  deleted: z.boolean(),
  blacklisted: z.boolean(),
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

/////////////////////////////////////////
// USER SESSION SCHEMA
/////////////////////////////////////////

export const UserSessionSchema = z.object({
  id: z.string(),
  refreshToken: z.string(),
  duration: z.string(),
  disabled: z.boolean(),
  createdAt: z.coerce.date(),
  userId: z.string(),
})

export type UserSession = z.infer<typeof UserSessionSchema>

/////////////////////////////////////////
// USER SESSION ACCESS SCHEMA
/////////////////////////////////////////

export const UserSessionAccessSchema = z.object({
  id: z.string(),
  duration: z.string(),
  createdAt: z.coerce.date(),
  userSessionId: z.string(),
})

export type UserSessionAccess = z.infer<typeof UserSessionAccessSchema>
