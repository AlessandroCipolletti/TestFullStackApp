import { ElementType, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

type HoverlayMenuButtonProps = {
  Icon?: ElementType
  items: HoverlayMenuItem[]
}

export type HoverlayMenuItem =
  | {
      label: string
      onClick: () => void
      preventCloseOnClick?: boolean
    }
  | {
      label: string
      href: string
    }

export default function HoverlayMenuButton({
  Icon,
  items,
}: HoverlayMenuButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openUserMenu = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const IconComponent = Icon || MenuIcon

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <IconComponent />
      </IconButton>
      <Menu anchorEl={anchorEl} open={openUserMenu} onClose={handleClose}>
        {items.map((item, index) =>
          'href' in item ? (
            <MenuItem
              key={item.label}
              component="a"
              href={item.href}
              onClick={handleClose}
            >
              {item.label}
            </MenuItem>
          ) : (
            <MenuItem
              key={item.label}
              onClick={() => {
                item.onClick()
                if (!item.preventCloseOnClick) {
                  handleClose()
                }
              }}
            >
              {item.label}
            </MenuItem>
          )
        )}
      </Menu>
    </>
  )
}
