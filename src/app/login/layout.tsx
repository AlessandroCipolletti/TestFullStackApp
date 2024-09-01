import React, { ReactNode } from 'react'
import StoreProvider from '@/store/StoreProvider'

type DashboardLayoutProps = {
  children: ReactNode
}

export default function LoginLayout({ children }: DashboardLayoutProps) {
  return <StoreProvider>{children}</StoreProvider>
}
