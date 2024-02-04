import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVz6ewF6axN18sp7wZuRZ0NLNMAWcytm4",
  authDomain: "blindly-cs148.firebaseapp.com",
  projectId: "blindly-cs148",
  storageBucket: "blindly-cs148.appspot.com",
  messagingSenderId: "736347059997",
  appId: "1:736347059997:web:193a62638d692ba74bd3f4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, signInAnonymously };