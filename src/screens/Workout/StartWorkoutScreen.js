import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlans } from '../../store/plansSlice'
import { fetchExercises } from '../../store/exercisesSlice'
import { startSession } from '../../store/workoutsSlice'
import { Ionicons } from '@expo/vector-icons'

export default function StartWorkoutScreen({ navigation }) {
  const dispatch = useDispatch()
  const plans = useSelector(s => s.plans.items)
  const exercises = useSelector(s => s.exercises.items)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    dispatch(fetchPlans())
    dispatch(fetchExercises())
  }, [])

  const begin = () => {
    if (!selected) {
      Alert.alert('No Plan Selected', 'Please select a plan to start your workout')
      return
    }

    const payload = {
      planId: selected._id,
      planName: selected.name,
      date: new Date().toISOString(),
      exercises: (selected.exercises || []).map(e => {
        const ex = exercises.find(x => x._id === e.exerciseId || x.id === e.exerciseId)
        return {
          exerciseId: e.exerciseId,
          name: ex?.name || 'Unknown Exercise',
          sets: []
        }
      })
    }
    dispatch(startSession(payload))
    navigation.navigate('WorkoutSession')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 4 }}>
            Start Workout
          </Text>
          <Text style={{ fontSize: 14, color: '#6b7280' }}>
            Choose a plan to begin your session
          </Text>
        </View>

        <FlatList
          data={plans}
          keyExtractor={item => item._id}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <Ionicons name="clipboard-outline" size={64} color="#d1d5db" />
              <Text style={{ color: '#6b7280', marginTop: 16, fontSize: 16 }}>No plans yet</Text>
              <Text style={{ color: '#9ca3af', marginTop: 4, fontSize: 14 }}>
                Create a plan first to start working out
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const isSelected = selected?._id === item._id
            return (
              <TouchableOpacity
                onPress={() => setSelected(item)}
                style={{
                  backgroundColor: isSelected ? '#dbeafe' : '#fff',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: isSelected ? 2 : 1,
                  borderColor: isSelected ? '#3b82f6' : '#e5e7eb',
                  shadowColor: '#000',
                  shadowOpacity: isSelected ? 0.1 : 0.05,
                  shadowRadius: 8,
                  elevation: isSelected ? 3 : 1
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: isSelected ? '#3b82f6' : '#d1d5db',
                    backgroundColor: isSelected ? '#3b82f6' : '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    {isSelected && <Ionicons name="checkmark" size={14} color="#fff" />}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      color: isSelected ? '#1e40af' : '#111827',
                      fontWeight: '700',
                      fontSize: 16,
                      marginBottom: 4
                    }}>
                      {item.name}
                    </Text>
                    <Text style={{ color: '#6b7280', fontSize: 13 }}>
                      {item.exercises?.length || 0} exercises
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
        />

        {selected && (
          <TouchableOpacity
            onPress={begin}
            style={{
              backgroundColor: '#2563eb',
              padding: 16,
              borderRadius: 16,
              alignItems: 'center',
              marginTop: 16,
              shadowColor: '#2563eb',
              shadowOpacity: 0.3,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 4
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
              Start Workout
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  )
}

