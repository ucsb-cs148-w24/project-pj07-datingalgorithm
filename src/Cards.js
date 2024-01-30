import { Card } from "@material-ui/core";
import React, {useState} from "react";
import ProfileCard from "./ProfileCard";
import "./ProfileCard.css";
import TinderCard from "react-tinder-card";
import "./Cards.css";

//import "./Cards.css";

function Cards() {
    const [people, setPeople] = useState([
        {
            name: "Tony Stark",
            hobby: "Flying high and fast cars",
            image: require("./res/tonyStark.jpg"),
            score: "90%"
        },
        {
            name: "Bruce Wayne",
            hobby: "Fighting crime, being Batman",
            image: require("./res/bruceWayne.jpeg"),
            score: "88%"
        },
    ]);

    return (
        <div className="cards">
            {people.map(person => (
                <TinderCard
                    className="swipe"
                    key={person.name}
                    preventSwipe={["up"]}
                >
                    <div 
                    className="card"
                    style = {{backgroundImage: `url(${person.image})`}}
                    >   
                    </div>

                    <div
                        className="content"
                    >
                        <h3>{person.name}</h3>
                        <p>{person.hobby}</p>
                        <p>{person.score}</p>
                    </div>
                    
                </TinderCard>
            ))}
        </div>
    )
}


export default Cards;