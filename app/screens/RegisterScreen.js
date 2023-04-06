import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput,ScrollView, Image, TouchableOpacity, StatusBar, Alert} from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons/MaterialIcons';
import { db } from './Navigation/firebase';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, addDoc} from "firebase/firestore";
import RadioButtonRN from 'radio-buttons-react-native'

const auth = getAuth();

const data = [
    {
      label: 'Media Training'
     },
     {
      label: 'Media Training For Public Safety'
     },
     {
        label: 'Public Speaking'
       },
       {
        label: 'Public Speaking And Speeches'
       }
       
    ];
function RegisterScreen(props) {

    // RegExp to determine if email is valid
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    function isValidEmail(email) {        
        return emailRegex.test(email);
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reenter, setReenter] = useState('');
    const [accountType, setAccountType] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // <-- new state for isAdmin

    const handleRegister = () => {
        const auth = getAuth();

        // Check if the email is valid, else show alert
        if(isValidEmail(email)) {
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
                    isAdmin: isAdmin, // <-- include isAdmin in the data sent to Firestore
                    //type: "normal",
                    })
                    .then((docRef) => {
                        console.log('User added to Firestore');
                        console.log("Document ID: " , docRef.id);
                    })
                    .catch((error) => {
                        console.error('Error adding user to Firestore: ', error);
                    });

                    sendEmailVerification(user);
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
            <ScrollView>
            <View>
                {/* Login Image */}
                <View>
                    <Image source={require('../assets/solislogowhite.png')}
                        style={styles.imageStyle}                    
                    />
                </View>
                
                {/* Title text */}
                <Text style={styles.sectionTitle}>REGISTER</Text> 

                {/* User info input fields */}
                <View style={styles.userInput}>
                    {/* <MaterialIcons name='alternate-email' size={20} color="#666" /> */}
                    <TextInput 
                    value={email}
                    onChangeText={setEmail}
                    autoCompleteType="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    />                    
                </View> 
                <Text style={styles.sectionText}>email</Text>

               {/* <View style={styles.userInput}>
                    {/* <MaterialIcons name='alternate-email' size={20} color="#666" /> 
                    <TextInput placeholder='Username'/>                    
                </View> */}
                
                <View style={styles.userInput}>
                    <TextInput 

                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    />
                </View>
                <Text style={styles.sectionText}>password</Text>

                {/* reenter passwords to make sure that the user knows what password theyre setting */}
                <View style={styles.userInput}>
                    <TextInput 
                    value={reenter}
                    onChangeText={setReenter}
                    secureTextEntry={true}
                    />
                </View>
                <Text style={styles.sectionText}>email</Text>

                <View>


                <View style={{width: '65%', alignSelf: 'center'}}>
                    <Text style={styles.sectionText}>Please choose an account type</Text>
                    <RadioButtonRN style={{}}
                        selectedBtn={(e) => setAccountType(e.label)}
                      data={data}

                    />
                </View>
                    



                </View>
               {/* <View style={styles.userInput}>
                    <TextInput placeholder='Confirm' secureTextEntry={true}/>
                </View>
                */}

                <TouchableOpacity style={styles.inputButton}>
                    <Text style={styles.inputTextStyle} onPress={handleRegister} >REGISTER</Text>
                </TouchableOpacity>
                
                <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 30}}>
                    <Text style={{ color: 'black',
                        fontFamily: 'Oswald-Regular',
                        fontSize: 16,}}>Already registered? </Text>
                    <TouchableOpacity onPress={() => {props.navigation.goBack()}}>
                        <Text style={
                            {color: '#5569FF',
                            fontFamily: 'Oswald-Regular',
                            fontSize: 16,}}> Login </Text>
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
        fontWeight: '500',
        color: 'black',
        marginBottom: 30,
        paddingRight: 10,
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
        width: '65%',
        alignSelf: 'center'

    },
    
    


})
export default RegisterScreen;