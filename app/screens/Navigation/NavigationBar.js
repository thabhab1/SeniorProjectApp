import React, {useEffect, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modules from './Modules';
import Account from './Account';
import Help from './Help';
import PDFReader from './PdfReader';
import Quiz from './Quiz';
import {getAuth} from 'firebase/auth'
import { db } from './firebase';
import {collection, getDocs, query, where} from "firebase/firestore";
const Tab = createBottomTabNavigator();
import AdminScreen from './AdminScreen';


const modulesName = 'Modules';
const accountName = 'Account';
const helpName = 'Help';


function NavigationBar(props) {
    const [type, setType] = useState("");
    const auth = getAuth();
    useEffect(() => {
      async function fetchType() {
        const querySnapshot =  await getDocs(query(collection(db, 'users'), where('email', '==', auth.currentUser.email)));
        if (querySnapshot.docs.length > 0) {
          const userData = querySnapshot.docs[0].data();
          setType(userData.isAdmin);
        } else {
          console.log('Error somewhere');
        }
      }
      fetchType();
    }, []);
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
                {type ? (
                        <Tab.Screen
                            name={"Admin"}
                            component={AdminScreen}
                            options={{ headerShown: false }}
                        />
                        ) : null}

                
            </Tab.Navigator>
        
            
        </NavigationContainer>
        
    );
}
const Stack = createNativeStackNavigator();

function Root(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Modules" component={LoadReader} />
      <Stack.Screen name="Reader" component={PDFReader} />
      <Stack.Screen name="Quiz" component={LoadQuiz} />
    </Stack.Navigator>
  );
}
function LoadReader(props)
{
    return Modules(props.navigation);
}
function LoadQuiz(props)
{
    return Quiz(props);
}
export default NavigationBar;
