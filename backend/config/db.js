const mongoose = require('mongoose')

const connectDb = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/gym_tracker'
  await mongoose.connect(uri)
}

module.exports = connectDb

