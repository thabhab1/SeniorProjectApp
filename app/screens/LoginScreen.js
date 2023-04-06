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

    // RegExp to determine if email is valid
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    function isValidEmail(email) {        
        return emailRegex.test(email);
    }

    //logs the user in with email password combo.
    const handleLogin = () => {
        if(isValidEmail(email)) {
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
                
                Alert.alert(
                    'Email not found',
                    'This email does not exist, or password is incorrect.',
                    [{text: 'Okay'},]
                )
                
            });
        }
        else {
            Alert.alert(
                "Invalid Email",
                "Please enter a valid email.",
                [{text: 'Okay'},]
            )
        }
        
    };

    return (

        <SafeAreaView style={styles.container}>
            <View>
                {/* Login Image */}
                <View>
                    <Image source={require('../assets/solislogowhite.png')}
                        style={styles.imageStyle}                    
                    />
                </View>
                
                {/* Title text */}
                <Text style={styles.sectionTitle}>LOGIN</Text> 

                {/* User info input fields */}
                <View style={styles.userInput}>
                    {/* <MaterialIcons name='alternate-email' size={20} color="#666" /> */}
                    <TextInput 

                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCompleteType="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    />                    
                </View> 
                <Text style={styles.sectionText}>email</Text>

                <View style={(styles.userInput)}>
                    <View style={{justifyContent: 'space-between'}}>
                        <TextInput 
                        
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true} 
                        style={{}}/>
                    </View>                    
                </View>
                <Text style={styles.sectionText}>password</Text>

                <TouchableOpacity style={styles.inputButton} onPress={handleLogin}>
                    <Text style={styles.inputTextStyle}>LOGIN</Text>
                </TouchableOpacity>
                
                <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 15}}>
                    <Text style={{ 
                        color: 'black',
                        fontFamily: 'Oswald-Regular',
                        fontSize: 16,}}>New to the app? </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                        <Text style={
                            {color: '#5569FF',                           
                            fontFamily: 'Oswald-Regular',
                            fontSize: 16,}}> Register </Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Forgot')}>
                        <Text style={
                            {color: '#5569FF',
                            fontFamily: 'Oswald-Regular',
                            fontSize: 16,}}> Forgot </Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'black',
                            fontFamily: 'Oswald-Regular',
                        fontSize: 16,}}>your password? </Text>                    
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
        resizeMode: 'contain',
    },
    inputButton: {
        backgroundColor: 'black',
        paddingTop: 6,
        paddingBottom: 10,
        borderRadius: 20,
        marginBottom: 20,
        marginTop: 40,
        shadowColor: 'black',
        shadowOffset: {height: 2, width: 0.5},
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 3,
        width: '65%',
        alignSelf: 'center',
        
    },
    inputTextStyle: {
        textAlign: 'center',
        fontSize: 28,
        fontFamily: 'Oswald-Regular',
        letterSpacing: 1.5,
        color: 'white',
        fontWeight: ''

    },
    sectionTitle: {
        fontSize: 28,
        marginBottom: 30,
        fontFamily: 'Oswald-Regular',
        letterSpacing: 1.5,
        textAlign: 'center'
    },
    sectionText: {
        marginBottom: 10,
        fontFamily: 'Oswald-Regular',
        fontSize: 16,
        textAlign: 'center'
    },
    userInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginBottom: 2,
        width: '65%',
        alignSelf: 'center'
        
    },
    
    


})
export default LoginScreen;