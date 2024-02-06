import React, {useEffect, useState} from "react";
import TinderCard from "react-tinder-card";
import "./Cards.css";
import { db, auth, signInAnonymously } from './firebase';
import Header from './Header';
import {collection, onSnapshot, query, where, getDocs, doc, getDoc, addDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged} from 'firebase/auth';

const Cards = () =>{
    const [people, setPeople] = useState([]);

    const profilesQuery = query(collection(db, "users"));
    const querySnapshot =  getDocs(profilesQuery);

    useEffect(() => onSnapshot(profilesQuery, (querySnapshot) => {
        setPeople(querySnapshot.docs.map(doc => doc.data()))
    }
    ), [db]);

    const user = getAuth().currentUser;

    const [userChats, setUserChats] = useState([])

    console.log(user.email);

    const usersQuery = query(collection(db, 'chats'), where('users', 'array-contains', user?.email))

    

    useEffect(() => onSnapshot(usersQuery, snapshot=>{
        setUserChats(snapshot.docs)
      })
    , [db]);

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
        </div>
    )
}


export default Cards;