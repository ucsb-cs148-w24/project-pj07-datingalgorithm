import { Card } from "@material-ui/core";
import React, {useState} from "react";
import ProfileCard from "./ProfileCard";
import "./ProfileCard.css";

//import "./Cards.css";

const Cards = () => {
    const [people, setPeople] = useState([
        {
            name: "Tony Stark",
            hobby: "Avengers",
            image: require("./res/beach.jpg")
        },
    ]);

    return (
        <div className="cards">
            <h1>Profiles</h1>
            
            <div className='cardContainer'>
                {people.map((person) => (
                    <ProfileCard 
                        className = "profileCard"
                        key = {person.name}
                        backgroundImage = {person.image}
                    />
                    
                ))}
            </div>
            
        </div>
    )
}


export default Cards;