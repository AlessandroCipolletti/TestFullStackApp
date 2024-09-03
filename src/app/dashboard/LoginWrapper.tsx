'use client'
import React, { ReactNode, useEffect } from 'react'
import { selectUserIsLogged } from '@/store/user/userSelectors'
import { verifyUserToken } from '@/store/user/userReducer'
import { useDispatch, useSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { unwrapResult } from '@reduxjs/toolkit'

type LoginWrapperProps = {
  children: ReactNode
}

export default function LoginWrapper({ children }: LoginWrapperProps) {
  const router = useRouter()
  const dispatch = useDispatch()
  const isLogged = useSelector(selectUserIsLogged)

  useEffect(() => {
    const doJob = async () => {
      if (!isLogged) {
        const result = await dispatch(verifyUserToken())
        const { valid, user } = unwrapResult(result)

        if (!valid || !user) {
          router.push('/login')
        }
      }
    }
    doJob()
  }, [isLogged, router, dispatch])

  if (!isLogged) {
    return null
  }

  return <>{children}</>
}
