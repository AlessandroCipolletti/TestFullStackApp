import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserState = {
  logged: boolean
  email: string
  firstName: string
  lastName: string
}

const initialState: UserState = {
  logged: false,
  email: '',
  firstName: '',
  lastName: '',
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.logged = true
      state.email = action.payload.email
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
    },
    logout: (state) => {
      state.logged = false
      state.email = ''
      state.firstName = ''
      state.lastName = ''
    },
  },
})

export const { login, logout } = userReducer.actions
export default userReducer.reducer
