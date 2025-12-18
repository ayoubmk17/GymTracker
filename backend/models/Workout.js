const mongoose = require('mongoose')

const setSchema = new mongoose.Schema(
  {
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    rpe: { type: Number }
  },
  { _id: false }
)

const workoutExerciseSchema = new mongoose.Schema(
  {
    exerciseId: { type: String, required: true },
    sets: [setSchema]
  },
  { _id: false }
)

const workoutSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
    date: { type: Date, default: Date.now },
    exercises: [workoutExerciseSchema]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Workout', workoutSchema)
