import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import RadioButtonRN from 'radio-buttons-react-native';
import { db } from './firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, setDoc } from '@firebase/firestore';
import {getAuth} from 'firebase/auth';
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

//Media Training PDF File Upload from Link
const MediaTrainingUpload = async (uri) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileRef = ref(mediaTrainingRef, 'filenamed.pdf');
    await uploadBytes(fileRef, blob);
    console.log('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading file: ', error);
  }
};

// Media Training For PS Folder Ref in Fire Storage 
const mediaTrainingForPublicSafetyRef = ref(storage, 'Media Training For Public Safety');

// Media Training for PS PDF File Upload from Link
const MediaTrainingForPublicSafetyUpload = async (uri) => {
  try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileRef = ref(mediaTrainingForPublicSafetyRef, 'filename.pdf');
      await uploadBytes(fileRef, blob);
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };

// Public Safety Folder Ref in Fire Storage 
const PublicSpeakingRef = ref(storage, 'Public Speaking');

// Public Safety PDF File Upload from Link
const PublicSpeakingUpload = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileRef = ref(PublicSpeakingRef, 'filename.pdf');
      await uploadBytes(fileRef, blob);
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };

  const PublicSpeakingAndSpeechesRef = ref(storage, 'Public Speaking And Speeches');

  const PublicSpeakingAndSpeechesUpload = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileRef = ref(PublicSpeakingAndSpeechesRef, 'filenamed.pdf');
      await uploadBytes(fileRef, blob);
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };
  
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
    const [mediaTrainingPDF, setMediaTrainingPDF] = useState('');
    const [mediaTrainingTitle, setMediaTrainingTitle] = useState('');
    
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
    const [mediaTrainingForPublicSafetyPDF, setMediaTrainingForPublicSafetyPDF] = useState ('');
    const [mediaTrainingForPublicSafetyTitle, setMediaTrainingForPublicSafetyTitle] = useState ('');

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
    const [publicSpeakingPDF, setPublicSpeakingPDF] = useState('');
    const [publicSpeakingTitle, setPublicSpeakingTitle] = useState('');

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
    const [publicSpeakingAndSpeechesPDF, setPublicSpeakingAndSpeechesPDF] = useState('');
    const [publicSpeakingAndSpeechesTitle, setPublicSpeakingAndSpeechesTitle] = useState('');
    const [accountType, setAccountType] = useState('')

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
    
        // Upload PDF file to Firebase Storage
        const response = await fetch(mediaTrainingPDF);
        const blob = await response.blob();
        const uniqueName = `${Date.now()}-${mediaTrainingTitle}.pdf`; // Unique name for the uploaded file
        const fileRef = ref(mediaTrainingRef, uniqueName);
        await uploadBytes(fileRef, blob);
        console.log('File uploaded successfully');
    
        // Add Firestore document with a reference to the uploaded file
        const downloadUrl = await getDownloadURL(fileRef);
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
      } catch (error) {
        console.error('Error adding document: ', error);
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
    
        // Upload PDF file to Firebase Storage
        const response = await fetch(mediaTrainingForPublicSafetyPDF);
        const blob = await response.blob();
        const uniqueName = `${Date.now()}-${mediaTrainingForPublicSafetyTitle}.pdf`; // Unique name for the uploaded file
        const fileRef = ref(mediaTrainingForPublicSafetyRef, uniqueName);
        await uploadBytes(fileRef, blob);
        console.log('File uploaded successfully');
    
        // Add Firestore document with a reference to the uploaded file
        const downloadUrl = await getDownloadURL(fileRef);
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
      } catch (error) {
        console.error('Error adding document: ', error);
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
    
        // Upload PDF file to Firebase Storage
        const response = await fetch(publicSpeakingPDF);
        const blob = await response.blob();
        const uniqueName = `${Date.now()}-${publicSpeakingTitle}.pdf`; // Unique name for the uploaded file
        const fileRef = ref(PublicSpeakingRef, uniqueName);
        await uploadBytes(fileRef, blob);
        console.log('File uploaded successfully');
    
        // Add Firestore document with a reference to the uploaded file
        const downloadUrl = await getDownloadURL(fileRef);
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
      } catch (error) {
        console.error('Error adding document: ', error);
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
    
        // Upload PDF file to Firebase Storage
        const response = await fetch(publicSpeakingAndSpeechesPDF);
        const blob = await response.blob();
        const uniqueName = `${Date.now()}-${publicSpeakingAndSpeechesTitle}.pdf`; // Unique name for the uploaded file
        const fileRef = ref(PublicSpeakingAndSpeechesRef, uniqueName);
        await uploadBytes(fileRef, blob);
        console.log('File uploaded successfully');
    
        // Add Firestore document with a reference to the uploaded file
        const downloadUrl = await getDownloadURL(fileRef);
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
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    };
  
    
    
    
    return (

    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Layout style={{ flex: 1, padding: 16 }}>
        <ScrollView>
        <View>
          
          <Text>Please choose an account type</Text>
          <RadioButtonRN
          selectedBtn={(e) => setAccountType(e.label)}
          data={data}
          />
          </View>
          
          {/* Media Training */}
          
          {accountType === 'Media Training' && (
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.titleText}>Media Training Questions</Text>
            <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            onChangeText={setMediaTrainingTitle}
            value={mediaTrainingTitle}
            placeholder='Title'
            />
            
            <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            onChangeText={setMediaTrainingLink}
            value={mediaTrainingLink}
            placeholder='Video Link'
            />

            <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            onChangeText={setMediaTrainingPDF}
            value={mediaTrainingPDF}
            placeholder='PDF Link'
            />
            {mediaTrainingQuestions.map(({ question, options }, index) => (
            <View key={index}>
              <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
              onChangeText={(text) => {
                const updatedQuestions = [...mediaTrainingQuestions];
                updatedQuestions[index].question = text;
                setMediaTrainingQuestions(updatedQuestions);
              }}
              value={question}
              placeholder={`Question ${index + 1}`}
              />
              {options.map((option, optionIndex) => (
              <TextInput
              key={optionIndex}
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
              onChangeText={(text) => {
                const updatedQuestions = [...mediaTrainingQuestions];
                updatedQuestions[index].options[optionIndex] = text;
                setMediaTrainingQuestions(updatedQuestions);
              }}
              value={option}
              placeholder={`Option ${optionIndex + 1}`}
              />
              ))}
              </View>
              ))}
              <TouchableOpacity style={styles.button} onPress={handleMediaTrainingSubmit}>
                <Text style={styles.buttonText}>Create Module</Text>
                </TouchableOpacity>
                </View>
                )}

        
         {/* Media Training For Public Safety */}
    
         {accountType === 'Media Training For Public Safety' && (
         <View style={{ marginBottom: 16 }}>
          <Text style={styles.titleText}>Media Training For Public Safety Questions</Text>

          <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
          onChangeText={setMediaTrainingForPublicSafetyTitle}
          value={mediaTrainingForPublicSafetyTitle}
          placeholder='Title'
        />
         <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
          onChangeText={setMediaTrainingForPublicSafetyLink}
          value={mediaTrainingForPublicSafetyLink}
          placeholder='Video Link'
        />
         <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
          onChangeText={setMediaTrainingForPublicSafetyPDF}
          value={mediaTrainingForPublicSafetyPDF}
          placeholder='PDF Link'
        />
          {mediaTrainingForPublicSafetyQuestions.map(({ question, options }, index) => (
          <View key={index}>

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
          onChangeText={(text) => {
            const updatedQuestions = [...mediaTrainingForPublicSafetyQuestions];
            updatedQuestions[index].question = text;
            setMediaTrainingForPublicSafetyQuestions(updatedQuestions);
          }}
          value={question}
          placeholder={`Question ${index + 1}`}
        />
        {options.map((option, optionIndex) => (
          <TextInput
            key={optionIndex}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            onChangeText={(text) => {
              const updatedQuestions = [...mediaTrainingForPublicSafetyQuestions];
              updatedQuestions[index].options[optionIndex] = text;
              setMediaTrainingForPublicSafetyQuestions(updatedQuestions);
            }}
            value={option}
            placeholder={`Option ${optionIndex + 1}`}
          />
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
         <View style={{ marginBottom: 16 }}>
          <Text style={styles.titleText}>Public Speaking Questions</Text>

          <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
          onChangeText={setPublicSpeakingTitle}
          value={publicSpeakingTitle}
          placeholder='Title'
        />
         <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
          onChangeText={setPublicSpeakingLink}
          value={publicSpeakingLink}
          placeholder='Video Link'
        />
         <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
          onChangeText={setPublicSpeakingPDF}
          value={publicSpeakingPDF}
          placeholder='PDF Link'
        />
          {publicSpeakingQuestions.map(({ question, options }, index) => (
          <View key={index}>

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
          onChangeText={(text) => {
            const updatedQuestions = [...publicSpeakingQuestions];
            updatedQuestions[index].question = text;
            setPublicSpeakingQuestions(updatedQuestions);
          }}
          value={question}
          placeholder={`Question ${index + 1}`}
        />
        {options.map((option, optionIndex) => (
          <TextInput
            key={optionIndex}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            onChangeText={(text) => {
              const updatedQuestions = [...publicSpeakingQuestions];
              updatedQuestions[index].options[optionIndex] = text;
              setPublicSpeakingQuestions(updatedQuestions);
            }}
            value={option}
            placeholder={`Option ${optionIndex + 1}`}
          />
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
         <View style={{ marginBottom: 16 }}>
          <Text style={styles.titleText}>Public Speaking And Speeches Questions</Text>

          <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
          onChangeText={setPublicSpeakingAndSpeechesTitle}
          value={publicSpeakingAndSpeechesTitle}
          placeholder='Title'
        />
         <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
          onChangeText={setPublicSpeakingAndSpeechesLink}
          value={publicSpeakingAndSpeechesLink}
          placeholder='Video Link'
        />
         <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
          onChangeText={setPublicSpeakingAndSpeechesPDF}
          value={publicSpeakingAndSpeechesPDF}
          placeholder='PDF Link'
        />
          {publicSpeakingAndSpeechesQuestions.map(({ question, options }, index) => (
          <View key={index}>

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
          onChangeText={(text) => {
            const updatedQuestions = [...publicSpeakingAndSpeechesQuestions];
            updatedQuestions[index].question = text;
            setPublicSpeakingAndSpeechesQuestions(updatedQuestions);
          }}
          value={question}
          placeholder={`Question ${index + 1}`}
        />
        {options.map((option, optionIndex) => (
          <TextInput
            key={optionIndex}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            onChangeText={(text) => {
              const updatedQuestions = [...publicSpeakingAndSpeechesQuestions];
              updatedQuestions[index].options[optionIndex] = text;
              setPublicSpeakingAndSpeechesQuestions(updatedQuestions);
            }}
            value={option}
            placeholder={`Option ${optionIndex + 1}`}
          />
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
    buttonText: {
        textAlign: 'center',
        fontWeight: '700',
        color: 'black',
        fontSize: 16,
    },
    titleText: {
        textAlign: 'center',
        fontWeight: '500',
        color: 'black',
        fontSize: 16,
        marginBottom: 8,
        marginTop: 10
    },
  });
