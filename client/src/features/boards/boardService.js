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

const createBoard = async (boardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, boardData, config)

  return response.data
}

const boardService = {
  getBoards,
  createBoard,
}

export default boardService
