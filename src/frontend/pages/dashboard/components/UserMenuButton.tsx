import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import HoverlayMenuButton, {
  HoverlayMenuItem,
} from '@/frontend/components/HoverlayMenuButton'
import { selectUserIsLogged } from '@/frontend/store/user/userSelectors'
import AccountCircle from '@mui/icons-material/AccountCircle'

// TODO if user logged in, passing user picto as Icon

export default function UserMenuButton() {
  const userIsLogged = useSelector(selectUserIsLogged)

  const items = useMemo<HoverlayMenuItem[]>(() => {
    if (userIsLogged) {
      return [
        {
          label: 'Profilo',
          onClick: () => console.log('Profilo'),
        },
        {
          label: 'Esci',
          href: '/logout',
        },
      ]
    }
    return [
      {
        label: 'Login',
        href: '/login',
      },
    ]
  }, [userIsLogged])

  return <HoverlayMenuButton items={items} Icon={AccountCircle} />
}
