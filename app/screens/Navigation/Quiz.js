import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const Quiz = () => {

  // define the quiz questions and possible answers
  const quiz = [
    {
      question: 'What is the capital of France?',
      options: [
        {label: 'Paris', value: 0},
        {label: 'Rome', value: 1},
        {label: 'Madrid', value: 2},
        {label: 'Berlin', value: 3},
      ],
      answer: 0, // the index of the correct answer in the options array
    },
    {
      question: 'What is the largest country in the world by land area?',
      options: [
        {label: 'Russia', value: 0},
        {label: 'China', value: 1},
        {label: 'United States', value: 2},
        {label: 'Brazil', value: 3},
      ],
      answer: 0,
    },
    // add more quiz questions here
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0); // the index of the current question being displayed
  const [score, setScore] = useState(0); // the user's score

  const handleAnswer = (value) => {
    if (value === quiz[currentQuestion].answer) {
      setScore(score + 1); // increase the user's score if the answer is correct
    }
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1); // move to the next question
    } else {
      // quiz is complete, show the user's score
      alert(`Quiz complete! You scored ${score}/${quiz.length}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{quiz[currentQuestion].question}</Text>
      <RadioForm>
        {quiz[currentQuestion].options.map((option, index) => (
          <RadioButton key={index}>
            <RadioButtonInput
              obj={option}
              index={index}
              isSelected={false}
              onPress={(value) => handleAnswer(value)}
            />
            <RadioButtonLabel
              obj={option}
              index={index}
              labelHorizontal={true}
              onPress={(value) => handleAnswer(value)}
            />
          </RadioButton>
        ))}
      </RadioForm>
      <TouchableOpacity style={styles.button} onPress={() => handleAnswer()}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Quiz;