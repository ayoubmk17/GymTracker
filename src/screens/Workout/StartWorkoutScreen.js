import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlans } from '../../store/plansSlice'
import { startSession } from '../../store/workoutsSlice'

export default function StartWorkoutScreen({ navigation }) {
  const dispatch = useDispatch()
  const plans = useSelector(s => s.plans.items)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    dispatch(fetchPlans())
  }, [])

  const begin = () => {
    const payload = { planId: selected?._id || null, date: new Date().toISOString(), exercises: (selected?.exercises || []).map(e => ({ exerciseId: e.exerciseId, sets: [] })) }
    dispatch(startSession(payload))
    navigation.navigate('WorkoutSession')
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb', padding: 16 }}>
      <Text style={{ fontWeight: '700', color: '#111827', marginBottom: 8 }}>Choose a plan</Text>
      <FlatList
        data={plans}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelected(item)} style={{ backgroundColor: selected?._id === item._id ? '#dbeafe' : '#fff', borderRadius: 16, padding: 12, marginBottom: 8 }}>
            <Text style={{ color: '#111827', fontWeight: '600' }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={begin} style={{ backgroundColor: '#2563eb', padding: 14, borderRadius: 16, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: '600' }}>Start Workout</Text>
      </TouchableOpacity>
    </View>
  )
}

