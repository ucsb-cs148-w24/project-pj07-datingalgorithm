import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVz6ewF6axN18sp7wZuRZ0NLNMAWcytm4",
  authDomain: "blindly-cs148.firebaseapp.com",
  projectId: "blindly-cs148",
  storageBucket: "blindly-cs148.appspot.com",
  messagingSenderId: "736347059997",
  appId: "1:736347059997:web:193a62638d692ba74bd3f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Force account selection on every sign-in attempt
provider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      if (user.email.endsWith("@ucsb.edu")) {
        console.log("Sign-in successful", result);

        // Store user data in Firestore
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          picUrl: user.photoURL,
          // Add other user data as needed
        }, { merge: true });

        return result;
      } else {
        await signOut(auth);
        throw new Error("Only UCSB students are accepted");
      }
    })
    .catch((error) => {
      console.error("Error during sign-in:", error);
      throw error;
    });
};

export const signOutUser = () => {
  return signOut(auth)
    .then(() => {
      console.log("Sign-out successful");
    })
    .catch((error) => {
      console.error("Error during sign-out:", error);
      throw error;
    });
};

// Export db, auth, and provider for use in other parts of the application
export { db, auth, provider };
