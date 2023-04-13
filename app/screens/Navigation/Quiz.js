import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {getAuth} from 'firebase/auth'
import {addDoc, collection, doc, getDoc,getDocs, query, querySnapshot, where, updateDoc} from "firebase/firestore";
import { db } from './firebase';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MyContext from './MyContext';


function Quiz(props) {
  data = props.route.params.item
  q1 = data.questions[0]
  q2 = data.questions[1]
  q3 = data.questions[2]

  const { notificationVar, setnotificationVar } = useContext(MyContext)

console.log(data.title);

  const auth = getAuth();

  const [type, setType] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [to, setTo] = useState("")
  const message = new Map([
    ['subject', ''],
    ['html', '']
  ])
  message.set('subject', data.title);
  message.set('html',`Congratulations, you have successfully completed ${data.title}`);

  useEffect(() => {
    async function fetchType() {
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", auth.currentUser.email))
      );
      if (querySnapshot.docs.length > 0) {
        const userData = querySnapshot.docs[0].data();
        setType(userData.accountType);
        setUserInfo(userData);
        console.log("super poop");
    
        const docRef = doc(db, "users", querySnapshot.docs[0].id);
        const docData = await getDoc(docRef);
        const completedArray = docData.get("completed");
        const updatedCompletedArray = [data.title, ...completedArray];
    
        await updateDoc(docRef, { completed: updatedCompletedArray });
        console.log(`Title '${data.title}' added to 'completed' array for user '${userData.email}'`);
        // Add Firestore document with a reference to the uploaded file
        
        // If notifications are set to true, send an email, otherwise don't
        if(notificationVar == true) {
          console.log("notifications are enabled")
        }
        else {
          console.log("notifications are disabled")
        
        }
        if(notificationVar == true){
          await addDoc(collection(db, 'email'), {
            to: auth.currentUser.email,
            message: {
              subject: 'Module Completion!',
              html: `Congratulations, you have successfully completed ${data.title}.`,
            },
          });
        }
        

      } else {
        console.log("User not found");
      }

    
    }
    
    fetchType();
  }, []);

  // define the quiz questions and possible answers
  const quiz = [
    {
      question: q1.question,
      options: [
        {label: q1.options[0], value: 0},
        {label: q1.options[1], value: 1},
        {label: q1.options[2], value: 2},
        {label: q1.options[3], value: 3},
      ],
      
      answer: parseInt(q1.correctAnswer), // the index of the correct answer in the options array
    },
    {
      question: q2.question,
      options: [
        {label: q2.options[0], value: 0},
        {label: q2.options[1], value: 1},
        {label: q2.options[2], value: 2},
        {label: q2.options[3], value: 3},
      ],
      answer: parseInt(q2.correctAnswer),
    },
    {
      question: q3.question,
      options: [
        {label: q3.options[0], value: 0},
        {label: q3.options[1], value: 1},
        {label: q3.options[2], value: 2},
        {label: q3.options[3], value: 3},
      ],
      answer: parseInt(q3.correctAnswer),
    },
    // add more quiz questions here
  ];
// the index of the current question being displayed
  const [currentQuestion, setCurrentQuestion] = useState(0); 
  // the user's score
  const [score, setScore] = useState(0); 
  // the index of the selected answer
  const [selectedAnswer, setSelectedAnswer] = useState(null); 

  const handleAnswer = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === quiz[currentQuestion].answer) {
         // increase the user's score if the answer is correct
        setScore(score + 1);
      }
      // move to the next question
      if (currentQuestion < quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1); 
        setSelectedAnswer(null); // clear the selected answer
      } else {
        // update the user's score before displaying the results
        setScore(score + (selectedAnswer === quiz[currentQuestion].answer ? 1 : 0));

        // quiz is complete, show the user's score
        alert(`Quiz complete! You scored ${score + (selectedAnswer === quiz[currentQuestion].answer ? 1 : 0)}/${quiz.length}`);
        props.navigation.goBack();
      }
    }
  };

 
  return (
    <View style={styles.container}>
      <Text style={styles.sectionText}>{quiz[currentQuestion].question}</Text>
      <RadioForm>
        {quiz[currentQuestion].options.map((option, index) => (
          <RadioButton style={styles.answerSelectionButton} key={index}>
            <RadioButtonInput
              
              obj={option}
              index={index}
              isSelected={selectedAnswer === index}
              onPress={() => setSelectedAnswer(index)}
            />
            <RadioButtonLabel
              labelStyle={{
                fontFamily: 'Oswald-Regular',
                fontSize: 18,
                paddingBottom: 0,
                marginBottom: 0}}
              obj={option}
              index={index}
              labelHorizontal={true}
              onPress={() => setSelectedAnswer(index)}
            />
          </RadioButton>
        ))}
      </RadioForm>
      <TouchableOpacity style={styles.inputButton} onPress={handleAnswer}>
        <Text style={styles.inputTextStyle}>Next</Text>
      </TouchableOpacity>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: 'white',

  },
  imageStyle: {
      height: 200,
      width: 200,
      marginBottom: 30,
      alignSelf: 'center',
  },
  answerSelectionButton: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: 'black',
    shadowOffset: {height: 2, width: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3, 
  },
  inputButton: {
    backgroundColor: 'black',
    paddingTop: 6,
    paddingBottom: 10,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 40,
    shadowColor: 'black',
    color: 'white',
    shadowOffset: {height: 2, width: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
    width: '65%',
    alignSelf: 'center',
    fontFamily: 'Oswald-Regular'

  },
  inputTextStyle: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'Oswald-Regular',
    letterSpacing: 1.5,
    color: 'white',
    fontWeight: ''

  },
  sectionTitle: {
      fontSize: 28,
      fontWeight: '500',
      color: '#333',
      marginBottom: 30,

  },
  sectionText: {
    fontSize: 24,
    marginBottom: 24,
    fontFamily: 'Oswald-Regular',
  },
  userInput: {
      borderBottomColor: '#ccc',
      borderBottomWidth: 2,
      marginBottom: 25,
      
  },

})

export default Quiz;