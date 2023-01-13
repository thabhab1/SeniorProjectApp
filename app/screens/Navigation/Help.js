import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Account(props) {

    const [fullName, setFullName] = useState();
    const [subject, setSubject] = useState();
    const [userEmail, setUserEmail] = useState();
    const [message, setMessage] = useState();

    // const handleMessage = () => {
    //     if(fullName === null || subject === null || userEmail === null || message === null)        
    // }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                <Text style={styles.sectionTitle}>Contact Us</Text>
                
                <View style={{marginBottom: 30}}>
                    <Text style={styles.sectionText}>Question or suggestion? Message us!</Text>
                </View>
                
                {/* Contact Form Inputs */}
                <TextInput style={styles.inputField} placeholder='Full Name'
                    value={fullName} onChangeText={text => setFullName(text)}
                />
                <TextInput style={styles.inputField} placeholder='Subject' 
                    value={subject} onChangeText={text => setSubject(text)}
                />
                <TextInput style={styles.inputField} placeholder='Email'
                    value={userEmail} onChangeText={text => setUserEmail(text)}
                />
                <TextInput style={styles.inputField} placeholder='Message' multiline={true}
                    value={message} onChangeText={text => setMessage(text)}
                />

                {/* Send Message button to send all information in an email, after all fields are entered */}
                <TouchableOpacity style={styles.inputButton} onPress={() => handleMessage()}>
                    <Text style={styles.inputTextStyle}>Send Message</Text>
                </TouchableOpacity>
            </ScrollView>
            

        


        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    inputButton: {
        backgroundColor: '#f8deaa',
        padding: 20,
        borderRadius: 10,
        marginVertical: 20,
        shadowColor: 'black',
        shadowOffset: {height: 2, width: 0.5},
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 3,    
        
    },
    inputField: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
        backgroundColor: '#EEE',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: {height: 2, width: 0.5},
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 2, 
        padding: 8,      
        
    },
    inputTextStyle: {
        textAlign: 'center',
        fontWeight: '700',
        color: 'black',
        fontSize: 16,
    },
    sectionText: {
        fontSize: 20,
        color: '#333',
        fontWeight: '600',
        lineHeight: 23,
    },
    sectionTitle: {
        marginTop: 50,
        marginBottom: 30,
        fontSize: 30,
        paddingBottom: 25,
        color: '#333',
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2,
        borderRadius: 5,
        fontWeight: '600',
    },
})

export default Account;