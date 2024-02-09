import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore and methods for document handling
import { getStorage } from"firebase/storage";

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
const storage = getStorage(app);

// Force account selection on every sign-in attempt
provider.setCustomParameters({
    prompt: 'select_account'
});

export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            if (user.email.endsWith("@ucsb.edu")) {
                const userRef = doc(db, "users", user.uid);

                // Check if user document already exists
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    // User exists, so we might redirect to swiping screen
                    console.log("User already exists, redirecting...");
                    window.location.href = '/swipe'; // Or use your app's routing logic
                } else {
                    // New user, create the document and redirect to profile creation
                    console.log("New user, creating document...");
                    await setDoc(userRef, {
                        email: user.email,
                        picUrl: user.photoURL,
                        // Add other user data as needed
                    }, { merge: true });

                    window.location.href = '/makeProfile'; // Or use your app's routing logic
                }
                return result;
            } else {
                await signOut(auth); // Sign out if not UCSB email
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

export { auth, provider, db, storage };