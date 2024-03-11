import React, {useEffect, useState} from "react";
import TinderCard from "react-tinder-card";
import "./Cards.css";
import { db, auth} from '../firebase';
import Header from '../Header';
import {collection, onSnapshot, query, where, getDocs, doc, getDoc, addDoc, updateDoc, arrayUnion, setDoc, arrayRemove} from "firebase/firestore";
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Added import for useNavigate
import {getAge} from '../utils/userUtils';
import "./ChatButton.css";


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
                const filteredPeople = querySnapshot.docs.map(doc => doc.data()).filter(person => !potentialMatchesData.matched.includes(person.email));
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
        // only if user isn't already in the matched array

        const userADoc = doc(db, 'potentialMatches', userAId);

        const userADocument = await getDoc(userADoc);
        if (userADocument.exists()) {
            const userAData = userADocument.data();
            if (userAData.matched && userAData.matched.includes(userBId)) {
                return;
            }
        }
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

    const goToProfile = () => {
        navigate('/makeProfile'); // Assuming your chat screen route is '/chat'
    };


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
                            {"90%"}
                        </p>
                        <p className="bio" style={{fontSize: 26}}> Bio: {person.bio}</p>
                        <p>{person.tagline}</p>
                        <p style={{fontSize: 50, position: "absolute", bottom: 0, left: 25}}> Age: {getAge(person.birthday)}</p>
                    </div>
                </TinderCard>
            ))}
            </div>
            <button onClick={goToChatScreen} className="goToChatButton">
                Go to Chat
            </button>
            <button onClick={goToProfile} className="goToProfileButton">
                Edit Profile
            </button>
        </div>
    )
    }
    export default Cards;


