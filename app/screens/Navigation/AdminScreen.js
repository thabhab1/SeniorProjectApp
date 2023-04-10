import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import RadioButtonRN from 'radio-buttons-react-native';
import { db } from './firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, setDoc } from '@firebase/firestore';
import {getAuth} from 'firebase/auth';
import * as DocumentPicker from 'expo-document-picker';
import { Button } from 'react-native';

import { 
  Text, 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity } from 'react-native';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';


const auth = getAuth();

const data = [
  {
    label: 'Media Training'
  },
  {
    label: 'Media Training For Public Safety'
  },
  {
    label: 'Public Speaking'
  },
  {
    label: 'Public Speaking And Speeches'
  }
];

  
// fire storage reference
const storage = getStorage();

// Media Training Folder Ref in Fire Storage 
const mediaTrainingRef = ref(storage, 'Media Training');

// Media Training For PS Folder Ref in Fire Storage 
const mediaTrainingForPublicSafetyRef = ref(storage, 'Media Training For Public Safety');

// Public Safety Folder Ref in Fire Storage 
const PublicSpeakingRef = ref(storage, 'Public Speaking');

const PublicSpeakingAndSpeechesRef = ref(storage, 'Public Speaking And Speeches');
  
  function AdminScreen(props) {
    
    
    const [mediaTrainingQuestions, setMediaTrainingQuestions] = useState([
      {
        question: '',
        options: ['', '', '', ''],
      },
      {
        question: '',
        options: ['', '', '', ''],
      },
      {
        question: '',
        options: ['', '', '', ''],
      },
    ]);

  
    const [mediaTrainingAnswer, setMediaTrainingAnswer] = useState('');
    const [mediaTrainingLink, setMediaTrainingLink] = useState('');
    const [mediaTrainingPDF, setMediaTrainingPDF] = useState({});
    const [mediaTrainingTitle, setMediaTrainingTitle] = useState('');
    const [mTSelectedPDF, setMTSelectedPDF] = useState(null);

    const [mediaTrainingForPublicSafetyQuestions, setMediaTrainingForPublicSafetyQuestions] = useState([
      {
        question: '',
        options: ['', '', '', ''],
      },
      {
        question: '',
        options: ['', '', '', ''],
      },
      {
        question: '',
        options: ['', '', '', ''],
      },
    ]);

    const [mediaTrainingForPublicSafetyAnswer, setMediaTrainingForPublicSafetyAnswer] = useState('');
    const [mediaTrainingForPublicSafetyLink, setMediaTrainingForPublicSafetyLink] = useState ('');
    const [mediaTrainingForPublicSafetyPDF, setMediaTrainingForPublicSafetyPDF] = useState({});
    const [mediaTrainingForPublicSafetyTitle, setMediaTrainingForPublicSafetyTitle] = useState ('');
    const [mediaTrainingforPublicSafetySelectedPDF, setMediaTrainingforPublicSafetySelectedPDF] = useState(null);

    const [publicSpeakingQuestions, setPublicSpeakingQuestions] = useState([
      {
        question: '',
        options: ['', '', '', ''],
      },
      {
        question: '',
        options: ['', '', '', ''],
      },
      {
        question: '',
        options: ['', '', '', ''],
      },
    ]);

    const [publicSpeakingAnswer, setPublicSpeakingAnswer] = useState('');
    const [publicSpeakingLink, setPublicSpeakingLink] = useState('');
    const [publicSpeakingPDF, setPublicSpeakingPDF] = useState({});
    const [publicSpeakingTitle, setPublicSpeakingTitle] = useState('');
    const [publicSpeakingSelectedPDF, setPublicSpeakingSelectedPDF] = useState(null);
    const [publicSpeakingAndSpeechesQuestions, setPublicSpeakingAndSpeechesQuestions] = useState([
      {
        question: '',
        options: ['', '', '', ''],
      },
      {
        question: '',
        options: ['', '', '', ''],
      },
      {
        question: '',
        options: ['', '', '', ''],
      },
    ]);
  
    
    const [publicSpeakingAndSpeechesAnswer, setPublicSpeakingAndSpeechesAnswer] = useState('');
    const [publicSpeakingAndSpeechesLink, setPublicSpeakingAndSpeechesLink] = useState('');
    const [publicSpeakingAndSpeechesPDF, setPublicSpeakingAndSpeechesPDF] = useState({});
    const [publicSpeakingAndSpeechesTitle, setPublicSpeakingAndSpeechesTitle] = useState('');
    const [accountType, setAccountType] = useState('')
    const [publicSpeakingAndSpeechesSelectedPDF, setPublicSpeakingAndSpeechesSelectedPDF] = useState(null);
    

    const handleMTSelectPDF = async () => {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: false,
      });
    
      if (result.type === 'success') {
        setMTSelectedPDF(result);
      }
    };

    const handleMediaTrainingSubmit = async () => {
      try {
        let collectionName;
        switch (accountType) {
          case 'Media Training':
            collectionName = 'MediaTraining';
            break;
          // add more cases for other account types
          default:
            console.error('Invalid account type');
            return;
        }
    
        // Upload PDF file to Firebase Storage if selected
        let downloadUrl = null;
        if (mTSelectedPDF) {
          const response = await fetch(mTSelectedPDF.uri);
          const blob = await response.blob();
          const uniqueName = `${Date.now()}-${mediaTrainingTitle}.pdf`; // Unique name for the uploaded file
          const fileRef = ref(mediaTrainingRef, uniqueName);
          await uploadBytes(fileRef, blob);
          console.log('File uploaded successfully');
      
          // Get the download URL of the uploaded file
          downloadUrl = await getDownloadURL(fileRef);
        }
    
        // Add Firestore document with a reference to the uploaded file
        await addDoc(collection(db, collectionName), {
          title: mediaTrainingTitle,
          questions: mediaTrainingQuestions,
          link: mediaTrainingLink,
          pdf: downloadUrl // Use the download URL of the uploaded file as the value for "pdf" field in Firestore
        });
    
        setMediaTrainingTitle('');
        setMediaTrainingLink('');
        setMediaTrainingPDF('');
        setMediaTrainingQuestions([
          { question: '', options: ['', '', '', ''] },
          { question: '', options: ['', '', '', ''] },
          { question: '', options: ['', '', '', ''] },
        ]);
        setMTSelectedPDF(null);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }



    const handleMTFPSSelectPDF = async () => {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: false,
      });
    
      if (result.type === 'success') {
        setMediaTrainingforPublicSafetySelectedPDF(result);
      }
    };

    const handleMediaTrainingForPublicSafetySubmit = async () => {
      try {
        let collectionName;
        switch (accountType) {
          case 'Media Training For Public Safety':
            collectionName = 'MediaTrainingForPublicSafety';
            break;
          // add more cases for other account types
          default:
            console.error('Invalid account type');
            return;
        }
    
        // Upload PDF file to Firebase Storage if selected
        let downloadUrl = null;
        if (mediaTrainingforPublicSafetySelectedPDF) {
          const response = await fetch(mediaTrainingforPublicSafetySelectedPDF.uri);
          const blob = await response.blob();
          const uniqueName = `${Date.now()}-${mediaTrainingForPublicSafetyTitle}.pdf`; // Unique name for the uploaded file
          const fileRef = ref(mediaTrainingForPublicSafetyRef, uniqueName);
          await uploadBytes(fileRef, blob);
          console.log('File uploaded successfully');
      
          // Get the download URL of the uploaded file
          downloadUrl = await getDownloadURL(fileRef);
        }
    
        // Add Firestore document with a reference to the uploaded file
        await addDoc(collection(db, collectionName), {
          title: mediaTrainingForPublicSafetyTitle,
          questions: mediaTrainingForPublicSafetyQuestions,
          link: mediaTrainingForPublicSafetyLink,
          pdf: downloadUrl // Use the download URL of the uploaded file as the value for "pdf" field in Firestore
        });
    
        setMediaTrainingForPublicSafetyTitle('');
        setMediaTrainingForPublicSafetyLink('');
        setMediaTrainingForPublicSafetyPDF('');
        setMediaTrainingForPublicSafetyQuestions([
          { question: '', options: ['', '', '', ''] },
          { question: '', options: ['', '', '', ''] },
          { question: '', options: ['', '', '', ''] },
        ]);
        setMediaTrainingforPublicSafetySelectedPDF(null);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    };


    const handlePSSelectPDF = async () => {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: false,
      });
    
      if (result.type === 'success') {
        setPublicSpeakingSelectedPDF(result);
      }
    };

    const handlePublicSpeakingSubmit = async () => {
      try {
        let collectionName;
        switch (accountType) {
          case 'Public Speaking':
            collectionName = 'PublicSpeaking';
            break;
          // add more cases for other account types
          default:
            console.error('Invalid account type');
            return;
        }
    
        // Upload PDF file to Firebase Storage if selected
        let downloadUrl = null;
        if (publicSpeakingSelectedPDF) {
          const response = await fetch(publicSpeakingSelectedPDF.uri);
          const blob = await response.blob();
          const uniqueName = `${Date.now()}-${publicSpeakingTitle}.pdf`; // Unique name for the uploaded file
          const fileRef = ref(PublicSpeakingRef, uniqueName);
          await uploadBytes(fileRef, blob);
          console.log('File uploaded successfully');
      
          // Get the download URL of the uploaded file
          downloadUrl = await getDownloadURL(fileRef);
        }
    
        // Add Firestore document with a reference to the uploaded file
        await addDoc(collection(db, collectionName), {
          title: publicSpeakingTitle,
          questions: publicSpeakingQuestions,
          link: publicSpeakingLink,
          pdf: downloadUrl // Use the download URL of the uploaded file as the value for "pdf" field in Firestore
        });
    
        setPublicSpeakingTitle('');
        setPublicSpeakingLink('');
        setPublicSpeakingPDF('');
        setPublicSpeakingQuestions([
          { question: '', options: ['', '', '', ''] },
          { question: '', options: ['', '', '', ''] },
          { question: '', options: ['', '', '', ''] },
        ]);
        setPublicSpeakingSelectedPDF(null);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    };
    
    const handlePSAndSpeechesSelectPDF = async () => {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: false,
      });
    
      if (result.type === 'success') {
        setPublicSpeakingAndSpeechesSelectedPDF(result);
      }
    };

    const handlePublicSpeakingAndSpeechesSubmit = async () => {
      try {
        let collectionName;
        switch (accountType) {
          case 'Public Speaking And Speeches':
            collectionName = 'PublicSpeakingAndSpeeches';
            break;
          // add more cases for other account types
          default:
            console.error('Invalid account type');
            return;
        }
    
        // Upload PDF file to Firebase Storage if selected
        let downloadUrl = null;
        if (publicSpeakingAndSpeechesSelectedPDF) {
          const response = await fetch(publicSpeakingAndSpeechesSelectedPDF.uri);
          const blob = await response.blob();
          const uniqueName = `${Date.now()}-${publicSpeakingAndSpeechesTitle}.pdf`; // Unique name for the uploaded file
          const fileRef = ref(PublicSpeakingAndSpeechesRef, uniqueName);
          await uploadBytes(fileRef, blob);
          console.log('File uploaded successfully');
      
          // Get the download URL of the uploaded file
          downloadUrl = await getDownloadURL(fileRef);
        }
    
        // Add Firestore document with a reference to the uploaded file
        await addDoc(collection(db, collectionName), {
          title: publicSpeakingAndSpeechesTitle,
          questions: publicSpeakingAndSpeechesQuestions,
          link: publicSpeakingAndSpeechesLink,
          pdf: downloadUrl // Use the download URL of the uploaded file as the value for "pdf" field in Firestore
        });
    
        setPublicSpeakingAndSpeechesTitle('');
        setPublicSpeakingAndSpeechesLink('');
        setPublicSpeakingAndSpeechesPDF('');
        setPublicSpeakingAndSpeechesQuestions([
          { question: '', options: ['', '', '', ''] },
          { question: '', options: ['', '', '', ''] },
          { question: '', options: ['', '', '', ''] },
        ]);
        setPublicSpeakingAndSpeechesSelectedPDF(null);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    };
  
    
    
    
    return (

    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Layout style={{ flex: 1, padding: 16 }}>
        <ScrollView>
        <View style={{marginTop: 10}}>
          
          <Text style={styles.titleText}>Please choose an account type</Text>
          <RadioButtonRN
          selectedBtn={(e) => setAccountType(e.label)}
          data={data}
          />
          </View>
          
          {/* Media Training */}
          
          {accountType === 'Media Training' && (
          <View style={{  borderTopWidth: 2, borderColor: 'lightgrey', marginBottom: 16, marginTop: 20 }}>
    <Text style={styles.titleText}>Media Training Questions</Text>
    <TextInput
      style={styles.textInput}
      onChangeText={setMediaTrainingTitle}
      value={mediaTrainingTitle}
      placeholder='Title'
    />
            
    <TextInput
      style={styles.textInput}
      onChangeText={setMediaTrainingLink}
      value={mediaTrainingLink}
      placeholder='Video Link'
    />
    
    <View style={{}}>
      <Button
      
      title="Select PDF"
      onPress={handleMTSelectPDF}
      />      
    </View>


    {mediaTrainingQuestions.map(({ question, options }, index) => (
      <View key={index}>
        <View style={{marginTop: 25, borderTopWidth: 2, borderColor: 'lightgrey', paddingTop: 30, }}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              const updatedQuestions = [...mediaTrainingQuestions];
              updatedQuestions[index].question = text;
              setMediaTrainingQuestions(updatedQuestions);
            }}
            value={question}
            placeholder={`Question ${index + 1}`}
          />
        </View>

        {options.map((option, optionIndex) => (
          <View key={optionIndex} style={{flexDirection: 'row', alignItems: 'center' }}>
            <RadioButtonRN
              style={{ marginHorizontal: 15, marginBottom: 18  }}
              data={[
                {
                  label: '',
                  value: true,
                },
              ]}
              selectedBtn={(value) => {
                const updatedQuestions = [...mediaTrainingQuestions];
                updatedQuestions[index].correctAnswer = value;
                setMediaTrainingQuestions(updatedQuestions);
              }}
              initial={optionIndex}
              
              box={false}
              activeColor={'green'}
              textStyle={{ display: 'none' }}
            />

            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                const updatedQuestions = [...mediaTrainingQuestions];
                updatedQuestions[index].options[optionIndex] = text;
                setMediaTrainingQuestions(updatedQuestions);
              }}
              value={option}
              placeholder={`Option ${optionIndex + 1}`}
            />
          </View>
        ))}
      </View>
    ))}

              <View style={{marginBottom: 0}}/>

    <TouchableOpacity style={styles.button} onPress={handleMediaTrainingSubmit}>
      <Text style={styles.buttonText}>Create Module</Text>
    </TouchableOpacity>
  </View>
)}

        
         {/* Media Training For Public Safety */}
    
         {accountType === 'Media Training For Public Safety' && (
         <View style={{  borderTopWidth: 2, borderColor: 'lightgrey', marginBottom: 16, marginTop: 20 }}>
          <Text style={styles.titleText}>Media Training For Public Safety Questions</Text>

          <TextInput
          style={styles.textInput}
          onChangeText={setMediaTrainingForPublicSafetyTitle}
          value={mediaTrainingForPublicSafetyTitle}
          placeholder='Title'
        />
         <TextInput
          style={styles.textInput}
          onChangeText={setMediaTrainingForPublicSafetyLink}
          value={mediaTrainingForPublicSafetyLink}
          placeholder='Video Link'
        />
        
        <View style={{}}>
          <Button
            
                  title="Select PDF"
                  onPress={handleMTFPSSelectPDF}
                  />          
        </View>
        
        
          {mediaTrainingForPublicSafetyQuestions.map(({ question, options }, index) => (
          <View key={index}>

            <View style={{marginTop: 25, borderTopWidth: 2, borderColor: 'lightgrey', paddingTop: 30,}}>

              <TextInput
                style={styles.textInput}
                onChangeText={(text) => {
                  const updatedQuestions = [...mediaTrainingForPublicSafetyQuestions];
                  updatedQuestions[index].question = text;
                  setMediaTrainingForPublicSafetyQuestions(updatedQuestions);
                }}
                value={question}
                placeholder={`Question ${index + 1}`}
              />
            </View>
        
        {options.map((option, optionIndex) => (
          <View key={optionIndex} style={{flexDirection: 'row', alignItems: 'center' }}>
            <RadioButtonRN
              style={{ marginHorizontal: 15, marginBottom: 18  }}
              data={[
                {
                  label: '',
                  value: true,
                },
              ]}
              selectedBtn={(value) => {
                const updatedQuestions = [...mediaTrainingForPublicSafetyQuestions];
                updatedQuestions[index].correctAnswer = optionIndex;
                setMediaTrainingForPublicSafetyQuestions(updatedQuestions);
              }}
              initial={optionIndex}
              
              box={false}
              activeColor={'green'}
              textStyle={{ display: 'none' }}
            />
          <TextInput
            key={optionIndex}
            style={styles.textInput}
            onChangeText={(text) => {
              const updatedQuestions = [...mediaTrainingForPublicSafetyQuestions];
              updatedQuestions[index].options[optionIndex] = text;
              setMediaTrainingForPublicSafetyQuestions(updatedQuestions);
            }}
            value={option}
            placeholder={`Option ${optionIndex + 1}`}
          />
          </View>
        ))}
        
      </View>
    ))}
    <TouchableOpacity style={styles.button} onPress={handleMediaTrainingForPublicSafetySubmit}>
      <Text style={styles.buttonText}>Create Module</Text>
    </TouchableOpacity>
  </View>
)}
        
        
        {/* Public Speaking */}
    
        {accountType === 'Public Speaking' && (
         <View style={{  borderTopWidth: 2, borderColor: 'lightgrey', marginBottom: 16, marginTop: 20 }}>
          <Text style={styles.titleText}>Public Speaking Questions</Text>

          <TextInput
          style={styles.textInput}
          onChangeText={setPublicSpeakingTitle}
          value={publicSpeakingTitle}
          placeholder='Title'
        />
         <TextInput
          style={styles.textInput}
          onChangeText={setPublicSpeakingLink}
          value={publicSpeakingLink}
          placeholder='Video Link'
        />
        
        <View style={{}}>
          <Button
            
            title="Select PDF"
            onPress={handlePSSelectPDF}
            />
        </View>
        

          {publicSpeakingQuestions.map(({ question, options }, index) => (
          <View key={index}>

          <View style={{marginTop: 25, borderTopWidth: 2, borderColor: 'lightgrey', paddingTop: 30,}}>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                const updatedQuestions = [...publicSpeakingQuestions];
                updatedQuestions[index].question = text;
                setPublicSpeakingQuestions(updatedQuestions);
              }}
              value={question}
              placeholder={`Question ${index + 1}`}
            />
          </View>
        {options.map((option, optionIndex) => (
          <View key={optionIndex} style={{flexDirection: 'row', alignItems: 'center' }}>
              <RadioButtonRN
                style={{ marginHorizontal: 15, marginBottom: 18  }}
                data={[
                  {
                    label: '',
                    value: true,
                  },
                ]}
                selectedBtn={(value) => {
                  const updatedQuestions = [...publicSpeakingQuestions];
                  updatedQuestions[index].correctAnswer = optionIndex;
                  setPublicSpeakingQuestions(updatedQuestions);
                }}
                initial={optionIndex}

                box={false}
                activeColor={'green'}
                textStyle={{ display: 'none' }}
              />
            <TextInput
              key={optionIndex}
              style={styles.textInput}
              onChangeText={(text) => {
                const updatedQuestions = [...publicSpeakingQuestions];
                updatedQuestions[index].options[optionIndex] = text;
                setPublicSpeakingQuestions(updatedQuestions);
              }}
              value={option}
              placeholder={`Option ${optionIndex + 1}`}
            />
          </View>
        ))}
        
      </View>
    ))}
    <TouchableOpacity style={styles.button} onPress={handlePublicSpeakingSubmit}>
      <Text style={styles.buttonText}>Create Module</Text>
    </TouchableOpacity>
  </View>
)}

        {/* Public Speaking And Speeches */}
    
        {accountType === 'Public Speaking And Speeches' && (
         <View style={{  borderTopWidth: 2, borderColor: 'lightgrey', marginBottom: 16, marginTop: 20 }}>
          <Text style={styles.titleText}>Public Speaking And Speeches Questions</Text>

          <TextInput
          style={styles.textInput}
          onChangeText={setPublicSpeakingAndSpeechesTitle}
          value={publicSpeakingAndSpeechesTitle}
          placeholder='Title'
        />
         <TextInput
          style={styles.textInput}
          onChangeText={setPublicSpeakingAndSpeechesLink}
          value={publicSpeakingAndSpeechesLink}
          placeholder='Video Link'
        />


        <View style={{}}>
          <Button
          title="Select PDF"
          onPress={handlePSAndSpeechesSelectPDF}
          />          
        </View>

          {publicSpeakingAndSpeechesQuestions.map(({ question, options }, index) => (
          <View key={index}>

            <View style={{marginTop: 25, borderTopWidth: 2, borderColor: 'lightgrey', paddingTop: 30,}}>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => {
                  const updatedQuestions = [...publicSpeakingAndSpeechesQuestions];
                  updatedQuestions[index].question = text;
                  setPublicSpeakingAndSpeechesQuestions(updatedQuestions);
                }}
                value={question}
                placeholder={`Question ${index + 1}`}
              />
            </View>

        
        {options.map((option, optionIndex) => (
          <View key={optionIndex} style={{flexDirection: 'row', alignItems: 'center' }}>
              <RadioButtonRN
                style={{ marginHorizontal: 15, marginBottom: 18  }}
                data={[
                  {
                    label: '',
                    value: true,
                  },
                ]}
                selectedBtn={(value) => {
                  const updatedQuestions = [...publicSpeakingAndSpeechesQuestions];
                  updatedQuestions[index].correctAnswer = optionIndex;
                  setPublicSpeakingAndSpeechesQuestions(updatedQuestions);
                }}
                initial={optionIndex}

                box={false}
                activeColor={'green'}
                textStyle={{ display: 'none' }}
              />
            <TextInput
              key={optionIndex}
              style={styles.textInput}
              onChangeText={(text) => {
                const updatedQuestions = [...publicSpeakingAndSpeechesQuestions];
                updatedQuestions[index].options[optionIndex] = text;
                setPublicSpeakingAndSpeechesQuestions(updatedQuestions);
              }}
              value={option}
              placeholder={`Option ${optionIndex + 1}`}
            />
          </View>
        ))}
        
      </View>
    ))}
    <TouchableOpacity style={styles.button} onPress={handlePublicSpeakingAndSpeechesSubmit}>
      <Text style={styles.buttonText}>Create Module</Text>
    </TouchableOpacity>
  </View>
)}

    </ScrollView>
  </Layout>
</ApplicationProvider>

);
}

export default AdminScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    label: {
      fontWeight: 'bold',
      marginTop: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginTop: 5,
      marginBottom: 10,
    },
    button: {
      backgroundColor: 'black',
      paddingTop: 6,
      paddingBottom: 10,
      borderRadius: 20,
      marginTop: 20,
      shadowColor: 'black',
      shadowOffset: {height: 2, width: 0.5},
      shadowOpacity: 0.5,
      shadowRadius: 6,
      elevation: 3,
      width: '100%',
      alignSelf: 'center',
      
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 28,
        fontFamily: 'Oswald-Regular',
        letterSpacing: 1.5,
        color: 'white',
        fontWeight: ''

    },
    textInput: {
      height: 40,
      borderColor: 'gray', 
      borderWidth: 1, 
      marginBottom: 8,
      paddingLeft: 10,
      borderRadius: 4,
      fontSize: 14,
      flex: 1,
    },
    titleText: {
        textAlign: 'center',
        fontWeight: '500',
        color: 'black',
        fontFamily: 'Oswald-Regular',
        fontSize: 20,
        marginBottom: 8,
        marginTop: 10
    },
  });
