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
    groupName: 'Pagine principali',
    items: [
      {
        label: 'Dati',
        icon: <DataIcon />,
        children: [
          { label: 'Data page', href: '/dashboard/data' },
          { label: 'Subpage', href: '/dashboard/data/subpage' },
        ],
      },
      {
        label: 'Grafici',
        icon: <ChartIcon />,
        children: [
          {
            label: 'Charts page',
            href: '/dashboard/charts',
            icon: <ChartIcon />,
          },
          {
            label: 'Subpage',
            href: '/dashboard/charts/subpage',
          },
        ],
      },
    ],
  },
  {
    groupName: 'Paaaagine',
    items: [
      {
        label: 'Dati 2',
        icon: <DataIcon />,
        children: [
          { label: 'Data page 2', href: '/dashboard/data' },
          { label: 'Subpage 2', href: '/dashboard/data/subpage' },
        ],
      },
      {
        label: 'Grafici 2',
        icon: <ChartIcon />,
        children: [
          {
            label: 'Charts page 2',
            href: '/dashboard/charts',
            icon: <ChartIcon />,
          },
          {
            groupName: 'Continua Paaaagine',
            items: [
              {
                label: 'Paginetta',
                href: '/dashboard',
              },
              {
                label: 'Paginaccia',
                href: '/dashboard',
              },
              {
                label: 'Paginona',
                href: '/dashboard',
              },
            ],
          },
          {
            groupName: 'Continua Paaaagine 2',
            items: [
              {
                label: 'Paginetta 3',
                href: '/dashboard',
              },
              {
                label: 'Paginaccia 3',
                href: '/dashboard',
              },
              {
                label: 'Paginona 3',
                href: '/dashboard',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    groupName: 'Altre pagine',
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
