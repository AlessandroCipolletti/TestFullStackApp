import { z } from 'zod'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import LoginEndpoint from '@/endpoints/LoginEndpoint'
import CreateUserEndpoint from '@/endpoints/CreateUserEndpoint'
import VerifyUserTokenEndpoint from '@/endpoints/VerifyUserTokenEndpoint'
import TokenisedUserInfo from '@/endpoints/types/TokenisedUserInfo'
import { callEndpoint } from '@/frontend/utils/callEndpoint'
import {
  emptyAccessTokenCookie,
  emptyRefreshTokenCookie,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from '@/frontend/utils/loginToken'

export enum LoginStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  EXPIRED = 'expired',
  ERROR = 'error',
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
        state.loginStatus = LoginStatus.ERROR
      })
  },
})

export const createNewUser = createAsyncThunk<
  z.infer<typeof TokenisedUserInfo>,
  z.infer<typeof CreateUserEndpoint.requestSchema>
>('userActions/callCreateUserEndpoint', async (params, thunkAPI) => {
  const [result, error] = await callEndpoint(CreateUserEndpoint, {
    body: params,
  })

  if (!result) {
    return thunkAPI.rejectWithValue(error?.message ?? 'Create user error')
  }

  const { accessToken, refreshToken } = result

  setAccessTokenCookie(accessToken)
  setRefreshTokenCookie(refreshToken)

  const payload: z.infer<typeof TokenisedUserInfo> = JSON.parse(
    atob(accessToken.split('.')[1])
  )

  return payload
})

export const loginUser = createAsyncThunk<
  z.infer<typeof TokenisedUserInfo>,
  z.infer<typeof LoginEndpoint.requestSchema>
>('userActions/callLoginEndpoint', async (params, thunkAPI) => {
  const [result, error] = await callEndpoint(LoginEndpoint, {
    body: params,
  })

  if (!result) {
    return thunkAPI.rejectWithValue(error?.message ?? 'Invalid login')
  }

  const { accessToken, refreshToken } = result

  setAccessTokenCookie(accessToken)
  setRefreshTokenCookie(refreshToken)

  const payload: z.infer<typeof TokenisedUserInfo> = JSON.parse(
    atob(accessToken.split('.')[1])
  )

  return payload
})

export const verifyUserToken = createAsyncThunk<
  z.infer<typeof VerifyUserTokenEndpoint.responseSchema>,
  void
>('userActions/verifyUserToken', async (params, thunkAPI) => {
  const [result, error] = await callEndpoint(VerifyUserTokenEndpoint, {})

  if (!result || !result.valid || !result.user) {
    emptyAccessTokenCookie()
    emptyRefreshTokenCookie()
    return thunkAPI.rejectWithValue(error?.message ?? 'Invalid token')
  }

  return result
})

// TODO onLogout:
// if (!response.ok && response.status === 401) {
//   emptyAccessTokenCookie()
//   emptyRefreshTokenCookie()
// }

export default userReducer.reducer
