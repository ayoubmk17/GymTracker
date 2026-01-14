import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Modal, ScrollView, TextInput, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExercises } from '../../store/exercisesSlice'
import { createPlan, fetchPlans, deletePlan } from '../../store/plansSlice'
import Input from '../../components/Input'
import Button from '../../components/Button'
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

  // Plan State
  const [name, setName] = useState('')
  const [selectedExercises, setSelectedExercises] = useState([]) // Array of { ...exercise, sets: 3, id: 'unique' }

  // UI State
  const [activeCategory, setActiveCategory] = useState(null) // 'Chest' etc
  const [pickingExercise, setPickingExercise] = useState(false) // True when showing exercise list for a category

  const [configuringExercise, setConfiguringExercise] = useState(null) // The exercise object currently being configured (sets)
  const [setsInput, setSetsInput] = useState('3')
  const [isEditingMode, setIsEditingMode] = useState(false) // If true, we are editing an existing entry in selectedExercises

  useEffect(() => {
    dispatch(fetchExercises())
    dispatch(fetchPlans())
  }, [])

  // 1. Select Category
  const handleCategoryPress = (catName) => {
    setActiveCategory(catName)
    setPickingExercise(true)
  }

  // 2. Select Exercise from List
  const handleExercisePress = (exercise) => {
    setPickingExercise(false)
    setConfiguringExercise(exercise)
    setSetsInput('3') // Default
    setIsEditingMode(false)
  }

  // 3. Save Configuration (Add/Update to Plan)
  const saveConfiguration = () => {
    const sets = parseInt(setsInput) || 3

    if (isEditingMode) {
      // Update existing
      setSelectedExercises(prev => prev.map(ex =>
        ex.uniqueId === configuringExercise.uniqueId ? { ...ex, sets } : ex
      ))
    } else {
      // Add new
      const newEntry = {
        ...configuringExercise,
        uniqueId: Date.now().toString() + Math.random(),
        exerciseId: configuringExercise._id || configuringExercise.id,
        sets
      }
      setSelectedExercises([...selectedExercises, newEntry])
    }

    setConfiguringExercise(null)
    setActiveCategory(null)
  }

  // Edit an already added exercise
  const handleEditExercise = (exercise) => {
    setConfiguringExercise(exercise)
    setSetsInput(exercise.sets.toString())
    setIsEditingMode(true)
  }

  // Delete from plan
  const handleDeleteExercise = (uniqueId) => {
    setSelectedExercises(prev => prev.filter(x => x.uniqueId !== uniqueId))
  }

  const handleDeletePlan = (planId) => {
    Alert.alert('Delete Plan', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => dispatch(deletePlan(planId)) }
    ])
  }

  const saveFullPlan = () => {
    if (!name) return Alert.alert('Error', 'Please name your plan')
    if (selectedExercises.length === 0) return Alert.alert('Error', 'Add at least one exercise')

    const payload = {
      name,
      exercises: selectedExercises.map(ex => ({
        exerciseId: ex.exerciseId,
        sets: ex.sets || 3,
        order: selectedExercises.indexOf(ex)
      }))
    }

    dispatch(createPlan(payload)).then(res => {
      if (res?.payload) {
        navigation.navigate('PlanDetail', { id: res.payload._id })
        setName('')
        setSelectedExercises([])
      }
    })
  }

  // --- Render Helpers ---

  const renderCategoryGrid = () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 16 }}>
      {CATEGORIES.map(cat => (
        <TouchableOpacity
          key={cat.name}
          onPress={() => handleCategoryPress(cat.name)}
          style={{ width: '48%', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
        >
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: cat.color + '20', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
            <Ionicons name={cat.icon} size={24} color={cat.color} />
          </View>
          <Text style={{ fontWeight: '600', color: '#1f2937' }}>{cat.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )

  const renderAddedExercises = () => (
    <View style={{ marginTop: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 }}>Added Exercises {selectedExercises.length > 0 && `(${selectedExercises.length})`}</Text>
      {selectedExercises.length === 0 ? (
        <Text style={{ color: '#9ca3af', fontStyle: 'italic' }}>No exercises added yet. Tap a category above.</Text>
      ) : (
        selectedExercises.map((ex, idx) => (
          <View key={ex.uniqueId} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: '#e5e7eb' }}>
            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
              <Text style={{ color: '#3b82f6', fontWeight: '700' }}>{ex.sets}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', color: '#1f2937' }}>{ex.name}</Text>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>{ex.category}</Text>
            </View>
            <TouchableOpacity onPress={() => handleEditExercise(ex)} style={{ padding: 8 }}>
              <Ionicons name="create-outline" size={20} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteExercise(ex.uniqueId)} style={{ padding: 8 }}>
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  )

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 24 }}>Create New Plan</Text>

        <Input
          label="Plan Name"
          value={name}
          onChangeText={setName}
          placeholder="e.g. Heavy Chest Day"
        />

        <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginTop: 12 }}>Add Exercise</Text>
        {renderCategoryGrid()}

        {renderAddedExercises()}

        <View style={{ marginTop: 32, marginBottom: 20 }}>
          <Button title="Save Plan" onPress={saveFullPlan} />
        </View>

        {/* Existing Plans List */}
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 16, marginTop: 16 }}>Your Plans</Text>
        {plans.map(p => (
          <View key={p._id} style={{ marginBottom: 12 }}>
            <TouchableOpacity onPress={() => navigation.navigate('PlanDetail', { id: p._id })}>
              <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#3b82f6', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>{p.name}</Text>
                <TouchableOpacity onPress={() => handleDeletePlan(p._id)}>
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        ))}

      </View>

      {/* MODAL: EXERCISE PICKER */}
      <Modal visible={pickingExercise} animationType="slide" presentationStyle="pageSheet">
        <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb', backgroundColor: '#fff' }}>
            <TouchableOpacity onPress={() => setPickingExercise(false)} style={{ padding: 8 }}>
              <Ionicons name="close" size={28} color="#1f4937" />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: '700', marginLeft: 8 }}>{activeCategory} Exercises</Text>
          </View>
          <FlatList
            data={exercises.filter(e => e.category === activeCategory)}
            keyExtractor={item => item._id || item.id}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleExercisePress(item)}
                style={{ backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'center' }}
              >
                <View style={{ width: 40, height: 40, backgroundColor: '#f3f4f6', borderRadius: 8, marginRight: 12 }} />
                <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {/* MODAL: CONFIGURE SETS */}
      <Modal visible={!!configuringExercise} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <View style={{ backgroundColor: '#fff', width: '100%', maxWidth: 340, borderRadius: 24, padding: 24, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8, textAlign: 'center' }}>{configuringExercise?.name}</Text>
            <Text style={{ color: '#6b7280', marginBottom: 24 }}>How many sets?</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
              <TouchableOpacity onPress={() => setSetsInput(Math.max(1, parseInt(setsInput || 0) - 1).toString())} style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="remove" size={24} color="#3b82f6" />
              </TouchableOpacity>
              <TextInput
                value={setsInput}
                onChangeText={setSetsInput}
                keyboardType="numeric"
                style={{ fontSize: 32, fontWeight: '700', marginHorizontal: 24, color: '#111827', width: 60, textAlign: 'center' }}
              />
              <TouchableOpacity onPress={() => setSetsInput((parseInt(setsInput || 0) + 1).toString())} style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#eff6ff', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="add" size={24} color="#3b82f6" />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', width: '100%', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Button title="Cancel" outline onPress={() => setConfiguringExercise(null)} />
              </View>
              <View style={{ flex: 1 }}>
                <Button title={isEditingMode ? "Update" : "Add"} onPress={saveConfiguration} />
              </View>
            </View>
          </View>
        </View>
      </Modal>

    </ScrollView>
  )
}
