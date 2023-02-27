import {collection, doc, getDoc,getDocs, query, querySnapshot, where} from "firebase/firestore";
import { db } from './firebase';
import React, {useEffect, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import pdfReader from './pdfReader'
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
  const [data, setData] = useState('');
console.log(auth.currentUser.email);
  useEffect(() => {
    async function fetchData() {
    const querySnapshot = await getDocs(collection(db, 'users'));
    
    const docData = [];

    querySnapshot.forEach((doc)=>{
      docData.push(doc.data());
    });
    setData(docData);
    }
    fetchData();
  }, []);
  
console.log(data.email)
const i = 0;

  useEffect(() => {
    async function fetchData() {
    const querySnapshot = await getDocs(collection(db, 'test'));
    const docData = [];

    querySnapshot.forEach((doc)=>{
      docData.push(doc.data());
    });
    setData(docData);
    }
    fetchData();
  }, []);

  const poop = 'poop';
  
  return(
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SectionList 
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => {props.navigate('Reader',{ link : poop })}} style={styles.item} >
              <Text style={styles.title}>{item}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />

        <FlatList
          data={data}
          renderItem={({item}) => <TouchableOpacity style={styles.item}  onPress={() => {props.navigate('Reader',{ link : item.link })}}>
            <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
            }
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const DATA = [
  {
    title: 'Popular Articles',
    data: ['De-escalation', 'Public Speaking Basics', 'Speech Writing'],
  },
  {
    title: 'Recently Viewed',
    data: ['Basic part 1', 'Basic part 2', 'Basic part 3'],
  },
  {
    title: 'All Modules',
    data: [],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: '#f8deaa',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: 'white',
  },
});

export default Modules;