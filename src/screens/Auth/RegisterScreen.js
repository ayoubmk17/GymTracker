import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../store/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const status = useSelector(s => s.user.status)
  const [success, setSuccess] = useState('')

  const onSubmit = async () => {
    try {
      const action = await dispatch(register({ name, email, password }))
      unwrapResult(action)
      setSuccess('Account created — you are signed in')
      setTimeout(() => {
        setSuccess('')
        navigation.getParent()?.navigate('Exercises')
      }, 900)
    } catch (err) {
      Alert.alert('Register failed', err?.message || 'Check inputs')
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#ffffff' }}>
      {success ? (
        <View style={{ backgroundColor: '#dcfce7', padding: 10, borderRadius: 8, marginBottom: 12 }}>
          <Text style={{ color: '#065f46', fontWeight: '600' }}>{success}</Text>
        </View>
      ) : null}
      <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 20 }}>Create Account</Text>
      <Input label="Name" value={name} onChangeText={setName} placeholder="John Doe" />
      <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="you@example.com" />
      <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry placeholder="••••••••" />
      <Button title="Register" onPress={onSubmit} loading={status === 'loading'} />
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
        <Text style={{ color: '#2563eb' }}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  )
}

