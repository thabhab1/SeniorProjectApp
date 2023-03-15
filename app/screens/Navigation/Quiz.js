import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

function Quiz(props) {
  console.log(props)
  data = props.route.params.item
  q1 = data.questions[0]
  q2 = data.questions[1]
  q3 = data.questions[2]

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
      answer: 0, // the index of the correct answer in the options array
    },
    {
      question: q2.question,
      options: [
        {label: q2.options[0], value: 0},
        {label: q2.options[1], value: 1},
        {label: q2.options[2], value: 2},
        {label: q2.options[3], value: 3},
      ],
      answer: 0,
    },
    {
      question: q3.question,
      options: [
        {label: q3.options[0], value: 0},
        {label: q3.options[1], value: 1},
        {label: q3.options[2], value: 2},
        {label: q3.options[3], value: 3},
      ],
      answer: 0,
    },
    // add more quiz questions here
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0); // the index of the current question being displayed
  const [score, setScore] = useState(0); // the user's score
  const [selectedAnswer, setSelectedAnswer] = useState(null); // the index of the selected answer

  const handleAnswer = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === quiz[currentQuestion].answer) {
        setScore(score + 1); // increase the user's score if the answer is correct
      }
      if (currentQuestion < quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1); // move to the next question
        setSelectedAnswer(null); // clear the selected answer
      } else {
        // quiz is complete, show the user's score
        alert(`Quiz complete! You scored ${score}/${quiz.length}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputTextStyle}>{quiz[currentQuestion].question}</Text>
      <RadioForm>
        {quiz[currentQuestion].options.map((option, index) => (
          <RadioButton style={styles.inputButton} key={index}>
            <RadioButtonInput
              obj={option}
              index={index}
              isSelected={selectedAnswer === index}
              onPress={() => setSelectedAnswer(index)}
            />
            <RadioButtonLabel
              style={styles.inputButton}
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
  inputButton: {
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
  inputTextStyle: {
      textAlign: 'center',
      fontWeight: '700',
      color: 'black',
      fontSize: 16,
  },
  sectionTitle: {
      fontSize: 28,
      fontWeight: '500',
      color: '#333',
      marginBottom: 30,

  },
  userInput: {
      borderBottomColor: '#ccc',
      borderBottomWidth: 2,
      marginBottom: 25,
      
  },
  
  


})

export default Quiz;