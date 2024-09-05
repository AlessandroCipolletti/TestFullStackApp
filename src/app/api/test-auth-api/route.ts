import { NextResponse } from 'next/server'
import logger from '@/backend/utils/logger'

export async function POST(request: Request) {
  logger.info({ data: 'value' }, 'api call test-auth-api')
  return NextResponse.json({})
}
