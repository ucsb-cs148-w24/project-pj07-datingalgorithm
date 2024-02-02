// src/Body.js

import React, {useState, useEffect} from 'react';
import './Body.css';
import data from "./data";


function Body() {

    const [allQues, setAllQues] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Selected options: ' + allQues);
        console.log('Number of selected options: ' + allQues.length);
    };

    return (
        <div className="Body">
            <form action="/action_page.php" onSubmit={handleSubmit}>
                <br></br>
                <p><b>First Name</b></p>
                <div className="input-group">
                    <input type="text" id="fname" name="firstname" placeholder="First Name"/>
                </div>
                <br></br>
                <p><b>Last Name</b></p>
                <div className="input-group">
                    <input type="text" id="lname" name="lastname" placeholder="Last Name"/>
                </div>
                <br></br>
                <p><b>Birthday</b></p>
                <div className="input-group">
                    <input type="date" id="bday" /> 
                    <br></br>   
                </div>
                <br></br>
                <p><b>Gender</b></p>
                <select id="gender" name="gender">
                    <option value="" disabled selected>Select</option>
                    <option value="man">Man</option>
                    <option value="woman">Woman</option>
                    <option value="agender">Agender</option>
                    <option value="androgyne">Androgyne</option>
                    <option value="androgynous">Androgynous</option>
                    <option value="bigender">Bigender</option>
                    <option value="female_to_male">Female to Male</option>
                    <option value="gender_fluid">Gender Fluid</option>
                    <option value="gender_nonconforming">Gender Nonconforming</option>
                    <option value="gender_questioning">Gender Questioning</option>
                    <option value="gender_variant">Gender Variant</option>
                    <option value="genderqueer">Genderqueer</option>
                    <option value="male_to_female">Male to Female</option>
                    <option value="neither">Neither</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="pangender">Pangender</option>
                    <option value="trans">Trans</option>
                    <option value="other">Other</option>
                </select>
                <br></br>
                <br></br>
                <p><b>Interested in</b></p>
                <div>
                    <select id="sexual_ori" name="sexual_ori">
                        <option value="" disabled selected>Select</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="everyone">Everyone</option>
                    </select>
                </div>
                <br></br>
                <p><b>Tell me about yourself</b></p>
                <div className="input-group">
                    <textarea id="bio" name="bio" placeholder="What would you like your potential matches to know about you?"></textarea>
                </div>
                <br></br>
                <div className="group">
                    <form onSubmit={handleSubmit}>
                        {data.map((ques, index) => {
                        return (
                            <SingleGroup
                            key={index}
                            data={ques}
                            setAllQues={setAllQues}
                            allQues={allQues}
                            />
                        );
                        })}
                    </form>
                </div>
                <br></br>
                <div>
                    <input type="submit" value="Submit"></input>
                </div>
            </form>
        </div>
    );
}


const SingleGroup = ({ data, setAllQues, allQues }) => {
    const [values, setValues] = useState([]);
    const handleChange = (e) => {
        if (e.target.checked) {
            if (data.group == "love-lang") {
                if (values.length < 2) {
                    setValues((prev) => [...prev, e.target.value]);
                    setAllQues((prev) => [...prev, e.target.value]);
                } else {
                    e.target.checked = false;

                    alert("You can select only 2 choices");
                }
            }
            else {
                if (values.length < 3) {
                    setValues((prev) => [...prev, e.target.value]);
                    setAllQues((prev) => [...prev, e.target.value]);
                } else {
                    e.target.checked = false;

                    alert("You can select only 3 choices");
                }
            }
        } else {
        let newArr = values.filter((d) => d !== e.target.value);
        setValues(newArr);
        let rm = allQues.filter((item) => item !== e.target.value);
        setAllQues(rm);
        }
    };

    return (
        <div>
        <br></br>
          <p><b>{data.prompt}</b></p>
          {data.questions.map((ques, index) => {
            return (
              <label key={index}>
                <p>
                <input
                  type="checkbox"
                  name={ques.label}
                  value={ques.label}
                  onChange={(e) => handleChange(e)}
                />
                {ques.label}
                </p>
              </label>
            );
          })}
        </div>
      );
    };

export default Body