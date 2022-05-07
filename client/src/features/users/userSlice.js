import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  status: 'idle',
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }) =>
    await axios
      .post('http://localhost:5000/api/users/login', {
        email,
        password,
      })
      .then((res) => {
        if (res.data) {
          localStorage.setItem('user', JSON.stringify(res.data.user))
        }
        return res.data.user
      })
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.status = 'idle'
      state.user = null
      removeFromStorage()
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = 'loading'
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'success'
      state.user = action.payload
    },
  },
})

const removeFromStorage = () => {
  localStorage.removeItem('user')
}

export const { authenticateUser, logoutUser } = userSlice.actions

export default userSlice.reducer
