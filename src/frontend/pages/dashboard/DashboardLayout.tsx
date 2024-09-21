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
      { text: 'Data page', href: '/dashboard/data' },
      { text: 'Subpage', href: '/dashboard/data/subpage' },
    ],
  },
  {
    text: 'Grafici',
    href: '/dashboard/charts',
    icon: <ChartIcon />,
    children: [
      { text: 'Charts page', href: '/dashboard/charts' },
      { text: 'Subpage', href: '/dashboard/charts/subpage' },
    ],
  },
  {
    text: 'Dashboard',
    href: '/dashboard',
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
