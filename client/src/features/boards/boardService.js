import axios from 'axios'

const API_URL = 'http://localhost:5000/api/boards/'

const getBoards = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const getSingleBoard = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + id, config)

  return response.data
}

const createBoard = async (boardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, boardData, config)

  return response.data
}

const deleteBoard = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + id, config)

  return response.data
}

const boardService = {
  getBoards,
  createBoard,
  getSingleBoard,
  deleteBoard,
}

export default boardService
