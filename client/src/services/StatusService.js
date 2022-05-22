import axios from 'axios'

const API_URL = 'http://localhost:5000/api/tasks/status/'

const getStatuses = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

const StatusService = {
  getStatuses,
}

export default StatusService
