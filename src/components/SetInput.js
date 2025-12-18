import React from 'react'
import { View, TextInput, Text } from 'react-native'

export default function SetInput({ value, onChange }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 8 }}>
      <TextInput
        value={String(value.reps || '')}
        onChangeText={t => onChange({ ...value, reps: Number(t) || 0 })}
        placeholder="Reps"
        keyboardType="numeric"
        style={{ backgroundColor: '#f3f4f6', padding: 10, borderRadius: 12, minWidth: 70 }}
      />
      <TextInput
        value={String(value.weight || '')}
        onChangeText={t => onChange({ ...value, weight: Number(t) || 0 })}
        placeholder="Weight"
        keyboardType="numeric"
        style={{ backgroundColor: '#f3f4f6', padding: 10, borderRadius: 12, minWidth: 90 }}
      />
      <Text style={{ color: '#6b7280' }}>kg</Text>
    </View>
  )
}

