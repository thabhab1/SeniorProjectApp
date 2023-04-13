import { StyleSheet, Text, View, AsyncStorage} from 'react-native';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import ForgotScreen from './app/screens/ForgotScreen';
import NavigationBar from './app/screens/Navigation/NavigationBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useState, useEffect, useCallback} from 'react';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { useFonts } from 'expo-font';
import MyContext from './app/screens/Navigation/MyContext';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

const auth = getAuth();


export default function App() {
  const [notificationVar, setnotificationVar] = useState(false);
  useEffect(() => {
    // load the variable from AsyncStorage when the component mounts
    AsyncStorage.getItem('notificationVar').then((value) => {
      if (value !== null) {
        setnotificationVar(JSON.parse(value));
      }
    });
  }, []);

  useEffect(() => {
    // save the variable to AsyncStorage whenever it changes
    AsyncStorage.setItem('notificationVar', JSON.stringify(notificationVar));
  }, [notificationVar]);
  
  const [fontsLoaded] = useFonts({
    'Oswald-Regular': require('./app/assets/fonts/static/Oswald-Regular.ttf'),
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

      auth.currentUser ? (
        <MyContext.Provider value={{ notificationVar, setnotificationVar }}>
         <NavigationBar/>
        </MyContext.Provider>) 
       : 
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
