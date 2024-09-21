import * as React from 'react'
import '@/frontend/globalStyle.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from 'src/frontend/theme'
import MuiXLicense from './MuiXLicense'

export default function HomeLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
            <MuiXLicense />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
