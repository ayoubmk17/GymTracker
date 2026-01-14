const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDb = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const exerciseRoutes = require('./routes/exerciseRoutes')
const planRoutes = require('./routes/planRoutes')
const workoutRoutes = require('./routes/workoutRoutes')
const statsRoutes = require('./routes/statsRoutes')
const { errorHandler } = require('./middleware/errorHandler')

dotenv.config()
connectDb()

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({ ok: true })
})

app.use('/auth', authRoutes)
app.use('/exercises', exerciseRoutes)
app.use('/plans', planRoutes)
app.use('/workouts', workoutRoutes)
app.use('/stats', statsRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})

