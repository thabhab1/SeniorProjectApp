import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import ForgotScreen from './app/screens/ForgotScreen';
import NavigationBar from './app/screens/Navigation/NavigationBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useState, useEffect, useCallback} from 'react';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

const auth = getAuth();


export default function App() {
  const [fontsLoaded] = useFonts({
    'RobotoCondensed-Regular': require('./app/assets/fonts/RobotoCondensed-Regular.ttf'),
  });

  const [isSignedIn, setIsSignedIn] = useState(false);
  //listener to check if a user is logged in to firebase
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
  }, []);

  if(!fontsLoaded) {
    <Text>Loading...</Text>
  } else {
    return (
      //navigation container to navigate between screens

      auth.currentUser ? (<NavigationBar/>) : 
      (
        <NavigationContainer>
          <Stack.Navigator style={styles.container}>
            
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>        
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
            <Stack.Screen name="Forgot" component={ForgotScreen} options={{headerShown: false}} />          

          </Stack.Navigator>
        </NavigationContainer>
        
      )     
      
      
      
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
