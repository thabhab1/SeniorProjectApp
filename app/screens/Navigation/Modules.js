import PdfReader from '@bildau/rn-pdf-reader';
import {collection, doc, getDoc,getDocs, query, querySnapshot, where} from "firebase/firestore";
import { db } from './firebase';
import React, {useEffect, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
/*  Code to pull from database... 
    as of right now only pulls 1 value
    

    const [data, setData] = useState('');

    useEffect(() => {
        async function fetchData() {
        const querySnapshot = await getDocs(collection(db, 'test'));
        const docData = querySnapshot.docs.map((doc) => doc.data().data);
        setData(JSON.stringify(docData));
        }
        fetchData();
    }, []);

    **This was just to format the data**
    var output = data.substr(1,data.length -2)
    output = output.substring(1, output.length-1);
    console.log(output)
*/
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
} from 'react-native';



const Item = ({title}) => (
  <View>
    <Text>{title}</Text>
  </View>
);

function Modules(props, navigation){
  const [data, setData] = useState('');

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
console.log(data);

return(
    
  <SafeAreaView style={styles.container}>
    <SectionList 
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => {navigation.navigate('pdfReader')}} style={styles.item} >
          <Text style={styles.title}>{item}</Text>
        </TouchableOpacity>
      )}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />

<FlatList
        data={data}

        renderItem={({item}) => <Button title={item.title} onPress={() => {console.log(item.link);}}/>}

        keyExtractor={item => item.id}
      />
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
  },})


export default Modules;