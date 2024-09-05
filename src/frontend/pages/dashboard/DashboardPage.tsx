'use client'
import React, { useCallback, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import NextLink from 'next/link'
import { callEndpoint } from '@/frontend/utils/callEndpoint'
import TestAuthApiEndpoint from '@/endpoints/TestAuthApiEndpoint'

export default function DashboardPage() {
  const callSignedApi = useCallback(async () => {
    await callEndpoint(TestAuthApiEndpoint, {})
    setTimeout(() => {
      callSignedApi()
    }, 5_000)
  }, [])

  useEffect(() => {
    callSignedApi()
  }, [callSignedApi])

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Dashboard
        </Typography>
        <Link href="/dashboard/page1" color="secondary" component={NextLink}>
          Go to the page 1
        </Link>
        <Link href="/dashboard/page2" color="secondary" component={NextLink}>
          Go to the page 2
        </Link>
        <Link href="/" color="secondary" component={NextLink}>
          Go to the home
        </Link>
      </Box>
    </Container>
  )
}
