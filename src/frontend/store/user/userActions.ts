import { z } from 'zod'
import { User } from '@prisma/client'
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
  User,
  z.infer<typeof CreateUserEndpoint.requestSchema>
>('userActions/createNewUser', async (params, thunkAPI) => {
  const [result, error] = await callEndpoint(CreateUserEndpoint, {
    body: params,
  })

  if (!result) {
    return thunkAPI.rejectWithValue(error?.message ?? 'Create user error')
  }

  const { accessToken, refreshToken } = result

  setAccessTokenCookie(accessToken)
  setRefreshTokenCookie(refreshToken)

  const payload: User = JSON.parse(atob(accessToken.split('.')[1]))

  return payload
})

export const loginUser = createAsyncThunk<
  User,
  z.infer<typeof LoginEndpoint.requestSchema>
>('userActions/loginUser', async (params, thunkAPI) => {
  const [result, error] = await callEndpoint(LoginEndpoint, {
    body: params,
  })

  if (!result) {
    return thunkAPI.rejectWithValue(error?.message ?? 'Invalid login')
  }

  const { accessToken, refreshToken } = result

  setAccessTokenCookie(accessToken)
  setRefreshTokenCookie(refreshToken)

  const payload: User = JSON.parse(atob(accessToken.split('.')[1]))

  return payload
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
