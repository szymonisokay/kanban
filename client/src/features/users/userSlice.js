import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  value: {},
  status: 'loading',
  auth: false,
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }) =>
    await axios
      .post('http://localhost:5000/api/users/login', {
        email,
        password,
      })
      .then((res) => res.data.user)
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = 'loading'
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'loading'
      state.value = action
      state.auth = true
    },
  },
})

export const {} = userSlice.actions

export default userSlice.reducer
