import { NextResponse } from 'next/server'

export async function POST() {
  // TODO: Here we should invalidate the refresh token passed in the request
  // and we can log the "logout" action somewhere
  return NextResponse.json({ message: 'Logged out' })
}
