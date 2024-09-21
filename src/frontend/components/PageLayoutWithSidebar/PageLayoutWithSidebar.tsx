import { ReactNode, useState } from 'react'
import Box from '@mui/material/Box'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'

import UserMenuButton from '@/frontend/pages/dashboard/components/UserMenuButton'
import PageLayoutHeader from './PageLayoutHeader'
import PageLayoutSidebar, { MenuItem } from './PageLayoutSidebar'
import PageLayoutContent from './PageLayoutContent'

type PageLayoutWithSidebarProps = {
  menuItems: MenuItem[]
  children: ReactNode
}

export default function PageLayoutWithSidebar({
  menuItems,
  children,
}: PageLayoutWithSidebarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

  const toggleSidebar = () => {
    setSidebarOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <PageLayoutHeader pageTitle="Dashboard">
        <UserMenuButton />
      </PageLayoutHeader>

      <PageLayoutSidebar
        open={sidebarOpen}
        menuItems={menuItems}
        toggle={toggleSidebar}
      />

      <PageLayoutContent sidebarOpen={sidebarOpen}>
        {children}
      </PageLayoutContent>
    </Box>
  )
}

export { type MenuItem } from './PageLayoutSidebar'
