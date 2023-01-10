import React from 'react';
import WelcomeScreen from './app/screens/WelcomeScreen';
import Modules from "./app/screens/Modules";
import Help from './app/screens/Help';
import Account from './app/screens/Account';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

console.log('Modules', Modules);
console.log('NavigationContainer', NavigationContainer);
console.log('createNativeStackNavigator', createNativeStackNavigator);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
      name="Modules"
      component={Modules}
      options={{title: "My Modules"}}
    />
    <Stack.Screen
    name='Help'
    component={Help}
    />
    <Stack.Screen
      name="Account"
      component={Account}
      options={{title: "Account"}}
    />
    <Stack.Screen
      name="WelcomeScreen"
      component={WelcomeScreen}
      options={{title: "WelcomeScreen"}}
    />
    </Stack.Navigator>
  </NavigationContainer>
  );
}


