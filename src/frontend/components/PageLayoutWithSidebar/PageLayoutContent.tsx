import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import useTheme from '@mui/material/styles/useTheme'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'

const drawerWidth = 240

type PageLayoutContentProps = {
  sidebarOpen: boolean
  children: ReactNode
}

export default function PageLayoutContent({
  sidebarOpen,
  children,
}: PageLayoutContentProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      component="main"
      sx={{
        p: 3,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width:
          sidebarOpen && !isMobile ? `calc(100vw - ${drawerWidth}px)` : '100%',
      }}
    >
      <Toolbar />
      {children}
    </Box>
  )
}
