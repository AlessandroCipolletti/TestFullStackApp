import { NextResponse } from 'next/server'

export async function POST() {
  // Server-side logout can simply invalidate the token client-side.
  // Since JWT tokens are stateless, not much can be done on the server side.
  return NextResponse.json({ message: 'Logged out' })
}
