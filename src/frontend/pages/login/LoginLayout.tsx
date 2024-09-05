import React, { Suspense, ReactNode } from 'react'
import StoreProvider from '@/frontend/store/StoreProvider'

type DashboardLayoutProps = {
  children: ReactNode
}

export default function LoginLayout({ children }: DashboardLayoutProps) {
  return (
    <StoreProvider>
      <Suspense>{children}</Suspense>
    </StoreProvider>
  )
}
