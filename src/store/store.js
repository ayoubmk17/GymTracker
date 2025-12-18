import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import exercisesReducer from './exercisesSlice'
import plansReducer from './plansSlice'
import workoutsReducer from './workoutsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    exercises: exercisesReducer,
    plans: plansReducer,
    workouts: workoutsReducer
  }
})

