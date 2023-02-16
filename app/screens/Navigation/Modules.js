import React from 'react';
<<<<<<< Updated upstream
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
=======
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';

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
    title: 'Bookmarks',
    data: [],
  },
  
];

const App = () => (
  <SafeAreaView style={styles.container}>
    <SectionList 
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => {Alert.alert("It work")}} style={styles.item} >
          <Text style={styles.title}>{item}</Text>
        </TouchableOpacity>
      )}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  </SafeAreaView>
);

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
  export default App;
>>>>>>> Stashed changes
