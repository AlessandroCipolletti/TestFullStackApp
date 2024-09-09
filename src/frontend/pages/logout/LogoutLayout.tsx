import React, { Suspense, ReactNode } from 'react'
import StoreProvider from '@/frontend/store/StoreProvider'

type LogoutLayoutProps = {
  children: ReactNode
}

export default function LogoutLayout({ children }: LogoutLayoutProps) {
  return (
    <StoreProvider>
      <Suspense>{children}</Suspense>
    </StoreProvider>
  )
}
