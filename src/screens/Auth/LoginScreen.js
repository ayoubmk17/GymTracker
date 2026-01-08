import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { login, bootstrapAuth } from '../../store/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const status = useSelector(s => s.user.status)
  const error = useSelector(s => s.user.error)

  useEffect(() => {
    dispatch(bootstrapAuth())
  }, [])

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error)
    }
  }, [error])

  useEffect(() => {
    // if we arrived here after registration, show a success alert
    const msg = navigation.getState()?.routes?.find(r => r.name === 'Login')?.params?.success
    if (msg) {
      Alert.alert('Success', msg)
      // clear param
      navigation.setParams({ success: null })
    }
  }, [])

  useEffect(() => {
    if (status === 'succeeded') {
      // navigate to main Exercises tab after successful login
      navigation.navigate('Exercises')
    }
  }, [status])

  const onSubmit = async () => {
    try {
      const action = await dispatch(login({ email, password }))
      unwrapResult(action)
    } catch (err) {
      Alert.alert('Login failed', err?.message || 'Check credentials')
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#ffffff' }}>
      <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 20 }}>Gym Tracker</Text>
      <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="you@example.com" />
      <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry placeholder="••••••••" />
      <Button title="Login" onPress={onSubmit} loading={status === 'loading'} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 16 }}>
        <Text style={{ color: '#2563eb' }}>Create an account</Text>
      </TouchableOpacity>
    </View>
  )
}

