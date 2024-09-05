'use client'
import React, { ReactNode, useEffect } from 'react'
import {
  selectUserIsLogged,
  selectUserLoginLoading,
  selectUserLoginHasError,
} from '@/frontend/store/user/userSelectors'
import { verifyUserToken } from '@/frontend/store/user/userReducer'
import { useDispatch, useSelector } from '@/frontend/store/hooks'
import { usePathname, useRouter } from 'next/navigation'

type LoginWrapperProps = {
  children: ReactNode
}

export default function LoginWrapper({ children }: LoginWrapperProps) {
  const router = useRouter()
  const dispatch = useDispatch()
  const pathname = usePathname()
  const isLogged = useSelector(selectUserIsLogged)
  const isLoading = useSelector(selectUserLoginLoading)
  const hasError = useSelector(selectUserLoginHasError)

  useEffect(() => {
    if (!isLogged) {
      if (hasError) {
        router.push(`/login?redirect=${pathname}`, {})
      } else if (!isLoading) {
        dispatch(verifyUserToken())
      }
    }
  }, [isLogged, hasError, isLoading, router, pathname, dispatch])

  if (!isLogged) {
    return null
  }

  return <>{children}</>
}
