import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ExerciseListScreen from '../screens/Exercises/ExerciseListScreen'
import ExerciseDetailScreen from '../screens/Exercises/ExerciseDetailScreen'
import MuscleExercisesScreen from '../screens/Exercises/MuscleExercisesScreen'
import CreatePlanScreen from '../screens/Plans/CreatePlanScreen'
import PlanDetailScreen from '../screens/Plans/PlanDetailScreen'
import StartWorkoutScreen from '../screens/Workout/StartWorkoutScreen'
import WorkoutSessionScreen from '../screens/Workout/WorkoutSessionScreen'
import FinishWorkoutScreen from '../screens/Workout/FinishWorkoutScreen'
import HistoryScreen from '../screens/History/HistoryScreen'
import StatsScreen from '../screens/Stats/StatsScreen'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import GuestGateScreen from '../screens/Auth/GuestGateScreen'
import LoginScreen from '../screens/Auth/LoginScreen'
import RegisterScreen from '../screens/Auth/RegisterScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const ExercisesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ExerciseList" component={ExerciseListScreen} options={{ title: 'Exercises', headerShown: false }} />
    <Stack.Screen name="MuscleExercises" component={MuscleExercisesScreen} options={{ title: 'Exercises', headerShown: false }} />
    <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} options={{ title: 'Exercise' }} />
  </Stack.Navigator>
)

const PlansStack = ({ token }) => {
  return (
    <Stack.Navigator>
      {token ? (
        <>
          <Stack.Screen name="CreatePlan" component={CreatePlanScreen} options={{ title: 'Plans' }} />
          <Stack.Screen name="PlanDetail" component={PlanDetailScreen} options={{ title: 'Plan' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="GuestGatePlans" component={GuestGateScreen} options={{ title: 'Plans' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  )
}

const WorkoutStack = ({ token }) => {
  return (
    <Stack.Navigator>
      {token ? (
        <>
          <Stack.Screen name="StartWorkout" component={StartWorkoutScreen} options={{ title: 'Workout' }} />
          <Stack.Screen name="WorkoutSession" component={WorkoutSessionScreen} options={{ title: 'Session' }} />
          <Stack.Screen name="FinishWorkout" component={FinishWorkoutScreen} options={{ title: 'Finish' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="GuestGateWorkout" component={GuestGateScreen} options={{ title: 'Workout' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  )
}

const HistoryStack = ({ token }) => {
  return (
    <Stack.Navigator>
      {token ? (
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'History' }} />
      ) : (
        <>
          <Stack.Screen name="GuestGateHistory" component={GuestGateScreen} options={{ title: 'History' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  )
}

const StatsStack = ({ token }) => {
  return (
    <Stack.Navigator>
      {token ? (
        <Stack.Screen name="Stats" component={StatsScreen} options={{ title: 'Stats' }} />
      ) : (
        <>
          <Stack.Screen name="GuestGateStats" component={GuestGateScreen} options={{ title: 'Stats' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default function AppNavigator() {
  const token = useSelector(s => s.user.token)
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const map = {
            Exercises: 'barbell',
            Plans: 'list',
            Workout: 'stopwatch',
            History: 'time',
            Stats: 'stats-chart'
          }
          const name = map[route.name]
          return <Ionicons name={name} size={size} color={color} />
        }
      })}
    >
      <Tab.Screen name="Exercises" component={ExercisesStack} />
      <Tab.Screen name="Plans">
        {() => <PlansStack token={token} />}
      </Tab.Screen>
      <Tab.Screen name="Workout">
        {() => <WorkoutStack token={token} />}
      </Tab.Screen>
      <Tab.Screen name="History">
        {() => <HistoryStack token={token} />}
      </Tab.Screen>
      <Tab.Screen name="Stats">
        {() => <StatsStack token={token} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}
