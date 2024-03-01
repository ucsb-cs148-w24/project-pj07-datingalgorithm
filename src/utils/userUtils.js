import { db } from '../firebase'; // Adjust the import path as necessary
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

export const fetchUserName = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);
  if (userDocSnap.exists()) {
    return userDocSnap.data().name; // Assuming the field for the user's name is 'name'
  } else {
    console.log("No such user!");
    return "Unknown User"; // Fallback name
  }
};

export const fetchUserIdByEmail = async (email) => {
  const usersRef = collection(db, "users"); 
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    return userDoc.id;
  } else {
    console.log("No user found with that email");
    return null;
  }
}

export const fetchUserProfilePicById = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);
  if (userDocSnap.exists()) {
    return userDocSnap.data().picUrl; // Assuming the field for the user's profile picture is 'profilePic'
  } else {
    console.log("No such user!");
    return "https://example.com/default-profile-pic"; // Fallback profile picture
  }
};

export const getAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}