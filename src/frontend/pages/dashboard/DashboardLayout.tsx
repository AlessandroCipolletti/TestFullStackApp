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
    groupName: 'Page group',
    items: [
      {
        label: 'Data folder',
        icon: <DataIcon />,
        children: [
          { label: 'Data page', href: '/dashboard/data', icon: <DataIcon /> },
        ],
      },
      {
        label: 'Charts folder',
        icon: <ChartIcon />,
        children: [
          {
            label: 'Charts page',
            href: '/dashboard/charts',
            icon: <ChartIcon />,
          },
        ],
      },
    ],
  },
  {
    groupName: 'Other pages',
    items: [
      {
        label: 'Dashboard',
        href: '/dashboard',
      },
      {
        label: 'Theme',
        href: '/theme',
      },
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
