import React, {useEffect, useState} from "react";
import TinderCard from "react-tinder-card";
import "./Cards.css";
import db from "./firebase";
import Header from './Header';

const Cards = () =>{
    const [people, setPeople] = useState([]);

    useEffect(() => {
        db.collection("users").onSnapshot((snapshot) => (
            setPeople(snapshot.docs.map((doc) => doc.data()))
        ))
    }, [])

    return (
        <div className="cards">
            <Header/>
            <Header/>
            {people.map(person => (
                <TinderCard
                    className="swipe"
                    key={person.name}
                    preventSwipe={["up"]}
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