import React, { Suspense, ReactNode } from 'react'
import StoreProvider from '@/frontend/store/StoreProvider'

type SignupLayoutProps = {
  children: ReactNode
}

export default function SignupLayout({ children }: SignupLayoutProps) {
  return (
    <StoreProvider>
      <Suspense>{children}</Suspense>
    </StoreProvider>
  )
}
