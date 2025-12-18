const mongoose = require('mongoose')

const planExerciseSchema = new mongoose.Schema(
  {
    exerciseId: { type: String, required: true },
    order: { type: Number, required: true }
  },
  { _id: false }
)

const planSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
    exercises: [planExerciseSchema]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Plan', planSchema)
