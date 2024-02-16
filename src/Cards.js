import React, {useEffect, useState} from "react";
import TinderCard from "react-tinder-card";
import "./Cards.css";
import { db, auth, signInAnonymously } from './firebase';
import Header from './Header';
import {collection, onSnapshot, query, where, getDocs, doc, getDoc, addDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Added import for useNavigate
import "./ChatButton.css";


function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

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
        return () => unsubscribe(); // Cleanup subscription
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

    const chatAlreadyExists = (recEmail) =>{
        return(
        !!userChats.find(
            (chat)=>
            chat.data().users.find((user) => user === recEmail)?.length > 0
        )
        )
    }
    const onSwipe = async (direction, personEmail) => {
        if (direction === "right"){
            // check if current chat already exists
            const exists = chatAlreadyExists(personEmail);
            if (exists){
                console.log("Chat already exists");
                return;
            }
            const docRef = await addDoc(collection(db, "chats"), {
                users: [user?.email, personEmail]
            });
            console.log("You swiped: " + direction + " to " + personEmail + "from" + user?.email);
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
                        <p style={{fontSize: 150, position: "absolute", bottom: 40, left: 250}}>
                            {"90%"}
                        </p>
                        <p style={{fontSize: 30, position: "absolute", bottom: 60, left: 300}}> Bio: {person.bio}</p>
                        <p style={{fontSize: 50, position: "absolute", bottom: 10, left: 10}}> Age: {getAge(person.birthday)}</p>
                    </div>
                </TinderCard>
            ))}
            <button onClick={goToChatScreen} className="goToChatButton">Go to Chat</button>
        </div>
    )
}
export default Cards;