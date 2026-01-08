import React, { useEffect } from 'react'
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getPlan } from '../../store/plansSlice'
import { fetchExercises } from '../../store/exercisesSlice'
import { Ionicons } from '@expo/vector-icons'

export default function PlanDetailScreen({ route, navigation }) {
  const { id } = route.params
  const dispatch = useDispatch()
  const plan = useSelector(s => s.plans.current)
  const exercises = useSelector(s => s.exercises.items)

  useEffect(() => {
    dispatch(getPlan(id))
    dispatch(fetchExercises())
  }, [id])

  if (!plan) return null

  const getExerciseName = (exerciseId) => {
    const exercise = exercises.find(ex => ex._id === exerciseId || ex.id === exerciseId)
    return exercise ? exercise.name : 'Unknown Exercise'
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View style={{ flex: 1 }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb'
        }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: '800', color: '#111827' }}>{plan.name}</Text>
            <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 2 }}>
              {plan.exercises.length} {plan.exercises.length === 1 ? 'exercise' : 'exercises'}
            </Text>
          </View>
        </View>

        <FlatList
          data={plan.exercises}
          keyExtractor={(item, idx) => String(idx)}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item, index }) => (
            <View style={{
              backgroundColor: '#fff',
              padding: 16,
              borderRadius: 12,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2
            }}>
              <View style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: '#3b82f6',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12
              }}>
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>
                  {index + 1}
                </Text>
              </View>
              <Text style={{
                color: '#111827',
                fontWeight: '600',
                fontSize: 16,
                flex: 1
              }}>
                {getExerciseName(item.exerciseId)}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

