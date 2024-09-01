import { z } from 'zod'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import LoginEndpoint, { TokenisedUserInfo } from '@/app/api/login/LoginEndpoint'
import { callEndpoint } from '@/utils/callEndpoint'

export enum LoginStatus {
  IDLE = 0,
  LOADING = 1,
  ERROR = 2,
  SUCCESS = 3,
}

export type UserState = {
  loginStatus: LoginStatus
  email: string
  firstName: string | null
  lastName: string | null
}

const initialState: UserState = {
  loginStatus: LoginStatus.IDLE,
  email: '',
  firstName: null,
  lastName: null,
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = LoginStatus.LOADING
        state.email = initialState.email
        state.firstName = initialState.firstName
        state.lastName = initialState.lastName
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = LoginStatus.SUCCESS
        state.email = action.payload.email
        state.firstName = action.payload.firstName
        state.lastName = action.payload.lastName
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginStatus = LoginStatus.ERROR
      })
  },
})

export const loginUser = createAsyncThunk(
  'userActions/callLoginEndpoint',
  async (params: z.infer<typeof LoginEndpoint.requestSchema>, thunkAPI) => {
    const { token } = await callEndpoint(LoginEndpoint, {
      body: params,
    })

    const payload: TokenisedUserInfo = JSON.parse(atob(token.split('.')[1]))

    return payload
  }
)

export default userReducer.reducer
