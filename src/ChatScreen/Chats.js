import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import Chat from "./Chat";
import { fetchUserName, fetchUserIdByEmail, fetchUserProfilePicById} from '../utils/userUtils';
import NewMatches from './newMatches';
import './Chat.css';
import { useNavigate } from 'react-router-dom'; // Added import for useNavigate
import Header from '../Header';
import "../SwipeScreen/ChatButton.css";
import showGoToSwipeButton from '../Header.js';

function Chats() {
  const [user, loading, error] = useAuthState(auth);
  const [chatDetails, setChatDetails] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchChats = async () => {
      if (loading) {
        console.log("Loading user");
        return;
      }
      if (!user) {
        console.log("No user found");
        return;
      } else {
        console.log("User found", user.uid);
      }

      const chatsQuery = query(collection(db, "chats"), where("users", "array-contains", user.email));
      const querySnapshot = await getDocs(chatsQuery);
      const chatsData = [];

      for (const doc of querySnapshot.docs) {
        const otherUserEmail = doc.data().users.find(email => email !== user.email); // Find the other user's email
        const otherUserId = await fetchUserIdByEmail(otherUserEmail); // Fetch the other user's ID based on their email
        
        const otherUserName = await fetchUserName(otherUserId); // Fetch the other participant's name
        const otherUserProfilePic = await fetchUserProfilePicById(otherUserId); // Fetch the other participant's profile picture

        const messagesQuery = query(collection(db, "chats", doc.id, "messages"), orderBy("timestamp", "desc"), limit(1)); // Query the messages collection for the chat
        const messagesSnapshot = await getDocs(messagesQuery);
        let lastMessage = "";// get last message
        let lastTimestamp = null;// get last timestamp

        messagesSnapshot.forEach((messageDoc) => {
          lastMessage = messageDoc.data().text; // Get the text of the last message
          lastTimestamp = messageDoc.data().timestamp; // Get the timestamp of the last message
        });

        chatsData.push({
          chatId: doc.id,
          otherUserId: otherUserId,
          otherUserName: otherUserName,
          otherUserProfilePic: otherUserProfilePic,
          lastMessage: lastMessage,
          lastTimestamp: lastTimestamp
        });
      }

      setChatDetails(chatsData);
    };

    fetchChats();
  }, [user, loading]);

  // function to convert the timestamp to a readable format (_ days/months ago)
  const convertTimestamp = (timestamp) => {
    if (!timestamp) {
      return ""
    }
    const date = new Date(timestamp);
    const options = {
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleString('en-US', options);
  }


  return (
    <div>
      <Header showGoToSwipeButton={true}/>
      <div className="chats">
        {chatDetails.length === 0 ? (
          <p>Loading Chats...</p>
        ) : (
          chatDetails.map((chat) => (
            <Chat
              key={chat.chatId}
              id={chat.chatId}
              name={chat.otherUserName}
              message={chat.lastMessage}
              timestamp={convertTimestamp(chat.lastTimestamp)}
              profilePic={chat.otherUserProfilePic}
              otherUserId={chat.otherUserId}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Chats;