import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'
import Constants from 'expo-constants'

const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL
  }

  const hostUri = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost
  if (hostUri) {
    const host = hostUri.split(':')[0]
    return `http://${host}:5001`
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5001'
  }
  return 'http://localhost:5001'
}

const api = axios.create({ baseURL: getBaseUrl() })

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api

