import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import exerciseService from '../../services/exerciseService'

export default function ExerciseDetailScreen({ route }) {
  const { id } = route.params
  const [item, setItem] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await exerciseService.get(id)
      setItem(res)
    }
    load()
  }, [id])

  if (!item) return null

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }} contentContainerStyle={{ padding: 16 }}>
      {item.image ? <Image source={{ uri: item.image }} style={{ width: '100%', height: 200, borderRadius: 16, marginBottom: 16 }} /> : null}
      <Text style={{ fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 8 }}>{item.name}</Text>
      <Text style={{ color: '#6b7280', marginBottom: 12 }}>{item.category}</Text>
      <Text style={{ color: '#111827' }}>{item.description}</Text>
    </ScrollView>
  )
}

