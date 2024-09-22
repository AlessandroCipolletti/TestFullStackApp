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
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type MenuItemWithChildren = {
  label: string
  icon?: ReactNode
  children: MenuItem[]
}

type MenuItemWithoutChildren = {
  label: string
  href: string
  icon?: ReactNode
}

type MenuGroup = {
  groupName: string
  items: (MenuItemWithChildren | MenuItemWithoutChildren)[]
}

export type MenuItem =
  | MenuGroup
  | MenuItemWithChildren
  | MenuItemWithoutChildren

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

  const renderMenuGroup = (
    menuGroup: MenuGroup,
    level: number,
    isLast: boolean
  ) => (
    <Box key={menuGroup.groupName} sx={{ pt: 0.5 }}>
      <Typography variant="caption" sx={{ pl: 2 * level }}>
        {menuGroup.groupName}
      </Typography>
      {menuGroup.items.map((item, i) =>
        renderMenuItem(item, level, i === menuGroup.items.length - 1)
      )}
      {!isLast && <Divider />}
    </Box>
  )

  const renderMenuItemWithChildren = (
    menuItem: MenuItemWithChildren,
    level = 0
  ) => (
    <Fragment key={menuItem.label}>
      <ListItemButton
        sx={getItemStyle(level)}
        component="button"
        onClick={() => handleMenuClick(menuItem.label)}
      >
        {menuItem.icon && (
          <ListItemIcon sx={{ minWidth: 40 }}>{menuItem.icon}</ListItemIcon>
        )}
        <ListItemText primary={menuItem.label} />
        {openMenus[menuItem.label] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openMenus[menuItem.label]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {menuItem.children.map((child, i) =>
            renderMenuItem(child, level + 1, i === menuItem.children.length - 1)
          )}
        </List>
      </Collapse>
    </Fragment>
  )

  const renderMenuItemWithoutChildren = (
    menuItem: MenuItemWithoutChildren,
    level = 0
  ) => (
    <Fragment key={menuItem.label}>
      <ListItemButton
        sx={getItemStyle(level)}
        selected={pathname === menuItem.href}
        component={Link}
        href={menuItem.href}
      >
        {menuItem.icon && (
          <ListItemIcon sx={{ minWidth: 40 }}>{menuItem.icon}</ListItemIcon>
        )}
        <ListItemText primary={menuItem.label} />
      </ListItemButton>
    </Fragment>
  )

  const renderMenuItem = (
    menuItem: MenuItem,
    level: number,
    isLast: boolean
  ) => {
    if ('groupName' in menuItem) {
      return renderMenuGroup(menuItem, level, isLast)
    }
    if ('children' in menuItem) {
      return renderMenuItemWithChildren(menuItem, level)
    }
    return renderMenuItemWithoutChildren(menuItem, level)
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
          pl: 1,
          pr: 1,
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item, i) =>
          renderMenuItem(item, 1, i === menuItems.length - 1)
        )}
      </List>
    </Drawer>
  )
}

const getItemStyle = (level: number) => ({
  width: '100%',
  pl: 2 * level,
  mt: 0.5,
  mb: 0.5,
  borderRadius: 2,
})
