import React from 'react';
import Modules from "./app/screens/Modules";
import HelpScreen from './app/screens/HelpScreen';
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
    name='HelpScreen'
    component={HelpScreen}
    />
    </Stack.Navigator>
  </NavigationContainer>
  );
}


