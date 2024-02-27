import React, { useEffect , useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, getDoc } from "firebase/firestore";
import NewMatchCard from './newMatchCard';
import {db, auth} from '../firebase';

import './newMatches.css'

const NewMatches = () => {
    const [newEmails, setNewEmails] = useState([]);
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        const fetchNewMatches = async () => {
            if (loading) {
                console.log("Loading user");
            }
            if (!user) {
                console.log("No user");

            }

            // get array of newMatches from the potentialMatches/userEmail doc
            const userDoc = doc(db, 'potentialMatches', user.email);
            const userSnap = await getDoc(userDoc);

            const userNewEmails = userSnap.data().newMatches;

            console.log(userNewEmails);
            
            setNewEmails(userNewEmails);
            
        }

        fetchNewMatches();
    }, [user, loading, error]);


    return (
        <div>
            <p className='newMatches__header'>
                New Matches:
            </p>
            <div className="newMatches">
                {newEmails.map((email) => (
                    <NewMatchCard key={email} newMatch={email}/>
                ))}
            </div>
            
        </div>
    )
}

export default NewMatches