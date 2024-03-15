import React, {useState, useRef, useEffect } from 'react';
import './Profile.css';
import data from '../ProfileCreationScreen/data';
import { auth, storage, ref, db } from '../firebaseConfig';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth'
import {getAge} from '../utils/userUtils';

function Profile() {
    const uid = auth.currentUser ? auth.currentUser.uid : null;
    const [user] = useAuthState(auth)
    const userId = useParams().userId;
    const [userName, setUserName] = useState("");
    const [userBio, setUserBio] = useState("");
    const [userInterests, setUserInterests] = useState([]);
    const [userGender, setUserGender] = useState("");
    const [userProfilePic, setUserProfilePic] = useState("");

    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const hiddenFileInput = useRef(null);
    function handleFileChange(e) {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
        else {
            setFile(null);
            alert("Image removed from upload.")
        }
    }

    function handleClick () {
        hiddenFileInput.current.click();
    };

    const [uploading, setUploading] = useState(false);


    // fetch info about the user page we're on based on the user id
    useEffect(() => {
        const fetchUserInfo = async () => {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setUserName(data.name);
                setUserProfilePic(data.picUrl);
                setUserBio(data.bio);
                setUserInterests(data.interestedIn);
                setUserGender(data.gender);
            } else {
                console.log("No such document!");
            }
        }

        fetchUserInfo();
    })

    //Submit limits
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Retrieve the current user's UID

        if (document.getElementById('fname').value === "") {
            alert("Please fill out first name.")
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
        else {
            setUploading(true);

            const userProfileDetails = {
                name: document.getElementById('fname').value, // Use the combined name here
                gender: document.getElementById('gender').value,
                interestedIn: document.getElementById('sexual_ori').value,
                bio: document.getElementById('bio').value,
                // Include any other fields captured from the form
            };

            try {
                await setDoc(doc(db, "users", uid), userProfileDetails, { merge: true });
                console.log("Profile updated successfully");

                // upload image to firebase storage
                const imageRef = ref(storage, `users/${uid}/${document.getElementById('fname').value}`);
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
        <div className="Profile">
            <form action="/action_page.php" onSubmit={handleSubmit}>
                <br></br>
                <p><b>Name</b></p>
                <div class="row">
                <div class="col s12">
                    <input type="text" id="fname" name="firstname" placeholder={userName}/>
                </div>
                </div>
                <br></br>
                <p><b>Gender</b></p>
                <select id="gender" name="gender">
                    <option value="" disabled selected>{userGender}</option>
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
                        <option value="" disabled selected>{userInterests}</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="everyone">Everyone</option>
                    </select>
                </div>
                <br></br>
                <p><b>Tell me about yourself</b></p>
                <div className="input-group">
                    <textarea id="bio" name="bio" placeholder={userBio}></textarea>
                </div>
                <br></br>
                <div>
                    <p><b>Add Image:</b></p>
                    <button type="button" className="button-upload" onClick={handleClick}>
                        Choose Picture
                    </button>
                    <input type="file" onChange={handleFileChange} accept="image/*" ref={hiddenFileInput} style={{ display: "none" }} />
                    {file && <img style={{ width: "20%", height: "20%" }} src={URL.createObjectURL(file)} alt="" />}
                </div>
                <br></br>
                <div>
                    <button className="submit" type="submit" value="Submit" disabled={uploading}>{uploading ? 'Submitting...' : 'Submit'}</button>
                </div>
            </form>
        </div>
    );
}


export default Profile