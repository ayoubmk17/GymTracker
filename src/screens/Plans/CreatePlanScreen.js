import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Alert, Modal, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExercises } from '../../store/exercisesSlice'
import { createPlan, fetchPlans } from '../../store/plansSlice'
import Input from '../../components/Input'
import Button from '../../components/Button'
import PlanCard from '../../components/PlanCard'
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

export default function CreatePlanScreen({ navigation }) {
  const dispatch = useDispatch()
  const exercises = useSelector(s => s.exercises.items)
  const plans = useSelector(s => s.plans.items)
  const [selected, setSelected] = useState([])
  const [name, setName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showSetsModal, setShowSetsModal] = useState(false)
  const [pendingExercise, setPendingExercise] = useState(null)
  const [setsCount, setSetsCount] = useState('3')

  useEffect(() => {
    dispatch(fetchExercises())
    dispatch(fetchPlans())
  }, [])

  const toggle = item => {
    const exists = selected.find(x => (x.exerciseId || x._id) === (item._id || item.id))
    if (exists) {
      setSelected(selected.filter(x => (x.exerciseId || x._id) !== (item._id || item.id)))
    } else {
      // Show modal to choose sets count
      setPendingExercise(item)
      setSetsCount('3')
      setShowSetsModal(true)
    }
  }

  const addExerciseWithSets = () => {
    if (pendingExercise) {
      const sets = parseInt(setsCount) || 3
      setSelected([...selected, {
        exerciseId: pendingExercise._id || pendingExercise.id,
        name: pendingExercise.name,
        sets: sets > 0 ? sets : 3,
        order: selected.length + 1
      }])
      setShowSetsModal(false)
      setPendingExercise(null)
      setSetsCount('3')
    }
  }

  const updateSets = (exerciseId, sets) => {
    setSelected(selected.map(x =>
      x.exerciseId === exerciseId ? { ...x, sets: parseInt(sets) || 1 } : x
    ))
  }

  const isSelected = item => {
    return selected.some(x => (x.exerciseId || x._id) === (item._id || item.id))
  }

  const save = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a plan name')
      return
    }
    if (selected.length === 0) {
      Alert.alert('Error', 'Please select at least one exercise')
      return
    }

    const action = dispatch(createPlan({ name, exercises: selected }))
    action.then(res => {
      if (res?.payload) {
        Alert.alert('Success', 'Plan created successfully!')
        setSelected([])
        setName('')
        setSelectedCategory(null)
        dispatch(fetchPlans())
      }
    }).catch(err => {
      Alert.alert('Error', 'Failed to create plan')
    })
  }

  const getCategoryExercises = (categoryName) => {
    return exercises.filter(ex => ex.category === categoryName)
  }

  const removeFromSelected = (exerciseId) => {
    setSelected(selected.filter(x => x.exerciseId !== exerciseId))
  }

  // Category selection view
  if (!selectedCategory) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 8 }}>Create Plan</Text>

            <Input
              label="Plan Name"
              value={name}
              onChangeText={setName}
              placeholder="e.g., Push Day, Leg Day"
            />

            {selected.length > 0 && (
              <View style={{ backgroundColor: '#dbeafe', padding: 12, borderRadius: 12, marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1e40af', marginBottom: 8 }}>
                  Selected: {selected.length} {selected.length === 1 ? 'exercise' : 'exercises'}
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {selected.map(ex => (
                    <View key={ex.exerciseId} style={{
                      backgroundColor: '#fff',
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 6
                    }}>
                      <Text style={{ fontSize: 12, color: '#1e40af' }}>{ex.name}</Text>
                      <TouchableOpacity onPress={() => removeFromSelected(ex.exerciseId)}>
                        <Ionicons name="close-circle" size={16} color="#ef4444" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            )}

            <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 }}>
              Select Muscle Groups
            </Text>

            {CATEGORIES.map(category => {
              const count = getCategoryExercises(category.name).length
              return (
                <TouchableOpacity
                  key={category.name}
                  onPress={() => setSelectedCategory(category)}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 2,
                    borderLeftWidth: 3,
                    borderLeftColor: category.color,
                  }}
                >
                  <View style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: category.color + '15',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12
                  }}>
                    <Ionicons name={category.icon} size={24} color={category.color} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>
                      {category.name}
                    </Text>
                    <Text style={{ fontSize: 13, color: '#6b7280' }}>
                      {count} exercises
                    </Text>
                  </View>

                  <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                </TouchableOpacity>
              )
            })}

            {selected.length > 0 && (
              <Button title={`Save Plan (${selected.length} exercises)`} onPress={save} />
            )}

            <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginTop: 24, marginBottom: 12 }}>
              Your Plans
            </Text>
            {plans.map(item => (
              <PlanCard
                key={item._id}
                item={item}
                onPress={() => navigation.navigate('PlanDetail', { id: item._id })}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  // Exercise selection view for selected category
  const categoryExercises = getCategoryExercises(selectedCategory.name)

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
          <TouchableOpacity onPress={() => setSelectedCategory(null)} style={{ marginRight: 12 }}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827' }}>
              {selectedCategory.name}
            </Text>
            <Text style={{ fontSize: 13, color: '#6b7280' }}>
              {selected.length} selected
            </Text>
          </View>
        </View>

        <FlatList
          data={categoryExercises}
          keyExtractor={item => item._id || item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => {
            const checked = isSelected(item)
            return (
              <TouchableOpacity
                onPress={() => toggle(item)}
                style={{
                  backgroundColor: checked ? '#dbeafe' : '#fff',
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: checked ? 2 : 1,
                  borderColor: checked ? '#3b82f6' : '#e5e7eb'
                }}
              >
                <View style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  borderWidth: 2,
                  borderColor: checked ? '#3b82f6' : '#d1d5db',
                  backgroundColor: checked ? '#3b82f6' : '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12
                }}>
                  {checked && <Ionicons name="checkmark" size={16} color="#fff" />}
                </View>
                <Text style={{
                  color: checked ? '#1e40af' : '#111827',
                  fontWeight: checked ? '600' : '500',
                  flex: 1
                }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>

      {/* Sets Selection Modal */}
      <Modal
        visible={showSetsModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSetsModal(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20
        }}>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            padding: 24,
            width: '100%',
            maxWidth: 400,
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 10
          }}>
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 8 }}>
              How many sets?
            </Text>
            <Text style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>
              {pendingExercise?.name}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
              <TouchableOpacity
                onPress={() => {
                  const current = parseInt(setsCount) || 3
                  if (current > 1) setSetsCount(String(current - 1))
                }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: '#f3f4f6',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Ionicons name="remove" size={24} color="#6b7280" />
              </TouchableOpacity>

              <TextInput
                value={setsCount}
                onChangeText={setSetsCount}
                keyboardType="number-pad"
                style={{
                  flex: 1,
                  fontSize: 32,
                  fontWeight: '800',
                  color: '#111827',
                  textAlign: 'center',
                  marginHorizontal: 16
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  const current = parseInt(setsCount) || 3
                  setSetsCount(String(current + 1))
                }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: '#f3f4f6',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Ionicons name="add" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                onPress={() => setShowSetsModal(false)}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 12,
                  backgroundColor: '#f3f4f6',
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: '#6b7280', fontWeight: '600', fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={addExerciseWithSets}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 12,
                  backgroundColor: '#3b82f6',
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Add Exercise</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

