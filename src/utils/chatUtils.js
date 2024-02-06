import { db } from '../firebase'; // Adjust the import path as necessary
import { collection, addDoc } from "firebase/firestore";

export const createChat = async (userId1, userId2) => {
  try {
    const chatDocRef = await addDoc(collection(db, "chats"), {
      users: [userId1, userId2],
      timestamp: Date.now(),
    });
    console.log("Chat created with ID: ", chatDocRef.id);
    return chatDocRef.id; // Returns the newly created chat ID
  } catch (error) {
    console.error("Error creating chat: ", error);
  }
};

export const sendMessage = async (chatId, senderId, messageText) => {
    try {
      await addDoc(collection(db, "chats", chatId, "messages"), {
        text: messageText,
        senderId: senderId,
        timestamp: Date.now(),
      });
      console.log("Message sent");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };