import { NextResponse } from 'next/server'
import prisma from 'prisma/init'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { TokenisedUserInfo } from './LoginEndpoint'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  console.log('REQUEST', email, password)

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    )
  }

  const userPublicInfo: TokenisedUserInfo = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  }

  const token = jwt.sign({ user: userPublicInfo }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  })

  return NextResponse.json({ token })
}
