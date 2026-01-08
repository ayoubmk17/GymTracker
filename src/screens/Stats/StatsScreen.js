import React, { useEffect } from 'react'
import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHistory } from '../../store/workoutsSlice'
import { Ionicons } from '@expo/vector-icons'

export default function StatsScreen() {
  const dispatch = useDispatch()
  const history = useSelector(s => s.workouts.history)
  const token = useSelector(s => s.user.token)

  useEffect(() => {
    if (token) {
      dispatch(fetchHistory())
    }
  }, [token])

  if (!token) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <Ionicons name="stats-chart-outline" size={64} color="#d1d5db" />
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827', marginTop: 16, textAlign: 'center' }}>
            Sign in to view stats
          </Text>
          <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 8, textAlign: 'center' }}>
            Track your progress and see your workout statistics
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  // Calculate stats from history
  const totalWorkouts = history.length
  const totalExercises = history.reduce((sum, w) => sum + (w.exercises?.length || 0), 0)
  const totalSets = history.reduce((sum, w) =>
    sum + w.exercises?.reduce((s, ex) => s + (ex.sets?.length || 0), 0) || 0, 0
  )
  const totalVolume = history.reduce((sum, w) =>
    sum + w.exercises?.reduce((s, ex) =>
      s + (ex.sets?.reduce((v, set) => v + (parseFloat(set.weight) || 0), 0) || 0), 0
    ) || 0, 0
  )

  // Get recent workouts (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const recentWorkouts = history.filter(w => new Date(w.date) >= sevenDaysAgo)

  // Most trained muscle groups
  const muscleGroups = {}
  history.forEach(w => {
    w.exercises?.forEach(ex => {
      const muscle = ex.name?.split(' ')[0] || 'Other' // Simple heuristic
      muscleGroups[muscle] = (muscleGroups[muscle] || 0) + (ex.sets?.length || 0)
    })
  })
  const topMuscles = Object.entries(muscleGroups)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 32, fontWeight: '800', color: '#111827', marginBottom: 4 }}>
            Statistics
          </Text>
          <Text style={{ fontSize: 14, color: '#6b7280' }}>
            Your workout progress and achievements
          </Text>
        </View>

        {/* Main Stats Grid */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            <View style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 20,
              marginRight: 8,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2
            }}>
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: '#dbeafe',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12
              }}>
                <Ionicons name="calendar" size={24} color="#3b82f6" />
              </View>
              <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 4 }}>
                {totalWorkouts}
              </Text>
              <Text style={{ fontSize: 13, color: '#6b7280' }}>
                Total Workouts
              </Text>
            </View>

            <View style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 20,
              marginLeft: 8,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2
            }}>
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: '#fef3c7',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12
              }}>
                <Ionicons name="barbell" size={24} color="#f59e0b" />
              </View>
              <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 4 }}>
                {totalExercises}
              </Text>
              <Text style={{ fontSize: 13, color: '#6b7280' }}>
                Total Exercises
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 20,
              marginRight: 8,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2
            }}>
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: '#e9d5ff',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12
              }}>
                <Ionicons name="list" size={24} color="#8b5cf6" />
              </View>
              <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 4 }}>
                {totalSets}
              </Text>
              <Text style={{ fontSize: 13, color: '#6b7280' }}>
                Total Sets
              </Text>
            </View>

            <View style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 20,
              marginLeft: 8,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2
            }}>
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: '#fee2e2',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12
              }}>
                <Ionicons name="fitness" size={24} color="#ef4444" />
              </View>
              <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 4 }}>
                {totalVolume.toFixed(0)}
              </Text>
              <Text style={{ fontSize: 13, color: '#6b7280' }}>
                Total Volume (kg)
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
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
            Recent Activity (7 days)
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              flex: 1,
              alignItems: 'center',
              padding: 12,
              backgroundColor: '#f3f4f6',
              borderRadius: 12,
              marginRight: 8
            }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#111827' }}>
                {recentWorkouts.length}
              </Text>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>Workouts</Text>
            </View>
            <View style={{
              flex: 1,
              alignItems: 'center',
              padding: 12,
              backgroundColor: '#f3f4f6',
              borderRadius: 12,
              marginLeft: 8
            }}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#111827' }}>
                {recentWorkouts.length > 0 ? (7 / recentWorkouts.length).toFixed(1) : '0'}
              </Text>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>Days/Workout</Text>
            </View>
          </View>
        </View>

        {/* Top Muscle Groups */}
        {topMuscles.length > 0 && (
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
              Most Trained
            </Text>
            {topMuscles.map(([muscle, sets], idx) => (
              <View
                key={muscle}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderBottomWidth: idx < topMuscles.length - 1 ? 1 : 0,
                  borderBottomColor: '#e5e7eb'
                }}
              >
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
                    {idx + 1}
                  </Text>
                </View>
                <Text style={{ flex: 1, fontSize: 16, fontWeight: '600', color: '#111827' }}>
                  {muscle}
                </Text>
                <Text style={{ fontSize: 14, color: '#6b7280' }}>
                  {sets} sets
                </Text>
              </View>
            ))}
          </View>
        )}

        {totalWorkouts === 0 && (
          <View style={{ alignItems: 'center', marginTop: 50, padding: 32 }}>
            <Ionicons name="barbell-outline" size={64} color="#d1d5db" />
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginTop: 16, textAlign: 'center' }}>
              No workouts yet
            </Text>
            <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 8, textAlign: 'center' }}>
              Start your first workout to see your stats here
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

