import React, { useEffect, useState } from 'react';
import { db, auth, signInWithGoogle } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore"; // Ensure this import is added
import "./ChatScreen.css";
import { fetchUserName, fetchUserIdByEmail } from '../utils/userUtils';
import { ArrowLeftIcon } from "../icons";

function ChatScreen() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [userNames, setUserNames] = useState({}); // New state to store user names
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [otherUserName, setOtherUserName] = useState(""); // Add state for otherUserName

  useEffect(() => {
    if (!user || !chatId) {
      navigate("/")
      return;
    }
    console.log(user, chatId)

    const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [user, navigate, chatId]);

  useEffect(() => {
    // Existing useEffect code...
    // After fetching messages:
    const fetchUserNames = async () => {
      const names = {};
      for (const message of messages) {
        if (message.uid !== user.uid && !names[message.uid]) {
          names[message.uid] = await fetchUserName(message.uid);
        }
      }
      setUserNames(names);
    };

    if (messages.length > 0) {
      fetchUserNames();
    }
  }, [messages, user.uid]);

  useEffect(() => {
    const fetchOtherUserName = async () => {
      const chatRef = doc(db, "chats", chatId);
      const chatSnap = await getDoc(chatRef);
      if (chatSnap.exists()) {
        const otherUserEmail = chatSnap.data().users.find(email => email !== user.email);
        const otherUserId = await fetchUserIdByEmail(otherUserEmail);
        const otherUserName = await fetchUserName(otherUserId);
        setOtherUserName(otherUserName);
      } else {
        console.log("No such chat!");
      }
    };

    fetchOtherUserName();
  }, [chatId, user.email]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    try {
      await addDoc(collection(db, "chats", chatId, "messages"), {
        text: input,
        timestamp: Date.now(),
        uid: user.uid,
        chatId: chatId
      });
      setInput('');
    } catch (error) {
      console.error("Could not send message: ", error);
    }
  };

  const goBackToChatList = () => {
    navigate("/chats");
  }

  return (
    <div className="chatScreen">
      <div className="chatScreen__header">
        <button onClick={goBackToChatList} className="goBackToChatList">
          <ArrowLeftIcon className="icon"/>
        </button>
      </div>

      <p className="chatScreen__timestamp">You matched with {otherUserName || "Loading..."}</p>
      {messages.map((message) => (
        <div key={message.id} className="chatScreen__message">
          {message.uid === user.uid ? (
            <p className="chatScreen__textUser">{message.text}</p>
          ) : (
            <>
              <p className="chatScreen__text">{message.text}</p>
            </>
          )}
        </div>
      ))}
      <form className="chatScreen__input" onSubmit={handleSend}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="chatScreen_inputField"
          placeholder="Type a message..."
          type="text"
        />
        <button type="submit" className="chatScreen_inputButton">SEND</button>
      </form>
    </div>
  );
}

export default ChatScreen;

