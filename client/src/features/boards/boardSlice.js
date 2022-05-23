import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import boardService from './boardService'

const initialState = {
  boards: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
}

export const getBoards = createAsyncThunk(
  'board/getBoards',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.user.token
      return await boardService.getBoards(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getSingleBoard = createAsyncThunk(
  'board/getSingleBoard',
  async (boardID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.user.token
      return await boardService.getSingleBoard(boardID, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const addBoard = createAsyncThunk(
  'board/addBoard',
  async (board, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.user.token
      return await boardService.createBoard(board, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteBoard = createAsyncThunk(
  'board/deleteBoard',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.user.token
      return await boardService.deleteBoard(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateBoard = createAsyncThunk(
  'board/updateBoard',
  async ({ id, boardData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.user.token
      return await boardService.updateBoard(id, boardData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

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
  },
})

export const { reset, setMessage } = boardSlice.actions

export default boardSlice.reducer
