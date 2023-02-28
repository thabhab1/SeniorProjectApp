import React, {useEffect, useState} from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PdfReader from '@bildau/rn-pdf-reader';
import {collection, doc, getDoc,getDocs} from "firebase/firestore";
import { db } from './firebase';


export default function pdfReader(props) {
    const [data, setData] = useState('');

console.log(props);
const test = props.route.params.link;
    useEffect(() => {
        async function fetchData() {
        const querySnapshot = await getDocs(collection(db, 'test'));
        const docData = querySnapshot.docs.map((doc) => doc.data().data);
        setData(JSON.stringify(docData));
        }
        fetchData();
    }, []);
    //var output = data.replace(/^\[(.+)\]$/,'$1');
    var output = data.substr(1,data.length -2)
    output = output.substring(1, output.length-1);
    console.log(output)
    return(
        <View style = {styles.container}>
           <Text>{test}</Text>
           <PdfReader
            source={ {
                uri: test,
            }}
            />
           <TouchableOpacity style={styles.inputButton} onPress={() => props.navigation.navigate('Quiz')}>
                 <Text style={styles.inputTextStyle}>Take Quiz</Text>
           </TouchableOpacity>
        
        </View>
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

    },
    userInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 2,
        marginBottom: 25,

    },




})