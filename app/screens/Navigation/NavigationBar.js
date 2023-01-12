import React from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modules from './Modules';
import Account from './Account';
import Help from './Help';

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
                            iconName = focused ? 'list' : 'list-outline';
                        }
                        else if (rn === accountName) {
                            iconName = focused ? 'home' : 'home-outline';
                        }
                        else if (rn === helpName) {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>

                    },
                })}>
                        
                    
                <Tab.Screen name={modulesName} component={Modules} options={{headerShown: false}}/>        
                <Tab.Screen name={accountName} component={Account} options={{headerShown: false}}/>        
                <Tab.Screen name={helpName} component={Help} options={{headerShown: false}}/>

            </Tab.Navigator>
        </NavigationContainer>
        
    );
}

export default NavigationBar;