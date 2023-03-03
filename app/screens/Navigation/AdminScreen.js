import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { db } from './firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { addDoc, collection } from '@firebase/firestore';
import { StyleSheet } from 'react-native';

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
      setMediaTrainingQuestion('');
      setMediaTrainingAnswer('');
      setMediaTrainingLink('');
      setMediaTrainingPDF('');
    } catch (error) {
        console.error('Error adding document: ', error);
    }
  };

  const handleMediaTrainingForPublicSpeakingSubmit = async () => {
    try {
      await addDoc(collection(db, 'MediaTrainingForPublicSafety'), {
        question: mediaTrainingForPublicSafetyQuestion,
        answer: mediaTrainingForPublicSafetyAnswer,
        link: mediaTrainingForPublicSafetyLink,
        pdf: mediaTrainingForPublicSafetyPDF
      });
      setMediaTrainingForPublicSafetyQuestion('');
      setMediaTrainingForPublicSafetyAnswer('');
      setMediaTrainingForPublicSafetyLink('');
      setMediaTrainingForPublicSafetyLink('');
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
          <Text category='h5'>Media Training Questions</Text>
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
          <Button title='Create Module' onPress={handleMediaTrainingSubmit} />
        </View>
        
         {/* 
         Media Training For Public Safety
        */}
        <View style={{ marginBottom: 16 }}>
          
          <Text category='h5'>Media Training For Public Safety Questions</Text>
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
          <Button title='Create Module' onPress={handleMediaTrainingForPublicSpeakingSubmit} />
        </View>

        {/* 
         Public Speaking
        */}
         <View style={{ marginBottom: 16 }}>
          
          <Text category='h5'>Public Speaking Questions</Text>
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
          <Button title='Create Module' onPress={handlePublicSpeakingSubmit}/>
        </View>

         {/* 
         Public Speaking And Speeches
        */}
         <View style={{ marginBottom: 16 }}>
          
          <Text category='h5'>Public Speaking And Speeches Questions</Text>
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
          <Button title='Create Module' onPress={handlePublicSpeakingAndSpeechesSubmit}/>
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
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
