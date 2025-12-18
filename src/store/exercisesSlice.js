import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import exerciseService from '../services/exerciseService'

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  query: '',
  category: ''
}

export const fetchExercises = createAsyncThunk('exercises/fetch', async (_, { getState }) => {
  const { query, category } = getState().exercises
  const res = await exerciseService.list({ q: query, category })
  return res
})

const slice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload
    },
    setCategory(state, action) {
      state.category = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchExercises.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.status = 'failed'
        state.error = 'Failed to load exercises'
      })
  }
})

export const { setQuery, setCategory } = slice.actions
export default slice.reducer

