import z from 'zod'
import { createSlice } from '@reduxjs/toolkit'
import LoginEndpoint from '@/endpoints/LoginEndpoint'
import {
  createNewUser,
  loginUser,
  verifyUserToken,
} from '@/frontend/store/user/userActions'

type User = z.infer<typeof LoginEndpoint.responseSchema>['user']

export enum LoginStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  EXPIRED = 'expired',
  FAILED = 'error',
  LOGGED = 'logged',
}

export type UserState = {
  loginStatus: LoginStatus
  user: User | null
}

const initialState: UserState = {
  loginStatus: LoginStatus.IDLE,
  user: null,
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
        state.user = action.payload.user
      })
      .addCase(createNewUser.rejected, (state, action) => {
        // TODO
      })

      // VERIFY USER TOKEN
      .addCase(verifyUserToken.pending, (state, action) => {
        state.loginStatus = LoginStatus.LOADING
        state.user = null
      })
      .addCase(verifyUserToken.rejected, (state, action) => {
        state.loginStatus = LoginStatus.EXPIRED
        state.user = null
      })
      .addCase(verifyUserToken.fulfilled, (state, action) => {
        if (action.payload.valid && action.payload.user) {
          state.loginStatus = LoginStatus.LOGGED
          state.user = action.payload.user
        } else {
          state.loginStatus = LoginStatus.EXPIRED
          state.user = null
        }
      })

      // LOGIN USER
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = LoginStatus.LOADING
        state.user = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = LoginStatus.LOGGED
        state.user = action.payload.user
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginStatus = LoginStatus.FAILED
      })
  },
})

export default userReducer.reducer
