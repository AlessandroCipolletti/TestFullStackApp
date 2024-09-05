import React, { ReactNode } from 'react'
import LoginWrapper from './LoginWrapper'
import StoreProvider from '@/frontend/store/StoreProvider'

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <StoreProvider>
      <LoginWrapper>{children}</LoginWrapper>
    </StoreProvider>
  )
}
