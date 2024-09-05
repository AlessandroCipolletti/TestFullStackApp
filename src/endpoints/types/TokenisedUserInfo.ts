import z from 'zod'

const TokenisedUserInfo = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
})

export default TokenisedUserInfo
