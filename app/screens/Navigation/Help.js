import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Linking } from 'react-native';

function Account(props) {

    const [fullName, setFullName] = useState();
    const [subject, setSubject] = useState();
    const [message, setMessage] = useState();

    const handleMessage = () => {
        //check if any of the fields are empty, throw an alert if any are.
        if (!fullName || !subject || !message) {
            Alert.alert(
                'Empty Fields',
                'You must fill in all fields before sending a message',
                [{text: "Okay"}]
            )
        }      
        //the appropriate data was inputted so send the email via users email app. Reset fields afterwards
        else {
            const to = "chicken@umich.edu"
            const subject = "Subject: " + subject;
            const body = "Full Name: " + fullName + "\nSubject: " + subject + "\nMessage: " + message;
            const url = `mailto:${to}?subject=${subject}&body=${body}`;
            Linking.openURL(url, () => {
                setFullName('');
                setMessage('');
                setSubject('');
            });

        }
        console.log(fullName, subject, message);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                <Text style={styles.sectionTitle}>CONTACT US</Text>
                
                <View style={{marginBottom: 30}}>
                    <Text style={styles.sectionText}>Question or suggestion? Email us!</Text>
                </View>
                
                {/* Contact Form Inputs */}
                <TextInput style={styles.inputField} placeholder='*Full Name'
                    value={fullName} onChangeText={(text) => setFullName(text)} maxLength={40}
                />
                <TextInput style={styles.inputField} placeholder='*Subject' 
                    value={subject} onChangeText={(text) => setSubject(text)} maxLength={40}
                />
                <TextInput style={styles.inputField} placeholder='*Message' multiline={true}
                    maxLength={2000} value={message} onChangeText={(text) => setMessage(text)} 
                />

                {/* Send Message button to send all information in an email, after all fields are entered */}
                <TouchableOpacity style={styles.inputButton} onPress={() => handleMessage()}>
                    <Text style={styles.inputTextStyle}>SEND EMAIL</Text>
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
        backgroundColor: 'black',
        paddingTop: 6,
        paddingBottom: 10,
        borderRadius: 20,
        marginBottom: 20,
        marginTop: 20,
        shadowColor: 'black',
        shadowOffset: {height: 2, width: 0.5},
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 3,
        width: '100%',
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
    sectionText: {
        fontSize: 20,
        lineHeight: 23,
        fontFamily: 'Oswald-Regular',
    },
    sectionTitle: {
        marginTop: 50,
        marginBottom: 40,
        fontSize: 24,
        paddingBottom: 25,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        fontFamily: 'Oswald-Regular',
        letterSpacing: 1.5,
  
    },
})

export default Account;