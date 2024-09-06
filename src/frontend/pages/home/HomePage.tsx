import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import NextLink from 'next/link'

export default function HomePage() {
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
          Material UI - Next.js App Router example in TypeScript
        </Typography>
        <Link href="/dashboard" color="secondary" component={NextLink}>
          Go to the dashboard page
        </Link>
        <Link href="/login" color="secondary" component={NextLink}>
          Go to login
        </Link>
        <Link href="/theme" color="secondary" component={NextLink}>
          Go to theme
        </Link>
      </Box>
    </Container>
  )
}
