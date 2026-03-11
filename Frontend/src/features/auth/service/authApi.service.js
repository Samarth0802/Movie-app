import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/auth',
  withCredentials: true,
})


export const registerUser = async (username, email, password) => {
  try {
    const response = await api.post('/register', { username, email, password })
    return { success: true, data: response.data }
  } catch (err) {
    throw err.response?.data || { message: 'Registration failed' }
  }
}

export const loginUser = async (identifier, password) => {
  try {
    const response = await api.post('/login', { identifier, password })
    return { success: true, data: response.data }
  } catch (err) {
    throw err.response?.data || { message: 'Login failed' }
  }
}


export const getMe = async () => {
  try {
    const response = await api.get('/getUser')
    return { success: true, data: response.data }
  } catch (err) {
    throw err.response?.data || { message: 'Auth check failed' }
  }
}


export const logoutUser = async () => {
  try {
    const response = await api.post('/logout')
    return { success: true, data: response.data }
  } catch (err) {
    throw err.response?.data || { message: 'Logout failed' }
  }
}