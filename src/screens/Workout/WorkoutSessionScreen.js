import React from 'react'
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import SetInput from '../../components/SetInput'
import Button from '../../components/Button'
import { updateCurrentSession } from '../../store/workoutsSlice'
import { Ionicons } from '@expo/vector-icons'

export default function WorkoutSessionScreen({ navigation }) {
  const dispatch = useDispatch()
  const session = useSelector(s => s.workouts.currentSession)

  const updateSet = (idx, setIdx, setVal) => {
    const exercises = [...session.exercises]
    const sets = [...(exercises[idx].sets || [])]
    sets[setIdx] = setVal
    exercises[idx] = { ...exercises[idx], sets }
    dispatch(updateCurrentSession({ exercises }))
  }

  const addSet = idx => {
    const exercises = [...session.exercises]
    const sets = [...(exercises[idx].sets || [])]
    sets.push({ reps: 0, weight: 0 })
    exercises[idx] = { ...exercises[idx], sets }
    dispatch(updateCurrentSession({ exercises }))
  }

  const removeSet = (idx, setIdx) => {
    const exercises = [...session.exercises]
    const sets = [...(exercises[idx].sets || [])]
    sets.splice(setIdx, 1)
    exercises[idx] = { ...exercises[idx], sets }
    dispatch(updateCurrentSession({ exercises }))
  }

  const finish = () => {
    navigation.navigate('FinishWorkout')
  }

  if (!session) return null

  const totalSets = session.exercises.reduce((sum, ex) => sum + (ex.sets?.length || 0), 0)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View style={{ flex: 1 }}>
        <View style={{
          padding: 16,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb'
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 24, fontWeight: '800', color: '#111827' }}>
                {session.planName || 'Workout Session'}
              </Text>
              <Text style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
                {session.exercises.length} exercises • {totalSets} sets
              </Text>
            </View>
            <TouchableOpacity
              onPress={finish}
              style={{
                backgroundColor: '#22c55e',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 12
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>Finish</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
          {session.exercises.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#fff',
                borderRadius: 16,
                padding: 16,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <View style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: '#3b82f6',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12
                }}>
                  <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
                    {index + 1}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '700', color: '#111827', fontSize: 17 }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
                    {item.sets?.length || 0} {item.sets?.length === 1 ? 'set' : 'sets'}
                  </Text>
                </View>
              </View>

              {item.sets && item.sets.length > 0 && (
                <View style={{ marginBottom: 12 }}>
                  <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 8,
                    paddingBottom: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e5e7eb',
                    marginBottom: 8
                  }}>
                    <Text style={{ width: 40, fontSize: 12, fontWeight: '600', color: '#6b7280' }}>SET</Text>
                    <Text style={{ flex: 1, fontSize: 12, fontWeight: '600', color: '#6b7280' }}>REPS</Text>
                    <Text style={{ flex: 1, fontSize: 12, fontWeight: '600', color: '#6b7280' }}>WEIGHT</Text>
                    <View style={{ width: 32 }} />
                  </View>
                  {item.sets.map((s, si) => (
                    <View key={si} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                      <View style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        backgroundColor: '#f3f4f6',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 8
                      }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
                          {si + 1}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <SetInput value={s} onChange={v => updateSet(index, si, v)} />
                      </View>
                      <TouchableOpacity
                        onPress={() => removeSet(index, si)}
                        style={{ marginLeft: 8, padding: 4 }}
                      >
                        <Ionicons name="trash-outline" size={20} color="#ef4444" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}

              <Button
                title={`Add Set ${item.sets?.length ? `(${item.sets.length + 1})` : ''}`}
                onPress={() => addSet(index)}
                style={{ marginTop: 8 }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

