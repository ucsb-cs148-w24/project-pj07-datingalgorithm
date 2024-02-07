import React, {useEffect, useState} from "react";
import TinderCard from "react-tinder-card";
import "./Cards.css";
import { db, auth, signInAnonymously } from './firebase';
import Header from './Header';
import {collection, onSnapshot, query, where, getDocs, doc, getDoc} from "firebase/firestore";

const Cards = () =>{
    const [people, setPeople] = useState([]);

    const q = query(collection(db, "users"));

    const querySnapshot =  getDocs(q);

    useEffect(() => onSnapshot(q, (querySnapshot) => {
        setPeople(querySnapshot.docs.map(doc => doc.data()))
    }
    ), [db]);

    // print the data
    console.log(people);

    return (
        <><Header /><>
            <div className="cards">
                {people.map(person => (
                    <TinderCard
                        className="swipe"
                        key={person.name}
                        preventSwipe={["up"]}
                    >
                        <div
                            className="card"
                            style={{ backgroundImage: `url(${person.picUrl})` }}
                        >
                        </div>

                        <div
                            className="content"
                        >
                            <h3 style={{ fontSize: 55 }}>
                                {person.name}
                            </h3>
                            <p>{person.tagline}</p>
                            <p style={{ fontSize: 145, position: "absolute", bottom: 25, left: 210 }}>
                                {"90%"}
                            </p>
                        </div>

                    </TinderCard>
                ))}
            </div>
        </></>
    )
}


export default Cards;