const Workout = require('../models/Workout')

const totalVolume = sets => {
  return sets.reduce((sum, s) => sum + s.reps * s.weight, 0)
}

const statsVolume = async (req, res) => {
  const workouts = await Workout.find({ userId: req.user.id }).sort({ date: 1 })
  const series = workouts.map(w => {
    const volume = w.exercises.reduce((sum, ex) => sum + totalVolume(ex.sets || []), 0)
    return { date: w.date, volume }
  })
  const total = series.reduce((sum, s) => sum + s.volume, 0)
  res.json({ total, series })
}

const statsExercise = async (req, res) => {
  const { exerciseId } = req.params
  const workouts = await Workout.find({ userId: req.user.id, 'exercises.exerciseId': exerciseId }).sort({ date: 1 })
  const series = workouts.map(w => {
    const ex = w.exercises.find(e => e.exerciseId.toString() === exerciseId)
    const volume = ex ? totalVolume(ex.sets || []) : 0
    return { date: w.date, volume }
  })
  res.json({ exerciseId, series })
}

const statsFrequency = async (req, res) => {
  const workouts = await Workout.find({ userId: req.user.id })
  const byDay = {}
  workouts.forEach(w => {
    const k = new Date(w.date).toISOString().slice(0, 10)
    byDay[k] = (byDay[k] || 0) + 1
  })
  const series = Object.keys(byDay)
    .sort()
    .map(d => ({ date: d, count: byDay[d] }))
  res.json({ series })
}

module.exports = { statsVolume, statsExercise, statsFrequency }

