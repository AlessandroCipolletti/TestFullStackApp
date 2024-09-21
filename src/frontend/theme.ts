'use client'
import { Roboto } from 'next/font/google'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    sizes: {
      drawerWidth: number
    }
  }
  interface ThemeOptions {
    sizes?: {
      drawerWidth?: number
    }
  }
}

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const prefersDarkMode =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches &&
  false

const theme = responsiveFontSizes(
  createTheme({
    colorSchemes: {
      dark: prefersDarkMode,
    },
    sizes: {
      drawerWidth: 240,
    },
    // palette: {
    //   mode: 'light',
    // },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    components: {
      MuiAlert: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.severity === 'info' && {
              backgroundColor: '#60a5fa',
            }),
          }),
        },
      },
    },
  })
)

export default theme
