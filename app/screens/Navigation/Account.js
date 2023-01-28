import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {firebase} from '../../../Firebase/firebase';

function Account(props) {
    return (
        <SafeAreaView style={styles.container}>
            
            <Text style={styles.sectionTitle}>My Account</Text>
            
            {/* user input buttons */}
            <TouchableOpacity style={styles.inputButton} onPress={() => {console.log(firebase);}}>
                <Text style={styles.inputTextStyle}>Log Out</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.inputButton} onPress={() => {
                Alert.alert(
                    'Notifications',
                    'Tapping Yes will enable email notifications. Would you like to receive email notifications?',
                    [{text: 'Yes I do', onPress: () => {
                        console.log("User has enabled email notifications.")
                    }},
                     {text: 'No'}]
                )
            }}>
                <Text style={styles.inputTextStyle}>Notifications</Text>
            </TouchableOpacity>


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
        marginTop: 50,
        marginBottom: 40,
        color: '#333',
        fontSize: 30,
        paddingBottom: 25,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2,
        borderRadius: 5,
        fontWeight: '600',
    },
})

export default Account;