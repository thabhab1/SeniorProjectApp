// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

//add new user to firestore database
exports.store = functions.https.onRequest((request, response) => {
    const db = admin.firestore();
    const user = {
      userID: 'bobo',
      token: 'dsafdsafdsafdsafasf'
    };
    db.collection('Docs').add(user).then(() => {
        console.log('added user');
        response.send('Added user');
    }, (error) => {
        console.error('Failed to add user');
        console.error(error);
        response.send('Fail');
    });
});
  


    