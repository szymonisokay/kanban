import axios from 'axios'

const API_URL = 'http://localhost:5000/api/tasks/'

const createTask = async (task, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, task, config)

  return response.data
}

const updateTask = async (id, task, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + id, task, config)

  return response.data
}

const deleteTask = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + id, config)

  return response.data
}

const tasksService = {
  createTask,
  updateTask,
  deleteTask,
}

export default tasksService
