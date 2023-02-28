import React from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modules from './Modules';
import Account from './Account';
import Help from './Help';
import pdfReader from './pdfReader'
import Quiz from './Quiz';
const Tab = createBottomTabNavigator();

const modulesName = 'Modules';
const accountName = 'Account';
const helpName = 'Help';

function NavigationBar(props) {
    return (
        <NavigationContainer>        
            <Tab.Navigator 
                initialRouteName={accountName}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName = '';
                        let rn = route.name;

                        if (rn === modulesName) {
                            iconName = focused ? 'book' : 'book-outline';
                        }
                        else if (rn === accountName) {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                        else if (rn === helpName) {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={'#0e274a'}/>

                    },
                    tabBarHideOnKeyboard: true
                    
                    
                })}>
                        
                    
                <Tab.Screen name={modulesName} component={Root} options={{headerShown: false}}/>        
                <Tab.Screen name={accountName} component={Account} options={{headerShown: false}}/>        
                <Tab.Screen name={helpName} component={Help} options={{headerShown: false}}/>

            </Tab.Navigator>
        
            
        </NavigationContainer>
        
    );
}
const Stack = createNativeStackNavigator();

function Root(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Modules" component={loadReader} />
      <Stack.Screen name="Reader" component={pdfReader} />
      <Stack.Screen name="Quiz" component={Quiz} />
    </Stack.Navigator>
  );
}
function loadReader(props)
{
    return Modules(props.navigation);
}
export default NavigationBar;
