import React, {useState } from 'react';
import './Body.css';
import data from "./data";
import { auth, storage, ref, db } from '../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, uploadBytes } from "firebase/storage";

function Body() {
    const navigate = useNavigate();
    const [file, setFile] = useState([]);
    function handleFileChange(e) {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
        else {
            setFile([]);
            alert("Image removed from upload.")
        }
    }

    const [uploading, setUploading] = useState(false);

    //store user's answers to questions with checkboxes
    const [allQues, setAllQues] = useState([]);
    const [allHobbies, setAllHobbies] = useState([]);
    const [allTraits, setAllTraits] = useState([]);
    const [allLoveLang, setAllLoveLang] = useState([]);
    const [allDateIdeas, setAllDateIdeas] = useState([]);
    const [allVacation, setAllVacation] = useState([]);
    const [allGifts, setAllGifts] = useState([]);
    const [allPriority, setAllPriority] = useState([]);
    const [allIcks, setAllIcks] = useState([]);
    const [allSuperpowers, setAllSuperpowers] = useState([]);

    //Submit limits
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Retrieve the current user's UID
        const uid = auth.currentUser ? auth.currentUser.uid : null;
        if (!uid) {
            console.error("No user signed in");
            return;
        }

        if (document.getElementById('fname').value === "") {
            alert("Please fill out first name.")
            return;
        }
        else if (document.getElementById('lname').value === "") {
            alert("Please fill out last name.")
            return;
        }
        else if (document.getElementById('bday').value === "") {
            alert("Please fill out birthday.")
            return;
        }
        else if (document.getElementById('gender').value === "") {
            alert("Please fill out gender.")
            return;
        }
        else if (document.getElementById('sexual_ori').value === "") {
            alert("Please fill out who you are interested in.")
            return;
        }
        else if (document.getElementById('bio').value === "") {
            alert("Please fill out the text box bio.")
            return;
        }
        else if (allHobbies.length === 0) {
            alert("Please add at least one hobby.");
            return;
        }
        else if (allTraits.length === 0) {
            alert("Please add at least one trait.");
            return;
        }
        else if (allLoveLang.length === 0) {
            alert("Please add at least one love language.");
            return;
        }
        else if (allDateIdeas.length === 0) {
            alert("Please add one ideal date.");
            return;
        }
        else if (allVacation.length === 0) {
            alert("Please add one ideal vacation spot.");
            return;
        }
        else if (allPriority.length === 0) {
            alert("Please add at least one priority.");
            return;
        }
        else if (allIcks.length === 0) {
            alert("Please add at least one unpleasant quality.");
            return;
        }
        else if (allSuperpowers.length === 0) {
            alert("Please add at least one superpower.");
            return;
        }
        else if (file.length === 0) {
            alert("Please select an image before submitting.");
            return;
        }
        else {
            setUploading(true);
            const firstName = document.getElementById('fname').value;
            const lastName = document.getElementById('lname').value;
            // Combine first name and last name with a space
            const fullName = `${firstName} ${lastName}`;


            const userProfileDetails = {
                name: fullName, // Use the combined name here
                birthday: document.getElementById('bday').value,
                gender: document.getElementById('gender').value,
                interestedIn: document.getElementById('sexual_ori').value,
                bio: document.getElementById('bio').value,
                hobbies: allHobbies,
                traits: allTraits,
                lovelang: allLoveLang,
                dateideas: allDateIdeas,
                vacation: allVacation,
                gift: allGifts,
                priority: allPriority,
                icks: allIcks,
                superpower: allSuperpowers
                // Include any other fields captured from the form
            };

            try {
                await setDoc(doc(db, "users", uid), userProfileDetails, { merge: true });
                console.log("Profile updated successfully");

                // upload image to firebase storage
                const imageRef = ref(storage, `users/${uid}/${fullName}`);
                await uploadBytes(imageRef, file);

                // Get download URL of the uploaded image
                const downloadURL = await getDownloadURL(imageRef);

                // Save metadata to Firestore
                const userProfilePic = {
                    picUrl: downloadURL,
                    // Include any other fields captured from the form
                };
                // upload downloadURL to firebase document
                await setDoc(doc(db, "users", uid), userProfilePic, { merge: true });
                alert('Image uploaded successfully!');

                alert("Profile updated.")
                navigate('/swipe');
                // Redirect or show success message as needed
            } catch (error) {
                console.error("Error updating profile:", error);
                console.error('Error uploading image:', error);
                alert('Failed to upload image.');
                // Handle the error appropriately
            }
            setUploading(false);
        }
    
        
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
                <div className="checkbox">
                    {data.map((ques, index) => {
                        return (
                            <SingleGroup
                            key={index}
                            data={ques}
                            setAllQues={setAllQues}
                            allQues={allQues}
                            setAllHobbies={setAllHobbies}
                            allHobbies={allHobbies}
                            setAllTraits={setAllTraits}
                            allTraits={allTraits}
                            setAllLoveLang={setAllLoveLang}
                            allLoveLang={allLoveLang}
                            setAllDateIdeas={setAllDateIdeas}
                            allDateIdeas={allDateIdeas}
                            setAllVacation={setAllVacation}
                            allVacation={allVacation}
                            setAllGifts={setAllGifts}
                            allGifts={allGifts}
                            setAllPriority={setAllPriority}
                            allPriority={allPriority}
                            setAllIcks={setAllIcks}
                            allIcks={allIcks}
                            setAllSuperpowers={setAllSuperpowers}
                            allSuperpowers={allSuperpowers}

                            />
                        );
                    })}
                </div>
                <br></br>
                
                <div>
                    <p><b>Add Image:</b></p>
                    <input type="file" onChange={handleFileChange} accept="image/*" />
                    {file && <img style={{ width: "20%", height: "20%" }} src={URL.createObjectURL(file)} alt="" />}
                </div>
                <br></br>
                <div>
                    <button type="submit" value="Submit">{uploading ? 'Updating...' : 'Update'}</button>
                </div>
            </form>
        </div>
    );
}


