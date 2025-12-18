import React from 'react'
import { View, TextInput, Text } from 'react-native'

export default function Input({ label, value, onChangeText, secureTextEntry, placeholder, keyboardType }) {
  return (
    <View style={{ marginBottom: 12 }}>
      {label ? <Text style={{ marginBottom: 6, color: '#111827' }}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={{ backgroundColor: '#f3f4f6', padding: 12, borderRadius: 14 }}
      />
    </View>
  )
}

