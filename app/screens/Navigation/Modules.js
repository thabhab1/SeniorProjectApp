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
import { Image } from "react-native";

const Item = ({title}) => (
  <View>
    <Text>{title}</Text>
  </View>
);
const auth = getAuth();
function Modules(props) {
  const [data, setData] = useState();
  const [type, setType] = useState("");
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    async function fetchType() {
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", auth.currentUser.email))
      );
      if (querySnapshot.docs.length > 0) {
        const userData = querySnapshot.docs[0].data();
        setType(userData.accountType);
        setUserInfo(userData);
      } else {
        console.log("User not found");
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
        case "Public Speaking":
          querySnap = await getDocs(collection(db, "PublicSpeaking"));
          break;
        case "Public Speaking And Speeches":
          querySnap = await getDocs(collection(db, "PublicSpeakingAndSpeeches"));
          break;
        case "Media Training":
          querySnap = await getDocs(collection(db, "MediaTraining"));
          break;
        case "Media Training For Public Safety":
          querySnap = await getDocs(collection(db, "MediaTrainingForPublicSafety"));
          break;
        default:
          console.log("Invalid account type");
          return;
      }

      const docData = [];
      querySnap.forEach((doc) => {
        docData.push(doc.data());
      });

      setData(docData);

      // Find similarities between the completed array in the type object and the title property of each object in the data array
      
    }
    fetchData();
  }, [type]);
  const modulesTitle = "MY MODULES";

  i=0
  j=0;
  if(userInfo!=null & data!=null)
  {
    for(j=0;j<data.length;j++)
    {
    if(data[j].title == userInfo.completed[i])
      {
        data[j].completed = "";
      }

    }
    j=0;
  for(i=0;i<userInfo.completed.length;i++)
  {
    for(j=0;j<data.length;j++)
    {
    if(data[j].title == userInfo.completed[i])
      {
        data[j].completed = "completed";
      }

    }
  }
}
  return(
    
    <SafeAreaView style={styles.container}>
      <ScrollView>

      <View style={{}}>
          <Image source={require('../../assets/solislogowhite.png')}
              style={styles.imageStyle}                    
          />
      </View>

      <Text style={styles.sectionTitleTwo } >LET'S START LEARNING</Text>      
        
      <Text style={styles.sectionTitle}>{modulesTitle}</Text>
        <FlatList
          data={data}
          renderItem={({item}) => <TouchableOpacity style={styles.inputButton}  onPress={() => {props.navigate('Reader',{ item : item})}}>
            <Text style={styles.inputTextStyle}>{item.title}</Text>
            <Text style={styles.subtextStyle}>{item.completed}</Text>
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
  imageStyle: {


    resizeMode: 'contain',
    height: 80,
     width: 120
  },
  inputButton: {
    backgroundColor: 'black',
    paddingTop: 6,
    paddingBottom: 10,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: {height: 2, width: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
    width: '100%',
    alignSelf: 'center',
    
  },
  inputTextStyle: {
      textAlign: 'center',
      fontSize: 28,
      fontFamily: 'Oswald-Regular',
      letterSpacing: 1.5,
      color: 'white',
      fontWeight: ''
  
  },
  subtextStyle: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Oswald-Regular',
    letterSpacing: 1,
    color: 'gray',
    fontWeight: ''

},
  sectionTitle: {
      marginBottom: 40,
      fontSize: 24,
      paddingBottom: 5,
      borderTopColor: 'black',
      borderTopWidth: 2,
      fontFamily: 'Oswald-Regular',
      letterSpacing: 1.5,

  },
  sectionTitleTwo: {
    fontSize: 24,
    paddingTop: 4,
    paddingBottom: 5,
    borderTopColor: 'black',
    borderTopWidth: 2,
    fontFamily: 'Oswald-Regular',
    letterSpacing: 1.5,

}
})
export default Modules;