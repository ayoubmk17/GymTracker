import React, { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getPlan } from '../../store/plansSlice'

export default function PlanDetailScreen({ route }) {
  const { id } = route.params
  const dispatch = useDispatch()
  const plan = useSelector(s => s.plans.current)

  useEffect(() => {
    dispatch(getPlan(id))
  }, [id])

  if (!plan) return null

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb', padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 12 }}>{plan.name}</Text>
      <FlatList
        data={plan.exercises}
        keyExtractor={(item, idx) => String(idx)}
        renderItem={({ item }) => <Text style={{ backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 8 }}>{item.exerciseId}</Text>}
      />
    </View>
  )
}

