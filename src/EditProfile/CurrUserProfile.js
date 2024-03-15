import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { useAuthState } from 'react-firebase-hooks/auth'
import { db, auth } from '../firebase'
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore"; // Ensure this import is added
import {getAge} from '../utils/userUtils';
import "./CurrUserProfile.css"
import "../SwipeScreen/ChatButton.css";

const CurrUserProfile = () => {
    const [user] = useAuthState(auth)
    const userId = useParams().userId;
    const [userName, setUserName] = useState("");
    const [userProfilePic, setUserProfilePic] = useState("");
    const [userBio, setUserBio] = useState("");
    const [userAge, setUserAge] = useState("");
    const [userInterests, setUserInterests] = useState([]);
    const [userGender, setUserGender] = useState("");
    const [userHobbies, setUserHobbies] = useState([]);
    const [userTraits, setUserTraits] = useState([]);

    // ensure we're on a valid page
    useEffect(() => {
        // if(!user || !userId){
        //     navigate('/');
        // }
    }, [user, userId])

    // fetch info about the user page we're on based on the user id
    useEffect(() => {
        const fetchUserInfo = async () => {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setUserName(data.name);
                setUserProfilePic(data.picUrl);
                setUserBio(data.bio);
                setUserAge(getAge(data.birthday));
                setUserInterests(data.interestedIn);
                setUserGender(data.gender);
                setUserHobbies(data.hobbies);
                setUserTraits(data.traits);
            } else {
                console.log("No such document!");
            }
        }

        fetchUserInfo();
    })

    return (
        <div>
            <Header showEditProfile = {true}/>
            
            <h1>User Profile</h1>
            <img style={{ width: "20%", height: "20%" }} src={userProfilePic} alt="" />
            <p>Name: {userName}</p>
            <p>Bio: {userBio}</p>
            <p>Age: {userAge}</p>
            <p>Gender: {userGender}</p>
            <p>Interested In: {userInterests}</p>
            <p>Hobbies: {userHobbies.join(', ')}</p>
            <p>Traits: {userTraits.join(', ')}</p>

        </div>
    )
}

export default CurrUserProfile