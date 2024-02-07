import React, { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import Chat from "./Chat";
import { fetchUserName, fetchUserIdByEmail } from './utils/userUtils';
import { useNavigate } from 'react-router-dom'; // Added import for useNavigate
import Header from './Header';
import "./ChatButton.css";

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
        chatsData.push({
          chatId: doc.id,
          otherUserId: otherUserId,
          otherUserName: otherUserName
        });
      }

      setChatDetails(chatsData);
    };

    fetchChats();
  }, [user, loading]);

  const goToSwipeScreen = () => {
    navigate('/swipe'); // Assuming your chat screen route is '/chat'
  };


  return (
    <div className="chats">
      <Header />
      {chatDetails.map((chat) => (
        <Chat
          key={chat.chatId}
          id={chat.chatId}
          name={chat.otherUserName}
          message="Last message placeholder"
          timestamp="Timestamp placeholder"
          profilePic="..."
        />
      ))}
      <button onClick={goToSwipeScreen} className="goToChatButton">Keep swiping</button>
    </div>
  );
}

export default Chats;