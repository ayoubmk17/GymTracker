const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    muscles: [{ type: String }],
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    image: { type: String },
    description: { type: String }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Exercise', exerciseSchema)

