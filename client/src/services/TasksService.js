import axios from 'axios'
import { useSelector } from 'react-redux'

const API_URL = 'http://localhost:5000/api/tasks/'

// const { user } = useSelector((state) => state.users)

const createTask = async (task, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, task, config)

  return response.data
}

const TasksService = {
  createTask,
}

export default TasksService
