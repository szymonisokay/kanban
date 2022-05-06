import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '../features/boards/boardSlice'
import usersReducer from '../features/users/userSlice'

export const store = configureStore({
  reducer: {
    board: boardReducer,
    users: usersReducer,
  },
})
