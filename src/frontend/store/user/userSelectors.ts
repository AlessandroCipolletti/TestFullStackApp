import { RootState } from '@/frontend/store/store'
import { LoginStatus } from './userReducer'

export const selectUser = (state: RootState) => state

export const selectUserLoginLoading = (state: RootState) =>
  state.user.loginStatus === LoginStatus.LOADING

export const selectUserLoginHasError = (state: RootState) =>
  state.user.loginStatus === LoginStatus.FAILED ||
  state.user.loginStatus === LoginStatus.EXPIRED

export const selectUserLoginHasFailed = (state: RootState) =>
  state.user.loginStatus === LoginStatus.FAILED

export const selectUserIsLogged = (state: RootState) =>
  state.user.loginStatus === LoginStatus.LOGGED

export const selectUserLoginStatus = (state: RootState) =>
  state.user.loginStatus
