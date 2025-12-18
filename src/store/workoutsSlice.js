import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import workoutService from '../services/workoutService'

const initialState = {
  history: [],
  status: 'idle',
  currentSession: null,
  stats: { volume: null, frequency: null, exercise: null }
}

export const startSession = createAsyncThunk('workouts/start', async payload => {
  return payload
})

export const saveSession = createAsyncThunk('workouts/save', async payload => {
  const res = await workoutService.create(payload)
  return res
})

export const fetchHistory = createAsyncThunk('workouts/history', async () => {
  const res = await workoutService.history()
  return res
})

export const fetchVolumeStats = createAsyncThunk('workouts/statsVolume', async () => {
  const res = await workoutService.statsVolume()
  return res
})

export const fetchFrequencyStats = createAsyncThunk('workouts/statsFrequency', async () => {
  const res = await workoutService.statsFrequency()
  return res
})

export const fetchExerciseStats = createAsyncThunk('workouts/statsExercise', async id => {
  const res = await workoutService.statsExercise(id)
  return res
})

const slice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    updateCurrentSession(state, action) {
      state.currentSession = { ...(state.currentSession || {}), ...action.payload }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(startSession.fulfilled, (state, action) => {
        state.currentSession = action.payload
      })
      .addCase(saveSession.fulfilled, (state, action) => {
        state.currentSession = null
        state.history.unshift(action.payload)
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload
      })
      .addCase(fetchVolumeStats.fulfilled, (state, action) => {
        state.stats.volume = action.payload
      })
      .addCase(fetchFrequencyStats.fulfilled, (state, action) => {
        state.stats.frequency = action.payload
      })
      .addCase(fetchExerciseStats.fulfilled, (state, action) => {
        state.stats.exercise = action.payload
      })
  }
})

export const { updateCurrentSession } = slice.actions
export default slice.reducer

