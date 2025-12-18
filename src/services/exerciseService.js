import api from './api'
import exercisesLocal from '../data/exercises.json'

const list = async params => {
  try {
    const { data } = await api.get('/exercises', { params })
    return data
  } catch (e) {
    let items = exercisesLocal
    if (params?.q) {
      items = items.filter(x => x.name.toLowerCase().includes(params.q.toLowerCase()))
    }
    if (params?.category) {
      items = items.filter(x => x.category === params.category)
    }
    return items
  }
}

const get = async id => {
  try {
    const { data } = await api.get(`/exercises/${id}`)
    return data
  } catch (e) {
    const item = exercisesLocal.find(x => x.id === id)
    return item
  }
}

export default { list, get }

