// src/Body.js

import React from 'react';
import './Body.css';


var checks = document.querySelectorAll(".check");
var max = 2;
for (var i = 0; i < checks.length; i++)
    checks[i].onclick = selectiveCheck;
function selectiveCheck (event) {
    var checkedChecks = document.querySelectorAll(".check:checked");
    if (checkedChecks.length >= max + 1)
        return false;
}

function Body() {
    return (
        <div className="Body">
            <form action="/action_page.php">
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
                <p><b>What do you enjoy in your spare time? Please select your top three choices.</b></p>
                <div class='checkboxes-container'>
                    <label><input type="checkbox" class="check" />Reading</label> <p></p>
                    <label><input type="checkbox" class="check" />Watching to Movies</label> <p></p>
                    <label><input type="checkbox" class="check" />Listening to Music</label> <p></p>
                    <label><input type="checkbox" class="check" />Playing Sports</label> <p></p>
                    <label><input type="checkbox" class="check" />Cooking</label> <p></p>
                    <label><input type="checkbox" class="check" />Traveling</label> <p></p>
                    <label><input type="checkbox" class="check" />Gaming</label> <p></p>
                    <label><input type="checkbox" class="check" />Arts and Crafts</label>
                </div>
                <br></br>
                <p><b>What traits best describe you? Please select your top three choices.</b></p>
                <div class='checkboxes-container'>
                    <label><input type="checkbox" class="check" />Adventurous</label> <p></p>
                    <label><input type="checkbox" class="check" />Ambitious</label> <p></p>
                    <label><input type="checkbox" class="check" />Easygoing</label> <p></p>
                    <label><input type="checkbox" class="check" />Empathetic</label> <p></p>
                    <label><input type="checkbox" class="check" />Optimistic</label> <p></p>
                    <label><input type="checkbox" class="check" />Romantic</label> <p></p>
                    <label><input type="checkbox" class="check" />Open-minded</label> <p></p>
                    <label><input type="checkbox" class="check" />Family-oriented</label>
                </div>
                <br></br>
                <p><b>What are your love languages? Please select your top two choices.</b></p>
                <div class='checkboxes-container'>
                    <label><input type="checkbox" class="check" />Acts of service</label> <p></p>
                    <label><input type="checkbox" class="check" />Physical touch</label> <p></p>
                    <label><input type="checkbox" class="check" />Receiving gifts</label> <p></p>
                    <label><input type="checkbox" class="check" />Quality time</label> <p></p>
                    <label><input type="checkbox" class="check" />Words of affirmation</label> <p></p>
                </div>
                <br></br>
                <div>
                    <input type="submit" value="Submit"></input>
                </div>
            </form>
        </div>
    );
}

export default Body