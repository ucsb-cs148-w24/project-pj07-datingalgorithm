import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase'; // Adjust the import path as necessary
import { createChat } from './utils/chatUtils'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

const UserList = ({ users }) => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const handleStartChat = async (otherUserId) => {
    if (!user) return;
    const chatId = await createChat(user.email, otherUserId);
    // Redirect to the chat screen for the newly created chat
    // Use your preferred method of navigation, e.g., react-router-dom's useNavigate
    console.log(`Chat created with ID: ${chatId}. Redirect to chat screen.`);
    navigate(`/chats`);
  };

  return (
    <div>
      {users.map((otherUser) => (
        <div key={otherUser.id}>
          <p>{otherUser.name}</p>
          <button onClick={() => handleStartChat(otherUser.email)}>Start Chat</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;