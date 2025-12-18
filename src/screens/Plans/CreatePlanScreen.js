import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExercises } from '../../store/exercisesSlice'
import { createPlan, fetchPlans } from '../../store/plansSlice'
import Input from '../../components/Input'
import Button from '../../components/Button'
import PlanCard from '../../components/PlanCard'

export default function CreatePlanScreen({ navigation }) {
  const dispatch = useDispatch()
  const exercises = useSelector(s => s.exercises.items)
  const plans = useSelector(s => s.plans.items)
  const [selected, setSelected] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    dispatch(fetchExercises())
    dispatch(fetchPlans())
  }, [])

  const toggle = item => {
    const exists = selected.find(x => (x.exerciseId || x._id) === (item._id || item.id))
    if (exists) {
      setSelected(selected.filter(x => (x.exerciseId || x._id) !== (item._id || item.id)))
    } else {
      setSelected([...selected, { exerciseId: item._id || item.id, order: selected.length + 1 }])
    }
  }

  const save = () => {
    dispatch(createPlan({ name, exercises: selected }))
    setSelected([])
    setName('')
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb', padding: 16 }}>
      <Input label="Plan name" value={name} onChangeText={setName} placeholder="Push Day" />
      <Text style={{ fontWeight: '700', color: '#111827', marginBottom: 8 }}>Exercises</Text>
      <FlatList
        data={exercises}
        keyExtractor={item => item._id || item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggle(item)} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 12, marginBottom: 8 }}>
            <Text style={{ color: '#111827', fontWeight: '600' }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Save Plan" onPress={save} />
      <Text style={{ fontWeight: '700', color: '#111827', marginVertical: 12 }}>Your Plans</Text>
      <FlatList
        data={plans}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <PlanCard item={item} onPress={() => navigation.navigate('PlanDetail', { id: item._id })} />}
      />
    </View>
  )
}

