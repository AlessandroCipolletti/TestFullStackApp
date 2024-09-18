import { ReactNode } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'

type PageLayoutWithSidebarProps = {
  pageTitle: string
  children?: ReactNode
  toggleMenuOpen?: () => void
}

export default function PageLayoutHeader({
  pageTitle,
  children,
  toggleMenuOpen,
}: PageLayoutWithSidebarProps) {
  const theme = useTheme()

  return (
    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {toggleMenuOpen && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleMenuOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {pageTitle}
        </Typography>

        {children}
      </Toolbar>
    </AppBar>
  )
}
