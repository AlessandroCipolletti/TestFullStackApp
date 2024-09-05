'use client'
import React, { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import store from '@/frontend/store/store'

type StoreProviderProps = {
  children: ReactNode
}

const StoreProvider: FC<StoreProviderProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)

export default StoreProvider
