import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000'

const api = axios.create({ baseURL })

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api

