import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { db } from './firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { addDoc, collection } from '@firebase/firestore';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getDoc, doc } from '@firebase/firestore';

// Get a reference to the Firebase storage service
const storage = getStorage();

// Create a reference to the "Media Training" folder
const mediaTrainingRef = ref(storage, 'Media Training');

const MediaTrainingUpload = async (filePath) => {
  try {
    const fileRef = ref(mediaTrainingRef, 'filename.pdf');
    await uploadBytes(fileRef, filePath);
    console.log('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading file: ', error);
  }
};

const mediaTrainingForPublicSafetyRef = ref(storage, 'Media Training For Public Safety');

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

const PublicSpeakingRef = ref(storage, 'Public Speaking');

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
      const fileRef = ref(PublicSpeakingAndSpeechesRef, 'filename.pdf');
      await uploadBytes(fileRef, blob);
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };

function Quiz(props) {

  const [mediaTrainingQuestion, setMediaTrainingQuestion] = useState('');
  const [mediaTrainingAnswer, setMediaTrainingAnswer] = useState('');
  const [mediaTrainingLink, setMediaTrainingLink] = useState('');
  const [mediaTrainingPDF, setMediaTrainingPDF] = useState('');

  const [mediaTrainingForPublicSafetyQuestion, setMediaTrainingForPublicSafetyQuestion] = useState('');
  const [mediaTrainingForPublicSafetyAnswer, setMediaTrainingForPublicSafetyAnswer] = useState('');
  const [mediaTrainingForPublicSafetyLink, setMediaTrainingForPublicSafetyLink] = useState ('');
  const [mediaTrainingForPublicSafetyPDF, setMediaTrainingForPublicSafetyPDF] = useState ('');

  const [publicSpeakingQuestion, setPublicSpeakingQuestion] = useState('');
  const [publicSpeakingAnswer, setPublicSpeakingAnswer] = useState('');
  const [publicSpeakingLink, setPublicSpeakingLink] = useState('');
  const [publicSpeakingPDF, setPublicSpeakingPDF] = useState('');

  const [publicSpeakingAndSpeechesQuestion, setPublicSpeakingAndSpeechesQuestion] = useState('');
  const [publicSpeakingAndSpeechesAnswer, setPublicSpeakingAndSpeechesAnswer] = useState('');
  const [publicSpeakingAndSpeechesLink, setPublicSpeakingAndSpeechesLink] = useState('');
  const [publicSpeakingAndSpeechesPDF, setPublicSpeakingAndSpeechesPDF] = useState('');

  const handleMediaTrainingSubmit = async () => {
    try {
      await addDoc(collection(db, 'MediaTraining'), {
        question: mediaTrainingQuestion,
        answer: mediaTrainingAnswer,
        link: mediaTrainingLink,
        pdf: mediaTrainingPDF,
      });
      await MediaTrainingUpload(mediaTrainingPDF);
      setMediaTrainingQuestion('');
      setMediaTrainingAnswer('');
      setMediaTrainingLink('');
      setMediaTrainingPDF('');
    } catch (error) {
        console.error('Error adding document: ', error);
    }
  };

  

  const handleMediaTrainingForPublicSafetySubmit = async () => {
    try {
      await addDoc(collection(db, 'MediaTrainingForPublicSafety'), {
        question: mediaTrainingForPublicSafetyQuestion,
        answer: mediaTrainingForPublicSafetyAnswer,
        link: mediaTrainingForPublicSafetyLink,
        pdf: mediaTrainingForPublicSafetyPDF
      });
      await MediaTrainingForPublicSafetyUpload(mediaTrainingForPublicSafetyPDF);
      setMediaTrainingForPublicSafetyQuestion('');
      setMediaTrainingForPublicSafetyAnswer('');
      setMediaTrainingForPublicSafetyLink('');
      setMediaTrainingForPublicSafetyPDF('');
    } catch (error) {
        console.error('Error adding document: ', error);
    }
  };

  const handlePublicSpeakingSubmit = async () => {
    try {
      await addDoc(collection(db, 'PublicSpeaking'), {
        question: publicSpeakingQuestion,
        answer: publicSpeakingAnswer,
        link: publicSpeakingLink,
        pdf: publicSpeakingPDF
      });
      await PublicSpeakingUpload(publicSpeakingPDF);
      setPublicSpeakingQuestion('');
      setPublicSpeakingAnswer('');
      setPublicSpeakingLink('');
      setPublicSpeakingPDF('');
    } catch (error) {
        console.error('Error adding document: ', error);
    }
  };

  const handlePublicSpeakingAndSpeechesSubmit = async () => {
    try {
      await addDoc(collection(db, 'PublicSpeakingAndSpeeches'), {
        question: publicSpeakingAndSpeechesQuestion,
        answer: publicSpeakingAndSpeechesAnswer,
        link: publicSpeakingAndSpeechesLink,
        pdf: publicSpeakingAndSpeechesPDF
      });
      await PublicSpeakingAndSpeechesUpload(publicSpeakingAndSpeechesPDF);
      setPublicSpeakingAndSpeechesQuestion('');
      setPublicSpeakingAndSpeechesAnswer('');
      setPublicSpeakingAndSpeechesLink('');
      setPublicSpeakingAndSpeechesPDF('');
    } catch (error) {
        console.error('Error adding document: ', error);
    }
  };
  

  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Layout style={{ flex: 1, padding: 16 }}>
      <ScrollView>

         {/* 
         Media Training
        */}
        <View style={{ marginBottom: 16 }}>
          <Text style = {styles.titleText}>Media Training Questions</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            onChangeText={setMediaTrainingQuestion}
            value={mediaTrainingQuestion}
            placeholder='Question'
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            onChangeText={setMediaTrainingAnswer}
            value={mediaTrainingAnswer}
            placeholder='Answer'
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
          <TouchableOpacity style={styles.button} onPress={handleMediaTrainingSubmit}>
            <Text style={styles.buttonText}>Create Module</Text>
          </TouchableOpacity>
        </View>
        
         {/* 
         Media Training For Public Safety
        */}
        <View style={{ marginBottom: 16 }}>
          
          <Text style = {styles.titleText}>Media Training For Public Safety Questions</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            onChangeText={setMediaTrainingForPublicSafetyQuestion}
            value={mediaTrainingForPublicSafetyQuestion}
            placeholder='Question'
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            onChangeText={setMediaTrainingForPublicSafetyAnswer}
            value={mediaTrainingForPublicSafetyAnswer}
            placeholder='Answer'
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
          <TouchableOpacity style={styles.button} onPress={handleMediaTrainingForPublicSafetySubmit}>
            <Text style={styles.buttonText}>Create Module</Text>
          </TouchableOpacity>
        </View>

        {/* 
         Public Speaking
        */}
         <View style={{ marginBottom: 16 }}>
          
          <Text style = {styles.titleText}>Public Speaking Questions</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            onChangeText={setPublicSpeakingQuestion}
            value={publicSpeakingQuestion}
            placeholder='Question'
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            onChangeText={setPublicSpeakingAnswer}
            value={publicSpeakingAnswer}
            placeholder='Answer'
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
          <TouchableOpacity style={styles.button} onPress={handlePublicSpeakingSubmit}>
            <Text style={styles.buttonText}>Create Module</Text>
          </TouchableOpacity>
        </View>

         {/* 
         Public Speaking And Speeches
        */}
         <View style={{ marginBottom: 16 }}>
          
          <Text style = {styles.titleText}>Public Speaking And Speeches Questions</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            onChangeText={setPublicSpeakingAndSpeechesQuestion}
            value={publicSpeakingAndSpeechesQuestion}
            placeholder='Question'
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            onChangeText={setPublicSpeakingAndSpeechesAnswer}
            value={publicSpeakingAndSpeechesAnswer}
            placeholder='Answer'
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
          <TouchableOpacity style={styles.button} onPress={handlePublicSpeakingAndSpeechesSubmit}>
            <Text style={styles.buttonText}>Create Module</Text>
          </TouchableOpacity>
        </View>
        
    </ScrollView>
  </Layout>
</ApplicationProvider>

);
}

export default Quiz;

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
