import 'react-native-reanimated'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider, useDispatch } from 'react-redux'
import { store } from './src/store/store'
import AppNavigator from './src/navigation/AppNavigator'
import { bootstrapAuth } from './src/store/userSlice'

const RootNav = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(bootstrapAuth())
  }, [])
  return <AppNavigator />
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>
    </Provider>
  )
}
