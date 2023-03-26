import {collection, doc, getDoc,getDocs, query, querySnapshot, where} from "firebase/firestore";
import { db } from './firebase';
import React, {useEffect, useState} from 'react'
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import PDFReader from './PdfReader'
import {getAuth} from 'firebase/auth'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  SectionList,
  StatusBar,
  Alert,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Item = ({title}) => (
  <View>
    <Text>{title}</Text>
  </View>
);
const auth = getAuth();
function Modules(props){


  
  const [data, setData] = useState()
  const [type, setType] = useState("");
  useEffect(() => {
    async function fetchType() {
      const querySnapshot =  await getDocs(query(collection(db, 'users'), where('email', '==', auth.currentUser.email)));
      if (querySnapshot.docs.length > 0) {
        const userData = querySnapshot.docs[0].data();
        setType(userData.accountType);
      } else {
        console.log('User not found');
      }
    }
    fetchType();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!type) {
        return;
      }
      let querySnap;
      switch (type) {
        case 'Public Speaking':
          querySnap = await getDocs(collection(db, 'PublicSpeaking'));
          break;
        case 'Public Speaking And Speeches':
          querySnap = await getDocs(collection(db, 'PublicSpeakingAndSpeeches'));
          break;
        case 'Media Training':
          querySnap = await getDocs(collection(db, 'MediaTraining'));
          break;
        case 'Media Training For Public Safety':
          querySnap = await getDocs(collection(db, 'MediaTrainingForPublicSafety'));
          break;
        default:
          console.log('Invalid account type');
          return;
      }
      const docData = [];

      querySnap.forEach((doc)=>{
        docData.push(doc.data());
      });

      setData(docData);
    }
    fetchData();
  }, [type]);




  const modulesTitle = "MY MODULES";
  return(
    <SafeAreaView style={styles.container}>
      <ScrollView>
        
      <Text style={styles.sectionTitle}>{modulesTitle}</Text>
        <FlatList
          data={data}
          renderItem={({item}) => <TouchableOpacity style={styles.inputButton}  onPress={() => {props.navigate('Reader',{ item : item})}}>
            <Text style={styles.inputTextStyle}>{item.title}</Text>
            </TouchableOpacity>
            }
          keyExtractor={item => item.id}
        />
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
export default Modules;