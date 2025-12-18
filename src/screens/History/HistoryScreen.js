import React, { useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHistory } from '../../store/workoutsSlice'

export default function HistoryScreen() {
  const dispatch = useDispatch()
  const history = useSelector(s => s.workouts.history)

  useEffect(() => {
    dispatch(fetchHistory())
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb', padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 12 }}>History</Text>
      <FlatList
        data={history}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 8 }}>
            <Text style={{ color: '#111827', fontWeight: '600' }}>{new Date(item.date).toLocaleString()}</Text>
            <Text style={{ color: '#6b7280' }}>{item.exercises.length} exercises</Text>
          </View>
        )}
      />
    </View>
  )
}

