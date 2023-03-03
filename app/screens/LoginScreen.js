import { firebase } from '@react-native-firebase/auth';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons/MaterialIcons';
import { db } from './Navigation/firebase';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Modules from './Navigation/Modules';


const auth = getAuth();

function LoginScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   {/* // RegExp to determine if email is valid
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    function isValidEmail(email) {        
        return emailRegex.test(email);
    }
    */}

    //logs the user in with email password combo.
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(auth.currentUser.email);
            if(auth.currentUser) {console.log("logged in")}

            // Successfully signed in, navigate to the next screen

          })
          .catch((error) => {
            console.log('Error signing in:', error, );
            console.log();
            
            Alert.alert(
                'Email not found',
                'This email does not exist, or password is incorrect.',
                [{text: 'Okay'},]
            )
            
          });
    };

    return (

        <SafeAreaView style={styles.container}>
            <View>
                {/* Login Image */}
                <View>
                    <Image source={require('../assets/loginImage.png')}
                        style={styles.imageStyle}                    
                    />
                </View>
                
                {/* Title text */}
                <Text style={styles.sectionTitle}>Login</Text> 

                {/* User info input fields */}
                <View style={styles.userInput}>
                    {/* <MaterialIcons name='alternate-email' size={20} color="#666" /> */}
                    <TextInput 
                    placeholder='Email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCompleteType="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    />                    
                </View> 

                <View style={(styles.userInput)}>
                    <View style={{justifyContent: 'space-between'}}>
                        <TextInput 
                        placeholder='Password' 
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true} 
                        style={{}}/>
                    </View>                    
                </View>

                <TouchableOpacity style={styles.inputButton} onPress={handleLogin}>
                    <Text style={styles.inputTextStyle}>Login</Text>
                </TouchableOpacity>
                
                <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 15}}>
                    <Text style={{ color: '#333'}}>New to the app? </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                        <Text style={
                            {color: 'steelblue',
                             borderBottomColor: '#f8deaa',
                              borderBottomWidth: 2,}}> Register </Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Forgot')}>
                        <Text style={
                            {color: 'steelblue',
                             borderBottomColor: '#f8deaa',
                              borderBottomWidth: 2,}}> Forgot </Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#333'}}>your password? </Text>                    
                </View>

                <StatusBar style='auto'/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',

    },
    imageStyle: {
        height: 200,
        width: 200,
        marginBottom: 30,
        alignSelf: 'center',
    },
    inputButton: {
        backgroundColor: '#f8deaa',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: 'black',
        shadowOffset: {height: 2, width: 0.5},
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 3, 
    },
    inputTextStyle: {
        textAlign: 'center',
        fontWeight: '700',
        color: 'black',
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: '500',
        color: '#333',
        marginBottom: 30,

    },
    userInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        marginBottom: 25,
        
    },
    
    


})
export default LoginScreen;