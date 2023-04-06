import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Alert,  } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons/MaterialIcons';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';
import { firebase } from '@react-native-firebase/auth';

const auth = getAuth();

function ForgotScreen(props) {

    // RegExp to determine if email is valid
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    function isValidEmail(email) {        
        return emailRegex.test(email);
    }
    
    const [emailText, setEmailText] = useState('');
    const handleEmailInput = (text) => {
        setEmailText(text);
    }
    // Will check if the email is valid, and will send a password reset link if the account exists in the database
    const handleResetButtonPress = () => {
        if(isValidEmail(emailText)) {
            sendPasswordResetEmail(auth, emailText)
            .then(() => console.log('Password reset email sent'))
            .catch(error => console.error(error));

            Alert.alert(
                "Great!",
                "A link has been sent to the email if the account exists.",
                [{text: 'Okay'},]
            )
        }
        else {
            Alert.alert(
                "Invalid Email",
                "Please enter a valid email.",
                [{text: 'Okay'},]
            )
        }
    }
    return (

        <SafeAreaView style={styles.container}>
            <View>
                {/* Forgot Image */}
                <View>
                    <Image source={require('../assets/solislogowhite.png')}
                        style={styles.imageStyle}                    
                    />
                </View>
                
                {/* Title text */}
                <Text style={styles.sectionTitle}>FORGOT</Text> 

                <Text style={styles.sectionText}>Enter your email to reset the password if it exists</Text>

                {/* User info input fields */}
                <View style={styles.userInput}>
                    {/* <MaterialIcons name='alternate-email' size={20} color="#666" /> */}
                    <TextInput 
                        
                        onChangeText={handleEmailInput}
                        value={emailText}

                    />   
                            
                </View> 

                <Text style={styles.sectionText}>email</Text>

                <TouchableOpacity style={styles.inputButton} onPress={handleResetButtonPress}>
                    
                    <Text style={styles.inputTextStyle}>RESET</Text>
                </TouchableOpacity>
                
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{ color: 'black', fontFamily: 'Oswald-Regular',
                        fontSize: 16,}}>Didn't forget? </Text>
                    <TouchableOpacity onPress={() => {props.navigation.goBack()}}>
                        <Text style={
                            {color: '#5569FF',
                            fontFamily: 'Oswald-Regular',
                            fontSize: 16,}}> Login </Text>
                    </TouchableOpacity>
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
        width: '80%',
        alignSelf: 'center'

    },
    inputTextStyle: {
        textAlign: 'center',
        fontSize: 28,
        fontFamily: 'Oswald-Regular',
        letterSpacing: 1.5,
        color: 'white',
    },
    sectionTitle: {
        fontSize: 28,
        color: 'black',
        marginBottom: 20,
        fontFamily: 'Oswald-Regular',
        letterSpacing: 1.5,
        alignSelf: 'center'

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
        marginTop: 30,
        width: '80%',
        alignSelf: 'center',
        fontFamily: 'Oswald-Regular',
        letterSpacing: 1.5,
    },
    
    


})

export default ForgotScreen;