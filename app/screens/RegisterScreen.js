import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput,ScrollView, Image, TouchableOpacity, StatusBar, Alert} from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons/MaterialIcons';
import { db } from './Navigation/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc} from "firebase/firestore";
import RadioButtonRN from 'radio-buttons-react-native'
const auth = getAuth();
const data = [
    {
      label: 'Media Training'
     },
     {
      label: 'Media Training for Public Safety'
     },
     {
        label: 'Public Speaking'
       },
       {
        label: 'Public Speaking and Speeches'
       }
    ];
function RegisterScreen(props) {

    // RegExp to determine if email is valid
   {/* const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    function isValidEmail(email) {        
        return emailRegex.test(email);
    }
*/}

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reenter, setReenter] = useState('');
    const [accountType, setAccountType] = useState('');

    const handleRegister = () => {
        const auth = getAuth();

        if(password != reenter || password.length < 6) {
            Alert.alert(
                'Invalid Password',
                'Passwords do not match, or are less than 6 characters. ',
                [{text: 'Okay'},
                ]
            )
        }
        else {            
            createUserWithEmailAndPassword(auth, email, password, accountType)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log('User registered: ', user.uid);
                addDoc(collection(db, 'users'), {
                email: email,
                password: password,
                accountType: accountType,
                })
                .then(() => {
                    console.log('User added to Firestore');
                })
                .catch((error) => {
                    console.error('Error adding user to Firestore: ', error);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error adding user: ', errorMessage, errorCode);
                if(errorCode == 'auth/email-already-in-use') {
                    Alert.alert(
                        'Email already in use',
                        'This email already has an account associated with it.',
                        [{text: 'Okay'},]
                    )
                }
            });
        }
      };

      
    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>
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
                {/* reenter passwords to make sure that the user knows what password theyre setting */}
                <View style={styles.userInput}>
                    <TextInput 
                    placeholder='Re-enter Password' 
                    value={reenter}
                    onChangeText={setReenter}
                    secureTextEntry={true}
                    />
                </View>
                <View>
                    <Text>Please choose an account type</Text>
                <RadioButtonRN 
    selectedBtn={(e) => setAccountType(e.label)}
  data={data}
  
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
            </ScrollView>
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