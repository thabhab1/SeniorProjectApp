import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modules from './Modules';
import Account from './Account';
import Help from './Help';
import pdfReader from './pdfReader';

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
                        
                    
                <Tab.Screen name={modulesName} component={HomeStackScreen} options={{headerShown: false}}/>        
                <Tab.Screen name={accountName} component={Account} options={{headerShown: false}}/>        
                <Tab.Screen name={helpName} component={Help} options={{headerShown: false}}/>

            </Tab.Navigator>
        
            
        </NavigationContainer>
        
    );
}




  
  function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('SettingsScreen')}
        />
      </View>
    );
  }
  
  function SettingsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings screen</Text>
        <Button
          title="Go to Details"
          
        />
      </View>
    );
  }
  
  const HomeStack = createStackNavigator();
  
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Modules" component={Modules} />
        <HomeStack.Screen name="pdfReader" component={pdfReader} />
      </HomeStack.Navigator>
    );
  }
  
  
  
 






export default NavigationBar;