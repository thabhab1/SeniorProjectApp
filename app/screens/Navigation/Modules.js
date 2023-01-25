import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PdfReader from '@bildau/rn-pdf-reader';


export default function Modules(props) {
    return(
        <View style = {styles.container}>
            <PdfReader
            source={ {
                uri: 'https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf',
            }}
            />
        </View>
    );
}

 

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    }
})
