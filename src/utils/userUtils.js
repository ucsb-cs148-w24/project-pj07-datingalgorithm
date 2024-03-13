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

export const getCompatabilityScore = (user1, user2) => {

  // console.log('user 2 city:', user2.vacation);
  console.log('user 1 city:', user1.vacation.at(0), 'user 2 city:', user2);

  // create variable number that we can keep inreasing
  // add up the compatability scores for each of the users
  // return that
  let score = 20;

  // gift(1)
  if (user1.gift && user2.gift && user1.gift.at(0) == user2.gift.at(0)) {
    score += 10;
  }

  // hobbies (3)
  if (user1.hobbies && user2.hobbies) {
    user1.hobbies.forEach(hobby1 => {
      user2.hobbies.forEach(hobby2 => {
        if (hobby1 == hobby2) {
          score += 5;
        }
      });
    });
  }


  // icks (3) 
  if (user1.icks && user2.icks) {
    user1.icks.forEach(ick1 => {
      user2.icks.forEach(ick2 => {
        if (ick1 == ick2) {
          score += 5;
        }
      });
    });
  }

  // lovelang (2)
  if (user1.lovelang && user2.lovelang){
    user1.lovelang.forEach(lang1 => {
      user2.lovelang.forEach(lang2 => {
        if (lang1 == lang2) {
          score += 5;
        }
      });
    });
  }

  // priority (3)
  if (user1.priority && user2.priority) {
    user1.priority.forEach(priority1 => {
      user2.priority.forEach(priority2 => {
        if (priority1 == priority2) {
          score += 5;
        }
      });
    });
  }

  // superpower (1)
  if (user1.superpower && user2.superpower && user1.superpower.at(0) == user2.superpower.at(0)) {
    score += 10;
  }

  // vacation
  if (user1.vacation && user2.vacation && user1.vacation.at(0) == user2.vacation.at(0)) {
    score += 15;
  }

  if (score > 100) {
    score = 100;
  }
  return score;
}