import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import authService from '../services/authService'

const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null
}

export const bootstrapAuth = createAsyncThunk('user/bootstrap', async () => {
  const token = await AsyncStorage.getItem('token')
  const user = await AsyncStorage.getItem('user')
  return { token, user: user ? JSON.parse(user) : null }
})

export const login = createAsyncThunk('user/login', async ({ email, password }) => {
  const res = await authService.login(email, password)
  return res
})

export const register = createAsyncThunk('user/register', async ({ name, email, password }) => {
  const res = await authService.register(name, email, password)
  return res
})

export const logout = createAsyncThunk('user/logout', async () => {
  await authService.logout()
})

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.user = action.payload.user
      })
      .addCase(login.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload.token
        state.user = action.payload.user
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = 'Login failed'
      })
      .addCase(register.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload.token
        state.user = action.payload.user
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error = 'Register failed'
      })
      .addCase(logout.fulfilled, state => {
        state.token = null
        state.user = null
      })
  }
})

export default slice.reducer

