import React from 'react'
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button'
import { saveSession } from '../../store/workoutsSlice'
import { Ionicons } from '@expo/vector-icons'

export default function FinishWorkoutScreen({ navigation }) {
  const dispatch = useDispatch()
  const session = useSelector(s => s.workouts.currentSession)

  const save = () => {
    dispatch(saveSession(session))
    navigation.navigate('History')
  }

  if (!session) return null

  const totalSets = session.exercises.reduce((sum, ex) => sum + (ex.sets?.length || 0), 0)
  const totalReps = session.exercises.reduce((sum, ex) =>
    sum + (ex.sets?.reduce((s, set) => s + (parseInt(set.reps) || 0), 0) || 0), 0
  )
  const totalWeight = session.exercises.reduce((sum, ex) =>
    sum + (ex.sets?.reduce((s, set) => s + (parseFloat(set.weight) || 0), 0) || 0), 0
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        <View style={{ alignItems: 'center', marginBottom: 24, marginTop: 20 }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#22c55e',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16
          }}>
            <Ionicons name="checkmark" size={48} color="#fff" />
          </View>
          <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 4 }}>
            Workout Complete!
          </Text>
          <Text style={{ fontSize: 14, color: '#6b7280' }}>
            Great job finishing your workout
          </Text>
        </View>

        <View style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2
        }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 16 }}>
            Workout Summary
          </Text>

          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            <View style={{ flex: 1, alignItems: 'center', padding: 12, backgroundColor: '#f3f4f6', borderRadius: 12, marginRight: 8 }}>
              <Ionicons name="barbell" size={24} color="#3b82f6" style={{ marginBottom: 4 }} />
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#111827' }}>{session.exercises.length}</Text>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>Exercises</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', padding: 12, backgroundColor: '#f3f4f6', borderRadius: 12, marginLeft: 8 }}>
              <Ionicons name="list" size={24} color="#8b5cf6" style={{ marginBottom: 4 }} />
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#111827' }}>{totalSets}</Text>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>Total Sets</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'center', padding: 12, backgroundColor: '#f3f4f6', borderRadius: 12, marginRight: 8 }}>
              <Ionicons name="repeat" size={24} color="#f59e0b" style={{ marginBottom: 4 }} />
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#111827' }}>{totalReps}</Text>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>Total Reps</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', padding: 12, backgroundColor: '#f3f4f6', borderRadius: 12, marginLeft: 8 }}>
              <Ionicons name="fitness" size={24} color="#ef4444" style={{ marginBottom: 4 }} />
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#111827' }}>{totalWeight.toFixed(1)}</Text>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>Total Weight</Text>
            </View>
          </View>
        </View>

        <View style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2
        }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 }}>
            Exercise Breakdown
          </Text>

          {session.exercises.map((ex, idx) => {
            const exSets = ex.sets?.length || 0
            const exReps = ex.sets?.reduce((s, set) => s + (parseInt(set.reps) || 0), 0) || 0
            const exWeight = ex.sets?.reduce((s, set) => s + (parseFloat(set.weight) || 0), 0) || 0

            return (
              <View
                key={idx}
                style={{
                  paddingVertical: 12,
                  borderBottomWidth: idx < session.exercises.length - 1 ? 1 : 0,
                  borderBottomColor: '#e5e7eb'
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                  <View style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    backgroundColor: '#3b82f6',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10
                  }}>
                    <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }}>
                      {idx + 1}
                    </Text>
                  </View>
                  <Text style={{ flex: 1, fontSize: 16, fontWeight: '600', color: '#111827' }}>
                    {ex.name}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 38 }}>
                  <Text style={{ fontSize: 13, color: '#6b7280', marginRight: 12 }}>
                    {exSets} sets
                  </Text>
                  <Text style={{ fontSize: 13, color: '#6b7280', marginRight: 12 }}>
                    {exReps} reps
                  </Text>
                  <Text style={{ fontSize: 13, color: '#6b7280' }}>
                    {exWeight.toFixed(1)} kg
                  </Text>
                </View>
              </View>
            )
          })}
        </View>

        <Button
          title="Save Workout"
          onPress={save}
          style={{ marginBottom: 12 }}
        />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            padding: 14,
            alignItems: 'center',
            borderRadius: 12,
            backgroundColor: '#f3f4f6'
          }}
        >
          <Text style={{ color: '#6b7280', fontWeight: '600' }}>
            Back to Workout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

