const Exercise = require('../models/Exercise')

const listExercises = async (req, res) => {
  const { q, category } = req.query
  const filter = {}
  if (q) {
    filter.name = { $regex: q, $options: 'i' }
  }
  if (category) {
    filter.category = category
  }
  const items = await Exercise.find(filter).sort({ name: 1 })
  res.json(items)
}

const getExercise = async (req, res) => {
  const { id } = req.params
  const item = await Exercise.findById(id)
  if (!item) {
    return res.status(404).json({ message: 'Not found' })
  }
  res.json(item)
}

const createExercise = async (req, res) => {
  const { name, category, muscles, difficulty, image, description } = req.body
  if (!name || !category) {
    return res.status(400).json({ message: 'Missing fields' })
  }
  const item = await Exercise.create({ name, category, muscles, difficulty, image, description })
  res.status(201).json(item)
}

module.exports = { listExercises, getExercise, createExercise }

