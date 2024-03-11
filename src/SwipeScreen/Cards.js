import React, {useEffect, useState} from "react";
import TinderCard from "react-tinder-card";
import "./Cards.css";
import { db, auth} from '../firebase';
import Header from '../Header';
import {collection, onSnapshot, query, where, getDocs, doc, getDoc, addDoc, updateDoc, arrayUnion, setDoc, arrayRemove} from "firebase/firestore";
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Added import for useNavigate
import {getAge, getCompatabilityScore} from '../utils/userUtils';
import "./ChatButton.css";


// function getAge(dateString) {
//     var today = new Date();
//     var birthDate = new Date(dateString);
//     var age = today.getFullYear() - birthDate.getFullYear();
//     var m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//     }
//     return age;
// }

const Cards = () =>{
    const [people, setPeople] = useState([]);
    const [matches, setMatches] = useState([]);
    const [user, setUser] = useState(null); // Add state to track the current user
    const [userChats, setUserChats] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    // UseEffect to listen for auth state changes and set the user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
      
        return () => {
          if (typeof unsubscribe === 'function') {
            unsubscribe();
          }
        };
      }, []);

    // Update useEffect hooks to include user in their dependency arrays
    useEffect(() => {
        
        const getProfiles = async() => {
            // get array of matches users from potentialMatches collection
            const potentialMatchesDoc = doc(db, 'potentialMatches', user.email);

            const potentialMatchesDoc2 = await getDoc(potentialMatchesDoc);
            const potentialMatchesData = potentialMatchesDoc2.data();

            console.log("potential matches", potentialMatchesData.matched);

            setMatches(potentialMatchesData.matched);
            
            const profilesQuery = query(collection(db, "users"));

            onSnapshot(profilesQuery, (querySnapshot) => {

                // setPeople(querySnapshot.docs.map(doc => doc.data()));

                // only include other users who the current user isn't already matched with
                // wait until the setMatches is run
                // setPeople(querySnapshot.docs.map(doc => doc.data()).filter(profile => !matches.includes(profile.email)));

                console.log("matches", matches);
                const filteredPeople = querySnapshot.docs.map(doc => doc.data()).filter(person => !potentialMatchesData.matched.includes(person.email) && !potentialMatchesData.newMatches.includes(person.email) && !potentialMatchesData.likes.includes(person.email) && person.email !== user.email);
                console.log("filtered people", filteredPeople);
                setPeople(filteredPeople);
            });
        }

        if (user) { // Check if user is loaded
            getProfiles();
        }
    }, [db, user]); // Include user in dependency array

    useEffect(() => {
        if (user) { // Check if user is loaded
            const usersQuery = query(collection(db, 'chats'), where('users', 'array-contains', user.email));
            onSnapshot(usersQuery, snapshot => {
                setUserChats(snapshot.docs);
            });
        }
    }, [db, user]); // Include user in dependency array



    // Function to handle swiping action
    const handleSwipe = async (userAId, userBId) => {
        // if user A and user B are already matched, return
        if (userAId === userBId) {
            return;
        }


        // Add user B to the "likes" array within user A's document in the potentialMatches collection
        // if user B isn't in user A's likes array already

        const userADoc = doc(db, 'potentialMatches', userAId);
        const userADocument = await getDoc(userADoc);
        if (userADocument.exists()) {
            const userAData = userADocument.data();

            if (userAData.likes && !userAData.likes.includes(userBId)) {
                await setDoc(userADoc, {
                    likes: arrayUnion(userBId),
                }, { merge: true }
                );
            }
        }
      
        // Check if user A is also in user B's likes array
        const userBDoc = doc(db, 'potentialMatches', userBId);
        const userBDocument = await getDoc(userBDoc);
        if (userBDocument.exists()) {
          const userBData = userBDocument.data();
          if (userBData.likes && userBData.likes.includes(userAId)) {
            // Add both users to the "matched" array
            await updateDoc(userADoc, {
              newMatches: arrayUnion(userBId),
            });
            await updateDoc(userBDoc, {
              newMatches: arrayUnion(userAId),
            });

            // remove user from likes array
            await updateDoc(userADoc, {
                likes: arrayRemove(userBId),
            });
            await updateDoc(userBDoc, {
                likes: arrayRemove(userAId),
            });
      
            
          }
        }
      };


    const onSwipe = async (direction, personEmail) => {
        if (direction === "right"){
            console.log("swiped right");
            // handle swipe between user email and other email
            handleSwipe(user.email, personEmail);
        }
        else if (direction === "left"){
            console.log("swiped left");
        }
    }

    const goToChatScreen = () => {
        navigate('/chats'); // Assuming your chat screen route is '/chat'
    };

    const goToProfile = () => {
        navigate('/makeProfile'); // Assuming your chat screen route is '/chat'
    };

    const getUserData = async (userName) => {
        const userDocRef = doc(db, "users", userName);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            console.log("No such user!");
            return null;
        }
    }


    return (
        <div>
        <Header/>
        <div className="cards"> 
            {people.map(person => (
                <TinderCard
                    className="swipe"
                    key={person.name}
                    preventSwipe={["up", "down"]}
                    onSwipe={(dir) => onSwipe(dir, person.email)}
                >
                    <div
                    className="card"
                    style = {{backgroundImage: `url(${person.picUrl})`}}
                    >
                    </div>
                    <div
                        className="content"
                    >
                        <h3 style={{fontSize: 50}}>
                            {person.name}
                        </h3>
                        <p>{person.tagline}</p>
                        <p className="match_percent" style={{fontSize: 150}}>
                            {getCompatabilityScore(getUserData(user.uid), person) + "%"}
                        </p>
                        <p className="bio" style={{fontSize: 26}}> Bio: {person.bio}</p>
                        <p>{person.tagline}</p>
                        <p style={{fontSize: 50, position: "absolute", bottom: 0, left: 25}}> Age: {getAge(person.birthday)}</p>
                    </div>
                </TinderCard>
            ))}
            </div>
            <button onClick={goToChatScreen} className="goToChatButton">Go to Chat</button>
        </div>
    )
    }
    export default Cards;


