import { createSlice } from '@reduxjs/toolkit'
import {
  getBoards,
  getSingleBoard,
  addBoard,
  deleteBoard,
  updateBoard,
  createTask,
  updateTask,
  deleteTask,
} from './boardAsyncActions'

const initialState = {
  boards: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
      state.message = ''
    },
    setMessage: (state, action) => {
      state.isError = true
      state.message = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.boards = action.payload
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(addBoard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.boards = action.payload
      })
      .addCase(addBoard.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(getSingleBoard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleBoard.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.boards = action.payload
      })
      .addCase(getSingleBoard.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(deleteBoard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.boards = state.boards.filter(
          (board) => board._id !== action.payload
        )
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(updateBoard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.boards = state.boards.map((board) =>
          board._id === action.payload._id
            ? {
                ...board,
                name: action.payload.name,
                desc: action.payload.desc,
                users: action.payload.users,
              }
            : board
        )
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.boards.tasks.push(action.payload)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.boards.tasks = state.boards.tasks.map((task) =>
          task._id === action.payload._id
            ? {
                ...task,
                user: action.payload.user,
                status: action.payload.status,
                name: action.payload.name,
                desc: action.payload.desc,
              }
            : task
        )
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.boards.tasks = state.boards.tasks.filter(
          (task) => task._id !== action.payload._id
        )
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, setMessage } = boardSlice.actions

export default boardSlice.reducer
