
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ChatScreen from './ChatScreen';
import Chat from './Chat';
import Chats from './Chats';

// Import your chat screen component here
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Chats />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:person" element={<ChatScreen />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
