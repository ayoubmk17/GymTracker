import React, { useEffect } from 'react'
import { View, TextInput, FlatList, SafeAreaView, TouchableOpacity, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExercises, setQuery, setCategory } from '../../store/exercisesSlice'
import ExerciseCard from '../../components/ExerciseCard'
import { Ionicons } from '@expo/vector-icons'

export default function MuscleExercisesScreen({ navigation, route }) {
    const { category: passedCategory } = route.params
    const dispatch = useDispatch()
    const { items, query } = useSelector(s => s.exercises)

    useEffect(() => {
        dispatch(setCategory(passedCategory))
        dispatch(fetchExercises())
    }, [passedCategory, query])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
            <View style={{ flex: 1, padding: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12, padding: 8 }}>
                        <Ionicons name="arrow-back" size={24} color="#111827" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111827' }}>{passedCategory}</Text>
                </View>

                <TextInput
                    placeholder={`Search ${passedCategory} exercises`}
                    value={query}
                    onChangeText={t => dispatch(setQuery(t))}
                    style={{ backgroundColor: '#fff', padding: 12, borderRadius: 16, marginBottom: 12 }}
                />

                <FlatList
                    data={items}
                    keyExtractor={item => item._id || item.id}
                    ListEmptyComponent={
                        <View style={{ alignItems: 'center', marginTop: 50 }}>
                            <Text style={{ color: '#6b7280' }}>No exercises found for this category.</Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <ExerciseCard item={item} onPress={() => navigation.navigate('ExerciseDetail', { id: item._id || item.id })} />
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        </SafeAreaView>
    )
}
