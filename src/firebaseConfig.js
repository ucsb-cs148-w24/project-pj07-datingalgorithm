import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore and methods for document handling

const firebaseConfig = {
    apiKey: "AIzaSyBVz6ewF6axN18sp7wZuRZ0NLNMAWcytm4",
    authDomain: "blindly-cs148.firebaseapp.com",
    projectId: "blindly-cs148",
    storageBucket: "blindly-cs148.appspot.com",
    messagingSenderId: "736347059997",
    appId: "1:736347059997:web:193a62638d692ba74bd3f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore
const provider = new GoogleAuthProvider();

// Force account selection on every sign-in attempt
provider.setCustomParameters({
    prompt: 'select_account'
});

export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider)
        .then(async (result) => { // Mark function as async to use await inside
            const user = result.user;
            if (user.email.endsWith("@ucsb.edu")) {
                console.log("Sign-in successful", result);

                // Store user data in Firestore
                const userRef = doc(db, "users", user.uid); // Use UID as the document ID
                await setDoc(userRef, {
                    name: user.displayName,
                    email: user.email,
                    picUrl: user.photoURL,
                    // Add other user data as needed
                }, { merge: true }); // Merge ensures that existing data is not overwritten

                return result;
            } else {
                await signOut(auth); // Make sure to await the signOut operation
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

export { auth, provider, db };