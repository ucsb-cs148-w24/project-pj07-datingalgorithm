import React from 'react';
import Home from './Home'; 
import ProfileCreation from './ProfileCreation'; 
import './App.css';
import Cards from './Cards';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatScreen from './ChatScreen';
import Chat from './Chat';
import Chats from './Chats';

// Import your chat screen component here
function App() {
  return (
    <div className="App">
      
      <Router >
        <Routes>
          <Route path='/swipe' element={<Cards/>}/>

          <Route path="/" element={<Home />} />

          <Route path='/makeProfile' element={<ProfileCreation/>}/>
          <Route path="/chats" element={<Chats />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:person" element={<ChatScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;