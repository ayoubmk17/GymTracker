import AsyncStorage from '@react-native-async-storage/async-storage'
import api from './api'

const register = async (name, email, password) => {
  try {
    const { data } = await api.post('/auth/register', { name, email, password })
    await AsyncStorage.setItem('token', data.token)
    await AsyncStorage.setItem('user', JSON.stringify(data.user))
    return data
  } catch (e) {
    throw (e.response?.data?.message) || e.message
  }
}

const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password })
  await AsyncStorage.setItem('token', data.token)
  await AsyncStorage.setItem('user', JSON.stringify(data.user))
  return data
}

const logout = async () => {
  await AsyncStorage.removeItem('token')
  await AsyncStorage.removeItem('user')
}

export default { register, login, logout }

