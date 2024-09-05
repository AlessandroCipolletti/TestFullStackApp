import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import NextLink from 'next/link'

export default function DashboardPage2() {
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
          Page 2
        </Typography>
        <Link href="/dashboard" color="secondary" component={NextLink}>
          Go to the dashboard
        </Link>
        <Link href="/dashboard/page1" color="secondary" component={NextLink}>
          Go to the page 1
        </Link>
      </Box>
    </Container>
  )
}
