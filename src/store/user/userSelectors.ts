import { RootState } from '@/store/store'

export const selectUser = (state: RootState) => state

export const selectUserIsLogged = (state: RootState) => state.user.logged
