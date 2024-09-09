'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from '@/frontend/store/hooks'
import { logoutUser } from '@/frontend/store/user/userActions'

export default function LogoutPage() {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logoutUser()).then(() => {
      router.push('/login')
    })
  }, [dispatch, router])

  return null
}
