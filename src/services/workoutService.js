import api from './api'

const create = async payload => {
  const { data } = await api.post('/workouts', payload)
  return data
}

const history = async () => {
  const { data } = await api.get('/workouts/history')
  return data
}

const get = async id => {
  const { data } = await api.get(`/workouts/${id}`)
  return data
}

const statsVolume = async () => {
  const { data } = await api.get('/stats/volume')
  return data
}

const statsExercise = async id => {
  const { data } = await api.get(`/stats/exercise/${id}`)
  return data
}

const statsFrequency = async () => {
  const { data } = await api.get('/stats/frequency')
  return data
}

export default { create, history, get, statsVolume, statsExercise, statsFrequency }

