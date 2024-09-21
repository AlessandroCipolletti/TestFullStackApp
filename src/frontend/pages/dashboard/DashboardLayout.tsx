'use client'
import React, { ReactNode } from 'react'
import DataIcon from '@mui/icons-material/DataUsage'
import ChartIcon from '@mui/icons-material/BarChart'
import StoreProvider from '@/frontend/store/StoreProvider'
import PageLayoutWithSidebar, {
  MenuItem,
} from '@/frontend/components/PageLayoutWithSidebar/PageLayoutWithSidebar'
import LoginWrapper from './components/LoginWrapper'

const menuItems: MenuItem[] = [
  {
    text: 'Dati',
    href: '/dashboard/data',
    icon: <DataIcon />,
    children: [
      { text: 'Sottodati 1', href: '/dashboard/data/subdata1' },
      { text: 'Sottodati 2', href: '/dashboard/data/subdata2' },
    ],
  },
  {
    text: 'Grafici',
    href: '/dashboard/charts',
    icon: <ChartIcon />,
    children: [
      { text: 'Sottografici 1', href: '/dashboard/charts/subchart1' },
      { text: 'Sottografici 2', href: '/dashboard/charts/subchart2' },
    ],
  },
]

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <StoreProvider>
      <LoginWrapper>
        <PageLayoutWithSidebar menuItems={menuItems}>
          {children}
        </PageLayoutWithSidebar>
      </LoginWrapper>
    </StoreProvider>
  )
}
