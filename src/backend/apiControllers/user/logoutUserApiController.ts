import { NextResponse } from 'next/server'

export async function POST() {
  // TODO: Here we should invalidate the refresh token
  return NextResponse.json({ message: 'Logged out' })
}
