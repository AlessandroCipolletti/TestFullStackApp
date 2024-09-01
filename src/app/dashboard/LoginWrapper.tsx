'use client'
import React, { ReactNode } from 'react'
import { selectUserIsLogged } from '@/store/user/userSelectors'
import { useSelector } from '@/store/hooks'

type LoginWrapperProps = {
  children: ReactNode
}

export default function LoginWrapper({ children }: LoginWrapperProps) {
  const isLogged = useSelector(selectUserIsLogged)
  console.log(isLogged)

  // useEffect(() => {
  //   if (!isLogged) {
  //     debugger
  //     // router.push('/login')
  //   }
  // }, [isLogged, router])

  if (!isLogged) {
    return 'please log in'
  }

  return <>{children}</>
}
