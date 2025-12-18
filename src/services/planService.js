import api from './api'

const create = async payload => {
  const { data } = await api.post('/plans', payload)
  return data
}

const list = async () => {
  const { data } = await api.get('/plans')
  return data
}

const get = async id => {
  const { data } = await api.get(`/plans/${id}`)
  return data
}

const remove = async id => {
  await api.delete(`/plans/${id}`)
}

export default { create, list, get, remove }

