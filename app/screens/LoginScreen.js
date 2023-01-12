import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons/MaterialIcons';


function LoginScreen(props) {
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
                    <TextInput placeholder='Email'/>                    
                </View> 

                <View style={styles.userInput}>
                    <TextInput placeholder='Password' secureTextEntry={true}/>
                    {/* <TouchableOpacity style={{color: '#f8deaa'}}>
                        <TextInput>Forgot?</TextInput>
                    </TouchableOpacity> */}
                </View>

                <TouchableOpacity style={styles.inputButton} onPress={() => {}}>
                    <Text style={styles.inputTextStyle}>Login</Text>
                </TouchableOpacity>
                
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{ color: '#333'}}>New to the app? </Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
                        <Text style={
                            {color: 'steelblue',
                             borderBottomColor: '#f8deaa',
                              borderBottomWidth: 2,}}>Register</Text>
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
        height: 300,
        width: 300,
        marginBottom: 30,
        transform: [{rotate: '-4deg'}],
        alignSelf: 'center',
    },
    inputButton: {
        backgroundColor: '#f8deaa',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        
    },
    inputTextStyle: {
        textAlign: 'center',
        fontWeight: '700',
        color: 'black'
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
        flexDirection: 'row',

    },
    
    


})

export default LoginScreen;