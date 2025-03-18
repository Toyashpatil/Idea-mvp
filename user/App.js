import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Landing from './screens/Landing';
import DkycOne from './screens/DkycOne';
import DkycTwo from "./screens/DkycTwo"
import GenQueOne from "./screens/GenQueOne"
import AdaptiveQues from "./screens/AdaptiveQues"



export default function App() {
  const Stack = createNativeStackNavigator();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <Landing />;
  }
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="DkycOne"
          component={DkycOne}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="DkycTwo"
          component={DkycTwo}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="GenQueOne"
          component={GenQueOne}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="AdaptiveQues"
          component={AdaptiveQues}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

    </NavigationContainer>

    // </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});