import { useState, ReactNode, Fragment } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Drawer from '@mui/material/Drawer'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'

export type MenuItem = {
  text: string
  href: string
  icon?: ReactNode
  children?: MenuItem[]
}

type PageLayoutSidebarProps = {
  open: boolean
  menuItems: MenuItem[]
  toggle: () => void
}

export default function PageLayoutSidebar({
  open,
  menuItems,
  toggle,
}: PageLayoutSidebarProps) {
  const theme = useTheme()
  const pathname = usePathname()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({})
  const handleMenuClick = (text: string) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [text]: !prevOpenMenus[text],
    }))
  }

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={open}
      onClose={toggle}
      sx={{
        '& .MuiDrawer-paper': {
          width: theme.sizes.drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <Fragment key={item.text}>
            <ListItemButton
              sx={{ width: '100%' }}
              selected={pathname === item.href}
              component={item.children ? 'button' : Link}
              href={item.children ? undefined : item.href}
              onClick={
                item.children ? () => handleMenuClick(item.text) : undefined
              }
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.text} />
              {item.children ? (
                openMenus[item.text] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItemButton>
            {item.children && (
              <Collapse in={openMenus[item.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItemButton
                      key={child.text}
                      sx={{ pl: 4 }}
                      selected={pathname === child.href}
                      component={Link}
                      href={child.href}
                    >
                      {child.icon && <ListItemIcon>{child.icon}</ListItemIcon>}
                      <ListItemText primary={child.text} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </Fragment>
        ))}
      </List>
    </Drawer>
  )
}
