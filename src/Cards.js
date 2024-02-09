import React, {useEffect, useState} from "react";
import TinderCard from "react-tinder-card";
import "./Cards.css";
import { db, auth, signInAnonymously } from './firebase';
import Header from './Header';
import {collection, onSnapshot, query, where, getDocs, doc, getDoc} from "firebase/firestore";



function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function getList(arr) {
    var new_arr = arr;
    if (new_arr.length <= 1) {
        return arr;
    }
    else {
        var list = "";
        for (let i = 0; i < new_arr.length; i++) {
            if (i === (new_arr.length-1)) {
                list += arr[i];
            }
            else {
                list += arr[i] + ", ";
            }
        }
        return list;
    }
}

export const snapshotToArray = snapshot => {
    let returnArr = [];
 
    snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });
 
    return returnArr;
  };

function getList1(arr) {
    var new_arr = snapshotToArray(arr);
    var list = "";
    for (let i = 0; i < 3; i++) {
        while (new_arr[i]) {
            list += new_arr[i] + ", ";
        }
    }
    return list;
}


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
        <div className="cards">
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
                        <p style={{fontSize: 150, position: "absolute", bottom: 40, left: 250}}>
                            {"90%"}
                        </p>
                        <p style={{fontSize: 50, position: "absolute", bottom: 10, left: 10}}> Age: {getAge(person.birthday)}</p>
                    </div>
                    
                </TinderCard>
            ))}
        </div>
    )
}


export default Cards;