const SingleGroup = ({ data, setAllQues, allQues, setAllHobbies, allHobbies, setAllTraits, allTraits, setAllLoveLang, allLoveLang, setAllDateIdeas, allDateIdeas, setAllVacation, allVacation, setAllGifts, allGifts, setAllPriority, allPriority, setAllIcks, allIcks, setAllSuperpowers, allSuperpowers}) => { //Checkbox limit
    const [values, setValues] = useState([]);
    const handleChange = (e) => {
        if (e.target.checked) {
            if (data.group === "love-lang") {
                if (values.length < 2) {
                    setValues((prev) => [...prev, e.target.value]);
                    setAllQues((prev) => [...prev, e.target.value]);
                    setAllLoveLang((allLoveLang) => [...allLoveLang, e.target.value]);
                } else {
                    e.target.checked = false;

                    alert("You can select only 2 choices");
                }
            }
            else if (data.group === "vacation") {
                if (values.length < 1) {
                    setValues((prev) => [...prev, e.target.value]);
                    setAllQues((prev) => [...prev, e.target.value]);
                    setAllVacation((allVacation) => [...allVacation, e.target.value]);
                } else {
                    e.target.checked = false;

                    alert("You can select only 1 choice");
                }
            }
            else if (data.group === "gift") {
                if (values.length < 1) {
                    setValues((prev) => [...prev, e.target.value]);
                    setAllQues((prev) => [...prev, e.target.value]);
                    setAllGifts((allGifts) => [...allGifts, e.target.value]);
                } else {
                    e.target.checked = false;

                    alert("You can select only 1 choice");
                }
            }
            else if (data.group === "date-ideas") {
                if (values.length < 1) {
                    setValues((prev) => [...prev, e.target.value]);
                    setAllQues((prev) => [...prev, e.target.value]);
                    if (data.group === "date-ideas") {
                        setAllDateIdeas((allDateIdeas) => [...allDateIdeas, e.target.value]);
                    }
                } else {
                    e.target.checked = false;

                    alert("You can select only 1 choice");
                }
            }
            else if (data.group === "superpower") {
                if (values.length < 1) {
                    setValues((prev) => [...prev, e.target.value]);
                    setAllQues((prev) => [...prev, e.target.value]);
                    setAllSuperpowers((allSuperpowers) => [...allSuperpowers, e.target.value]);
                } else {
                    e.target.checked = false;

                    alert("You can select only 1 choice");
                }
            }
            else {
                if (values.length < 3) {
                    setValues((prev) => [...prev, e.target.value]);
                    setAllQues((prev) => [...prev, e.target.value]);
                    if (data.group === "hobbies") {
                        setAllHobbies((allHobbies) => [...allHobbies, e.target.value]);
                    }
                    else if (data.group === "priority"){
                        setAllPriority((allPriority) => [...allPriority, e.target.value]);
                    }
                    else if (data.group === "icks"){
                        setAllIcks((allIcks) => [...allIcks, e.target.value]);
                    }
                    else {
                        setAllTraits((allTraits) => [...allTraits, e.target.value]);
                    }
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
        setAllHobbies(allHobbies.filter((item) => item !== e.target.value));
        setAllTraits(allTraits.filter((item) => item !== e.target.value));
        setAllLoveLang(allLoveLang.filter((item) => item !== e.target.value));
        setAllDateIdeas(allDateIdeas.filter((item) => item !== e.target.value));
        setAllVacation(allVacation.filter((item) => item !== e.target.value));
        setAllGifts(allGifts.filter((item) => item !== e.target.value));
        setAllPriority(allPriority.filter((item) => item !== e.target.value));
        setAllIcks(allIcks.filter((item) => item !== e.target.value));
        setAllSuperpowers(allSuperpowers.filter((item) => item !== e.target.value));
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