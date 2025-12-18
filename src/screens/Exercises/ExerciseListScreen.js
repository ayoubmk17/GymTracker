import React, { useEffect } from 'react'
import { View, TextInput, FlatList, SafeAreaView, TouchableOpacity, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExercises, setQuery, setCategory } from '../../store/exercisesSlice'
import { logout } from '../../store/userSlice'
import ExerciseCard from '../../components/ExerciseCard'

export default function ExerciseListScreen({ navigation }) {
  const dispatch = useDispatch()
  const { items, query, category } = useSelector(s => s.exercises)
  const token = useSelector(s => s.user.token)

  useEffect(() => {
    dispatch(fetchExercises())
  }, [query, category])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View style={{ padding: 16 }}>
        <TextInput
          placeholder="Search exercises"
          value={query}
          onChangeText={t => dispatch(setQuery(t))}
          style={{ backgroundColor: '#fff', padding: 12, borderRadius: 16, marginBottom: 12 }}
        />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          {['', 'Chest', 'Back', 'Legs', 'Arms', 'Shoulders'].map(cat => (
            <TouchableOpacity
              key={cat || 'all'}
              onPress={() => dispatch(setCategory(cat))}
              style={{
                backgroundColor: category === cat ? '#2563eb' : '#e5e7eb',
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 14
              }}
            >
              <Text style={{ color: category === cat ? '#fff' : '#111827' }}>{cat || 'All'}</Text>
            </TouchableOpacity>
          ))}
          <View style={{ flex: 1 }} />
          {token ? (
            <TouchableOpacity onPress={() => dispatch(logout())} style={{ backgroundColor: '#ef4444', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 14 }}>
              <Text style={{ color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <FlatList
          data={items}
          keyExtractor={item => item._id || item.id}
          renderItem={({ item }) => (
            <ExerciseCard item={item} onPress={() => navigation.navigate('ExerciseDetail', { id: item._id || item.id })} />
          )}
        />
      </View>
    </SafeAreaView>
  )
}
