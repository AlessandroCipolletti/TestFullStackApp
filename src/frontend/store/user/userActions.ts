import { z } from 'zod'
import { createAsyncThunk } from '@reduxjs/toolkit'
import LoginEndpoint from '@/endpoints/LoginEndpoint'
import CreateUserEndpoint from '@/endpoints/CreateUserEndpoint'
import VerifyUserTokenEndpoint from '@/endpoints/VerifyUserTokenEndpoint'
import LogoutEndpoint from '@/endpoints/LogoutEndpoint'
import { callEndpoint } from '@/frontend/utils/callEndpoint'
import {
  emptyAccessTokenCookie,
  emptyRefreshTokenCookie,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from '@/frontend/utils/loginToken'

export const createNewUser = createAsyncThunk<
  z.infer<typeof CreateUserEndpoint.responseSchema>,
  z.infer<typeof CreateUserEndpoint.requestSchema>
>('userActions/createNewUser', async (params, thunkAPI) => {
  const [result, error] = await callEndpoint(CreateUserEndpoint, {
    body: params,
  })

  if (!result) {
    return thunkAPI.rejectWithValue(error?.message ?? 'Create user error')
  }

  setAccessTokenCookie(result.accessToken)
  setRefreshTokenCookie(result.refreshToken)

  return result
})

export const loginUser = createAsyncThunk<
  z.infer<typeof LoginEndpoint.responseSchema>,
  z.infer<typeof LoginEndpoint.requestSchema>
>('userActions/loginUser', async (params, thunkAPI) => {
  const [result, error] = await callEndpoint(LoginEndpoint, {
    body: params,
  })

  if (!result) {
    return thunkAPI.rejectWithValue(error?.message ?? 'Invalid login')
  }

  setAccessTokenCookie(result.accessToken)
  setRefreshTokenCookie(result.refreshToken)

  return result
})

export const verifyUserToken = createAsyncThunk<
  z.infer<typeof VerifyUserTokenEndpoint.responseSchema>,
  { canRetryWithRefreshToken?: boolean } | undefined
>('userActions/verifyUserToken', async (params = {}, thunkAPI) => {
  const [result, error] = await callEndpoint(VerifyUserTokenEndpoint, {
    canRetryWithRefreshToken: params.canRetryWithRefreshToken,
  })

  if (!result || !result.valid || !result.user) {
    return thunkAPI.rejectWithValue(error?.message ?? 'Invalid token')
  }

  return result
})

export const logoutUser = createAsyncThunk<
  void,
  z.infer<typeof LogoutEndpoint.requestSchema>
>('userActions/logoutUser', async (params, thunkAPI) => {
  const [result, error] = await callEndpoint(LogoutEndpoint, {})

  if (!result) {
    return thunkAPI.rejectWithValue(error?.message ?? 'Unknown error')
  }

  emptyAccessTokenCookie()
  emptyRefreshTokenCookie()
})
