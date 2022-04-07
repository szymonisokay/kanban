import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  value: {},
  status: 'loading',
}

export const getBoards = createAsyncThunk(
  'board/getBoards',
  async () =>
    await axios
      .get('http://localhost:5000/api/boards/')
      .then((res) => res.data.boards)
)

export const getSingleBoard = createAsyncThunk(
  'board/getSingleBoard',
  async ({ boardName }) =>
    await axios
      .get(`http://localhost:5000/api/boards/${boardName}`)
      .then((res) => res.data.board)
)

export const addBoard = createAsyncThunk(
  'board/addBoard',
  async ({ name, desc }) =>
    axios
      .post('http://localhost:5000/api/boards/', {
        name,
        desc,
      })
      .then((res) => res.data.board)
)

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  extraReducers: {
    [getBoards.pending]: (state) => {
      state.status = 'loading'
    },
    [getBoards.fulfilled]: (state, action) => {
      state.value = action.payload
      state.status = 'success'
    },
    [getSingleBoard.pending]: (state) => {
      state.status = 'loading'
    },
    [getSingleBoard.fulfilled]: (state, action) => {
      state.value = action.payload
      state.status = 'success'
    },
    [addBoard.pending]: (state) => {
      state.status = 'loading'
    },
    [addBoard.fulfilled]: (state, action) => {
      state.value = [...state.value, action.payload]
      state.status = 'success'
    },
  },
})

export const {} = boardSlice.actions

export default boardSlice.reducer
