import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from "firebase/firestore";
import {db, auth} from './firebase';
import "./ChatButton.css";

const ChatButton = () => {
    const navigate = useNavigate();
    const [notificationCount, setNotificationCount] = useState(0);
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {

        const fetchNewMatches = async () => {
            // wait until user is loaded
            if (loading) {
                return;

            }
            if (!user) {
                return;
            }
            
    
            const userDoc = doc(db, 'potentialMatches', user.email);

            // if there is no doc, then create one
            if (! await getDoc(userDoc)) {
                await setDoc(userDoc, {
                    newMatches: [],
                    matched: [],    
                    likes: [],
                })
            }

            
            const newUserDoc = doc(db, 'potentialMatches', user.email);
            const userSnap = await getDoc(newUserDoc);
    
            const userNewEmails = userSnap.data().newMatches;

            console.log('new matches', userNewEmails);

            setNotificationCount(userNewEmails.length);
        }

        fetchNewMatches();
        

    }, [user, loading, error]);


    const goToChatScreen = () => {
        navigate('/chats'); // Assuming your chat screen route is '/chat'
    };

    return (
        <div className='chatButtonContainer'>
            <img className="goToChatButton" src={require('./images/icon-chat.png')} alt="Chat" onClick={goToChatScreen} />
            <div className="notificationCount"> {notificationCount} </div>
        </div>
    )
}

export default ChatButton