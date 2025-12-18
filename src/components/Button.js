import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'

export default function Button({ title, onPress, style, loading }) {
  return (
    <TouchableOpacity onPress={onPress} style={[{ backgroundColor: '#2563eb', padding: 14, borderRadius: 16, alignItems: 'center' }, style]} disabled={loading}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '600' }}>{title}</Text>}
    </TouchableOpacity>
  )
}

