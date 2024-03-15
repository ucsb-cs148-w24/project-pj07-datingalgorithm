import React from 'react'
import {fetchUserIdByEmail} from '../utils/userUtils';
import {db, auth} from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc, updateDoc, addDoc, collection, arrayRemove, arrayUnion } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './newMatches.css';

const NewMatchCard = ({newMatch}) => {
    const [user, loading, error] = useAuthState(auth);
    const [userPic, setUserPic] = useState("");
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        const fetchUserProfilePic = async () => {

            const userID = await fetchUserIdByEmail(newMatch);
            
            console.log("userID: ", userID);
            const docRef = doc(db, "users", userID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setUserPic(data.picUrl);
                setUserName(data.name);
            }
        }

        fetchUserProfilePic();
    }, []);

        // When the user clicks on a new match, add it to the matched array in the potentialMatches collection and remove it from the newMatches array
    // also create a new chat
    // and navigate to the chat screen
    const createNewChat = async (email) => {
        const userDoc = doc(db, 'potentialMatches', user.email);
        const userSnap = await getDoc(userDoc);

        await setDoc(userDoc, {
            newMatches: arrayRemove(email),
            matched: arrayUnion(email),
        }, { merge: true }
        );

        // update the other user as well
        const otherUserDoc = doc(db, 'potentialMatches', email);
        await setDoc(otherUserDoc, {
            newMatches: arrayRemove(user.email),
            matched: arrayUnion(user.email),
        }, { merge: true }
        );

        // Create a new chat in the "chats" collection
        const newChat = {
            // the new chat contains an array caled users with the two user ids
            users: [user.email, email],

        };
        const chatDocRef = await addDoc(collection(db, 'chats'), newChat);

        navigate(`/chat/${chatDocRef.id}`);
    }


    return (
        <div className="newMatchCard">
            <div className="newMatchCard__body" onClick={() => createNewChat(newMatch)}>
                <img className="newMatchCard__pic"src={userPic} alt="" />
                <p className="newMatchCard__name">{userName}</p>
            </div>
        </div>
    )
}

export default NewMatchCard