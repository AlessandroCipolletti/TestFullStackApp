import { configureStore, combineReducers } from '@reduxjs/toolkit'

import userReducer from './user/userReducer'

const rootReducer = combineReducers({
  user: userReducer,
})

// Define the root state type using the ReturnType utility of TypeScript
export type RootState = ReturnType<typeof rootReducer>

// Define the type for dispatching actions from the store
export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: rootReducer,
})

export default store
