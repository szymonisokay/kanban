import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users/'

const getUsers = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

const UsersService = {
  getUsers,
}

export default UsersService
