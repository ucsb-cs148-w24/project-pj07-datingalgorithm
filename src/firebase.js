import firebase from 'firebase'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVz6ewF6axN18sp7wZuRZ0NLNMAWcytm4",
    authDomain: "blindly-cs148.firebaseapp.com",
    projectId: "blindly-cs148",
    storageBucket: "blindly-cs148.appspot.com",
    messagingSenderId: "736347059997",
    appId: "1:736347059997:web:193a62638d692ba74bd3f4"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;