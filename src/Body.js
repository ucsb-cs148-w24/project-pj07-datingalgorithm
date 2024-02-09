import React, {useState} from 'react';
import './Body.css';
import data from "./data";
import { db, storage } from './firebaseConfig'; // Adjust the path as necessary
import { doc, setDoc } from "firebase/firestore";
import { auth } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from"firebase/storage";

function Body() {
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [percent, setPercent] = useState(0);
//    function handleChange(e) {
//        if (e.target.files.length !== 0) {
//            setFile(URL.createObjectURL(e.target.files[0]));
//        }
//        else {
//            setFile([]);
 //           alert("Image removed from upload.")
//        }
 //   }

    function handleChange(e) {
        setFile(e.target.files[0]);
    }
    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
            return;
        }
 
        const storageRef = ref(storage, `/files/${file.name}`);
 
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };

    //store user's answers to questions with checkboxes
    const [allQues, setAllQues] = useState([]);
    const [allHobbies, setAllHobbies] = useState([]);
    const [allTraits, setAllTraits] = useState([]);
    const [allLoveLang, setAllLoveLang] = useState([]);

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
        }
        else if (document.getElementById('lname').value === "") {
            alert("Please fill out last name.")
        }
        else if (document.getElementById('bday').value === "") {
            alert("Please fill out birthday.")
        }
        else if (document.getElementById('gender').value === "") {
            alert("Please fill out gender.")
        }
        else if (document.getElementById('sexual_ori').value === "") {
            alert("Please fill out who you are interested in.")
        }
        else if (document.getElementById('bio').value === "") {
            alert("Please fill out the text box bio.")
        }
        else {
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
                // Include any other fields captured from the form
            };

            try {
                await setDoc(doc(db, "users", uid), userProfileDetails, { merge: true });
                console.log("Profile updated successfully");
                alert("Profile updated.")
                navigate('/swipe');
                // Redirect or show success message as needed
            } catch (error) {
                console.error("Error updating profile:", error);
                // Handle the error appropriately
            }
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
                            />
                        );
                    })}
                </div>
                <br></br>
                <div>
                    <p><b>Add Image:</b></p>
                    <input type="file" onChange={handleChange} accept="image/*" />
                    <img style={{ width: "20%", height: "20%" }} src={file} alt="" />
                    <button onClick={handleUpload}>Upload to Firebase</button>
                    <p>{percent} "% done"</p>
                </div>
                <br></br>
                <div>
                    <input type="submit" value="Submit"></input>
                </div>
            </form>
        </div>
    );
}


const SingleGroup = ({ data, setAllQues, allQues, setAllHobbies, allHobbies, setAllTraits, allTraits, setAllLoveLang, allLoveLang }) => { //Checkbox limit
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
            else {
                if (values.length < 3) {
                    setValues((prev) => [...prev, e.target.value]);
                    setAllQues((prev) => [...prev, e.target.value]);
                    if (data.group === "hobbies") {
                        setAllHobbies((allHobbies) => [...allHobbies, e.target.value]);
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