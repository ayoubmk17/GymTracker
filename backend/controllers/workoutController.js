const Workout = require('../models/Workout')

const createWorkout = async (req, res) => {
  const { planId, date, exercises } = req.body
  if (!Array.isArray(exercises) || exercises.length === 0) {
    return res.status(400).json({ message: 'Invalid payload' })
  }
  const workout = await Workout.create({ userId: req.user.id, planId, date: date ? new Date(date) : new Date(), exercises })
  res.status(201).json(workout)
}

const getWorkout = async (req, res) => {
  const { id } = req.params
  const workout = await Workout.findOne({ _id: id, userId: req.user.id })
  if (!workout) {
    return res.status(404).json({ message: 'Not found' })
  }
  res.json(workout)
}

const history = async (req, res) => {
  const items = await Workout.find({ userId: req.user.id }).sort({ date: -1 })
  res.json(items)
}

module.exports = { createWorkout, getWorkout, history }

