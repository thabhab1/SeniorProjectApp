import React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View } from "react-native";

export default function Modules({navigation}) {
    return(
    <View style={styles.container}>
         <Button title="Help Screen Button"
        onPress={() => navigation.navigate("HelpScreen")}
        />
        <Button title="Boards Screen Button"
        onPress={() => navigation.navigate("WelcomeScreen")}
        />
        <StatusBar style='auto' />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});