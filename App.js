import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './app/screens/LoginScreen';
import NavigationBar from './app/screens/Navigation/NavigationBar';

import RegisterScreen from './app/screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    //navigation container to navigate between screens
    <NavigationContainer>
      <Stack.Navigator style={styles.container}>
        
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>        
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
        

      </Stack.Navigator>
    </NavigationContainer>
    //<NavigationBar/>
    
    
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
