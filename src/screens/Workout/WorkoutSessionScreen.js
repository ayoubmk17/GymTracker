import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import SetInput from '../../components/SetInput'
import Button from '../../components/Button'
import { updateCurrentSession } from '../../store/workoutsSlice'

export default function WorkoutSessionScreen({ navigation }) {
  const dispatch = useDispatch()
  const session = useSelector(s => s.workouts.currentSession)
  const exercisesCatalog = useSelector(s => s.exercises.items)

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

  const finish = () => {
    navigation.navigate('FinishWorkout')
  }

  if (!session) return null

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb', padding: 16 }}>
      <FlatList
        data={session.exercises}
        keyExtractor={(item, idx) => String(idx)}
        renderItem={({ item, index }) => (
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 12, marginBottom: 12 }}>
            <Text style={{ fontWeight: '700', color: '#111827', marginBottom: 8 }}>
              {(() => {
                const found = exercisesCatalog.find(e => e._id === item.exerciseId || e.id === item.exerciseId)
                return found ? found.name : item.exerciseId
              })()}
            </Text>
            <FlatList
              data={item.sets || []}
              keyExtractor={(s, i) => String(i)}
              renderItem={({ item: s, index: si }) => <SetInput value={s} onChange={v => updateSet(index, si, v)} />}
            />
            <Button title="Add Set" onPress={() => addSet(index)} style={{ marginTop: 8 }} />
          </View>
        )}
      />
      <Button title="Finish" onPress={finish} />
    </View>
  )
}

