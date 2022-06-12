import { createAsyncThunk } from '@reduxjs/toolkit'
import tasksService from '../../services/TasksService'
import boardService from './boardService'

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

export const createTask = createAsyncThunk(
  'board/createTask',
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.user.token
      return await tasksService.createTask(taskData, token)
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

export const updateTask = createAsyncThunk(
  'board/updateTask',
  async ({ id, taskData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.user.token
      return await tasksService.updateTask(id, taskData, token)
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

export const deleteTask = createAsyncThunk(
  'board/deleteTask',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.user.token
      return await tasksService.deleteTask(id, token)
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
