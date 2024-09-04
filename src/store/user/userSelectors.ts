import { RootState } from '@/store/store'
import { LoginStatus } from './userReducer'

export const selectUser = (state: RootState) => state

export const selectUserLoginLoading = (state: RootState) =>
  state.user.loginStatus === LoginStatus.LOADING

export const selectUserLoginHasError = (state: RootState) =>
  state.user.loginStatus === LoginStatus.ERROR ||
  state.user.loginStatus === LoginStatus.EXPIRED

export const selectUserIsLogged = (state: RootState) =>
  state.user.loginStatus === LoginStatus.LOGGED

export const selectUserLoginStatus = (state: RootState) =>
  state.user.loginStatus
