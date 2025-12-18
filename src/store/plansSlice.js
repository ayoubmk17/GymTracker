import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import planService from '../services/planService'

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  current: null
}

export const fetchPlans = createAsyncThunk('plans/fetch', async () => {
  const res = await planService.list()
  return res
})

export const createPlan = createAsyncThunk('plans/create', async payload => {
  const res = await planService.create(payload)
  return res
})

export const getPlan = createAsyncThunk('plans/get', async id => {
  const res = await planService.get(id)
  return res
})

export const deletePlan = createAsyncThunk('plans/delete', async id => {
  await planService.remove(id)
  return id
})

const slice = createSlice({
  name: 'plans',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPlans.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(getPlan.fulfilled, (state, action) => {
        state.current = action.payload
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p._id !== action.payload)
      })
  }
})

export default slice.reducer

