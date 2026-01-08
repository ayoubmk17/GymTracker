import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'

// Choose a sensible default API host depending on environment.
// On Android emulators, 'localhost' refers to the device/emulator itself,
// so we use the emulator host bridge `10.0.2.2` for the default.
const envUrl = process.env.EXPO_PUBLIC_API_URL
let baseURL = envUrl
if (!baseURL) {
  if (Platform.OS === 'android') {
    baseURL = 'http://10.0.2.2:5001'
  } else {
    baseURL = 'http://localhost:5001'
  }
}

const api = axios.create({ baseURL })

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api

