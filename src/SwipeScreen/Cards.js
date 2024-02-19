import React, {useEffect, useState} from "react";
import TinderCard from "react-tinder-card";
import "./Cards.css";
import { db, auth} from '../firebase';
import Header from '../Header';
import {collection, onSnapshot, query, where, getDocs, doc, getDoc, addDoc, updateDoc, arrayUnion, setDoc, arrayRemove} from "firebase/firestore";
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Added import for useNavigate
import "./ChatButton.css";
const Cards = () =>{
    const [people, setPeople] = useState([]);
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
        if (user) { // Check if user is loaded
            const profilesQuery = query(collection(db, "users"));
            onSnapshot(profilesQuery, (querySnapshot) => {
                setPeople(querySnapshot.docs.map(doc => doc.data()));
            });
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
        // Add user B to the "likes" array within user A's document in the potentialMatches collection
        const userADoc = doc(db, 'potentialMatches', userAId);
        await setDoc(userADoc, {
          likes: arrayUnion(userBId),
        }, { merge: true });
      
        // Check if user A is also in user B's likes array
        const userBDoc = doc(db, 'potentialMatches', userBId);
        const userBDocument = await getDoc(userBDoc);
        if (userBDocument.exists()) {
          const userBData = userBDocument.data();
          if (userBData.likes && userBData.likes.includes(userAId)) {
            // Add both users to the "matched" array
            await updateDoc(userADoc, {
              matched: arrayUnion(userBId),
            });
            await updateDoc(userBDoc, {
              matched: arrayUnion(userAId),
            });

            // remove user from likes array
            await updateDoc(userADoc, {
                likes: arrayRemove(userBId),
            });
            await updateDoc(userBDoc, {
                likes: arrayRemove(userAId),
            });
      
            // Create a new chat in the "chats" collection
            const newChat = {
                // the new chat contains an array caled users with the two user ids
                users: [userAId, userBId],

            };
            const chatDocRef = await addDoc(collection(db, 'chats'), newChat);
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

    return (
        <div className="cards">
            <Header/>
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
                        <p style={{fontSize: 150, position: "absolute", bottom: 40, left: 300}}>
                            {"90%"}
                        </p>
                    </div>
                </TinderCard>
            ))}
            <button onClick={goToChatScreen} className="goToChatButton">Go to Chat</button>
        </div>
    )
}
export default Cards;