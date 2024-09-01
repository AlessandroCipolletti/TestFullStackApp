import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux'
import { RootState, AppDispatch } from './store'

// Create a custom useSelector hook with typed state
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector

// Create a custom useDispatch hook with typed dispatch
export const useDispatch = () => useAppDispatch<AppDispatch>()
