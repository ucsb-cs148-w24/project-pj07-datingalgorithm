import React, { useEffect, useState } from 'react';
import { db, auth, signInAnonymously } from './firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import Avatar from "@material-ui/core/Avatar";
import "./ChatScreen.css";

function ChatScreen() {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user) {
      signInAnonymously(auth);
    }

    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    try {
      await addDoc(collection(db, "messages"), {
        text: input,
        timestamp: Date.now(),
        uid: user.uid
      });
      setInput('');
    } catch (error) {
      console.error("Could not send message: ", error);
    }
  };

  return (
    <div className="chatScreen">
      <p className="chatScreen__timestamp">YOU MATCHED WITH ELLEN ON 10/08/20</p>
      {messages.map((message) => (
        <div key={message.id} className="chatScreen__message">
          {message.uid === user.uid ? (
            <p className="chatScreen__textUser">{message.text}</p>
          ) : (
            <>
              <Avatar className="chatScreen__image" alt="Ellen" src="..." />
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
