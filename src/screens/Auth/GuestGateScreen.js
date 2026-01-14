import React from 'react'
import { View, Text } from 'react-native'
import Button from '../../components/Button'

export default function GuestGateScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 16, justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 12 }}>Sign in required</Text>
      <Text style={{ color: '#6b7280', marginBottom: 16 }}>
        Please login or register to create plans, track workouts, view history, and see statistics.
      </Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate('Login')
        }}
        style={{ marginBottom: 12 }}
      />
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate('Register')
        }}
      />
    </View>
  )
}
