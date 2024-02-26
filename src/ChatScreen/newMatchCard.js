import React from 'react'
import {fetchUserIdByEmail} from '../utils/userUtils';
import {db, auth} from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';

import './newMatches.css';

const NewMatchCard = ({newMatch}) => {
    const [user, loading, error] = useAuthState(auth);
    const [userPic, setUserPic] = useState("");
    const [userName, setUserName] = useState("");

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


    return (
        <div className="newMatchCard">
            <div className="newMatchCard__body">
                <img className="newMatchCard__pic"src={userPic} alt="" />
                <h3 classNmae="newMatchCard__name">{userName}</h3>
            </div>
        </div>
    )
}

export default NewMatchCard