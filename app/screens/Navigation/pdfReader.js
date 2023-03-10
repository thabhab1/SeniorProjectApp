import React, {useEffect, useState} from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PdfReader from '@bildau/rn-pdf-reader';
import {collection, doc, getDoc,getDocs} from "firebase/firestore";
import { db } from './firebase';
import YoutubePlayer from "react-native-youtube-iframe";
import { useCallback } from 'react';
import { Button } from 'react-native';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
export default function pdfReader(props) {
    const [data, setData] = useState('');

    const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  
console.log(props);
const test = props.route.params.item.link;
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

    
    const videoTest = props.route.params.item.videoLink;
    
    var str = videoTest.substring(videoTest.indexOf("=") + 1);
    console.log(str);


    return(
        <ScrollView>
        <View style = {styles.container}>
           <Text style = {styles.headerTitle}>Modules</Text>
           <PdfReader
            source={ {
                uri: test,
            }}
            style={{ flex: 1, height: 500, marginBottom: 20}}
            />

        <Text style = {styles.headerTitle} >Module Video:</Text>
        <YoutubePlayer
        height={300}
        play={playing}
        videoId={str}
        onChangeState={onStateChange}
        
      />
     

           <TouchableOpacity style={styles.inputButton} onPress={() => props.navigation.navigate('Quiz')}>
                 <Text style={styles.inputTextStyle}>Take Quiz</Text>
           </TouchableOpacity>
        
        </View>
        </ScrollView>
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

    headerTitle: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: '500',
        color: '#333',
        marginBottom: 20,
        flex: 1,

    },


})