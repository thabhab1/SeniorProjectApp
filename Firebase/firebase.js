import {initializeApp} from 'firebase/app';
import firebase from 'firebase/compat/app';
const firebaseConfig={
        apiKey: "AIzaSyC7HeFw1ktwRydI9X1dL05BCRdYG7tsNpE",
  authDomain: "senior-design-app-d03f1.firebaseapp.com",
  projectId: "senior-design-app-d03f1",
  storageBucket: "senior-design-app-d03f1.appspot.com",
  messagingSenderId: "392209717756",
  appId: "1:392209717756:web:3e14864bb43ae100773a79"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export{firebase}