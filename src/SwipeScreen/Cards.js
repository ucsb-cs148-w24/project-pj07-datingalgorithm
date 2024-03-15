import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "./Cards.css";
import { db, auth } from '../firebase';
import Header from '../Header';
import {
    collection,
    onSnapshot,
    query,
    where,
    getDoc,
    doc,
    setDoc,
    arrayUnion,
    updateDoc,
    arrayRemove
} from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getAge, getCompatabilityScore } from '../utils/userUtils';
import "./ChatButton.css";
import ChatButton from './chatButton';
import { MessageIcon, UserIcon } from "../icons";




const Cards = () =>{
    const [people, setPeople] = useState([]);
    const [matches, setMatches] = useState([]);
    const [user, setUser] = useState(null);
    const [userChats, setUserChats] = useState([]);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const uid = auth.currentUser ? auth.currentUser.uid : null;

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const data = await getUserData(currentUser.uid);
                setUserData(data);
            }
        });
    
        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, []);

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

    useEffect(() => {
        if (user) {
            const getProfiles = async () => {
                const potentialMatchesDoc = doc(db, 'potentialMatches', user.email);
                const potentialMatchesDoc2 = await getDoc(potentialMatchesDoc);
                const potentialMatchesData = potentialMatchesDoc2.data();

                console.log("potential matches", potentialMatchesData.matched);
                setMatches(potentialMatchesData.matched);

                const profilesQuery = query(collection(db, "users"));
                onSnapshot(profilesQuery, (querySnapshot) => {
                    console.log("matches", matches);
                    const filteredPeople = querySnapshot.docs.map(doc => doc.data()).filter(person =>
                        !potentialMatchesData.matched.includes(person.email) &&
                        !potentialMatchesData.newMatches.includes(person.email) &&
                        !potentialMatchesData.likes.includes(person.email) &&
                        person.email !== user.email);
                    console.log("filtered people", filteredPeople);
                    setPeople(filteredPeople);
                });
            };
            getProfiles();
        }
    }, [db, user]);

    useEffect(() => {
        if (user) {
            const usersQuery = query(collection(db, 'chats'), where('users', 'array-contains', user.email));
            onSnapshot(usersQuery, snapshot => {
                setUserChats(snapshot.docs);
            });
        }
    }, [db, user]);

    const handleSwipe = async (userAId, userBId) => {
        if (userAId === userBId) {
            return;
        }

        const userADoc = doc(db, 'potentialMatches', userAId);
        const userADocument = await getDoc(userADoc);
        if (userADocument.exists()) {
            const userAData = userADocument.data();
            if (userAData.likes && !userAData.likes.includes(userBId)) {
                await setDoc(userADoc, { likes: arrayUnion(userBId) }, { merge: true });
            }
        }

        const userBDoc = doc(db, 'potentialMatches', userBId);
        const userBDocument = await getDoc(userBDoc);
        if (userBDocument.exists()) {
            const userBData = userBDocument.data();
            if (userBData.likes && userBData.likes.includes(userAId)) {
                await updateDoc(userADoc, { newMatches: arrayUnion(userBId) });
                await updateDoc(userBDoc, { newMatches: arrayUnion(userAId) });
                await updateDoc(userADoc, { likes: arrayRemove(userBId) });
                await updateDoc(userBDoc, { likes: arrayRemove(userAId) });
            }
        }
    };

    const onSwipe = async (direction, personEmail) => {
        if (direction === "right") {
            console.log("swiped right");
            handleSwipe(user.email, personEmail);
        } else if (direction === "left") {
            console.log("swiped left");
        }
    };

    const goToChatScreen = () => {
        navigate('/chats');
    };

    const goToProfile = () => {
        navigate(`/profile/${uid}`); // Adjusted this to a more generic route. You should replace `/profile/${uid}` with your actual route.
    };

    return (
        <div>
            <Header />
            <div className="cards">
                {people.length === 0 && <h1>No more potential matches</h1>}
                {people.map(person => (
                    <TinderCard
                        className="swipe"
                        key={person.name}
                        preventSwipe={["up", "down"]}
                        onSwipe={(dir) => onSwipe(dir, person.email)}
                    >
                        <div className="card" style={{ backgroundImage: `url(${person.picUrl})` }}>
                        </div>
                        <div className="content">
                            <h3 style={{ fontSize: 50 }}>{person.name}</h3>
                            <p>{person.tagline}</p>
                            {userData && <p className="match_percent" style={{ fontSize: 150 }}>{getCompatabilityScore(userData, person)}</p>}
                            <p className="bio" style={{ fontSize: 26 }}>Bio: {person.bio}</p>
                            <p>{person.tagline}</p>
                            <p style={{ fontSize: 50, position: "absolute", bottom: -15, left: 25 }}>Age: {getAge(person.birthday)}</p>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <ChatButton onClick={goToChatScreen} />
            <button onClick={goToProfile} className="goToProfileButton">
                Profile
                <UserIcon className="mr-2 h-5 w-5" />
            </button>
        </div>
    );
}

export default Cards;
