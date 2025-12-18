import React from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button'
import { saveSession } from '../../store/workoutsSlice'

export default function FinishWorkoutScreen({ navigation }) {
  const dispatch = useDispatch()
  const session = useSelector(s => s.workouts.currentSession)

  const save = () => {
    dispatch(saveSession(session))
    navigation.navigate('History')
  }

  if (!session) return null

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 12 }}>Finish Workout</Text>
      <Text style={{ color: '#6b7280', marginBottom: 12 }}>Saving session</Text>
      <Button title="Save" onPress={save} />
    </View>
  )
}

