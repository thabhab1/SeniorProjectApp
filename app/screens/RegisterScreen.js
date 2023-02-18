import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Image, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons/MaterialIcons';
import { db } from './Navigation/firebase';
import { collection, addDoc} from "firebase/firestore";

function RegisterScreen(props) {

    // RegExp to determine if email is valid
   {/* const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    function isValidEmail(email) {        
        return emailRegex.test(email);
    }
*/}

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const docRef = await addDoc(collection(db, 'users'), {
                email: email,
                password: password,
            });
            console.log("user created with id", docRef.id);
            return true;
        } catch(error) {
            console.error("no boyo", error)
            return false;
        }
    }


    return (

        <SafeAreaView style={styles.container}>
            <View>
                {/* Login Image */}
                <View>
                    <Image source={require('../assets/registerImage.png')}
                        style={styles.imageStyle}                    
                    />
                </View>
                
                {/* Title text */}
                <Text style={styles.sectionTitle}>Register</Text> 

                {/* User info input fields */}
                <View style={styles.userInput}>
                    {/* <MaterialIcons name='alternate-email' size={20} color="#666" /> */}
                    <TextInput 
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    autoCompleteType="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    />                    
                </View> 

               {/* <View style={styles.userInput}>
                    {/* <MaterialIcons name='alternate-email' size={20} color="#666" /> 
                    <TextInput placeholder='Username'/>                    
                </View> */}
                
                <View style={styles.userInput}>
                    <TextInput 
                    placeholder='Password' 
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    />
                </View>

               {/* <View style={styles.userInput}>
                    <TextInput placeholder='Confirm' secureTextEntry={true}/>
                </View>
                */}

                <TouchableOpacity style={styles.inputButton}>
                    <Text style={styles.inputTextStyle} onPress={handleRegister} >Register</Text>
                </TouchableOpacity>
                
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{ color: '#333'}}>Already registered? </Text>
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
        color: 'black',
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: '500',
        color: '#333',
        marginBottom: 30,
        paddingRight: 10,
    },
    userInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        marginBottom: 25,


    },
    
    


})

export default RegisterScreen;