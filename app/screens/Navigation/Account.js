import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, signOut } from '@firebase/auth';

function Account(props) {
    const auth = getAuth();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User has been logged out.");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <Text style={styles.sectionTitle}>MY ACCOUNT</Text>
            
            {/* user input buttons */}
            <TouchableOpacity style={styles.inputButton} onPress={handleLogout}>
                <Text style={styles.inputTextStyle}>LOG OUT</Text>
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
                <Text style={styles.inputTextStyle}>NOTIFICATIONS</Text>
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
        backgroundColor: '#5569FF',
        padding: 20,
        borderRadius: 20,
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
        fontFamily: 'RobotoCondensed-Regular',
        letterSpacing: 1.5,
    },
    sectionTitle: {
        marginTop: 50,
        marginBottom: 40,
        fontSize: 28,
        paddingBottom: 25,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        fontFamily: 'RobotoCondensed-Regular',
        letterSpacing: 1.5,
    },
})

export default Account;