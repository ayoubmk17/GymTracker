import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function PlanCard({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 12, marginBottom: 12 }}>
      <Text style={{ fontWeight: '700', color: '#111827', marginBottom: 4 }}>{item.name}</Text>
      <Text style={{ color: '#6b7280' }}>{item.exercises.length} exercises</Text>
    </TouchableOpacity>
  )
}

