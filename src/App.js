import React from 'react';
import Home from './Home'; // Ensure this import path matches your file structure
import ProfileCreation from './ProfileCreation'; // Ensure this import path matches your file structure
import './App.css';
import Cards from './Cards';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatScreen from './ChatScreen';
import Chat from './Chat';
import Chats from './Chats';
import UserList from './UserList';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase'; // Adjust the import path as necessary
import { useState, useEffect } from 'react';

// Import your chat screen component here
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollectionRef = collection(db, "users");
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchUsers();
  }, []);

  return (
    <div className="App">
      {/* Header */}
      
      <Router >
        <Routes>
          <Route path='/swipe' element={<Cards/>}/>

          <Route path="/" element={<Home />} />

          <Route path='/makeProfile' element={<ProfileCreation/>}/>
          <Route path="/chats" element={<Chats />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:chatId" element={<ChatScreen />} />
          <Route path="/users" element={<UserList users={users} />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;