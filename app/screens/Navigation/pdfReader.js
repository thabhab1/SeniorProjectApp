import React, {useEffect, useState} from 'react'
import { Text, View } from 'react-native';
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
           <Text> {test}</Text>
           <PdfReader
            source={ {
                uri: test,
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