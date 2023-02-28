import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { db } from './firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { addDoc, collection } from '@firebase/firestore';

function Quiz(props) {
  
  const [mediaTrainingQuestion, setMediaTrainingQuestion] = useState('');
  const [mediaTrainingAnswer, setMediaTrainingAnswer] = useState('');
  const [mediaTrainingForPublicSpeakingQuestion, setMediaTrainingForPublicSpeakingQuestion] = useState('');
  const [mediaTrainingForPublicSpeakingAnswer, setMediaTrainingForPublicSpeakingAnswer] = useState('');
  const [publicSpeakingQuestion, setPublicSpeakingQuestion] = useState('');
  const [publicSpeakingAnswer, setPublicSpeakingAnswer] = useState('');
  const [publicSpeakingAndSpeechesQuestion, setPublicSpeakingAndSpeechesQuestion] = useState('');
  const [publicSpeakingAndSpeechesAnswer, setPublicSpeakingAndSpeechesAnswer] = useState('');


  const handleMediaTrainingSubmit = async () => {
    try {
      await addDoc(collection(db, 'MediaTraining'), {
        question: mediaTrainingQuestion,
        answer: mediaTrainingAnswer,
      });
      setMediaTrainingQuestion('');
      setMediaTrainingAnswer('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleMediaTrainingForPublicSpeakingSubmit = async () => {
    try {
      await addDoc(collection(db, 'MediaTrainingForPublicSpeaking'), {
        question: mediaTrainingForPublicSpeakingQuestion,
        answer: mediaTrainingForPublicSpeakingAnswer,
      });
      setMediaTrainingForPublicSpeakingQuestion('');
      setMediaTrainingForPublicSpeakingAnswer('');
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublicSpeakingSubmit = async () => {
    try {
      await addDoc(collection(db, 'PublicSpeaking'), {
        question: publicSpeakingQuestion,
        answer: publicSpeakingAnswer,
      });
      setPublicSpeakingQuestion('');
      setPublicSpeakingAnswer('');
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublicSpeakingAndSpeechesSubmit = async () => {
    try {
      await addDoc(collection(db, 'PublicSpeakingAndSpeeches'), {
        question: publicSpeakingAndSpeechesQuestion,
        answer: publicSpeakingAndSpeechesAnswer,
      });
      setPublicSpeakingAndSpeechesQuestion('');
      setPublicSpeakingAndSpeechesAnswer('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Layout style={{ flex: 1, padding: 16 }}>
      <ScrollView>
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
          <Button title='Submit' onPress={handleMediaTrainingSubmit} />
        </View>
        
        <View style={{ marginBottom: 16 }}>
          <Text category='h5'>Media Training for Public Speaking Questions</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            onChangeText={setMediaTrainingForPublicSpeakingQuestion}
            value={mediaTrainingForPublicSpeakingQuestion}
            placeholder='Question'
            />
            <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
            onChangeText={setMediaTrainingForPublicSpeakingAnswer}
            value={mediaTrainingForPublicSpeakingAnswer}
            placeholder='Answer'
            />
            <Button title='Submit' onPress={handleMediaTrainingForPublicSpeakingSubmit} />
            </View>
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
      <Button title='Submit' onPress={handlePublicSpeakingSubmit} />
    </View>

    <View style={{ marginBottom: 16 }}>
      <Text category='h5'>Public Speaking and Speeches Questions</Text>
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
      <Button title='Submit' onPress={handlePublicSpeakingAndSpeechesSubmit} />
    </View>
    </ScrollView>
  </Layout>
</ApplicationProvider>

);
}

export default Quiz;
