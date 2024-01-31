// src/Body.js

import React from 'react';
import './Body.css';

function Body() {
    return (
        <div className="Body">
            <form action="/action_page.php">
                <p>First Name</p>
                <div className="input-group">
                    <input type="text" id="fname" name="firstname" placeholder="First Name"/>
                </div>
                <p>Last Name</p>
                <div className="input-group">
                    <input type="text" id="lname" name="lastname" placeholder="Last Name"/>
                </div>
                <p>Birthday</p>
                <div className="input-group">
                    <input type="date" id="bday" /> 
                    
                </div>
                <p>Gender</p>
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

                <p>Interested in</p>
                <div>
                    <select id="sexual_ori" name="sexual_ori">
                        <option value="" disabled selected>Select</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="everyone">Everyone</option>
                    </select>
                </div>

                <p>Tell me about yourself</p>
                <div className="input-group">
                    <input type="text" id="bio" name="" placeholder="What would you like your potential matches to know about you?"/>
                </div>
                    

                <p>What do you enjoy in your spare time? Please select your top 2 options</p>
                <label><input type="checkbox" class="check" />Reading</label> <p></p>
                <label><input type="checkbox" class="check" />Watching to Movies</label> <p></p>
                <label><input type="checkbox" class="check" />Listening to Music</label> <p></p>
                <label><input type="checkbox" class="check" />Playing Sports</label> <p></p>
                <label><input type="checkbox" class="check" />Cooking</label> <p></p>
                <label><input type="checkbox" class="check" />Traveling</label> <p></p>
                <label><input type="checkbox" class="check" />Gaming</label> <p></p>
                <label><input type="checkbox" class="check" />Arts and Crafts</label>
                
                <div>
                    <input type="submit" value="Submit"></input>
                </div>
            </form>
        </div>
    );
}

export default Body