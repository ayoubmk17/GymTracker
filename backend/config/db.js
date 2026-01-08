const mongoose = require('mongoose')

const connectDb = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/gym_tracker'
  try {
    await mongoose.connect(uri)
    console.log(`MongoDB connected to ${uri}`)
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

module.exports = connectDb

