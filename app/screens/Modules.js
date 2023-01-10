import React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View } from "react-native";


export default function Modules({navigation}) {
    return(
    <View style={styles.container}>
         <Button title="Help Screen Button"
        onPress={() => navigation.navigate("Help")}
        />
        <Button title="Account Screen Button"
        onPress={() => navigation.navigate("Account")}
        />
        <StatusBar style='auto' />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8eadd',
        fontSize: "30px",
        alignItems: 'center',
        justifyContent: 'center',
    },
});