import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users/'

const getUsers = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

const getUser = async (id) => {
  const response = await axios.get(API_URL + id)

  return response.data
}

const UsersService = {
  getUsers,
  getUser,
}

export default UsersService
