import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/frontend/store/store'
import { LoginStatus } from './userReducer'

export const selectUser = (state: RootState) => state.user

export const selectUserLoginLoading = createSelector(
  selectUser,
  (user) => user.loginStatus === LoginStatus.LOADING
)

export const selectUserLoginHasError = createSelector(
  selectUser,
  (user) =>
    user.loginStatus === LoginStatus.FAILED ||
    user.loginStatus === LoginStatus.EXPIRED
)

export const selectUserLoginHasFailed = createSelector(
  selectUser,
  (user) => user.loginStatus === LoginStatus.FAILED
)

export const selectUserIsLogged = createSelector(
  selectUser,
  (user) => user.loginStatus === LoginStatus.LOGGED
)

export const selectUserLoginStatus = createSelector(
  selectUser,
  (user) => user.loginStatus
)
