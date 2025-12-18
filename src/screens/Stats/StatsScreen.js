import React, { useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { VictoryChart, VictoryLine, VictoryTheme, VictoryBar } from 'victory-native'
import { fetchFrequencyStats, fetchVolumeStats, fetchExerciseStats } from '../../store/workoutsSlice'

export default function StatsScreen() {
  const dispatch = useDispatch()
  const stats = useSelector(s => s.workouts.stats)
  const [exerciseId, setExerciseId] = useState('')

  useEffect(() => {
    dispatch(fetchVolumeStats())
    dispatch(fetchFrequencyStats())
  }, [])

  const loadExercise = () => {
    if (exerciseId) dispatch(fetchExerciseStats(exerciseId))
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 12 }}>Statistics</Text>
      <Text style={{ fontWeight: '700', color: '#111827' }}>Total Volume</Text>
      {stats.volume?.series ? (
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine data={stats.volume.series.map(s => ({ x: new Date(s.date), y: s.volume }))} />
        </VictoryChart>
      ) : null}
      <Text style={{ fontWeight: '700', color: '#111827', marginTop: 16 }}>Workout Frequency</Text>
      {stats.frequency?.series ? (
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryBar data={stats.frequency.series.map(s => ({ x: new Date(s.date), y: s.count }))} />
        </VictoryChart>
      ) : null}
      <Text style={{ fontWeight: '700', color: '#111827', marginTop: 16 }}>Exercise Progress</Text>
      <TextInput
        value={exerciseId}
        onChangeText={setExerciseId}
        placeholder="Exercise ID"
        style={{ backgroundColor: '#f3f4f6', padding: 12, borderRadius: 14, marginBottom: 8 }}
        onSubmitEditing={loadExercise}
      />
      {stats.exercise?.series ? (
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine data={stats.exercise.series.map(s => ({ x: new Date(s.date), y: s.volume }))} />
        </VictoryChart>
      ) : null}
    </View>
  )
}

