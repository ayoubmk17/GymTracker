import React, { useEffect } from 'react'
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/userSlice'
import { fetchExercises } from '../../store/exercisesSlice'
import { Ionicons } from '@expo/vector-icons'

const CATEGORIES = [
  { name: 'Chest', icon: 'fitness', color: '#ef4444' },
  { name: 'Back', icon: 'body', color: '#f59e0b' },
  { name: 'Shoulders', icon: 'barbell', color: '#eab308' },
  { name: 'Biceps', icon: 'flash', color: '#22c55e' },
  { name: 'Triceps', icon: 'flash-outline', color: '#06b6d4' },
  { name: 'Legs', icon: 'walk', color: '#3b82f6' },
  { name: 'Calves', icon: 'footsteps', color: '#8b5cf6' },
  { name: 'Abs', icon: 'grid', color: '#ec4899' },
]

export default function ExerciseListScreen({ navigation }) {
  const dispatch = useDispatch()
  const token = useSelector(s => s.user.token)
  const exercises = useSelector(s => s.exercises.items)
  const exercisesStatus = useSelector(s => s.exercises.status)

  useEffect(() => {
    dispatch(fetchExercises())
  }, [])

  const getCategoryCount = (categoryName) => {
    return exercises.filter(ex => ex.category === categoryName).length
  }

  const renderCategory = ({ item }) => {
    const count = getCategoryCount(item.name)

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('MuscleExercises', { category: item.name })}
        style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          padding: 20,
          marginBottom: 16,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
          borderLeftWidth: 4,
          borderLeftColor: item.color,
        }}
      >
        <View style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          backgroundColor: item.color + '15',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16
        }}>
          <Ionicons name={item.icon} size={28} color={item.color} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 4 }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 14, color: '#6b7280' }}>
            {count} {count === 1 ? 'exercise' : 'exercises'}
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <View>
            <Text style={{ fontSize: 32, fontWeight: '800', color: '#111827' }}>Exercises</Text>
            <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
              {exercises.length} total exercises
            </Text>
          </View>
          {token ? (
            <TouchableOpacity
              onPress={() => dispatch(logout())}
              style={{
                backgroundColor: '#fee2e2',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 12
              }}
            >
              <Text style={{ color: '#ef4444', fontWeight: '600' }}>Logout</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <FlatList
          data={CATEGORIES}
          keyExtractor={item => item.name}
          renderItem={renderCategory}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            exercisesStatus !== 'loading' ? (
              <View style={{ alignItems: 'center', marginTop: 50 }}>
                <Ionicons name="barbell-outline" size={64} color="#d1d5db" />
                <Text style={{ color: '#6b7280', marginTop: 16, fontSize: 16 }}>No exercises found</Text>
                <TouchableOpacity onPress={() => dispatch(fetchExercises())} style={{ marginTop: 12 }}>
                  <Text style={{ color: '#2563eb', fontWeight: '600' }}>Retry</Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  )
}
