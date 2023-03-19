import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Alert,  } from 'react-native';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

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
                    <Image source={require('../assets/forgotImage.png')}
                        style={styles.imageStyle}                    
                    />
                </View>
                
                {/* Title text */}
                <Text style={styles.sectionTitle}>Forgot</Text> 

                <Text style={styles.sectionText}>Enter your email to reset your password if an account exists</Text>

                {/* User info input fields */}
                <View style={styles.userInput}>
                    {/* <MaterialIcons name='alternate-email' size={20} color="#666" /> */}
                    <TextInput 
                        placeholder='Email'
                        onChangeText={handleEmailInput}
                        value={emailText}

                    />                    
                </View> 

                <TouchableOpacity style={styles.inputButton} onPress={handleResetButtonPress}>
                    <Text style={styles.inputTextStyle}>Send Reset Link</Text>
                </TouchableOpacity>
                
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{ color: '#333'}}>Didn't forget? </Text>
                    <TouchableOpacity onPress={() => {props.navigation.goBack()}}>
                        <Text style={
                            {color: 'steelblue',
                             borderBottomColor: '#f8deaa',
                              borderBottomWidth: 2,}}> Login </Text>
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
        fontSize: 16,
        color: 'black'
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: '500',
        color: '#333',
        marginBottom: 20,

    },
    sectionText: {
        marginBottom: 10,
    },
    userInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        marginBottom: 25,
    },
    
    


})

export default ForgotScreen;