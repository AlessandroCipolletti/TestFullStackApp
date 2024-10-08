import React, { Suspense, ReactNode } from 'react'
import StoreProvider from '@/frontend/store/StoreProvider'

type LoginLayoutProps = {
  children: ReactNode
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <StoreProvider>
      <Suspense>{children}</Suspense>
    </StoreProvider>
  )
}
