import { createSlice } from '@reduxjs/toolkit'
import {
  createNewUser,
  loginUser,
  verifyUserToken,
} from '@/frontend/store/user/userActions'

export enum LoginStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  EXPIRED = 'expired',
  FAILED = 'error',
  LOGGED = 'logged',
}

export type UserState = {
  loginStatus: LoginStatus
  id: string | null
  email: string | null
  firstName: string | null
  lastName: string | null
}

const initialState: UserState = {
  loginStatus: LoginStatus.IDLE,
  id: null,
  email: null,
  firstName: null,
  lastName: null,
}

const setUser = (state: UserState, user: Omit<UserState, 'loginStatus'>) => {
  state.id = user.id
  state.email = user.email
  state.firstName = user.firstName
  state.lastName = user.lastName
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE USER
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.loginStatus = LoginStatus.LOGGED
        setUser(state, action.payload)
      })
      .addCase(createNewUser.rejected, (state, action) => {
        // TODO
      })

      // VERIFY USER TOKEN
      .addCase(verifyUserToken.pending, (state, action) => {
        state.loginStatus = LoginStatus.LOADING
        setUser(state, initialState)
      })
      .addCase(verifyUserToken.rejected, (state, action) => {
        state.loginStatus = LoginStatus.EXPIRED
        setUser(state, initialState)
      })
      .addCase(verifyUserToken.fulfilled, (state, action) => {
        if (action.payload.valid && action.payload.user) {
          state.loginStatus = LoginStatus.LOGGED
          setUser(state, action.payload.user)
        } else {
          state.loginStatus = LoginStatus.EXPIRED
          setUser(state, initialState)
        }
      })

      // LOGIN USER
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = LoginStatus.LOADING
        setUser(state, initialState)
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = LoginStatus.LOGGED
        setUser(state, action.payload)
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginStatus = LoginStatus.FAILED
      })
  },
})

export default userReducer.reducer
