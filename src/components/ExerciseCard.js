import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

export default function ExerciseCard({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8 }}>
      {item.image ? <Image source={{ uri: item.image }} style={{ width: 56, height: 56, borderRadius: 12, marginRight: 12 }} /> : null}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '700', color: '#111827' }}>{item.name}</Text>
        <Text style={{ color: '#6b7280' }}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  )
}

