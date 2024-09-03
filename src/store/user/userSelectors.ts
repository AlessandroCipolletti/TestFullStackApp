import { RootState } from '@/store/store'
import { LoginStatus } from './userReducer'

export const selectUser = (state: RootState) => state

export const selectUserIsLogged = (state: RootState) =>
  state.user.loginStatus === LoginStatus.LOGGED

export const selectUserLoginStatus = (state: RootState) =>
  state.user.loginStatus
